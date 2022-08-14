import { useState } from 'react';
import axios from 'axios';
import { Routes, Route } from 'react-router-dom';

import './App.css';

import SelectGame from './SelectGame';
import Scoreboard from './Scoreboard';

function App() {
  //state variables that stores the api data
  const [questionsArray, setQuestionsArray] = useState([]);

  ///////////////////////////////////////////////////
  //call the api user selects options and submits their options
  const fetchQuestions = (e, userCategoryParam, userDifficultyParam) => {
    e.preventDefault();

    axios({
      url: 'https://opentdb.com/api.php',
      method: 'GET',
      dataResponse: 'JSON',
      params: {
        amount: 10,
        category: userCategoryParam,
        difficulty: userDifficultyParam,
        type: 'multiple'
      }
    }).then(response => {
      //if successful, then map over each question in the results array and shuffle the answers, and put the shuffled answers into a new array and save it as a property to use
      const results = response.data.results;
      
      const newArrayShuffled = results.map(question => {
        //shuffled answer for each questions
        const shuffledAnswers = [];

        shuffledAnswers.push(question.correct_answer);
        shuffledAnswers.push(question.incorrect_answers[0]);
        shuffledAnswers.push(question.incorrect_answers[1]);
        shuffledAnswers.push(question.incorrect_answers[2]);

        //loop thru the shuffledanswersarray from the end and picking a random answer to swap with the current answer in iternation
        for (let i = shuffledAnswers.length - 1; i > 0; i--) {
          const newIndex = Math.floor(Math.random() * (i + 1));
          const temp = shuffledAnswers[i];
          shuffledAnswers[i] = shuffledAnswers[newIndex];
          shuffledAnswers[newIndex] = temp;
        }

        return { ...question, shuffledAnswers: shuffledAnswers };

      })

      setQuestionsArray(newArrayShuffled);
      
    }).catch(error => {
      //if api failed, alert the user
      alert(error.message);
    })
  }

  ///////////////////////////////////////////////////

  return (

    <main className="App">

      <Routes>
        {/* HOME/INDEX */}
        <Route path='/' element={ <SelectGame fetchQuestions={fetchQuestions} questionsArray={questionsArray} /> }/>

        {/* RESULTS */}
        <Route path='/scoreboard' element={ <Scoreboard /> }/>
      </Routes>

    </main>

  );
}

export default App;
