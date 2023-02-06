import React, { useEffect, useState } from 'react'
import { FormControl, InputLabel } from '@mui/material';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

function NonFBSTeamSelect(props){

    const [error, setError] = useState(null);
    const [nonFBSteamNames, setnonFBSteamNames] = useState([]);
    const [selectedTeam, setSelectedTeam] = useState([]);

    const handleChange = (SelectChangeEvent) => {
        setSelectedTeam(SelectChangeEvent.target.value);
        //assume the team is the away team, and a team id of 0 for non FBS teams
        props.thisGame.awayTeam = 0;
        props.thisGame.awayTeamName = SelectChangeEvent.target.textContent;
       props.handleGameEdit(props.thisGame);
    };

    useEffect(() => {
        //fetch nonFBS team names
        fetch("https://localhost:44363/api/TeamsAPI/ListTeamNames")
        .then((response) => {
                return response.json();
            }
            )
        .then(
            (result) => {
                setnonFBSteamNames(result);
            },
            (error) => {
                setError(error);
            }
        )
    }, [])

    return(
        <div>
            <FormControl style={{minWidth: 200}}>
                <InputLabel></InputLabel>
                <Autocomplete
                disablePortal
                id="combo-box-for-nonIA-teams"
                options={nonFBSteamNames}
                sx={{ width: 300 }}
                renderInput={(params) => <TextField {...params} label="Team Name"  />}
                onChange={(event, newValue) => {
                    setSelectedTeam(newValue);
                    handleChange(event);
                  }}
                />
                </FormControl>
        </div>
    );
}

export default NonFBSTeamSelect;