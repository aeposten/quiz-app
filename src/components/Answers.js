function Answer({ answer, setSelectedAnswer }) {
  return (
    <div
      className={`answer ${answer.isSelected ? "selected" : ""}`}
      onClick={setSelectedAnswer}
    >
      {decodeURIComponent(answer.answer)}
    </div>
  );
}

export default Answer;
