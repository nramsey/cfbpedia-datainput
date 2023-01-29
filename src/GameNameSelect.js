import React, { useEffect, useState } from 'react'
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import handleChange from 'react'

function GameNameSelect(props){

    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [gameNames, setGameNames] = useState([]);
    const [selectedGameName, setSelectedGameName] = useState('');

    const handleChange = (SelectChangeEvent) => {
        setSelectedGameName(SelectChangeEvent.target.value);
    };
    
    useEffect(() => {
        fetch("https://localhost:44363/api/GamesAPI/ListGameNames")
        .then((response) => {
                return response.json();
            }
            )
        .then(
            (result) => {
                setIsLoaded(true);
                setGameNames(result);
            },
            (error) => {
                setIsLoaded(true);
                setError(error);
            }
        )
    }, [])

    return(
        <div>
            <FormControl style={{minWidth: 200}}>
                <InputLabel id="demo-simple-select-label">Game Name</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={selectedGameName}
                    label="Game Name"
                    onChange={handleChange}
                >
                    {gameNames.map(gameName => 
                            <MenuItem key={gameName} value={gameName}>
                                {gameName}
                            </MenuItem>
                        )
                    }

                </Select>
                </FormControl>
        </div>
    );
}

export default GameNameSelect;