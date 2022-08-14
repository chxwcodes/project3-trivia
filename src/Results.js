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
            readableUserDifficulty = 'Any';
        } else {
            readableUserDifficulty = questionsArray[0].difficulty;
        }

        //reference to db
        const database = getDatabase(firebase);
        const dbRef = ref(database);

        //push user's score to db
        push(dbRef, {
            'username': userName,
            'score': score,
            'category': readableUserCategory,
            'difficulty': readableUserDifficulty
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