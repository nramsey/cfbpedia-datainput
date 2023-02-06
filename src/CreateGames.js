import React, { useState } from 'react'
import GameInput from './GameInput';
import { Button } from '@mui/material';
import { click } from '@testing-library/user-event/dist/click';

function CreateGames() {

  //data structure to instantiate a new game
  const Game = (homeTeam, homeScore, awayTeam, awayScore, Date, specialLocation, gameName, key, isValid) => {
    return {
      homeTeam: homeTeam,
      homeScore: homeScore,
      awayTeam: awayTeam,
      awayScore: awayScore,
      date: Date,
      specialLocation: specialLocation,
      gameName: gameName,
      key: key,
      isValid: isValid
    }
  }

  const [games, setGames] = useState([]);
  const [gameCount, setGameCount] = useState(0);

  //put in a blank default game
  if(games.length == 0) {
    const blankGame = new Game(
      '', //homeTeamId
      0, //homeTeamScore
      '', //awayTeamId
      0, //awayTeamScore
      Date.now, 
      '', //game special location
      '', //gamename
      games.length, //gamekey 
      false //isgamevalid
      );
    games.push(blankGame);
  }

  const [data, setData] = useState([]);
  const [url, setUrl] = useState('');

  //this function will be used by the gameinput component to update the state of the parent
  const handleGameEdit = (editedGame) => {
    const gameId = editedGame.key
    //copy the state array into a new array
    const newGamesArray = [...games];

    //make sure at least the teams are set
    if(!editedGame.homeTeam || !editedGame.awayTeam){
      editedGame.isValid = false;
    }else{
      editedGame.isValid = true;
    }
    //update the copied state array with the new game information
    newGamesArray[gameId] = editedGame;
    //update the state
    setGames(newGamesArray);
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
            awayTeamName: '',
            specialLocation: '',
            gameName: '',
            key: gameCount,
            isValid: false
          };
          setGames(games => [...games, game]);
          //set game count so we can always give the game a unique key in case a record is removed
          setGameCount(gameCount => gameCount + 1)
        }}
      >
        Add Regular Game
      </Button>

      <Button
        onClick={() => {
          const game = {
            homeTeam: '',
            homeScore: 0,
            awayTeam: 0,
            awayScore: 0,
            awayTeamName: '',
            specialLocation: '',
            gameName: '',
            key: gameCount,
            isValid: false
          };
          setGames(games => [...games, game]);
          //set game count so we can always give the game a unique key in case a record is removed
          setGameCount(gameCount => gameCount + 1)
        }}
      >
        Add 🧁 Game
      </Button>

      {games.map((game) => (
        <GameInput updateAllGames={setGames} thisGame={game} Game={Game} key={game.key} handleGameEdit={handleGameEdit}/>
      ))}

      <Button>
        Submit All Games for Creation
      </Button>
    </div>
  )
}

export default CreateGames;