import React, { useState } from 'react'
import GameInput from './GameInput';
import { Button } from '@mui/material';
import { click } from '@testing-library/user-event/dist/click';

function CreateGames() {

  //data structure to instantiate a new game
  const Game = (homeTeam, homeScore, awayTeam, awayScore, Date, key) => {
    return {
      homeTeam: homeTeam,
      homeScore: homeScore,
      awayTeam: awayTeam,
      awayScore: awayScore,
      date: Date,
      key: key
    }
  }

  const [games, setGames] = useState([]);
  const [gameCount, setGameCount] = useState(0);

  /*while (games.length < numberofGames) {
    const blankGame = new Game('', 0, '', 0, Date.now, games.length);
    games.push(blankGame);
  }*/

  const [data, setData] = useState([]);
  const [url, setUrl] = useState('');

  //this function will be used by the gameinput component to update the state of the parent
  const handleGameEdit = (editedGame) => {
    const gameId = editedGame.key
    const newArr = [...games];
    newArr[gameId] = editedGame;
    setGames(newArr);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const result = await response.json();
      // do something with the result
    } catch (error) {
      // handle errors
    }
  }

  return (
    <div>
      
      <Button
        onClick={() => {
          const game = {
            homeTeam: '',
            homeScore: 0,
            awayTeam: '',
            awayScore: 0,
            key: gameCount
          };
          setGames(games => [...games, game]);
          //set game count so we can always give the game a unique key in case a record is removed
          setGameCount(gameCount => gameCount + 1)
        }}
      >
        Add Game
      </Button>

      {games.map((game) => (
        <GameInput updateAllGames={setGames} thisGame={game} Game={Game} key={game.key} handleGameEdit={handleGameEdit}/>
      ))}

      <Button>
        Submit
      </Button>
    </div>
  )
}

export default CreateGames;