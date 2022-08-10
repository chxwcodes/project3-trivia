import { useState, useEffect } from 'react';
import axios from 'axios';

import './App.css';

import Game from './Game';

function App() {
  //state variables that stores the api data
  const [questionsArray, setQuestionsArray] = useState();
  

  ///////////////////////////////////////////////////
  //call the api when the app mounts
  useEffect(() => {
    axios({
      url: 'https://opentdb.com/api.php',
      method: 'GET',
      dataResponse: 'JSON',
      params: {
        amount: 10,
        difficulty: 'hard',
        type: 'multiple'
      }
    }).then(response => {
      //if successful, set the questions to our questions state
      setQuestionsArray(response.data.results);
    }).catch(error => {
      //if api failed, alert the user
      alert(error.message);
    })
  }, [])


  ///////////////////////////////////////////////////

  return (
    <main className="App">

      {questionsArray ? 
        <Game questionsArray={questionsArray} setQuestionsArray={setQuestionsArray} />
        :
        'api is empty!'
      }
      
      
    </main>
  );
}

export default App;
