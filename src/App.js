import { useState } from "react";
import Question from "./components/Question";

import { nanoid } from "nanoid";
const URL = "https://opentdb.com/api.php?amount=10&encode=url3986";

function App() {
  const [started, setStarted] = useState(false);
  const [questions, setQuestions] = useState([]);

  function fetchQuestions() {
    const editedQuestions = [];
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

  function generateAllAnswers(question) {
    const answerObjects = [];
    const correct = question.correct_answer;
    let incorrect = question.incorrect_answers;
    const incorrectLength = incorrect.length;
    const index = Math.floor(Math.random() * incorrectLength);
    incorrect.splice(index, 0, correct);

    incorrect.map((answer) => {
      return answer === correct
        ? answerObjects.push({
            id: nanoid(),
            answer: decodeURIComponent(answer),
            isCorrect: true,
            isSelected: false,
          })
        : answerObjects.push({
            id: nanoid(),
            answer: decodeURIComponent(answer),
            isCorrect: false,
            isSelected: false,
          });
    });
    return answerObjects;
  }

  function setSelectedAnswer(questionId, answerId) {
    setQuestions((prevQuestions) =>
      prevQuestions.map((question) => {
        return question.id === questionId
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

  // { ...question, isAnswered: !question.isAnswered }

  function startGame() {
    fetchQuestions();
    setStarted(true);
  }

  function setQuestionHtml() {
    const questionElements = questions.map((question) => (
      <Question
        question={question}
        key={question.id}
        setSelectedAnswer={setSelectedAnswer}
      />
    ));
    return questionElements;
  }

  console.log(questions);

  return (
    <main className="App">
      <h1>SUPER FUN QUIZ</h1>
      {started && setQuestionHtml()}
      <button className="fetch-btn" onClick={startGame}>
        Get Questions
      </button>
    </main>
  );
}

export default App;
