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
                                <span className="questions">What do you want from these calls?</span>
                                <select className="filter-select" required>
                                    <option hidden></option>
                                    <option>Just having presence/accountability</option>
                                    <option>Occasional discussion</option>
                                    <option>Daily check ins</option>
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
                                <span className="questions">What is your group size preference?</span>
                                <select className="filter-select" required>
                                    <option hidden></option>
                                    <option>2-3</option>
                                    <option>4-5</option>
                                    <option>6+</option>
                                </select>
                            </div>

                            <div className="indiv">
                                <span className="questions">Are you interested in writing notes together?</span>
                                <select className="filter-select" required>
                                    <option hidden></option>
                                    <option>Yes</option>
                                    <option>No</option>
                                </select>
                            </div>

                            <div className="indiv">
                                <span className="questions">How committed are you to the Virtual Study Rooms?</span>
                                <select className="filter-select" required>
                                    <option hidden></option>
                                    <option>Daily</option>
                                    <option>A few times a week</option>
                                    <option>Mostly near exams</option>
                                </select>
                            </div>

                            <div className="indiv">
                                <span className="questions">What is your preferred study duration?</span>
                                <select className="filter-select" required>
                                    <option hidden></option>
                                    <option>Less than 1 hour</option>
                                    <option>1-2 hours</option>
                                    <option>2 hours</option>
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
                                <span className="questions">Which tutorial slot do you have?</span>
                                <select className="filter-select" required>
                                    <option hidden></option>
                                    <option>T1</option>
                                    <option>T2</option>
                                    <option>T3</option>
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

                            <div className="indiv">
                                <span className="questions">What is your preferred meeting time?</span>
                                <select className="filter-select" required>
                                    <option hidden></option>
                                    <option>Morning (7AM - 12PM)</option>
                                    <option>Afternoon (12PM - 5PM)</option>
                                    <option>Evening (5PM - 10PM)</option>
                                </select>
                            </div>

                            <div className="indiv">
                                <span className="questions">What is your work pace preference?</span>
                                <select className="filter-select" required>
                                    <option hidden></option>
                                    <option>Start early</option>
                                    <option>Balanced pace</option>
                                    <option>Cram kast minute</option>
                                </select>
                            </div>

                            <div className="indiv">
                                <span className="questions">What are your preferred work slots?</span>
                                <input type="checkbox" id="mon" name="mon"/>
                                <label for="mon">Monday</label><br/>
                                <input type="checkbox" id="tues" name="tues"/>
                                <label for="tues">Tuesday</label><br/>
                                <input type="checkbox" id="wed" name="wed"/>
                                <label for="wed">Wednesday</label><br/>
                                <input type="checkbox" id="thurs" name="thurs"/>
                                <label for="thurs">Thursday</label><br/>
                                <input type="checkbox" id="fri" name="fri"/> 
                                <label for="fri">Friday</label><br/>                                     
                            </div>

                        </div> )
                    : null }
                </form>
            </div>
        </div>
    )
}

export default GroupFilter;