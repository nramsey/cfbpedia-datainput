import React, { useEffect, useState } from 'react'
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

function TeamSelect(props){

    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [teams, setTeams] = useState([]);
    const [selectedTeam, setSelectedTeam] = useState('');

    const handleChange = (SelectChangeEvent) => {
        setSelectedTeam(SelectChangeEvent.target.value);
        if(props.teamType == 'Home'){
            props.thisGame.TeamId = SelectChangeEvent.target.value;
        }else{
            props.thisGame.OpponentTeamID = SelectChangeEvent.target.value;
        }
       props.handleGameEdit(props.thisGame);
    };

    useEffect(() => {
        fetch("https://localhost:44363/api/TeamsAPI")
        .then((response) => {
                return response.json();
            }
            )
        .then(
            (result) => {
                setIsLoaded(true);
                setTeams(result);
            },
            (error) => {
                setIsLoaded(true);
                setError(error);
            }
        );
    }, [])

    return(
        <div>
            <FormControl style={{minWidth: 200}}>
                <InputLabel id="demo-simple-select-label">{props.teamType} Team</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={selectedTeam}
                    label={props.teamType}
                    onChange={handleChange}
                >
                    {teams.map(team => 
                            <MenuItem key={team.id} value={team.id}>
                                <img src={"https://cfbpedia.com/images/logos/small/" + team.logo}/> {team.schoolName} {team.nickName}
                                </MenuItem>
                        )
                    }
                </Select>
                </FormControl>
        </div>
        /*<div>
            <FormControl style={{minWidth: 200}}>
                    <InputLabel></InputLabel>
                    <Autocomplete
                    disablePortal
                    id="combo-box-for-FBS-teams"
                    options={teams}
                    sx={{ width: 300 }}
                    renderInput={(params) => <TextField {...params} label="Team Name"  />}
                    onChange={(event, newValue) => {
                        setSelectedTeam(newValue);
                        handleChange(event);
                      }}
                    />
            </FormControl>
        </div>*/
    );
}

export default TeamSelect;