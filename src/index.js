import React, {StrictMode} from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter} from 'react-router-dom';
import App from './app/App';
import { ActivePageProvider } from './app/ActivePageContext';
import {CssBaseline, ThemeProvider} from "@mui/material";

import theme from './styles.js';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <ThemeProvider theme={theme}>
        <CssBaseline/>
        <ActivePageProvider>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
        </ActivePageProvider>
    </ThemeProvider>
);

export const mainUrl = "http://localhost:3001";
