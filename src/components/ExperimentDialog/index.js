import {
    Autocomplete,
    Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, Grid, InputLabel,
    MenuItem, Select, TextField, Typography
} from '@mui/material';
import React, {useState} from "react";
import {mainUrl} from "../../index";
import Container from '@mui/material/Container';
import {styled} from "@mui/material/styles";
import Box from "@mui/material/Box";
import { CustomizedTextField, CustomizedAutocomplete, CustomizedButton } from "../../pages/UploadFiles/styles";

function ExperimentDialog({
                              experiments,
                              setExperiments,
                              projects,
                              selectedNewExpProjectId,
                              setSelectedNewExpProjectId
                          }) {
    const [newExperimentName, setNewExperimentName] = useState('');
    const [newExperimentDescription, setNewExperimentDescription] = useState('');
    const [open, setOpen] = useState(false);

    const handleDialogOpen = () => {
        setOpen(true);
    };

    const handleDialogClose = () => {
        setOpen(false);
        setNewExperimentName('');
        setNewExperimentDescription('');
        setSelectedNewExpProjectId('');
    };

    const handleCreateExperiment = async () => {
        try {
            console.log(selectedNewExpProjectId)
            const projectId = selectedNewExpProjectId.project_id;
            // Отправка запроса на бэкенд
            const response = await fetch(`${mainUrl}/experiments_by`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    experiment_name: newExperimentName,
                    experiment_description: newExperimentDescription,
                    experiment_project_id: projectId
                })

            });

            if (!response.ok) {
                throw new Error('Ошибка при создании параметра');
            }

            // Получение данных от бэкенда
            const data = await response.json();

            const newExperiment = {
                experiment_id: data.experiment_id,
                experiment_name: data.experiment_name,
                experiment_description: data.experiment_description,
                experiment_project_id: data.experiment_project_id
            };
            setExperiments([...experiments, newExperiment]);

            // Обработка создания эксперимента
            // ...
            handleDialogClose();
        } catch (error) {
            console.error('Ошибка:', error);
            // Обработка ошибки (показать сообщение пользователю и т.д.)
        }
    };

    return (
        <>
            <CustomizedButton
                variant="outlined"
                size="small"
                sx={{
                    mt: '0px',
                    ml: '74px',
                    paddingTop: '1px',
                    paddingBottom: '0px',
                    paddingX: '4px',
                    borderRadius: 0,
                    borderLeftWidth: 0,
                    borderTopWidth: 0,
                    borderRightWidth: 0,
                    borderBottomWidth: '2px',
                    fontSize: 14,
                    fontWeight: 500
                }}
                onClick={handleDialogOpen}
            >
                создать новый эксперимент
            </CustomizedButton>
            <Dialog open={open} onClose={handleDialogClose}>
                <DialogTitle align="center" sx={{
                    color: "#000",
                    pb: '9px'
                }}>Создать новый эксперимент</DialogTitle>
                <DialogContent sx={{ '& > *': { my: '15px', mb: '0px' }, paddingBottom: '5px' }}>
                    <Box>
                        <CustomizedTextField
                            label="Название эксперимента"
                            value={newExperimentName}
                            onChange={(e) => setNewExperimentName(e.target.value)}
                            fullWidth
                        />
                    </Box>
                    <Box>
                        <CustomizedTextField
                            label="Описание эксперимента"
                            value={newExperimentDescription}
                            onChange={(e) => setNewExperimentDescription(e.target.value)}
                            fullWidth
                        />
                    </Box>
                    <Box sx={{mt: '35px'}}>
                        <CustomizedAutocomplete
                            options={projects}
                            getOptionLabel={(option) => option.project_name}
                            value={selectedNewExpProjectId || null}
                            onChange={(event, newValue) => setSelectedNewExpProjectId(newValue)}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    variant="outlined"
                                    label="Проект"
                                />
                            )}
                        />
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Grid container direction="column" sx={{m: '0px'}}>
                        <Grid item sx={{ display: 'flex', justifyContent: 'center' }}>
                            <Button onClick={handleCreateExperiment} type="submit" variant="contained" sx={{ fontWeight: 'bold', mt: '8px' }}>
                                Создать
                            </Button>
                        </Grid>
                        <Grid item sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <Button onClick={handleDialogClose} variant="outlined" size="small"
                                    sx={{
                                        fontWeight: 'bold',
                                        mr: '16px',
                                        mb: '4px'
                                    }}
                            >
                                Отмена
                            </Button>
                        </Grid>
                    </Grid>
                </DialogActions>

            </Dialog>
        </>
    );
}

export default ExperimentDialog;
