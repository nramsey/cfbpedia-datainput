import React, { useState } from 'react'
import TeamSelect from './TeamSelect';
import GameNameSelect from './GameNameSelect';
import { TextField, Button } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

function GameInput(props) {

    //data structure to instantiate a new game
    /*const Game = (homeTeam, homeScore, awayTeam, awayScore, Date, key) => {
        return {
            homeTeam: homeTeam,
            homeScore: homeScore,
            awayTeam: awayTeam,
            awayScore: awayScore,
            Date: Date,
            key: key
        }
    }*/

    const [gameState, setGame] = useState(props.Game);
    return (
        <div style={{'display':'flex', 'padding': '10px', margin: '10px'}}>
            {console.log(props.thisGame)}
            <div>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                        label={"DatePicker" + props.thisGame.key}
                        value={props.thisGame.date}
                        onChange={(newDate) => {
                            setGame(
                                gameState => 
                                gameState.date = newDate
                                )
                        }}
                        renderInput={(params) => <TextField {...params} />}
                    />
                </LocalizationProvider>
            </div>
            <div align="right">
                <TeamSelect teamType="Home" setTeamState={setGame}/>
            </div>
            <div align="right">
                <TextField
                    id="home-score"
                    label="Home Score"
                    type="number"
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
            </div>
            <div align="right">
                <TeamSelect teamType="Away" setTeamState={setGame}/>
            </div>
            <div align="right">
                <TextField
                    id="away-score"
                    label="Away Score"
                    type="number"
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
            </div>
            <div align="right">
                <GameNameSelect />
            </div>
            <div>
                <Button
                    onClick={() => {
                        props.updateAllGames(games => games.filter(game => game !== props.thisGame));
                    }}
                >
                    Remove Game ID {props.thisGame.key}
                </Button>
            </div>
        </div>
    )
}

export default GameInput;