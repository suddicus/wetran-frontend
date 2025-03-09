import React, { useState } from "react";
import styled from "styled-components";
import { Card, CardContent, Typography, Grid, Box, Paper, TextField, Button, CircularProgress } from "@mui/material";
import { Line } from "react-chartjs-2";
import axios from "axios";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";

// Registering chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

// Dashboard Styling
const Header = styled(Typography)`
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 20px;
  color: #1976d2;
`;

const ChartWrapper = styled(Box)`
  margin-top: 30px;
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const CardContainer = styled(Grid)`
  margin-bottom: 20px;
`;

const apiKey = "YOUR_TRAFFIC_API_KEY"; // Replace with your TrafficAPI.io key

const Dashboard = () => {
  const [website, setWebsite] = useState("");
  const [trafficData, setTrafficData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Function to fetch website traffic data from the API
  const fetchWebsiteData = async () => {
    if (!website) return;

    setLoading(true);
    setError("");

    try {
      // API call to Traffic API or similar service (adjust URL accordingly)
      const response = await axios.get(
        `https://api.trafficapi.io/website/traffic?url=${website}&apiKey=${apiKey}`
      );
      
      setTrafficData(response.data);  // Assuming the API returns the traffic data
    } catch (err) {
      setError("Error fetching data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Chart data (example using traffic data like visitors)
  const data = {
    labels: trafficData ? trafficData.traffic.labels : [],
    datasets: [
      {
        label: "Website Traffic",
        data: trafficData ? trafficData.traffic.values : [],
        borderColor: "rgba(75,192,192,1)",
        backgroundColor: "rgba(75,192,192,0.2)",
        fill: true,
      },
    ],
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "row", gap: "30px", marginTop: "30px" }}>
      {/* Main Content */}
      <Box sx={{ flexGrow: 1, padding: "20px", backgroundColor: "#f5f5f5", borderRadius: "8px" }}>
        <Header variant="h4">WeTran: Website Traffic Dashboard</Header>

        {/* Input Field for Website URL */}
        <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", marginBottom: "30px" }}>
          <TextField
            label="Enter Website URL"
            variant="outlined"
            fullWidth
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            sx={{ marginRight: "20px" }}
          />
          <Button variant="contained" color="primary" onClick={fetchWebsiteData} disabled={loading}>
            {loading ? <CircularProgress size={24} color="secondary" /> : "Fetch Data"}
          </Button>
        </Box>

        {error && <Typography color="error">{error}</Typography>}

        {/* Info Cards */}
        {trafficData && (
          <CardContainer container spacing={3}>
            <Grid item xs={12} sm={6} md={3}>
              <Card sx={{ boxShadow: 3, padding: "20px", borderRadius: "8px", backgroundColor: "#ffffff" }}>
                <CardContent>
                  <Typography variant="h6">Traffic Overview</Typography>
                  <Typography variant="body1" color="text.secondary">
                    {trafficData.traffic.overview}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card sx={{ boxShadow: 3, padding: "20px", borderRadius: "8px", backgroundColor: "#ffffff" }}>
                <CardContent>
                  <Typography variant="h6">Backlinks</Typography>
                  <Typography variant="body1" color="text.secondary">
                    {trafficData.backlinks.total} Backlinks
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card sx={{ boxShadow: 3, padding: "20px", borderRadius: "8px", backgroundColor: "#ffffff" }}>
                <CardContent>
                  <Typography variant="h6">SEO Score</Typography>
                  <Typography variant="body1" color="text.secondary">
                    {trafficData.seoScore}%
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </CardContainer>
        )}

        {/* Line Chart for Website Traffic */}
        {trafficData && (
          <ChartWrapper>
            <Typography variant="h6" sx={{ marginBottom: "20px" }}>
              Website Traffic Over Time
            </Typography>
            <Line data={data} />
          </ChartWrapper>
        )}
      </Box>
    </Box>
  );
};

export default Dashboard;
