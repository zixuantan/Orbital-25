import React, { useState } from "react";
import Navbar from "../components/Navbar";

function GroupFilter() {
    const [groupSelected, setGroup] = useState("");
    return (
        <div className="filter-page">
            <h1 id="filter-header">GroupFinder</h1>
            <p id="quote">Find your most compatible flock now!</p>
            
            <form className="filter-form">
                <span className="questions">First, what kind of group are you looking for?</span>
                <select required 
                value={groupSelected}
                onChange={(group) => setGroup(group.target.value)}>
                    <option value="" disabled hidden></option>
                    <option value="study">Study Group</option>
                    <option value="project">Project Group</option>
                </select>
                {groupSelected == "study" 
                ? <span className="questions"></span>
                : groupSelected == "project" ? (
                    <div>
                        <span className="questions">Which module is it for?</span> 
                        <select required>
                            <option disabled hidden></option>
                            
                        </select>
                        <span className="questions">Which time slot do you have?</span>
                        <select required>
                            <option disabled hidden></option>

                        </select>
                        <span className="questions">What's your level of commitment?</span>
                        <select required>
                            <option disabled hidden></option>
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                        </select>
                    </div>
                )}
            </form>
        </div>
    )
}