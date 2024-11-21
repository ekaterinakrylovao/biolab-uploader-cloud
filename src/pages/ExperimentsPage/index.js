import React, {useEffect, useState} from "react";
import ExperimentList from "../../components/ExperimentList";
import {useParams} from "react-router-dom";
import {mainUrl} from "../../index"
import {Helmet} from "react-helmet";

function ExperimentPage() {
    const [experiments, setExperiments] = useState([])
    const {projectId} = useParams();
    const [project, setProject] = useState('')
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true)
    const [projectName, setProjectName] = useState("")

    useEffect(() => {
        // Моковые данные экспериментов (замените на вашу логику)
        const mockExperiments = [
            { id: 1, name: "Experiment 1" },
            { id: 2, name: "Experiment 2" },
            { id: 3, name: "Experiment 3" }
        ];
        setExperiments(mockExperiments);

        // Моковое имя проекта (замените на вашу логику)
        setProjectName("Project Name");

    }, [projectId]);

    return (
        <>
            <Helmet><title>{projectName}</title></Helmet>
            <ExperimentList experiments={experiments} />
        </>
    );
}

export default ExperimentPage;
