import React, {useState} from 'react';
import {Button, Dialog, DialogTitle, DialogContent, TextField, DialogActions, Autocomplete, Grid} from '@mui/material';
import {mainUrl} from "../../index";
import Container from '@mui/material/Container';
import { styled } from '@mui/material/styles';
import Box from "@mui/material/Box";
import { CustomizedTextField, CustomizedButton } from "../../pages/UploadFiles/styles";

function ProjectDialog({projects, setProjects}) {
    const [newProjectName, setNewProjectName] = useState('');
    const [newProjectDescription, setNewProjectDescription] = useState('');
    const [newProjectStatus, setNewProjectStatus] = useState('');
    const [open, setOpen] = useState(false);

    const handleDialogOpen = () => {
        setOpen(true);
    };

    const handleDialogClose = () => {
        setOpen(false);
        setNewProjectName('');
        setNewProjectDescription('');
        setNewProjectStatus('');
    };

    const handleCreateProject = async () => {
        try {
            const response = await fetch(`${mainUrl}/projects`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    project_name: newProjectName,
                    project_description: newProjectDescription,
                    status: newProjectStatus
                })

            });

            if (!response.ok) {
                throw new Error('Ошибка при создании параметра');
            }

            // Получение данных от бэкенда
            const data = await response.json();

            const newProject = {
                project_id: data.project_id,
                project_name: data.project_name,
                project_description: data.project_description,
                status: data.status
            };
            setProjects([...projects, newProject]);
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
                    ml: '54px',
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
                создать новый проект
            </CustomizedButton>
            <Dialog open={open} onClose={handleDialogClose}>
                <DialogTitle align="center" sx={{
                    color: "#000",
                    pb: '9px'
                }}>Создать новый проект</DialogTitle>
                <DialogContent sx={{ '& > *': { my: '15px', mb: '0px' }, paddingBottom: '5px' }}>
                    <Box>
                    <CustomizedTextField
                        label="Название проекта"
                        value={newProjectName}
                        onChange={(e) => setNewProjectName(e.target.value)}
                        fullWidth
                    />
                    </Box>
                    <Box>
                    <CustomizedTextField
                        label="Описание проекта"
                        value={newProjectDescription}
                        onChange={(e) => setNewProjectDescription(e.target.value)}
                        fullWidth
                    />
                    </Box>
                    <Box>
                    <CustomizedTextField
                        label="Текущий статус проекта"
                        value={newProjectStatus}
                        onChange={(e) => setNewProjectStatus(e.target.value)}
                        fullWidth
                    />
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Grid container direction="column" sx={{m: '0px'}}>
                        <Grid item sx={{ display: 'flex', justifyContent: 'center' }}>
                            <Button onClick={handleCreateProject} type="submit" variant="contained" sx={{ fontWeight: 'bold', mt: '8px' }}>
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

export default ProjectDialog;
