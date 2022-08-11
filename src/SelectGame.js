import { useState } from 'react';
import DisplayTrivia from './DisplayTrivia';

function SelectGame({ fetchQuestions, questionsArray }) {
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
        <div className="wrapper">
            {
                //only display form when theres no questions
                questionsArray.length === 0 ? (<section className="selectQuiz">
                        <h1>Trivia Me</h1>
                        <h2>Do you think you know it all?</h2>

                        <form onSubmit={(e) => { fetchQuestions(e, userCategory, userDifficulty) }}>
                            <label htmlFor="gameGategory">Select Category:</label>
                            <select id="gameCategory" onChange={handleUserCategory} value={userCategory}>
                                <option value="">All Categories</option>
                                <option value="9">General Knowledge</option>
                                <option value="15">Video Games</option>
                                <option value="16">Board Games</option>
                                <option value="31">Anime & Manga</option>
                                <option value="32">Catoons & Animations</option>
                                <option value="24">Comics</option>
                                <option value="10">Books</option>
                                <option value="11">Movies & Film</option>
                                <option value="12">Music</option>
                                <option value="14">TV Shows</option>
                                <option value="17">Science & Nature</option>
                                <option value="18">Computer Science</option>
                                <option value="19">Mathematics</option>
                                <option value="21">Sports</option>
                                <option value="22">Geography</option>
                                <option value="23">History</option>
                            </select>

                            <label htmlFor="difficulty">Select Difficulty:</label>
                            <select id="difficulty" onChange={handleUserDifficulty} value={userDifficulty}>
                                <option value="">Any</option>
                                <option value="easy">Easy</option>
                                <option value="normal">Normal</option>
                                <option value="hard">Hard</option>
                            </select>

                            <button type="submit">Start Game</button>
                        </form>
                    </section>)
                    : null
            }

            {
                //only display game where there are questions
                questionsArray.length > 0 ? 
                <DisplayTrivia 
                    questionsArray={questionsArray}
                /> : null
            }
            
        </div>
    )
}

export default SelectGame;