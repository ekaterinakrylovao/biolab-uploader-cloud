import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import MetadataList from "../../components/MetadataList";
import {mainUrl} from "../../index";
import {Helmet} from "react-helmet";

function MetadataPage() {
    const [metadata, setMetadata] = useState([])
    const {experimentId} = useParams();
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true)
    const [experimentName, setExperimentName] = useState("")

    useEffect(() => {
        // Моковые данные метаданных (замените на вашу логику)
        const mockMetadata = [
            { id: 1, name: "Metadata 1" },
            { id: 2, name: "Metadata 2" },
            { id: 3, name: "Metadata 3" }
        ];
        setMetadata(mockMetadata);

        // Моковое имя эксперимента (замените на вашу логику)
        setExperimentName("Experiment Name");

        // Установить loading в false после имитации получения данных
        setLoading(false);
    }, [experimentId]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <Helmet><title>{experimentName}</title></Helmet>
            <MetadataList metadata={metadata} />
        </>
    );
}

export default MetadataPage;
