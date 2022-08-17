import { useState } from 'react';
import { Link } from 'react-router-dom';

import DisplayTrivia from './DisplayTrivia';

function SelectGame({ fetchQuestions, questionsArray, setQuestionsArray }) {
    //usestate that stores user's game param selections
    const [userCategory, setUserCategory] = useState('');
    const [userDifficulty, setUserDifficulty] = useState('');

    const handleUserCategory = (e) => {
        setUserCategory(e.target.value);
    }
    
    const handleUserDifficulty = (e) => {
        setUserDifficulty(e.target.value);
    }

    return (
        <section className="quizSection">
            {
                //only display form when theres no questions
                questionsArray.length === 0 ? (<div className="wrapper">
                        <h1>Trivia<span>Me</span></h1>
                        <h2>Do you think you know it all?</h2>

                        <p className='gameDesc'>Test your knowledge and prove that you're a know-it-all in a wide range of categories ranging from computer science to anime. See how you compare with others in our scoreboard.</p>

                        <form onSubmit={(e) => { fetchQuestions(e, userCategory, userDifficulty) }}>

                            <label htmlFor="gameGategory">Select Category:</label>
                            <select 
                                id="gameCategory" 
                                onChange={handleUserCategory} 
                                value={userCategory}>
                                    <option value="">All Categories (Mixed)</option>
                                    <option value="9">General Knowledge</option>
                                    <option value="15">Video Games</option>
                                    <option value="16">Board Games</option>
                                    <option value="31">Anime & Manga</option>
                                    <option value="32">Catoons & Animations</option>
                                    <option value="24">Comics</option>
                                    <option value="10">Books</option>
                                    <option value="11">Movies & Film</option>
                                    <option value="12">Music</option>
                                    <option value="13">Musicals & Theatres</option>
                                    <option value="14">TV Shows</option>
                                    <option value="17">Science & Nature</option>
                                    <option value="18">Computer Science</option>
                                    <option value="19">Mathematics</option>
                                    <option value="20">Mythology</option>
                                    <option value="21">Sports</option>
                                    <option value="22">Geography</option>
                                    <option value="23">History</option>
                                    <option value="24">Politics</option>
                                    <option value="25">Art & Design</option>
                                    <option value="27">Animals</option>
                                    <option value="28">Vehicles</option>
                            </select>

                            <label htmlFor="difficulty">Select Difficulty:</label>
                            <select 
                            id="difficulty" 
                            onChange={handleUserDifficulty} 
                            value={userDifficulty}>
                                    <option value="">Any Difficulty (Mixed)</option>
                                    <option value="easy">Easy</option>
                                    <option value="medium">Medium</option>
                                    <option value="hard">Hard</option>
                            </select>

                            <button type="submit">Start Game</button>

                            {/* hide scoreboard link when user is playing game */}
                            {questionsArray.length === 0 ? <Link to='/scoreboard'>Scoreboard</Link> : null}
                        </form>
                    </div>)
                    : null
            }

            {
                //only display game where there are questions
                questionsArray.length > 0 ? 
                <DisplayTrivia 
                    questionsArray={questionsArray}
                    userCategory={userCategory}
                    userDifficulty={userDifficulty}
                    setQuestionsArray={setQuestionsArray}
                /> : null
            }
            
        </section>
    )
}

export default SelectGame;