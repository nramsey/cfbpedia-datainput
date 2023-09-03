import React, { useState } from 'react'
import TeamSelect from './TeamSelect';
import GameNameSelect from './GameNameSelect';
import NonFBSTeamSelect from './NonFBSTeamSelect'
import { TextField, Button, Icon } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import GameLocationSelect from './GameLocationSelect';
import dayjs from 'dayjs';

function GameInput(props) {

    const handleScoreChange = (event) => {
        if(event.target.id == 'home-score'){
            props.thisGame.PointsFor = event.target.value;
        }else{
            props.thisGame.PointsAgainst = event.target.value;
        }
        props.handleGameEdit(props.thisGame);
    }

    return (
        <div style={{'display':'flex', 'padding': '10px', margin: '10px'}} data-id={props.thisGame.key}>
            {
            /*display checkmark when game completed*/
            props.thisGame.complete === true 
                ? <span>✔️</span>
                : <span></span>
            }
            {
            /*display error if there is an error creating the game*/
            props.thisGame.error.length > 0
                ?<span style="color:red">props.thisGame.error</span>
                : <span></span>
            }
            <div>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                        label={"DatePicker" + props.thisGame.key}
                        value={props.thisGame.GameDate}
                        onChange={(newDate) => {
                            props.thisGame.GameDate = dayjs(newDate).startOf('day')
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
                {props.thisGame.OpponentTeamID !== 0 
                ? <TeamSelect teamType="Away" handleGameEdit={props.handleGameEdit} thisGame={props.thisGame}/>
                : <NonFBSTeamSelect handleGameEdit={props.handleGameEdit} thisGame={props.thisGame}/>
                }
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
                <GameNameSelect handleGameEdit={props.handleGameEdit} thisGame={props.thisGame}/>
            </div>
            <div align="right">
                <GameLocationSelect handleGameEdit={props.handleGameEdit} thisGame={props.thisGame}/>
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