function Answer({answer, setSelectedAnswer}) {
    return (
        <div className="answer" onClick={setSelectedAnswer}>
            {decodeURIComponent(answer.answer)}
        </div>
    )
}

export default Answer;