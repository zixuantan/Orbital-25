import React from "react";
import "./MainPage.css";
import { Bar } from 'react-chartjs-2';
import { Doughnut } from 'react-chartjs-2';
import { ArcElement } from 'chart.js';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from 'chart.js';
import { Link } from 'react-router-dom';
import Chats from '../components/Chats';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend, ArcElement);

const week = [2.0, 3.0, 1.5, 4.0, 2.5, 4.5, 3.0];
const day = 3

function MainPage() {
    const weeklyData = {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [{ label: 'Hours', data: week,
            backgroundColor: '#4abdac', borderRadius: 8}]};
    const dailyData = {
        datasets: [{ data: [day, 24 - day], 
            backgroundColor: ['#4abdac', '#fff'], borderWidth: 0 }]};
    return (
        <div className="overall-page">
            <div className="stats">
                <h1>Study Statistics</h1>

                <div className="daily">
                <p>Today's Progress</p>
                <Doughnut data={dailyData} />
                    
                </div>
                <div className="weekly">

                <p>Weekly Study Hours</p>
                <Bar data={weeklyData} />
                
                </div>
            </div>

            <div className="chats">
                <div className="header">

                    <h2>Group Chats</h2>

                    <div className="finder">

                        <p id="group-finder">Want to find more flocks to join?</p>
                        <Link to="/GroupFinder">
                        <button className="finder-btn">GroupFinder</button>
                        </Link>

                    </div>
                </div> 
                <div className="study-groups">

                    <p>Study Groups</p>
                    <Chats title="Study Groups" groups={['BZA squad', 'Study & chill']} />

                </div>  
                <div className="project-groups">
                    <Chats title="Project Groups" groups={['Must get A for BT2102']} />
                </div>          
            </div>
        </div>
    );
}

export default MainPage