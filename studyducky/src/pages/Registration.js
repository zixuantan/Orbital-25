import React from "react";
import './Registration.css';

function Registration() {
    return (
    <div class="background">
        <form class="form-container">
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
            <div class="mod-search">
                <input type="text"/>
                <button type="button">🔍</button>
            </div>

            <label>Password</label>
            <input type="password"/>

            <label>Confirm password</label>
            <input type="password"/>

        </form>
    </div>
    );
}

export default Registration;
    
