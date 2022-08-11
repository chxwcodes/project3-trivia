import { useState } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

import './App.css';

import Intro from './Intro';
import Game from './Game';

function App() {
  //state variables that stores the api data
  const [questionsArray, setQuestionsArray] = useState();
  

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
      //if successful, set the questions to our questions state
      setQuestionsArray(response.data.results);
    }).catch(error => {
      //if api failed, alert the user
      alert(error.message);
    })
  }


  ///////////////////////////////////////////////////

  return (
    <main className="App">

      <Intro fetchQuestions={fetchQuestions}/>

      {questionsArray ? 
        <Game questionsArray={questionsArray} setQuestionsArray={setQuestionsArray} />
        :
        'api is empty!'
      }

      
      
      
    </main>
  );
}

export default App;
