import {FormControl, InputLabel, MenuItem, Select, Autocomplete, Typography, TextField} from "@mui/material";
import {mainUrl} from "../../index";
import { styled } from '@mui/material/styles';
import { CustomizedAutocomplete } from "../../pages/UploadFiles/styles";

function ProjectSelect({
                           projects,
                           selectedProject,
                           setSelectedProject,
                           setExperiments,
                           setLoading,
                           setError,
                           setSelectedExperiment
                       }) {
    const handleProjectChange = (event, newValue) => {
        setSelectedProject(newValue);
        setSelectedExperiment(null);

        if (newValue) { // Проверяем, что выбран новый проект
            fetch(`${mainUrl}/experiments_by`, {
                method: 'GET',
                headers: { "Content-Type": "application/json" }
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    // Фильтровать эксперименты по experiment_project_id
                    const filteredExperiments = data.filter(experiment => experiment.experiment_project_id === newValue.project_id);
                    setExperiments(filteredExperiments);
                    setLoading(false);
                    console.log(filteredExperiments);
                })
                .catch(error => {
                    setError(error);
                    setLoading(false);
                });
        } else {
            setExperiments([]);
        }
    };

    return (
        <>
            <CustomizedAutocomplete
                sx={{ ml: '44px' }}
                options={projects}
                getOptionLabel={(option) => option.project_name}
                value={selectedProject}
                onChange={handleProjectChange}
                renderInput={(params) => <TextField {...params} label="Проект" variant="outlined" />}
            />
        </>
    );
}

export default ProjectSelect;
