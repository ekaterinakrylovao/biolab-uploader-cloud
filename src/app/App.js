import {Route, Routes} from 'react-router-dom'
import UploadFiles from "../pages/UploadFiles";
import ProjectsPage from "../pages/ProjectsPage";
import ExperimentPage from "../pages/ExperimentsPage";
import MetadataPage from "../pages/MetadataPage";
import Header from "../components/Header";
import LoginForm from "../components/LoginForm";
import { ActivePageProvider } from './ActivePageContext';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useActivePage} from './ActivePageContext';
import { Container } from '@mui/material';

const App = () => {
    const { activePage, setActivePage } = useActivePage();
    const location = useLocation();
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const path = location.pathname;
        setActivePage(path);
    }, [location.pathname, setActivePage]);

    const handleLogin = () => {
        setIsAuthenticated(true);
    };

    return (
        <>
            <Header />
            <Container
                maxWidth="xl"
                sx={{
                    padding: '68px 0px 63px 0px !important'
                }}
            >
                {isAuthenticated ? (
                    <Routes>
                        <Route path="/upload" element={<UploadFiles />} />
                        <Route path="/projects" element={<ProjectsPage />} />
                        {/*<Route path="/projects/:projectId" element={<ExperimentPage />} />*/}
                        {/*<Route path="/experiments/:experimentId" element={<MetadataPage />} />*/}
                    </Routes>
                ) : (
                    <LoginForm onLogin={handleLogin} />
                )}
            </Container>
        </>
    )
}
export default App;
