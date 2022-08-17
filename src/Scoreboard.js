import { Link } from 'react-router-dom';
import firebase from './firebase';
import { getDatabase, ref, onValue } from 'firebase/database';
import { useState } from 'react';
import { useEffect } from 'react';

function Scoreboard() {
    const [playersData, setPlayersData] = useState([]);
    const [userDropSel, setUserDropSel] = useState('recent');

    useEffect(() => {
        //variable for our db
        const database = getDatabase(firebase);
        //reference for db
        const dbRef = ref(database);

        //event listener for changes in db
        onValue(dbRef, (response) => {
            //temp array to hold player data
            const tempState = [];
            //filtered data from the response
            const data = response.val();

            //loop thru each firebase player object and get their properties and push it in the temp state
            for (let firebaseKey in data){
                tempState.push({
                    key: firebaseKey,
                    name: data[firebaseKey].username,
                    score: data[firebaseKey].score,
                    category: data[firebaseKey].category,
                    difficulty: data[firebaseKey].difficulty,
                    timestamp: parseInt(data[firebaseKey].timestamp)
                })
            }

            //sort based on user's dropdown sel
            if (userDropSel === 'recent') {
                tempState.sort((a, b) => {
                    return b.timestamp - a.timestamp;
                })
            } else if (userDropSel === 'highScore') {
                tempState.sort((a, b) => {
                    return b.score - a.score;
                })
            } else if (userDropSel === 'alphaName') {
                tempState.sort((a, b) => {
                    return a.name.localeCompare(b.name, { ignorePunctuation: true });
                })
            } else if (userDropSel === 'oldest') {
                tempState.sort((a, b) => {
                    return a.timestamp - b.timestamp;
                })
            }


            //update score state with firebase data with temp state array
            setPlayersData(tempState);
        })
    }, [userDropSel])

    const handleUserDropSel = (e) => {
        setUserDropSel(e.target.value);
    }

    return (
        <section className="scoreboard">
            <div className="wrapper">                                        

                <section className="scoreData">
                    <h2>Score<span>board</span></h2>
                    <p>Smart peeps here. Do you see your name?</p>

                    <label htmlFor="scoreSort" className='sr-only'>Sort scoreboard</label>
                    <select id="scoreSort"
                    onChange={handleUserDropSel}
                    value={userDropSel}
                    >
                        <option value="recent">Most Recent</option>
                        <option value="highScore">Highest Score</option>
                        <option value="alphaName">Name: Alphabetical</option>
                        <option value="oldest">Oldest to Newest</option>
                    </select>

                    <div className="scoreTable">
                        <table>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Score</th>
                                    <th>Category</th>
                                    <th>Difficulty</th>
                                </tr>

                            </thead>

                            {playersData.map((eachPlayer) => {
                                return (
                                    <tbody key={eachPlayer.key}>
                                        <tr>
                                            <td className="playerName">{eachPlayer.name}</td>
                                            <td className="playerScore">{eachPlayer.score}/10</td>
                                            <td className="playerCat">{eachPlayer.category}</td>
                                            <td className="playerDiff">{eachPlayer.difficulty}</td>
                                        </tr>
                                    </tbody>
                                )
                            })}
                        </table>
                    </div>

                    <Link to='/'>Return to main</Link>  

                </section>
            </div>
        </section>
    )

    
}

export default Scoreboard;