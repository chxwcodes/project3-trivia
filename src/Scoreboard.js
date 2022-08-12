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

            for (let firebaseKey in data){
                tempState.push({
                    key: firebaseKey,
                    name: data[firebaseKey].username,
                    score: data[firebaseKey].score,
                    category: data[firebaseKey].category,
                    difficulty: data[firebaseKey].difficulty
                })
            }

            //update score state with firebase data
            setPlayersData(tempState);

        })
    }, [])

    return (
        <main className="scoreboard">
            <div className="wrapper">
                <Link to='/'>Return to main</Link>

                <section className="scoreData">
                    <h2>Scoreboard</h2>

                    <table>
                        <thead>
                            <tr>
                                <th className="nameData">Name</th>
                                <th className="scoreData">Score</th>
                                <th className="catData">Category</th>
                                <th className="diffData">Difficulty</th>
                            </tr>
  
                        </thead>

                        {playersData.map((eachPlayer) => {
                            return (
                                <tbody>
                                    <tr key={eachPlayer.key}>
                                        <td className="playerName">{eachPlayer.name}</td>
                                        <td className="playerScore">{eachPlayer.score}/10</td>
                                        <td className="playerCat">{eachPlayer.category}</td>
                                        <td className="playerDiff">{eachPlayer.difficulty}</td>
                                    </tr>
                                </tbody>
                            )
                        })}
                    </table>

                </section>
            </div>
        </main>
    )

    
}

export default Scoreboard;