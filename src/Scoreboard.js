import { Link } from 'react-router-dom';
import firebase from './firebase';
import { getDatabase, ref, onValue } from 'firebase/database';
import { useState } from 'react';
import { useEffect } from 'react';

function Scoreboard() {
    const [playersData, setPlayersData] = useState([]);

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

            tempState.sort((a,b) => {
                return b.timestamp - a.timestamp;
            })

            //update score state with firebase data with temp state array
            setPlayersData(tempState);
        })
    }, [])

    return (
        <main className="scoreboard">
            <div className="wrapper">                                        

                <section className="scoreData">
                    <h2>Score<span>board</span></h2>
                    <p>Results are shown by most recent to oldest.</p>

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
        </main>
    )

    
}

export default Scoreboard;