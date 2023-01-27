function Answer({ answer, setSelectedAnswer, answersChecked }) {
  function styleAnswers() {
    let classes = ""
    if (!answersChecked && answer.isSelected) {
        classes = "selected"
    } else if (answersChecked && answer.isSelected) {
        answer.isCorrect ? (classes = "correct") : (classes = "incorrect")
    } else if (answersChecked && !answer.isSelected && answer.isCorrect) {
        classes = "correct"
    }
    return classes;
  }
  return (
    <div
      className={`answer ${styleAnswers()}`}
      onClick={setSelectedAnswer}
    >
      {decodeURIComponent(answer.answer)}
    </div>
  );
}

export default Answer;
