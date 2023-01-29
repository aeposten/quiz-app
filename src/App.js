import { useState, useEffect } from "react";
import Question from "./components/Question";
import OptionsForm from "./components/OptionsForm";
import { nanoid } from "nanoid";

function App() {
  const [started, setStarted] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [answersChecked, setAnswersChecked] = useState(false);
  const [score, setScore] = useState(0);
  const [gameOptions, setGameOptions] = useState({
    amount: 5,
    difficulty: "",
    type: "",
    category: "",
  });

  function generateGameOptions(option, selection) {
    const options = selection ? `&${option}=${selection}` : "";
    return options;
  }
  function fetchQuestions() {
    const editedQuestions = [];
    const URL = `https://opentdb.com/api.php?amount=${
      gameOptions.amount}${generateGameOptions("category", gameOptions.category)}${generateGameOptions("difficulty", gameOptions.difficulty)}${generateGameOptions("type", gameOptions.type)}&encode=url3986`
      console.log(URL)
    fetch(URL)
      .then((response) => response.json())
      .then((questions) => {
        questions.results.map((question) => {
          return editedQuestions.push({
            id: nanoid(),
            questionTxt: decodeURIComponent(question.question),
            answers: generateAllAnswers(question),
            isAnswered: false,
          });
        });
        return setQuestions(editedQuestions);
      });
  }

  useEffect(() => {
    fetchQuestions();
  }, [started, gameOptions]);

  function generateAnswerObject(answer, isCorrect) {
    return {
      id: nanoid(),
      answer: decodeURIComponent(answer),
      isCorrect: isCorrect,
      isSelected: false,
    };
  }

  function generateAllAnswers(question) {
    const answerObjects = [];
    const correct = question.correct_answer;
    let incorrect = question.incorrect_answers;
    const index = Math.floor(Math.random() * incorrect.length);
    incorrect.splice(index, 0, correct);

    incorrect.map((answer) => {
      return answer === correct
        ? answerObjects.push(generateAnswerObject(answer, true))
        : answerObjects.push(generateAnswerObject(answer, false));
    });
    return answerObjects;
  }

  function setSelectedAnswer(questionId, answerId) {
    setQuestions((prevQuestions) =>
      prevQuestions.map((question) => {
        return question.id === questionId && !question.isAnswered
          ? {
              ...question,
              isAnswered: !question.isAnswered,
              answers: question.answers.map((answer) => {
                return answer.id === answerId
                  ? { ...answer, isSelected: !answer.isSelected }
                  : answer;
              }),
            }
          : question;
      })
    );
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setGameOptions({
      ...gameOptions,
      [name]: value,
    });
  }

  function startGame() {
    setStarted((prevStarted) => !prevStarted)
    setScore((prevScore) => 0);
    setAnswersChecked((prevChecked) => false);
    setGameOptions((prevOptions) => ({amount: 5,
      difficulty: "",
      type: "",
      category: ""}))
  }

  function checkAnswers() {
    setAnswersChecked(true);
    setQuestions((prevQuestions) => prevQuestions);
    calculateScore();
  }

  function calculateScore() {
    questions.map((question) => {
      return question.isAnswered
        ? question.answers.map((answer) => {
            return answer.isCorrect && answer.isSelected
              ? setScore((prevScore) => prevScore + 1)
              : setScore((prevScore) => prevScore + 0);
          })
        : setScore((prevScore) => prevScore + 0);
    });
  }
  const questionElements = questions.map((question) => (
    <Question
      question={question}
      key={question.id}
      setSelectedAnswer={setSelectedAnswer}
      answersChecked={answersChecked}
    />
  ));

  function setButtons() {
    let button;
    if (!started){
      button = <button onClick={startGame}>Start Game</button>
    }else if (started &&!answersChecked) {
      button = <button onClick={checkAnswers}>Check Answers</button>;
    } else {
      button = (
        <div>
          You got {score} / {questions.length} correct answers{" "}
          <button className="fetch-btn" onClick={startGame}>
            New Game
          </button>
        </div>
      );
    }
    return button;
  }

  return (
    <main className="App">
      <h1>SUPER FUN QUIZ</h1>
      {!started && (
        <OptionsForm
          gameOptions={gameOptions}
          handleChange={handleChange}
          startGame={startGame}
        />
      )}
      {started && questionElements}
      {setButtons()}
    </main>
  );
}

export default App;
