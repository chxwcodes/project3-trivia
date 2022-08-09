function DisplayQuestion({ questionsArray, answerOptions, currentQuestion, setCurrentQuestion }) {
    const decodeString = (string) => {
        return string.replaceAll('&quot;', '"').replaceAll('&#039;', "'");
    }

    //What Pok & eacute; mon &#039;s Base Stat Total does not change when it evolves ?
    return (
        <section className="quizSection">
            <h3>Question {currentQuestion + 1} of 10</h3>

            <div className="questionPrompt">
                <h2>{decodeString(questionsArray[currentQuestion].question)}</h2>
            </div>

            <div className="optionPrompts">
                {
                    answerOptions[currentQuestion] !== undefined ?
                        (answerOptions[currentQuestion].map((eachAnswer, index) => {
                            return (
                                <button key={index}>{decodeString(eachAnswer)}</button>
                            )
                        })) : null
                }   
            </div>
        </section>
    )

}

export default DisplayQuestion;