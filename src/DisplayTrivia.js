import { useState } from 'react';

function DisplayTrivia({ questionsArray, answerOptions }) {
    //usestate to check user's score
    const [score, setScore] = useState(0);
    //usestate to track current question
    const [currentQuestion, setCurrentQuestion] = useState(0);
    //usestate to check user's selected answer
    const [selectedAnswer, setSelectedAnswer] = useState();
    //usestate to track button's state
    const [disableButton, setDisableButton] = useState(false);
    //usestate to track error
    const [errorMsg, setErrorMsg] = useState('');

    //a checks if its correct and updates the score in userScore
    const checkAnswer = (eachAnswer) => {
        console.log(eachAnswer, questionsArray[currentQuestion].correct_answer)
        if (eachAnswer === questionsArray[currentQuestion].correct_answer) {
            //if user is correct, add 1 to score
            setScore(score + 1);
        }
    }

    //a function that returns a style class
    const handleSelected = (selectedParam) => {
        //selectedAnswer === selectedParam to avoid having classes applied to all buttons
        if (selectedAnswer === selectedParam && selectedAnswer === questionsArray[currentQuestion].correct_answer) {
            return 'correct';
        } else if (selectedAnswer === selectedParam && selectedAnswer !== questionsArray[currentQuestion].correct_answer) {
            return 'wrong';
        }
    }

    //a function that moves users to the next question
    const handleNext = () => {
        //check if user has no more questions and redirect to results
        if (currentQuestion > 10) {
            console.log(`this is the results. your score: ${score}`);
        } else if (selectedAnswer) {
            //add one to current question count
            setCurrentQuestion(currentQuestion + 1);
            //reset user's selected answer
            setSelectedAnswer('');
            //enable the buttons again
            setDisableButton(false);
        } else {
            //tell user to select an answer if they havent
            setErrorMsg('Please make a selection.');
            setTimeout(() => {
                setErrorMsg();
            }, 1500)
        }

    }

    //decode the strings
    const decodeString = (string) => {
        return string
        .replaceAll('&quot;', '"')
        .replaceAll('&#039;', "'")
        .replaceAll('&eacute;', 'é')
        .replaceAll('&oacute;', 'ó')
        .replaceAll('&amp;', '&')
        .replaceAll('&ntilde;', 'ñ')
        .replaceAll('&prime;', '′')
        .replaceAll('&Prime;', '″')
        .replaceAll('&euml;', 'ë')
        .replaceAll('&shy;', '-­');
    }

    return (
        <section className="quizSection">
            <h3>Question {currentQuestion + 1} of 10</h3>
            <h4>Category: {questionsArray[currentQuestion].category}</h4>

            <div className="questionPrompt">
                <h2>{decodeString(questionsArray[currentQuestion].question)}</h2>
            </div>

            <div className="optionPrompts">
                {
                    answerOptions[currentQuestion] !== undefined ?
                        (answerOptions[currentQuestion].map((eachAnswer, index) => {
                            return (
                                <button

                                    onClick={() => {
                                        setSelectedAnswer(eachAnswer);
                                        checkAnswer(eachAnswer);
                                        setDisableButton(true);
                                    }
                                    }
                                    //only apply right/wrong class if there's something in selectedAnswer state
                                    className={selectedAnswer && handleSelected(eachAnswer)}
                                    disabled={disableButton}
                                    key={index}
                                >
                                    {decodeString(eachAnswer)}</button>
                            )
                        })) : null
                }
            </div>

            <nav className="questionNav">
                <button onClick={handleNext}>Next</button>

                {errorMsg ? <p>{errorMsg}</p> : null}
            </nav>
        </section>
    )

}

export default DisplayTrivia;