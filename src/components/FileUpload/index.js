import {TextField, Typography} from '@mui/material';
import {useState} from "react";
import { useTheme } from '@mui/material/styles';

function SingleFileUpload({ setSingleFile }) {
    const theme = useTheme();
    const [isHovered, setIsHovered] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [fileUploaded, setFileUploaded] = useState(false);
    const [textColor, setTextColor] = useState("GrayText");

    const handleFileChange = (event) => {
        setSingleFile(event.target.files[0]);
        setFileUploaded(true);
    };

    const handleMouseMove = (event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        setPosition({
            x: event.clientX - rect.left,
            y: event.clientY - rect.top
        });
    };

    return (
        <>
            <div
                style={{
                    position: 'relative',
                    marginLeft: '100px',
                    width: '650px'
                }}
            >
                <label
                    htmlFor="file-upload"
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '100%',
                        height: '100px',
                        padding: '16px',
                        border: `2px dashed ${fileUploaded ? theme.palette.primary.main : (isHovered ? 'black' : '#aaaaaa')}`,
                        borderRadius: '4px',
                        cursor: 'pointer',
                        color: textColor,
                        fontWeight: 500,
                        fontSize: '17px'
                    }}
                    onMouseEnter={() => {
                        setIsHovered(true);
                        setTextColor('black');
                    }}
                    onMouseLeave={() => {
                        setIsHovered(false);
                        setTextColor('GrayText');
                    }}
                    onMouseMove={handleMouseMove}
                >
                    загрузить метадату
                    <input
                        id="file-upload"
                        type="file"
                        style={{ display: 'none' }}
                        onChange={handleFileChange}
                        accept=".xml"
                    />
                </label>
                {isHovered && (
                    <div
                        style={{
                            position: 'absolute',
                            width: '110px',
                            height: '30px',
                            top: position.y + 10,
                            left: position.x + 10,
                            background: '#f0f0f0',
                            padding: '8px',
                            border: '1px solid #aaaaaa',
                            borderRadius: '4px',
                            zIndex: 1,
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            fontSize: '13px'
                        }}
                    >
                        формат .xml
                    </div>
                )}
            </div>
        </>
    );
}

function MultipleFileUpload({ setFiles }) {
    const theme = useTheme();
    const [isHovered, setIsHovered] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [fileUploaded, setFileUploaded] = useState(false);
    const [textColor, setTextColor] = useState("GrayText");

    const handleFilesChange = (event) => {
        setFiles([...event.target.files]);
        setFileUploaded(true);
    };

    const handleMouseMove = (event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        setPosition({
            x: event.clientX - rect.left,
            y: event.clientY - rect.top
        });
    };

    return (
        <>
            <div
                style={{
                    position: 'relative',
                    marginLeft: '100px',
                    width: '650px'
                }}
            >
                <label
                    htmlFor="files-upload"
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '100%',
                        height: '100px',
                        padding: '16px',
                        border: `2px dashed ${fileUploaded ? theme.palette.primary.main : (isHovered ? 'black' : '#aaaaaa')}`,
                        borderRadius: '4px',
                        cursor: 'pointer',
                        color: textColor,
                        fontWeight: 500,
                        fontSize: '17px'
                    }}
                    onMouseEnter={() => {
                        setIsHovered(true);
                        setTextColor('black');
                    }}
                    onMouseLeave={() => {
                        setIsHovered(false);
                        setTextColor('GrayText');
                    }}
                    onMouseMove={handleMouseMove}
                >
                    загрузить свои файлы
                    <input
                        id="files-upload"
                        type="file"
                        style={{ display: 'none' }}
                        onChange={handleFilesChange}
                        multiple
                    />
                </label>
                {isHovered && (
                    <div
                        style={{
                            position: 'absolute',
                            width: '110px',
                            height: '30px',
                            top: position.y + 10,
                            left: position.x + 10,
                            background: '#f0f0f0',
                            padding: '8px',
                            border: '1px solid #aaaaaa',
                            borderRadius: '4px',
                            zIndex: 1,
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            fontSize: '13px'
                        }}
                    >
                        формат любой
                    </div>
                )}
            </div>
        </>
    );
}

export {SingleFileUpload, MultipleFileUpload};
