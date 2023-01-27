import { useState } from "react";
import Questions from "./components/Questions";

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
          })
        : answerObjects.push({
            id: nanoid(),
            answer: decodeURIComponent(answer),
            isCorrect: false,
          });
    });
    return answerObjects;
  }

  function startGame() {
    fetchQuestions();
    setStarted(true);
  }

  console.log(questions);
  console.log(started);
  return (
    <main className="App">
      <h1>SUPER FUN QUIZ</h1>
      {started && <Questions questions={questions} />}
      <button className="fetch-btn" onClick={startGame}>
        Get Questions
      </button>
    </main>
  );
}

export default App;
