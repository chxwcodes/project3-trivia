function Results({ questionsArray, userCategory, userDifficulty, score }) {
    return(
        <div className="results">

            <h3>You scored:</h3>

            <div className="userResults">
                <p className="score">{score}/10</p>
                <p className="category">
                    {userCategory === undefined ? 'All' : questionsArray[0].category}
                    ({userDifficulty === undefined ? 'Any' : questionsArray[0].difficulty})
                </p>
                
            </div>

        </div>
    )
}

export default Results;