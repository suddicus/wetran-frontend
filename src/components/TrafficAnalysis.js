import React, { useState } from "react";
import { getTrafficStats } from "../api";

const TrafficAnalysis = () => {
    const [website, setWebsite] = useState("");
    const [data, setData] = useState(null);

    const fetchTraffic = async () => {
        try {
            const response = await getTrafficStats(website);
            setData(response);
        } catch (error) {
            alert("Failed to fetch traffic data!");
        }
    };

    return (
        <div>
            <h2>Website Traffic Analysis</h2>
            <input type="text" placeholder="Enter website (example.com)" onChange={(e) => setWebsite(e.target.value)} required />
            <button onClick={fetchTraffic}>Analyze</button>
            {data && (
                <div>
                    <h3>Results:</h3>
                    <pre>{JSON.stringify(data, null, 2)}</pre>
                </div>
            )}
        </div>
    );
};

export default TrafficAnalysis;
