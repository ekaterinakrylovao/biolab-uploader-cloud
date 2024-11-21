import React, { useState } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { SimpleTreeView } from '@mui/x-tree-view/SimpleTreeView';
import { TreeItem } from '@mui/x-tree-view/TreeItem';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import {Container} from "@mui/material";
import './styles.css';
import "../../styles.css"
import Box from "@mui/material/Box";

function ProjectsPage() {
    // Моковые значения для проектов
    const mockProjects = [
        { id: "project_1", name: "SpineTool_Dendritic spines" },
        { id: "project_2", name: "Project 2" },
    ];

    // Моковые значения для экспериментов
    const mockExperiments = [
        { id: "experiment_1", projectId: "project_1", name: "Wt vs Ab" },
        { id: "experiment_2", projectId: "project_1", name: "Wt and Ab" },
        { id: "experiment_3", projectId: "project_1", name: "WT" },
        { id: "experiment_4", projectId: "project_1", name: "Ab" },
        { id: "experiment_5", projectId: "project_2", name: "Experiment 1" },
    ];

    // Моковые значения для опытов
    const mockTrials = [
        { id: "trial_1", experimentId: "experiment_1", name: "WT VS AB" },
        { id: "trial_2", experimentId: "experiment_1", name: "WT" },
        { id: "trial_3", experimentId: "experiment_2", name: "1" },
        { id: "trial_4", experimentId: "experiment_2", name: "2" },
        { id: "trial_5", experimentId: "experiment_2", name: "3" },
        { id: "trial_6", experimentId: "experiment_3", name: "1" },
        { id: "trial_7", experimentId: "experiment_3", name: "2" },
        { id: "trial_8", experimentId: "experiment_3", name: "3-2" },
        { id: "trial_9", experimentId: "experiment_4", name: "AB18" },
        { id: "trial_10", experimentId: "experiment_4", name: "AB20" },
    ];

    // Состояние для открытия/закрытия диалогового окна опыта
    const [openDialog, setOpenDialog] = useState(false);
    // Выбранный опыт
    const [selectedTrial, setSelectedTrial] = useState(null);

    const handleTrialClick = (trial) => {
        setSelectedTrial(trial);
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    return (
        <>
            <Box
                 sx={{
                     mt: '40px',
                     width: '98vw'
                 }}>
            <Container maxWidth="md"
            >
            <SimpleTreeView sx={{ml: '30px'}}
                aria-label="file system navigator"
                defaultCollapseIcon={<ExpandMoreIcon />}
                defaultExpandIcon={<ChevronRightIcon />}
            >
                {mockProjects.map(project => (
                    <TreeItem key={project.id} itemId={project.id} label={<span style={{ fontSize: '17.5px', fontWeight: "bold" }}>{project.name}</span>}>
                        {mockExperiments
                            .filter(experiment => experiment.projectId === project.id)
                            .map(experiment => (
                                <TreeItem key={experiment.id} itemId={experiment.id} label={<span style={{ fontSize: '17px' }}>{experiment.name}</span>} title="Эксперимент">
                                    {mockTrials
                                        .filter(trial => trial.experimentId === experiment.id)
                                        .map(trial => (
                                            <TreeItem key={trial.id} itemId={trial.id} label={<span style={{ fontSize: '15px' }}>{trial.name}</span>} title="Опыт" onClick={() => handleTrialClick(trial)} />
                                        ))}
                                </TreeItem>
                            ))}
                    </TreeItem>
                ))}
            </SimpleTreeView>
            <Dialog open={openDialog} onClose={handleCloseDialog}>
                <DialogTitle>{selectedTrial ? selectedTrial.name : ""}</DialogTitle>
                <DialogContent>
                    {/* Здесь можно добавить информацию о выбранном опыте */}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog}>Close</Button>
                </DialogActions>
            </Dialog>
            </Container>
            </Box>
        </>
    );
}

export default ProjectsPage;
