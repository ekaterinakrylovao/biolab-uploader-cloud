import React, {useEffect, useState} from 'react';
import {Button, Container, TextField, Typography} from '@mui/material';
import ParameterDialog from '../../components/ParameterDialog/index';
import ProjectDialog from '../../components/ProjectDialog/index';
import ExperimentDialog from '../../components/ExperimentDialog/index';
import ObjectDialog from '../../components/ObjectDialog/index';
import {MultipleFileUpload, SingleFileUpload} from '../../components/FileUpload/index';
import ParameterSelect from '../../components/ParameterSelect/index';
import ProjectSelect from '../../components/ProjectSelect/index';
import ObjectSelect from "../../components/ObjectSelect";
import ExperimentSelect from "../../components/ExperimentSelect";
import axios from "axios";
import {mainUrl} from "../../index";
import FullWidthTextField from "../../components/FullWidthTextField";
import {Helmet} from "react-helmet";
import Box from "@mui/material/Box";
import {styled} from "@mui/material/styles";
import { CustomizedTextField } from "./styles";
import "../../styles.css"

const StyledButton = styled(Button)`
    background-color: ${({theme}) => theme.palette.background.first};
    color: ${({ theme }) => theme.palette.primary.main};
    border: none;
    width: 190px;
    height: 50px;
    font-weight: 900;
    font-size: medium;
    letter-spacing: 2px;
    text-align: center;
    border-radius: 5px;
    &:hover {
        background-color: ${({ theme }) => theme.palette.primary.main};
        color: black;
    }
`;

function UploadFiles() {
    const [selectedProject, setSelectedProject] = useState('');
    const [selectedExperiment, setSelectedExperiment] = useState('');
    const [selectedObject, setSelectedObject] = useState('');
    const [parameterValues, setParameterValues] = useState({});
    const [files, setFiles] = useState([]);
    const [singleFile, setSingleFile] = useState('');
    const [projects, setProjects] = useState([]);
    const [experiments, setExperiments] = useState([]);
    const [objects, setObjects] = useState([]);
    const [parameters, setParameters] = useState([]);
    const [selectedParam, setSelectedParam] = useState([]);
    const [selectedNewExpProjectId, setSelectedNewExpProjectId] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [metadata_name, setMetadataName] = useState('');


    useEffect(() => {
        fetch(`${mainUrl}/projects`, {
            method: 'GET',
            headers: {"Content-Type": "application/json"},
        })
            .then(response => {
                // Check if response is OK (status code 200-299)
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setProjects(data);
                setLoading(false);
            })
            .catch(error => {
                setError(error);
                setLoading(false);
            });

        fetch(`${mainUrl}/parameters`, {
            method: 'GET',
            headers: {"Content-Type": "application/json"}
        })
            .then(response => {
                // Check if response is OK (status code 200-299)
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setParameters(data);
                setLoading(false);
            })
            .catch(error => {
                setError(error);
                setLoading(false);
            });

        fetch(`${mainUrl}/objects`, {
            method: 'GET',
            headers: {"Content-Type": "application/json"}
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setObjects(data);
                setLoading(false);
            })
            .catch(error => {
                setError(error);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }


    if (error) {
        return <div>Error: {error.message}</div>;
    }

    const handleMetadataNameChange = (event) => {
        setMetadataName(event.target.value);
    };
    const handleSubmit = async (event) => {

            event.preventDefault();

            const formData = new FormData();

            for (const file of files) {
                formData.append('files', file, file.name);
            }

            if (singleFile) {
                formData.append('metadata_file', singleFile, singleFile.name);
            }
            console.log(formData)
            try {
                const uploadResponse = await axios.post(`${mainUrl}/upload`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Accept': 'application/json',
                    },
                    params: {
                        metadata_name: metadata_name,
                        experiment_id: selectedExperiment,
                        object_id: selectedObject
                    }
                });

                console.log(uploadResponse)

                if (uploadResponse.status === 200) {
                    console.log('Файлы и данные успешно отправлены на сервер.');
                } else {
                    console.error('Ошибка при отправке файлов и данных на сервер.');
                }
                console.log(parameterValues)

                const metadataId = uploadResponse.data.metadata_id;
                const addParametersData = {
                    metadata_id: metadataId,
                    parameters: parameterValues,
                };
                const addParametersResponse = await axios.post(`${mainUrl}/custom_parameters`, addParametersData, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                    },
                });

                if (addParametersResponse.status === 200) {
                    console.log('Параметры успешно добавлены на сервер.');
                } else {
                    console.error('Ошибка при отправке параметров на сервер.');
                }
                window.location.reload()

            } catch (error) {
                console.error('Произошла ошибка:', error);
            }
        }
    ;

    // return (
    //     <>
    //         <Helmet><title>Загрузка файлов</title></Helmet>
    //         <Container
    //             sx={{
    //                 padding: '0px 0px 0px 47px !important'
    //             }}
    //         >
    //             <form onSubmit={handleSubmit}>
    //             <ProjectSelect
    //                     projects={projects}
    //                     setSelectedProject={setSelectedProject}
    //                     setExperiments={setExperiments}
    //                     setLoading={setLoading}
    //                     setError={setError}
    //                 />
    //                 <ProjectDialog projects={projects}
    //                                setProjects={setProjects}>
    //                 </ProjectDialog>
    //                 <ExperimentSelect
    //                     experiments={experiments}
    //                     selectedExperiment={selectedExperiment}
    //                     setSelectedExperiment={setSelectedExperiment}
    //                 />
    //                 <ExperimentDialog
    //                     experiments={experiments}
    //                     setExperiments={setExperiments}
    //                     projects={projects}
    //                     selectedNewExpProjectId={selectedNewExpProjectId}
    //                     setSelectedNewExpProjectId={setSelectedNewExpProjectId}
    //                 />
    //                 <Typography variant="h6" gutterBottom>Введите название опыта</Typography>
    //                 <FullWidthTextField
    //                     label="Название опыта"
    //                     variant="outlined"
    //                     value={metadata_name}
    //                     required={true}
    //                     onChange={handleMetadataNameChange}/>
    //                 <ObjectSelect
    //                     selectedObject={selectedObject}
    //                     setSelectedObject={setSelectedObject}
    //                     objects={objects}
    //                 />
    //                 <ObjectDialog
    //                     objects={objects}
    //                     setObjects={setObjects}></ObjectDialog>
    //                 <ParameterSelect
    //                     parameters={parameters}
    //                     selectedParam={selectedParam}
    //                     setSelectedParam={setSelectedParam}
    //                     setParameterValues={setParameterValues}
    //                     parameterValues={parameterValues}
    //                 />
    //                 <ParameterDialog
    //                     parameters={parameters}
    //                     setParameters={setParameters}/>
    //                 <SingleFileUpload
    //                     setSingleFile={setSingleFile}/>
    //                 <MultipleFileUpload setFiles={setFiles}/>
    //                 <Container>
    //                     <Button type="submit">Создать</Button>
    //                 </Container>
    //             </form>
    //         </Container>
    //     </>
    // );

    return (
        <>
            <Helmet><title>Загрузка файлов</title></Helmet>
            <Box
                sx={{
                    mt: '40px',
                    width: '98vw'
                }}>
                <Container maxWidth="md"
                >
                    <form onSubmit={handleSubmit}>
                        <Box sx={{position: 'relative'}}>
                            <svg
                                width="100%"
                                height="100%"
                                viewBox="0 0 100 100"
                                style={{position: 'absolute', top: 0, left: 24}}
                            >
                                <line x1="-90" y1="10.65" x2="-90" y2="52.25"
                                      style={{stroke: "#bbbbbb", strokeWidth: '0.7px'}}/>
                                <line x1="-90.325" y1="11" x2="-86.7" y2="11"
                                      style={{stroke: "#bbbbbb", strokeWidth: '0.7px'}}/>
                                <line x1="-90.325" y1="52" x2="-79.96" y2="52"
                                      style={{stroke: "#bbbbbb", strokeWidth: '0.7px'}}/>

                                <line x1="-90" y1="51.625" x2="-90" y2="92.7"
                                      style={{stroke: "#bbbbbb", strokeWidth: '0.7px'}}/>
                                <line x1="-90.335" y1="92.35" x2="-73.2" y2="92.35"
                                      style={{stroke: "#bbbbbb", strokeWidth: '0.7px'}}/>
                            </svg>
                            <div>
                                <ProjectSelect
                                    projects={projects}
                                    setSelectedProject={setSelectedProject}
                                    setExperiments={setExperiments}
                                    setLoading={setLoading}
                                    setError={setError}
                                    setSelectedExperiment={setSelectedExperiment}
                                />
                            </div>
                            <ProjectDialog projects={projects}
                                           setProjects={setProjects}>
                            </ProjectDialog>
                            <div>
                                <ExperimentSelect
                                    experiments={experiments}
                                    selectedExperiment={selectedExperiment}
                                    setSelectedExperiment={setSelectedExperiment}
                                />
                            </div>
                            <div>
                                <ExperimentDialog
                                    experiments={experiments}
                                    setExperiments={setExperiments}
                                    projects={projects}
                                    selectedNewExpProjectId={selectedNewExpProjectId}
                                    setSelectedNewExpProjectId={setSelectedNewExpProjectId}
                                />
                            </div>
                            <Box sx={{mt: '35px', ml: '84px'}}>
                                <CustomizedTextField
                                    label="Название опыта"
                                    variant="outlined"
                                    value={metadata_name}
                                    required={true}
                                    onChange={handleMetadataNameChange}/>
                            </Box>
                        </Box>
                        <div>
                            <ObjectSelect
                                selectedObject={selectedObject}
                                setSelectedObject={setSelectedObject}
                                objects={objects}
                            />
                        </div>
                        <div>
                            <ObjectDialog
                                objects={objects}
                                setObjects={setObjects}></ObjectDialog>
                        </div>
                        <div>
                            <ParameterSelect
                                parameters={parameters}
                                selectedParam={selectedParam}
                                setSelectedParam={setSelectedParam}
                                setParameterValues={setParameterValues}
                                parameterValues={parameterValues}
                            />
                        </div>
                        {/*<ParameterDialog*/}
                        {/*    parameters={parameters}*/}
                        {/*    setParameters={setParameters}/>*/}
                        <Box sx={{mt: '40px'}}>
                            <SingleFileUpload
                                setSingleFile={setSingleFile}/>
                        </Box>
                        <Box sx={{mt: '35px'}}>
                            <MultipleFileUpload setFiles={setFiles}/>
                        </Box>
                        <Container style={{display: 'flex', justifyContent: 'center', marginTop: '45px'}}>
                            <StyledButton type="submit">создать</StyledButton>
                        </Container>
                    </form>
                </Container>
            </Box>
        </>
    );
}

export default UploadFiles;



//     const testProjects = [
//         { id: 1, name: 'Project 1', experiments: ['Exp 1', 'Exp 2', 'Exp 3'] },
//         { id: 2, name: 'Project 2', experiments: ['Exp 4', 'Exp 5', 'Exp 6'] },
//         { id: 3, name: 'Project 3', experiments: ['Exp 7', 'Exp 8', 'Exp 9'] }
//     ];
//     const handleSubmit = async (event) => {
//         event.preventDefault();
//         // Здесь будет ваша логика обработки данных и отправки на сервер
//     };
//
//     const handleMetadataNameChange = (event) => {
//         setMetadataName(event.target.value);
//     };
//
//     return (
//         <>
//             <Helmet><title>Загрузка файлов</title></Helmet>
//             <Box
//                 sx={{
//                     mt: '40px',
//                     width: '98vw'
//                 }}>
//                 <Container maxWidth="md"
//                 >
//                 <form onSubmit={handleSubmit}>
//                     <Box sx={{position: 'relative'}}>
//                         <svg
//                             width="100%"
//                             height="100%"
//                             viewBox="0 0 100 100"
//                             style={{position: 'absolute', top: 0, left: 24}}
//                         >
//                             <line x1="-90" y1="10.65" x2="-90" y2="52.25"
//                                   style={{stroke: "#bbbbbb", strokeWidth: '0.7px'}}/>
//                             <line x1="-90.325" y1="11" x2="-86.7" y2="11"
//                                   style={{stroke: "#bbbbbb", strokeWidth: '0.7px'}}/>
//                             <line x1="-90.325" y1="52" x2="-79.96" y2="52"
//                                   style={{stroke: "#bbbbbb", strokeWidth: '0.7px'}}/>
//
//                             <line x1="-90" y1="51.625" x2="-90" y2="92.7"
//                                   style={{stroke: "#bbbbbb", strokeWidth: '0.7px'}}/>
//                             <line x1="-90.335" y1="92.35" x2="-73.2" y2="92.35"
//                                   style={{stroke: "#bbbbbb", strokeWidth: '0.7px'}}/>
//                         </svg>
//                         <div>
//                             <ProjectSelect
//                                 projects={testProjects}
//                                 setSelectedProject={setSelectedProject}
//                                 setExperiments={setExperiments}
//                                 setLoading={setLoading}
//                                 setError={setError}
//                                 setSelectedExperiment={setSelectedExperiment}
//                             />
//                         </div>
//                         <ProjectDialog projects={testProjects}
//                                        setProjects={setProjects}>
//                         </ProjectDialog>
//                         <div>
//                             <ExperimentSelect
//                                 experiments={experiments}
//                                 selectedExperiment={selectedExperiment}
//                                 setSelectedExperiment={setSelectedExperiment}
//                             />
//                         </div>
//                         <div>
//                             <ExperimentDialog
//                                 experiments={experiments}
//                                 setExperiments={setExperiments}
//                                 projects={testProjects}
//                                 selectedNewExpProjectId={selectedNewExpProjectId}
//                                 setSelectedNewExpProjectId={setSelectedNewExpProjectId}
//                             />
//                         </div>
//                         <Box sx={{mt: '35px', ml: '84px'}}>
//                             <CustomizedTextField
//                                 label="Название опыта"
//                                 variant="outlined"
//                                 value={metadata_name}
//                                 required={true}
//                                 onChange={handleMetadataNameChange}/>
//                         </Box>
//                     </Box>
//                     <div>
//                         <ObjectSelect
//                             selectedObject={selectedObject}
//                             setSelectedObject={setSelectedObject}
//                             objects={objects}
//                         />
//                     </div>
//                     <div>
//                         <ObjectDialog
//                             objects={objects}
//                             setObjects={setObjects}></ObjectDialog>
//                     </div>
//                     <div>
//                         <ParameterSelect
//                             parameters={parameters}
//                             selectedParam={selectedParam}
//                             setSelectedParam={setSelectedParam}
//                             setParameterValues={setParameterValues}
//                             parameterValues={parameterValues}
//                         />
//                     </div>
//                         {/*<ParameterDialog*/}
//                         {/*    parameters={parameters}*/}
//                         {/*    setParameters={setParameters}/>*/}
//                     <Box sx={{mt: '40px'}}>
//                         <SingleFileUpload
//                             setSingleFile={setSingleFile}/>
//                     </Box>
//                     <Box sx={{mt: '35px'}}>
//                         <MultipleFileUpload setFiles={setFiles}/>
//                     </Box>
//                         <Container style={{display: 'flex', justifyContent: 'center', marginTop: '45px'}}>
//                             <StyledButton type="submit">создать</StyledButton>
//                         </Container>
//                 </form>
//             </Container>
//             </Box>
//         </>
// );
// }
//
// export default UploadFiles;
