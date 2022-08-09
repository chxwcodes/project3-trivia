import { useState } from 'react';

function DisplayQuestion({ questionsArray, answerOptions, currentQuestion, setCurrentQuestion }) {
    //use state to check user's selected answer
    const [selectedAnswer, setSelectedAnswer] = useState('');
    //use state to check user's score
    const [userScore, setUserScore] = useState(0);

    //a function that sets a value in selectedanswers and checks if its correct and updates the score in userScore
    const checkAnswer = (userAnswer) => {
        //put a value in userSelect state
        setSelectedAnswer(userAnswer);

        if (selectedAnswer === questionsArray[currentQuestion].correct_answer) {
            //if user is correct, add 1 to score
            setUserScore(userScore + 1);
        }
    }

    //a function that returns a style class
    const handleSelected = (selectedParam) => {
        if (selectedAnswer === selectedParam && selectedAnswer === questionsArray[currentQuestion].correct_answer) {
            return 'correct';
        } else if (selectedAnswer === selectedParam && selectedAnswer !== questionsArray[currentQuestion].correct_answer){
            return 'wrong';
        }
    }

    //decode the strings
    const decodeString = (string) => {
        return string.replaceAll('&quot;', '"').replaceAll('&#039;', "'");
    }

    return (
        <section className="quizSection">
            <h3>Question {currentQuestion + 1} of 10</h3>
            <h4>{questionsArray[currentQuestion].category}</h4>

            <div className="questionPrompt">
                <h2>{decodeString(questionsArray[currentQuestion].question)}</h2>
            </div>

            <div className="optionPrompts">
                {
                    answerOptions[currentQuestion] !== undefined ?
                        (answerOptions[currentQuestion].map((eachAnswer, index) => {
                            return (
                                <button 
                                    key={index}
                                    onClick={() => checkAnswer(eachAnswer)}     
                                    //only apply right/wrong class if there's something in selectedAnswer state
                                    className={selectedAnswer && handleSelected(eachAnswer)}                
                                    >                  
                                {decodeString(eachAnswer)}</button>
                            )
                        })) : null
                }   
            </div>
        </section>
    )

}

export default DisplayQuestion;