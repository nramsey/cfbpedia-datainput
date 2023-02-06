import React, { useEffect, useState } from 'react'
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

function TeamSelect(props){

    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [teams, setTeams] = useState([]);
    const [nonFBSteamNames, setnonFBSteamNames] = useState([]);
    const [selectedTeam, setSelectedTeam] = useState('');


    const handleChange = (SelectChangeEvent) => {
        setSelectedTeam(SelectChangeEvent.target.value);
        if(props.teamType == 'Home'){
            props.thisGame.homeTeam = SelectChangeEvent.target.value;
        }else{
            props.thisGame.awayTeam = SelectChangeEvent.target.value;
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
    );
}

export default TeamSelect;