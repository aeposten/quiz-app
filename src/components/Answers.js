function Answer({answer}) {
    return (
        <div className="answer">
            {decodeURIComponent(answer.answer)}
        </div>
    )
}

export default Answer;