import React, { useEffect, useState } from 'react'
import GameInput from './GameInput';
import { Button } from '@mui/material';
import dayjs from 'dayjs'

function CreateGames() {

  //data structure to instantiate a new game
  const Game = (TeamId, PointsFor, OpponentTeamID, OpponentName, PointsAgainst, Date, specialLocation, gameName, key, isValid) => {
    return {
      TeamId: TeamId,
      PointsFor: PointsFor,
      OpponentTeamID: OpponentTeamID,
      OpponentName: OpponentName,
      PointsAgainst: PointsAgainst,
      GameDate: Date,
      specialLocation: specialLocation,
      gameName: gameName,
      //key: key,
      isValid: isValid
    }
  }

  //Add a blank game to the state, pass in 0 to create a game with a non FBS opponent
  const AddBlankGame = (OpponentTeamID) => {
    const game = {
      TeamId: '',
      PointsFor: 0,
      OpponentTeamID: OpponentTeamID,
      OpponentName: '',
      PointsAgainst: 0,
      specialLocation: '',
      gameName: '',
      //key: gameCount,
      isValid: false,
      complete: false,
      error: '',
      GameDate: dayjs().startOf('day')
    };
    setGames(games => [...games, game]);
    //set game count so we can always give the game a unique key in case a record is removed
    setGameCount(gameCount => gameCount + 1)
  }
  
  const [games, setGames] = useState([]);
  const [gameCount, setGameCount] = useState(0);
  const [error, setError] = useState('');

  //put in a blank default game
  if(games.length == 0) {
    AddBlankGame('');
  }

  //this function will be used by the gameinput component to update the state of the parent
  const handleGameEdit = (editedGame) => {
    const gameId = editedGame.key
    //copy the state array into a new array
    const newGamesArray = [...games];

    //make sure at least the teams are set
    if(!editedGame.TeamId || !editedGame.OpponentTeamID){
      editedGame.isValid = false;
    }else{
      editedGame.isValid = true;
    }
    //update the copied state array with the new game information
    newGamesArray[gameId] = editedGame;
    //update the state
    setGames(newGamesArray);
  }

  //this funciton will be used by the gameinput component to remove a game for the parent
  const handleGameRemoval = (remotedGamed) => {
    const gameId = remotedGamed.key
    //copy the state array into a new array
    const newGamesArray = [...games];

    //update the copied state array with the new game information
    newGamesArray[gameId] = remotedGamed;
    //update the state
    setGames(newGamesArray);
  }

  //posts the games the the create games endpoint
  const handleSubmit = async (event) => {
    event.preventDefault();
    //don't submit games that have already been completed
    games.filter(game => game.complete === true);
    games.map(game => (
      fetch("https://localhost:44363/api/GamesAPI/", {
          method: 'POST',
          body: JSON.stringify(game),
          headers: {
            'Content-Type': 'application/json'
          }}
          )
        .then((response) => {
                return response.json();
            }
            )
        .then(
            (result) => {
                //set the game to complete
                game.complete = true;
                handleGameEdit(game);
            },
            (error) => {
              //set error on game
              game.error = error;
              handleGameEdit(game);
            }
        )
    ))
  }

  return (
    <div>
      
      <Button
        onClick={() => {
          AddBlankGame('')
        }}
      >
        Add Regular Game
      </Button>

      <Button
        onClick={() => {
          AddBlankGame(0)
        }}
      >
        Add 🧁 Game
      </Button>

      {games.map((game) => (
        <GameInput updateAllGames={setGames} thisGame={game} Game={Game} key={game.key} handleGameEdit={handleGameEdit}/>
      ))}

      <Button
        onClick={(event) => {
          handleSubmit(event);
        }}>
        Submit All Games for Creation
      </Button>
    </div>
  )
}

export default CreateGames;