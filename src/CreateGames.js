import React, { useState } from 'react'
import GameInput from './GameInput';
import { Button } from '@mui/material';

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
  const numberofGames = 3;

  while (games.length < numberofGames) {
    const blankGame = new Game('', 0, '', 0, Date.now, games.length);
    games.push(blankGame);
  }

  const [data, setData] = useState([]);
  const [url, setUrl] = useState('');

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
            key: games.length
          };
          setGames(games => [...games, game]);
        }}
      >
        Add Game
      </Button>

      {console.log(games)}

      {games.map((game) => (
        <GameInput updateAllGames={setGames} thisGame={game} Game={Game} key={game.key} />
      ))}

      <Button>
        Submit
      </Button>
    </div>
  )
}

export default CreateGames;