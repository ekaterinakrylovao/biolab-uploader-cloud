import {Autocomplete, FormControl, InputLabel, MenuItem, Select, TextField, Typography} from "@mui/material";
import React from "react";
import { styled } from '@mui/material/styles';
import { CustomizedAutocomplete } from "../../pages/UploadFiles/styles";

function ObjectSelect({selectedObject, setSelectedObject, objects}) {
    const handleObjectChange = (event, newValue) => {
        setSelectedObject(newValue); // Устанавливаем выбранный объект
    };
    return (
        <>
            <CustomizedAutocomplete
                sx={{ml: '110px', mt: '48px'}}
                options={objects} // Передаем варианты для автозаполнения
                getOptionLabel={(option) => option.object_experiment_name} // Указываем, что использовать в качестве метки для вариантов
                value={selectedObject || null}
                onChange={handleObjectChange}
                renderInput={(params) => <TextField {...params} label="Объект эксперимента" variant="outlined" />}
            />
        </>
    )
}

export default ObjectSelect
