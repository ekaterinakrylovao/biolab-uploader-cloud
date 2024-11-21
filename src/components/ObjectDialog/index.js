import React, {useState} from 'react';
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, TextField} from '@mui/material';
import {mainUrl} from "../../index";
import Container from '@mui/material/Container';
import {styled} from "@mui/material/styles";
import Box from "@mui/material/Box";
import { CustomizedTextField, CustomizedButton } from "../../pages/UploadFiles/styles";

function ObjectDialog({objects, setObjects}) {
    const [newObjectName, setNewObjectName] = useState('');
    const [open, setOpen] = useState(false);

    const handleDialogOpen = () => {
        setOpen(true);
    };

    const handleDialogClose = () => {
        setOpen(false);
        setNewObjectName('');
    };

    return (
        <>
            <CustomizedButton
                variant="outlined"
                size="small"
                sx={{
                    mt: '0px',
                    ml: '120px',
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
                создать новый объект
            </CustomizedButton>
            <Dialog open={open} onClose={handleDialogClose}>
                <DialogTitle align="center" sx={{
                    color: "#000"
                }}>Создать новый объект</DialogTitle>
                <DialogContent sx={{ py: '5px !important', mb: '0px' }}>
                    <Box>
                    <CustomizedTextField
                        autoFocus
                        label="Название объекта"
                        value={newObjectName}
                        onChange={(e) => setNewObjectName(e.target.value)}
                        fullWidth
                    />
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Grid container direction="column" sx={{m: '0px'}}>
                        <Grid item sx={{ display: 'flex', justifyContent: 'center' }}>
                            <Button type="submit" variant="contained" sx={{ fontWeight: 'bold', mt: '8px' }}>
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

export default ObjectDialog;
