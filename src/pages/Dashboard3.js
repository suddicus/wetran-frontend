import React, { useState } from "react";
import styled from "styled-components";
import { Card, CardContent, Typography, Grid, Box, TextField, Button, CircularProgress } from "@mui/material";
import { Line } from "react-chartjs-2";
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

const Dashboard = () => {
  const [website, setWebsite] = useState("");
  const [trafficData, setTrafficData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Hardcoded traffic data for Google and Facebook
  const hardcodedData = {
    "https://www.google.com": {
      traffic: {
        overview: "Google sees billions of visitors every day.",
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        values: [200, 250, 300, 320, 350, 370, 390, 400, 450, 500, 550, 600], // Hardcoded traffic data
      },
      backlinks: {
        total: 50000000,
      },
      seoScore: 98,
    },
    "https://www.facebook.com": {
      traffic: {
        overview: "Facebook remains one of the top social platforms globally.",
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        values: [150, 180, 210, 230, 250, 270, 290, 300, 320, 350, 380, 400], // Hardcoded traffic data
      },
      backlinks: {
        total: 30000000,
      },
      seoScore: 95,
    },
  };

  // Function to fetch website traffic data based on URL entered
  const fetchWebsiteData = () => {
    setLoading(true);
    setError("");

    // Check if the entered website is in our hardcoded data
    if (hardcodedData[website]) {
      setTrafficData(hardcodedData[website]);
    } else {
      setError("No data available for the entered website.");
    }

    setLoading(false);
  };

  // Chart data (example using traffic data like visitors)
  const data = trafficData
    ? {
        labels: trafficData.traffic.labels,
        datasets: [
          {
            label: website === "https://www.google.com" ? "Google" : "Facebook",
            data: trafficData.traffic.values,
            borderColor: website === "https://www.google.com" ? "rgba(75,192,192,1)" : "rgba(255,99,132,1)",
            backgroundColor: website === "https://www.google.com" ? "rgba(75,192,192,0.2)" : "rgba(255,99,132,0.2)",
            fill: true,
          },
        ],
      }
    : {};

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

        {/* Error Message */}
        {error && <Typography color="error">{error}</Typography>}

        {/* Info Cards for Google and Facebook */}
        {trafficData && (
          <CardContainer container spacing={3}>
            <Grid item xs={12} sm={6} md={3}>
              <Card sx={{ boxShadow: 3, padding: "20px", borderRadius: "8px", backgroundColor: "#ffffff" }}>
                <CardContent>
                  <Typography variant="h6">{website === "https://www.google.com" ? "Google" : "Facebook"} Traffic Overview</Typography>
                  <Typography variant="body1" color="text.secondary">
                    {trafficData.traffic.overview}
                  </Typography>
                  <Typography variant="h6" sx={{ marginTop: "10px" }}>
                    Backlinks
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    {trafficData.backlinks.total} Backlinks
                  </Typography>
                  <Typography variant="h6" sx={{ marginTop: "10px" }}>
                    SEO Score
                  </Typography>
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
