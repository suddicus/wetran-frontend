import React from "react";
import { logout } from "../api";
import TrafficAnalysis from "../components/TrafficAnalysis";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <div>
            <h2>Dashboard</h2>
            <button onClick={handleLogout}>Logout</button>
            <TrafficAnalysis />
        </div>
    );
};

export default Dashboard;
