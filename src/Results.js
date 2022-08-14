import firebase from './firebase';
import { getDatabase, ref, push } from 'firebase/database';
import { useState } from 'react';

function Results({ questionsArray, userCategory, userDifficulty, score }) {
    const [userName, setUserName] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleReturn = () => {
        window.location.reload(false);
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
    }

    return(
        <div className="results">

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
                    placeholder='Your Name'
                    onChange={handleUserInput}
                    value={userName}
                    disabled={isSubmitted}
                    required
                />
                <button disabled={isSubmitted}>💾</button>
            </form>
                
            <div className="resultsNav">
                <button className='returnBtn' onClick={handleReturn}>Return</button>
            </div>
            
        </div>
    )
}

export default Results;