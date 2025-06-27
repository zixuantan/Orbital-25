import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

function FilesPage() {
    const { folderId } = useParams();
    const [files, setFiles] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`http://localhost:5050/api/drive/list-files/${folderId}`)
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

            {loading ? (
                <p>Loading files...</p>
            ) : files.length === 0 ? (
                <p>No files uploaded yet.</p>
            ) : (
                <ul className="file-list">
                {files.map((file) => (
                    <li key={file.id}>
                        <span className="file-name">{file.name}</span>
                        <p className="file-link">{file.webViewLink}</p>
                        <p className="file-details">Uploaded by {file.uploaderName}</p>
                        <p className="file-details">Uploaded at {file.date}</p>
                    </li>
                ))}
                </ul>
            )}       
        </div>
    )
}

export default FilesPage;