import {Button, Dialog, DialogTitle, DialogContent, TextField, DialogActions} from '@mui/material';
import React, {useState} from "react";
import {mainUrl} from "../../index";
import Container from '@mui/material/Container';
import {styled} from "@mui/material/styles";

const CustomizedButton = styled(Button)`
    text-transform: none;

    &:hover {
        border-bottom-width: 2px;
        border-left-width: 0;
        border-top-width: 0;
        border-right-width: 0;
    }
`;

function ParameterDialog(props) {
    const [newParameterName, setNewParameterName] = useState('');
    const [open, setOpen] = useState(false);

    const handleDialogOpen = () => {
        setOpen(true);
    };

    const handleDialogClose = () => {
        setOpen(false);
        setNewParameterName('');
    };

    return (
        <>
            <CustomizedButton
                variant="outlined"
                size="small"
                sx={{
                    mt: '0px',
                    ml: '110px',
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
                создать новый параметр
            </CustomizedButton>
            <Dialog open={open} onClose={handleDialogClose}>
                <DialogTitle>Создать новый параметр</DialogTitle>
                <DialogContent>
                    <TextField
                        label="Название параметра"
                        value={newParameterName}
                        onChange={(e) => setNewParameterName(e.target.value)}
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDialogClose}>Отмена</Button>
                    {/*<Button onClick={handleCreateParameter} color="primary">*/}
                    {/*    Создать*/}
                    {/*</Button>*/}
                    <Container>
                        <Button type="submit">Создать</Button>
                    </Container>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default ParameterDialog;
