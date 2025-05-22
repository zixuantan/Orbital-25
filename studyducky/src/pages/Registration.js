import React, { useState } from 'react';
import Select from 'react-select';
import './Registration.css';

const modsOption = [
  { value: 'BT2102', label: 'BT2102' },
  { value: 'IS1108', label: 'IS1108' },
  { value: 'IS2101', label: 'IS2101' },
  { value: 'CS2030', label: 'CS2030' },
  { value: 'MA1521', label: 'MA1521' },
];

function Registration() {
    const [selectedModules, setSelectedModules] = useState([]);
    return (
    <div className="background">
        <form className="form-container">
            <h1>Register</h1>
            
            <label>Name</label>
            <input type="text"/>

            <label>Email</label>
            <input type="email"/>

            <label>Year</label>
            <select required>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
            </select>
        
            <label>Major</label>
            <select required>
                <option>Architecture</option>
                <option>Business Administration</option>
                <option>Business Analytics</option>
                <option>Business Artifical Intelligence Systems</option>
                <option>Computer Science</option>
            </select>

            <label>Modules taken this semester</label>
            <Select 
            isMulti
            options={modsOption}
            value={selectedModules}
            onChange={setSelectedModules}
            className="module-select"
            />

            <label>Password</label>
            <input type="password"/>

            <label>Confirm password</label>
            <input type="password"/>

            <button type="submit" className="register-btn">Register</button>

        </form>
    </div>
    );
}

export default Registration;
    
