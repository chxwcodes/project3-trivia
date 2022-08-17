import { useState, useEffect } from 'react';
import he from 'he';
import Results from './Results';
import ErrorMsg from './ErrorMsg';

function DisplayTrivia({ questionsArray, setQuestionsArray, userCategory, userDifficulty }) {
    //usestate to check user's score
    const [score, setScore] = useState();
    //usestate to track current question
    const [currentQuestion, setCurrentQuestion] = useState();
    //usestate to check user's selected answer
    const [selectedAnswer, setSelectedAnswer] = useState();
    //usestate to track button's state
    const [disableButton, setDisableButton] = useState(false);
    //usestate to track error
    const [errorMsg, setErrorMsg] = useState('');

    //reset some values when DisplayTrivia first mounts 
    useEffect(() => {
        setCurrentQuestion(0);
        setScore(0);
    }, [])

    //a checks if its correct and updates the score in userScore
    const checkAnswer = (eachAnswer) => {
        if (eachAnswer === questionsArray[currentQuestion].correct_answer) {
            //if user is correct, add 1 to score
            setScore(score + 1);
        }
    }

    //a function that returns a style class
    const handleSelected = (selectedParam) => {
        //additional logic of selectedAnswer === selectedParam to avoid having classes applied to all the buttons
        //if user's selection = api correct answer, return class correct, if user selection != api correct answer, return class wrong. Then removed additional logic so app will tell user which one is the correct answer if user were to choose the wrong answer.
        if (selectedAnswer === selectedParam && selectedAnswer === questionsArray[currentQuestion].correct_answer) {
            return 'correct';
        } else if (selectedAnswer === selectedParam && selectedAnswer !== questionsArray[currentQuestion].correct_answer) {
            return 'wrong';
        } else if (selectedParam === questionsArray[currentQuestion].correct_answer) {
            return 'correct';
        }
    }

    //a function that moves users to the next question
    const handleNext = () => {
        //if theres a value in selected answer
        if (selectedAnswer) {
            //add one to current question count
            setCurrentQuestion(currentQuestion + 1);
            //reset user's selected answer
            setSelectedAnswer('');
            //enable the buttons again
            setDisableButton(false);
        } else {
            //tell user to select an answer if they havent
            setErrorMsg(`⚠ Please make a selection. ⚠`);
            setTimeout(() => {
                setErrorMsg();
            }, 1500)
        }

    }

    return (
        <section className="quiz">
            <div className="wrapper">
                {
                    currentQuestion <= 9 ? (
                        <div className="triviaSection">
                            <h3>Question {currentQuestion + 1} of 10</h3>
                            <h2>{`${questionsArray[currentQuestion].category} (${questionsArray[currentQuestion].difficulty})`}</h2>

                            <div className="questionPrompt">
                                <p className='question'>{he.decode(questionsArray[currentQuestion].question)}</p>
                            </div>

                            <div className="optionPrompts">
                                {
                                    questionsArray[currentQuestion].shuffledAnswers !== undefined ?
                                        (questionsArray[currentQuestion].shuffledAnswers.map((eachAnswer, index) => {
                                            return (
                                                <button onClick={() => {
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
                                                {he.decode(eachAnswer)}</button>
                                            )
                                        })) : null
                                }
                            </div>

                            {errorMsg ? <ErrorMsg errorMsg={errorMsg} /> : null}

                            <nav className="questionNav">
                                <button onClick={handleNext}> Next</button>
                            </nav>
                        </div>
                    ) : null
                }

                {
                    currentQuestion >= 10 ? (
                        <Results
                            questionsArray={questionsArray}
                            setQuestionsArray={setQuestionsArray}
                            userCategory={userCategory}
                            userDifficulty={userDifficulty}
                            score={score}
                            errorMsg={errorMsg}
                            setErrorMsg={setErrorMsg}
                        />
                    ) : null
                }
            </div>   
        </section>
    )

}

export default DisplayTrivia;