import React, { useState } from "react";
import Navbar from "../components/Navbar";
import './GroupFilter.css';

function GroupFilter() {
    const [groupSelected, setGroup] = useState("");
    const [modSelected, setMod] = useState("");
    return (
        <div className="overall-filter">
            <Navbar/>
            <div className="filter-page">
                <h1 id="filter-header">GroupFinder</h1>
                <p id="quote">Find your most compatible flock now!</p>
                
                <form className="filter-form">

                    <div className="indiv">
                        <span className="questions">First, what kind of group are you looking for?</span>
                        <select className="filter-select" required 
                        value={groupSelected}
                        onChange={(group) => setGroup(group.target.value)}>
                            <option value="" hidden></option>
                            <option value="study">Study Group</option>
                            <option value="project">Project Group</option>
                        </select>
                    </div>

                    {groupSelected === "study" ? (
                        <div>

                            <div className="indiv">
                                <span className="questions">Which module is it for?</span>
                                <select className="filter-select" required>
                                    <option hidden></option>
                                </select>
                            </div>

                            <div className="indiv">
                                <span className="questions">When do you prefer to study?</span>
                                <select className="filter-select" required>
                                    <option hidden></option>
                                    <option>Morning (7AM - 12PM)</option>
                                    <option>Afternoon (12PM - 5PM)</option>
                                    <option>Evening (5PM - 10PM)</option>
                                </select>
                            </div>

                            <div className="indiv">
                                <span className="questions">How often do you expect to be active in the group chat?</span>
                                <select className="filter-select" required>
                                    <option hidden></option>
                                    <option>Daily</option>
                                    <option>A few times a week</option>
                                    <option>Mostly near exams</option>
                                </select>
                            </div>

                        </div> )
                    : groupSelected === "project" ? (
                        <div>

                            <div className="indiv">
                                <span className="questions">Which module is it for?</span> 
                                <select className="filter-select" required>
                                    <option hidden></option>
                                </select>
                            </div>

                            <div className="indiv"> 
                                <span className="questions">Which time slot do you have?</span>
                                <select className="filter-select" required>
                                    <option hidden></option>
                                </select>
                            </div>

                            <div className="indiv">
                                <span className="questions">What's your level of commitment?</span>
                                <select className="filter-select" required>
                                    <option hidden></option>
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                </select>
                            </div>
                        </div> )
                    : null }
                </form>
            </div>
        </div>
    )
}

export default GroupFilter;