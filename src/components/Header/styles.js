import {createTheme} from "@mui/material";

export const theme = createTheme({
    palette: {
        primary: {
            main: "#67f854"
        }
    }
});


const appBarPosition = {
    height: '68px',
    width: '100vw',
    position: 'fixed',
    left: 0,
    paddingRight: '0px !important'
};

const titleStyles= {
    color: "#000",
    fontFamily: 'Kanit',
    fontWeight: 900,
    fontSize: '27px',
    marginBottom: '-11px'
};

const buttonStyles = {
    color: "#000",
    textTransform: 'none',
    fontFamily: 'Inter',
    fontWeight: 600,
    fontSize: 18,
    height: 44,
    marginBottom: '-5px',
    alignItems: 'center',
    justifyContent: 'center',
    letterSpacing: '0px',
    padding: '11px 6px',
    borderRadius: '0px',
    borderBottom: 'none',
    '&:hover': {
        borderBottom: '2px solid var(--header-text)',
    }
};

export default theme;
export { buttonStyles, titleStyles, appBarPosition };
