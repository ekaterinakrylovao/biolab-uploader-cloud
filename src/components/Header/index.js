import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { useActivePage } from '../../app/ActivePageContext';
import {ThemeProvider} from "@mui/material";

import "../../styles.css"

import theme, { buttonStyles, titleStyles, appBarPosition } from './styles';

const pages = ['Products', 'Pricing', 'Blog'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

function Header() {
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const { activePage, setActivePage } = useActivePage();
    const [isPressed, setIsPressed] = React.useState(false);

    const handleClick = (page) => {
        setActivePage(page);
    };

    return (
        <ThemeProvider theme={theme}>
        <AppBar
            position="fixed"
            sx={{
                ...appBarPosition
            }}
        >
            <Box sx={{width: '98vw'}}>
            <Container maxWidth="md">
                <Toolbar disableGutters>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <img src="/img/logo.svg" alt="NL" style={{ width: '37px', height: '37px', marginRight: '2px' }}/>
                        <Box
                            sx={{
                                ...titleStyles
                        }}
                        >
                            neuroai-lab
                        </Box>
                    </Box>

                    <Box sx={{ display: { xs: 'none', sm: 'flex', md: 'flex' }, ml: 'auto' }}>
                        <Button
                            component={Link}
                            to="/upload"
                            onClick={() => handleClick('/upload')}
                            sx={{
                                ...buttonStyles,
                                width: 172,
                                borderBottom: activePage === '/upload' ? '2px solid var(--header-text)' : 'none'
                            }}
                        >
                            Загрузить файлы
                        </Button>
                        <Button
                            component={Link}
                            to="/projects"
                            onClick={() => handleClick('/projects')}
                            sx={{
                                ...buttonStyles,
                                width: 105,
                                ml: '10px',
                                borderBottom: activePage === '/projects' ? '2px solid var(--header-text)' : 'none'
                            }}
                        >
                            Проекты
                        </Button>
                    </Box>

                </Toolbar>
            </Container>
            </Box>
        </AppBar>
        </ThemeProvider>
    );
}

export default Header;
