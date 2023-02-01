import React, { useState } from 'react'
import TeamSelect from './TeamSelect';
import GameNameSelect from './GameNameSelect';
import { TextField, Button } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

function GameInput(props) {

    const handleScoreChange = (event) => {
        if(event.target.id = 'home-score'){
            props.thisGame.homeScore = event.target.value;
        }else{
            props.thisGame.awayScore = event.target.value;
        }
        props.handleGameEdit(props.thisGame);
    }

    return (
        <div style={{'display':'flex', 'padding': '10px', margin: '10px'}} data-id={props.thisGame.key}>
            <div>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                        label={"DatePicker" + props.thisGame.key}
                        value={props.thisGame.date}
                        onChange={(newDate) => {
                            props.thisGame.date = newDate
                            props.handleGameEdit(props.thisGame)
                        }}
                        renderInput={(params) => <TextField {...params} />}
                    />
                </LocalizationProvider>
            </div>
            <div align="right">
                <TeamSelect teamType="Home"handleGameEdit={props.handleGameEdit} thisGame={props.thisGame}/>
            </div>
            <div align="right">
                <TextField
                    id="home-score"
                    label="Home Score"
                    type="number"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    onChange={handleScoreChange}
                />
            </div>
            <div align="right">
                <TeamSelect teamType="Away" handleGameEdit={props.handleGameEdit} thisGame={props.thisGame}/>
            </div>
            <div align="right">
                <TextField
                    id="away-score"
                    label="Away Score"
                    type="number"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    onChange={handleScoreChange}
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