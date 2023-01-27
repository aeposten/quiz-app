import Answer from "./Answers";
function Question ({question}) {

    const answerElements = question.answers.map((answer) => 
        <Answer answer={answer} key={answer.id}/>
    )
    return (
        <section className="question">
            <div className="question-text">{question.questionTxt}</div>
            <div className="answers">{answerElements}</div>
        </section>
    )
}
export default Question;
