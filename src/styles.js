import {createTheme} from "@mui/material";

export const theme = createTheme({
    palette: {
        background: {
            default: "#fff",
            first: "#f3f3f3"
        },
        primary: {
            main: "#67f854"
        }
    },
    components: {
        MuiInputLabel: {
            styleOverrides: {
                asterisk: {
                    display: 'none',
                },
            },
        },
    },
});

export default theme;
