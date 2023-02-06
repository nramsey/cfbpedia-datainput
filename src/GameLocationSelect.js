import React, { useEffect, useState } from 'react'
import { FormControl, InputLabel} from '@mui/material';
import handleChange from 'react'
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

function GameLocationSelect(props){

    const [error, setError] = useState(null);
    const [gameLocations, setGameLocations] = useState([]);
    const [selectedLocation, setSelectedLocation] = useState('');

    const handleChange = (SelectChangeEvent) => {
        props.thisGame.specialLocation = SelectChangeEvent.target.textContent;
        props.handleGameEdit(props.thisGame);
    };
    
    useEffect(() => {
        fetch("https://localhost:44363/api/GamesAPI/ListGameLocations")
        .then((response) => {
                return response.json();
            }
            )
        .then(
            (result) => {
                setGameLocations(result);
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
                options={gameLocations}
                sx={{ width: 300 }}
                renderInput={(params) => <TextField {...params} label="Special Location"  />}
                onChange={(event, newValue) => {
                    setSelectedLocation(newValue);
                    handleChange(event);
                  }}
                />
                </FormControl>
        </div>
    );
}

export default GameLocationSelect;