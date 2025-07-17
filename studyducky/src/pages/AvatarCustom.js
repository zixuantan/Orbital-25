import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import "./AvatarCustom.css";

function AvatarCustom() {
    const {groupId} = useParams();
    const [selectedColor, setSelectedColor] = useState("yellow");
    const [user, setUser] = useState(null);
    const [eyesOpen, setEyesOpen] = useState(true);

    const colors = [ { name: "yellow", hex: "#f4e06b"}, 
        { name: "blue", hex: "#c4ffff" },
        { name: "green", hex: "#8ae98a" },
        { name: "red", hex: "#e55252" },
        { name: "pink", hex: "#ecabec" },
        { name: "purple", hex: "#d089e5" },
        { name:  "grey", hex: "#dadada" },
        { name: "white", hex: "#ffffff" },
        { name: "brown", hex: "#ba9c6d" } ];

    useEffect(() => {
        fetch(`${process.env.REACT_APP_BACKEND_URL}/me`, { credentials: "include" })
            .then((res) => res.json())
            .then((data) => {
                setUser(data);
                setSelectedColor(data.avatar_color || "yellow");
            });
    }, []);

    const updateColor = () => {
        fetch(`${process.env.REACT_APP_BACKEND_URL}/api/avatarcolor`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({ userId: user._id, color: selectedColor }),
        })
            .then((res) => res.json())
            .then((data) => alert(`Avatar color updated to ${data.avatar_color}`))
            .catch((err) => console.error(err));
    };

    useEffect(() => {
            const interval = setInterval(() => {
                setEyesOpen(false);
                setTimeout(() => setEyesOpen(true), 150); 
            }, 5000); 
            return () => clearInterval(interval);
        }, []);

    return (
        <div className="avatar-page">

            <div className="avatar-top">
                <Link to={`/studyroom/${groupId}`} className="backstudy-btn">⮜</Link>
                <h1 className="avatar-header">Customize your Avatar</h1>
            </div>

            <div className="avatar-bottom">

                <div className="preview-side">
                    <div className="avatar">
                        <img src={`/duck-${selectedColor}.svg`} alt="avatar" className="avatar-preview"/>
                        <img src={eyesOpen ? "/eyes-open.svg" : "/eyes-closed.svg"} className="eyes-preview" alt="eyes" />							
                        <img src={`/wings-${selectedColor}.svg`} alt="wings" className="wings-preview"/>
                    </div>
                </div>

                <div className="custom-side">
                    <div className="color-3">
                        {colors.map((color) => (
                            <div className="each-color" key={color.name} onClick={() => setSelectedColor(color.name)}>
                                <div className="colour-selection" 
                                style={{backgroundColor: color.hex}}></div>
                                <p className="color-name">{color.name}</p>
                            </div>
                        ))}
                    </div>
                    <button className="save-btn" onClick={updateColor}>Save</button>
                </div>
            </div>
        </div>
    );
}

export default AvatarCustom;
