import { useState, useEffect } from 'react';

import DisplayTrivia from './DisplayTrivia';

function Game({ questionsArray }) {
    //usestate for answer options array
    const [answerOptions, setAnswerOptions] = useState([]);
    //usestate to check user's score
    const [userScore, setUserScore] = useState(0);

    //run this when there are changes in our api questions array
    useEffect(() => {
        //shuffled answers array
        const shuffledAnswersArray = [];

        questionsArray.forEach(question => {
            const shuffledAnswers = [];

            shuffledAnswers.push(question.correct_answer);
            shuffledAnswers.push(question.incorrect_answers[0]);
            shuffledAnswers.push(question.incorrect_answers[1]);
            shuffledAnswers.push(question.incorrect_answers[2]);

            //loop thru the shuffledanswersarray from the end and picking a random answer to swap with the current answer in iternation
            for (let i = shuffledAnswers.length - 1; i > 0; i--) {
                const newIndex = Math.floor(Math.random() * (i + 1));
                const temp = shuffledAnswers[i];
                shuffledAnswers[i] = shuffledAnswers[newIndex];
                shuffledAnswers[newIndex] = temp;
            }

            //push this to our shuffledanswersarray
            shuffledAnswersArray.push(shuffledAnswers);
        })

        //set these shuffled answers into our answeroptions state
        setAnswerOptions(shuffledAnswersArray);

    }, [questionsArray])

    return (
        <div className="wrapper">

            <DisplayTrivia
                questionsArray={questionsArray}
                answerOptions={answerOptions}
                userScore={userScore}
                setUserScore={setUserScore}
            />

        </div>
    )
}

export default Game;