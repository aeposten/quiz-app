import Question from "./Question";

function Questions({ questions }) {
  const questionElements = questions.map((question) => (
    <Question question={question} key={question.id} />
  ));

  return <section className="all-questions">{questionElements}</section>;
}

export default Questions;
