import React, { useState } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import {styled} from "@mui/material/styles";
import {Grid, Typography} from "@mui/material";
import { CustomizedAutocomplete, CustomizedTextField, CustomizedButton } from "../../pages/UploadFiles/styles";
import {green} from "@mui/material/colors";
import {mainUrl} from "../../index";

function ParameterSelect() {
    const [tags, setTags] = useState([]);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [tagName, setTagName] = useState('');
    const [dialogErrorMessage, setDialogErrorMessage] = useState('');
    const [autocompleteErrorMessage, setAutocompleteErrorMessage] = useState('');
    const [dialogErrorTimeout, setDialogErrorTimeout] = useState(null);
    const [autocompleteErrorTimeout, setAutocompleteErrorTimeout] = useState(null);

    const options = [
        { label: 'Option 1', value: 'option1' },
        { label: 'Option 2', value: 'option2' },
        { label: 'Option 3', value: 'option3' },
    ];

    const handleAddTag = () => {
        setDialogOpen(true);
        setDialogErrorMessage('');
    };

    const handleDialogClose = () => {
        setDialogOpen(false);
    };

    const handleConfirmAddTag = () => {
        if (tagName.trim() !== '') {
            const allTags = [...tags, ...options];
            if (allTags.some((tag) => tag.label === tagName.trim())) {
                setDialogErrorMessage(`Tag "${tagName.trim()}" already exists.`);
                setDialogErrorTimeout(setTimeout(() => {
                    setDialogErrorMessage('');
                }, 5000));
            } else {
                setTags([...tags, { label: tagName.trim(), value: '' }]);
                setDialogOpen(false);
                setTagName('');
                setDialogErrorMessage('');
            }
        }
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleConfirmAddTag();
        }
    };

    const handleDeleteTag = (index) => {
        const newTags = [...tags];
        newTags.splice(index, 1);
        setTags(newTags);
    };

    const handleCloseErrorMessage = () => {
        setAutocompleteErrorMessage('');
    };

    const handleCloseDialogErrorMessage=()=> {
        setDialogErrorMessage('');
    }

    return (
        <div>
            <CustomizedAutocomplete
                sx={{ml: '110px', mt: '35px'}}
                options={options}
                getOptionLabel={(option) => option.label}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label="Параметры"
                    />
                )}
                onChange={(event, value) => {
                    if (value) {
                        if (tags.some((tag) => tag.label === value.label)) {
                            setAutocompleteErrorMessage(`Tag "${value.label}" already exists.`);
                            setAutocompleteErrorTimeout(setTimeout(() => {
                                setAutocompleteErrorMessage('');
                            }, 5000));
                        } else {
                            setTags([...tags, { label: value.label, value: '' }]);
                            setAutocompleteErrorMessage('');
                        }
                    }
                }}
            />
            {autocompleteErrorMessage && (
                <Alert
                    severity="error"
                    sx={{ ml: '100px', marginTop: '8px', width: '500px', height: '45px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
                    action={
                        <IconButton
                            aria-label="close"
                            color="inherit"
                            size="small"
                            onClick={handleCloseErrorMessage}
                        >
                            <CloseIcon fontSize="inherit" />
                        </IconButton>
                    }
                >
                    {autocompleteErrorMessage}
                </Alert>
            )}
            <CustomizedButton
                variant="outlined"
                size="small"
                sx={{
                    mt: '0px',
                    ml: '120px',
                    mb: '15px',
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
                onClick={handleAddTag}
            >
                создать новый параметр
            </CustomizedButton>
            {/*<IconButton onClick={handleAddTag} aria-label="Add">*/}
            {/*    <AddIcon />*/}
            {/*</IconButton>*/}
            <Dialog
                open={dialogOpen}
                onClose={handleDialogClose}
                onKeyDown={(event) => {
                    if (event.key === 'Enter') {
                        handleConfirmAddTag();
                    }
                }}
            >
                <DialogTitle align="center">Создать новый параметр</DialogTitle>
                <DialogContent sx={{pb: '5px'}}>
                    <CustomizedTextField
                        autoFocus
                        margin="dense"
                        label="Параметр"
                        fullWidth
                        value={tagName}
                        onChange={(e) => setTagName(e.target.value)}
                        onKeyDown={handleKeyDown}
                    />
                    {dialogErrorMessage && (
                        <Alert
                            severity="error"
                            sx={{ marginTop: '3px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
                            action={
                                <IconButton
                                    aria-label="close"
                                    color="inherit"
                                    size="small"
                                    onClick={handleCloseDialogErrorMessage}
                                >
                                    <CloseIcon fontSize="inherit" />
                                </IconButton>
                            }
                        >
                            {dialogErrorMessage}
                        </Alert>
                    )}
                </DialogContent>
                <DialogActions>
                    <Grid container direction="column" sx={{m: '0px'}}>
                        <Grid item sx={{ display: 'flex', justifyContent: 'center' }}>
                            <Button
                                onClick={handleConfirmAddTag} // Вызываем функцию при нажатии на кнопку "Создать"
                                type="submit" // Делаем кнопку типа "submit", чтобы она сработала при нажатии Enter в форме
                                variant="contained"
                                sx={{ fontWeight: 'bold' }}
                            >
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
            <div>
                {tags.map((tag, index) => (
                    <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '12px' }}>
                        <span style={{ marginLeft: '110px', flex: '0 0 auto', minWidth: '250px' }}>{tag.label}</span>
                        <TextField
                            variant="outlined"
                            size="small"
                            label="Значение"
                            value={tag.value}
                            sx={{ marginLeft: 2 }}
                            onChange={(e) => {
                                const newTags = [...tags];
                                newTags[index].value = e.target.value;
                                setTags(newTags);
                            }}
                        />
                        <IconButton onClick={() => handleDeleteTag(index)} aria-label="Delete">
                            <CloseIcon />
                        </IconButton>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ParameterSelect;
