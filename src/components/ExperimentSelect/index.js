import {Autocomplete, FormControl, InputLabel, MenuItem, Select, TextField, Typography} from "@mui/material";
import React from "react";
import { styled } from '@mui/material/styles';
import { CustomizedAutocomplete } from "../../pages/UploadFiles/styles";

function ExperimentSelect({ experiments, selectedExperiment, setSelectedExperiment }) {
    const handleExperimentChange = (event, newValue) => {
        setSelectedExperiment(newValue);
    };

    return (
        <>
            <CustomizedAutocomplete
                sx={{ ml: '64px', mt: '35px' }}
                options={experiments}
                getOptionLabel={(option) => option.experiment_name} // Укажите правильное свойство для отображения
                value={selectedExperiment || null}
                onChange={handleExperimentChange}
                renderInput={(params) => <TextField {...params} label="Эксперимент" variant="outlined" />}
            />
        </>
    );
}

export default ExperimentSelect;
