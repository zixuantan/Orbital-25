import React, { useEffect, useState } from 'react';
import "../pages/GroupFilter.css";

function ModulesTaken({ googleId, selectMod }) {
    const [modules, setModules] = useState([]);
    const [modSelected, setMod] = useState("");

    useEffect(() => {
        if (!googleId) return;

    fetch(`http://localhost:5050/api/mods/${googleId}`)
    .then((res) => res.json())
    .then((data) => setModules(data))
    .catch((err) => console.error('Error fetching modules:', err));
    }, [googleId]);

    const handleMod = (e) => {
        const selected = e.target.value;
        setMod(selected);
        selectMod(selected); 
    };

    return (
        <div className="indiv">
            <span className="questions" width="500">Which module is it for?</span>
            <select className="filter-select"
            value={modSelected}
            onChange={handleMod}
            >
            <option value="" hidden></option>
            {modules.map((mod, index) => (
                <option key={index} value={mod}>{mod}</option>))}
            </select>
        </div>
    );
}

export default ModulesTaken;
