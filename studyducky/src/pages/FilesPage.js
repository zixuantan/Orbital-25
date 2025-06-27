import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import "./FilesPages.css";

function FilesPage() {
    const { folderId } = useParams();
    const [files, setFiles] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`${process.env.REACT_APP_BACKEND_URL}/api/drive/list-files/${folderId}`)
        .then((res) => res.json())
        .then((data) => {
            setFiles(data.files || []);
            setLoading(false);
        })
        .catch((err) => {
            console.error("Error fetching files:", err); 
            setLoading(false);
        });
    }, [folderId]); // try change link to go to groupchat next time
    return (
        <div className="files-page">
            <div className="files-top">
                <Link to="/main" className="back-btn">⮜</Link> 
                
                <h1 className="files-header">Files</h1>
            </div>

            <div className="files-part">
                {loading ? (
                    <p>Loading files...</p>
                ) : files.length === 0 ? (
                    <p>No files uploaded yet.</p>
                ) : (
                    <ul className="file-list">
                    {files.map((file) => (
                        <li className="each-file" key={file.id}>
                            <span className="file-name">{file.name}</span>
                            <p className="file-link">
                                <a href={file.webViewLink} target="_blank" rel="noopener noreferrer">
                                    {file.webViewLink}
                                </a>
                            </p>
                            <p className="file-details">Uploaded by {file.uploaderName}</p>
                            <p className="file-details">Uploaded at {file.date}</p>
                        </li>
                    ))}
                    </ul>
                )} 
            </div>      
        </div>
    )
}

export default FilesPage;