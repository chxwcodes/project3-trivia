import firebase from './firebase';
import { getDatabase, ref, push } from 'firebase/database';
import { useState } from 'react';
import { Link } from 'react-router-dom';

function Results({ questionsArray, setQuestionsArray, userCategory, userDifficulty, score, setUserCategory, setUserDifficulty}) {
    const [userName, setUserName] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [submitNotif, setSubmitNotif] = useState('');

    //reset api array and quiz dropdown inputs for next game
    const handleReturn = () => {
        setQuestionsArray([]);
        setUserCategory('');
        setUserDifficulty('');
    }

    const handleUserInput = (e) => {
        setUserName(e.target.value);
    }

    const handleScoreSubmit = (e) => {
        e.preventDefault();

        //give a name to any category and all difficulty since they're empty strings
        let readableUserCategory = userCategory;
        if (userCategory === '') {
            readableUserCategory = 'All Categories';
        } else {
            readableUserCategory = questionsArray[0].category;
        }

        let readableUserDifficulty = userDifficulty;
        if (userDifficulty === '') {
            readableUserDifficulty = 'mixed';
        } else {
            readableUserDifficulty = questionsArray[0].difficulty;
        }

        //get timestamp
        const userDate = new Date();

        const timestamp = userDate.getFullYear().toString()
            + userDate.getMonth().toString().padStart(2, '0')
            + userDate.getDate().toString().padStart(2, '0')
            + userDate.getHours().toString().padStart(2, '0')
            + userDate.getMinutes().toString().padStart(2, '0')
            + userDate.getSeconds().toString().padStart(2, '0')
            + userDate.getMilliseconds().toString().padStart(4, '0')

        //reference to db
        const database = getDatabase(firebase);
        const dbRef = ref(database);

        //push user's score to db
        push(dbRef, {
            'username': userName,
            'score': score,
            'category': readableUserCategory,
            'difficulty': readableUserDifficulty,
            'timestamp': timestamp
        });

        //tell user they've submitted
        setSubmitNotif(`Your score has been recorded! ????`);
        setTimeout(() => {
            setSubmitNotif();
        }, 1500)
    }

    return(
        <section className="results">

            <h3>You scored:</h3>

            <div className="userResults">
                <p className="score">{score}/10</p>
                <p className="category">
                    {userCategory === '' ? 'All Categories' : questionsArray[0].category}
                    ({userDifficulty === '' ? 'mixed' : questionsArray[0].difficulty})
                </p>
            </div>

            <h3>If you want to save your results to the scoreboard, enter your name below.</h3>

            <form className="userInfo" 
                onSubmit={(e) => {
                    handleScoreSubmit(e);
                    setIsSubmitted(true);
                }}
            >

                <label htmlFor="userName" className="sr-only">Your name:</label>
                <input 
                    type="text" 
                    id="userName" 
                    placeholder='Anonymous Bee'
                    onChange={handleUserInput}
                    value={userName}
                    disabled={isSubmitted}
                    maxLength={30}
                    required
                />
                <button disabled={isSubmitted}>Submit</button>
            </form>
    
            <div className="resultsNav">
                {isSubmitted ? <Link to='/scoreboard' onClick={handleReturn}>Scoreboard</Link> : null}
                <button className='returnBtn' onClick={handleReturn}>Back to game</button>
            </div>

            {/* popup notif telling users theyve submitted */}
            {submitNotif ? <p className="errorMsg">{submitNotif}</p> : null}
            
        </section>
    )
}

export default Results;