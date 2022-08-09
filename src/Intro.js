function Intro({ handleSubmit, changeScreen }) {
    return (
        <div className="wrapper">
            <h1>Trivia Me</h1>
            <h2>Do you think you know it all?</h2>

            <form onSubmit={() => { handleSubmit(); changeScreen('gameScreen')}}>
                <button>Start game</button>
            </form>

        </div>
    )
}

export default Intro;