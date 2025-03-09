import React, { useState } from "react";
import styled from "styled-components";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Box,
  TextField,
  Button,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Avatar,
  Divider,
} from "@mui/material";
import { Line, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { AccessTime, BarChart as BarChartIcon, Public, Search, Share } from "@mui/icons-material";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const Header = styled(Typography)`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 30px;
  color: #1a73e8;
`;

const MetricCard = styled(Card)`
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;
  &:hover {
    transform: translateY(-2px);
  }
`;

const MetricCardContent = styled(CardContent)`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 24px;
`;

const StyledTextField = styled(TextField)`
  background: #fff;
  border-radius: 8px;
  margin-right: 16px;
  flex: 1;
`;

const Dashboard = () => {
  const [website, setWebsite] = useState("");
  const [trafficData, setTrafficData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchWebsiteData = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        `https://similarweb-traffic.p.rapidapi.com/traffic?domain=${encodeURIComponent(website)}`,
        {
          method: "GET",
          headers: {
            "X-Rapidapi-Key": process.env.REACT_APP_RAPIDAPI_KEY,
            "X-Rapidapi-Host": "similarweb-traffic.p.rapidapi.com",
          },
        }
      );

      if (!response.ok) {
        throw new Error("API request failed");
      }

      const data = await response.json();
      setTrafficData(data);
    } catch (err) {
      setError("Failed to fetch data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const getChartData = () => {
    if (!trafficData?.EstimatedMonthlyVisits) return {};

    return {
      labels: Object.keys(trafficData.EstimatedMonthlyVisits).map((date) =>
        new Date(date).toLocaleString("default", { month: "short" })
      ),
      datasets: [
        {
          label: "Monthly Visits",
          data: Object.values(trafficData.EstimatedMonthlyVisits),
          borderColor: "#1a73e8",
          backgroundColor: "rgba(26, 115, 232, 0.2)",
          fill: true,
          tension: 0.4,
        },
      ],
    };
  };

  const getPieChartData = () => {
    if (!trafficData?.TrafficSources) return {};

    const sources = trafficData.TrafficSources;
    return {
      labels: Object.keys(sources),
      datasets: [
        {
          label: "Traffic Sources",
          data: Object.values(sources),
          backgroundColor: [
            "#1a73e8",
            "#34a853",
            "#fbbc05",
            "#ea4335",
            "#7f8c8d",
            "#9b59b6",
          ],
          hoverOffset: 4,
        },
      ],
    };
  };

  return (
    <Box sx={{ padding: "40px", maxWidth: "1440px", margin: "0 auto" }}>
      <Header variant="h4">WeTran: Website Traffic Analysis</Header>

      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: "16px",
          marginBottom: "40px",
        }}
      >
        <StyledTextField
          label="Enter Website URL"
          variant="outlined"
          fullWidth
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
          InputProps={{
            style: { paddingRight: "8px" },
          }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={fetchWebsiteData}
          disabled={loading}
          sx={{
            padding: "14px 32px",
            borderRadius: "8px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          }}
        >
          {loading ? (
            <CircularProgress size={24} color="secondary" />
          ) : (
            "Analyze"
          )}
        </Button>
      </Box>

      {error && (
        <Typography
          variant="body1"
          color="error"
          sx={{ marginBottom: "24px" }}
        >
          {error}
        </Typography>
      )}

      {trafficData && (
        <Box>
          {/* Key Metrics Section */}
          <Grid container spacing={4} sx={{ marginBottom: "40px" }}>
            <Grid item xs={12} md={6} lg={3}>
              <MetricCard>
                <MetricCardContent>
                  <Avatar sx={{ bgcolor: "#1a73e8", marginBottom: "16px" }}>
                    <BarChartIcon />
                  </Avatar>
                  <Typography variant="h5" component="div">
                    {trafficData.Engagments.Visits || 0}
                  </Typography>
                  <Typography color="text.secondary">Monthly Visits</Typography>
                </MetricCardContent>
              </MetricCard>
            </Grid>

            <Grid item xs={12} md={6} lg={3}>
              <MetricCard>
                <MetricCardContent>
                  <Avatar sx={{ bgcolor: "#34a853", marginBottom: "16px" }}>
                    <AccessTime />
                  </Avatar>
                  <Typography variant="h5" component="div">
                    {trafficData.Engagments.TimeOnSite || 0}s
                  </Typography>
                  <Typography color="text.secondary">
                    Avg. Time on Site
                  </Typography>
                </MetricCardContent>
              </MetricCard>
            </Grid>

            <Grid item xs={12} md={6} lg={3}>
              <MetricCard>
                <MetricCardContent>
                  <Avatar sx={{ bgcolor: "#fbbc05", marginBottom: "16px" }}>
                    <Share />
                  </Avatar>
                  <Typography variant="h5" component="div">
                    {trafficData.Engagments.PagePerVisit || 0}
                  </Typography>
                  <Typography color="text.secondary">
                    Pages per Visit
                  </Typography>
                </MetricCardContent>
              </MetricCard>
            </Grid>

            <Grid item xs={12} md={6} lg={3}>
              <MetricCard>
                <MetricCardContent>
                  <Avatar sx={{ bgcolor: "#ea4335", marginBottom: "16px" }}>
                    <Public />
                  </Avatar>
                  <Typography variant="h5" component="div">
                    {trafficData.GlobalRank?.Rank || "N/A"}
                  </Typography>
                  <Typography color="text.secondary">
                    Global Rank
                  </Typography>
                </MetricCardContent>
              </MetricCard>
            </Grid>
          </Grid>

          {/* Traffic Overview Section */}
          <Card sx={{ marginBottom: "40px", boxShadow: 3 }}>
            <CardContent>
              <Typography
                variant="h6"
                sx={{ marginBottom: "24px", fontWeight: 600 }}
              >
                Traffic Overview
              </Typography>
              <Line
                data={getChartData()}
                options={{
                  responsive: true,
                  plugins: {
                    legend: {
                      position: "top",
                    },
                    title: {
                      display: false,
                    },
                  },
                  scales: {
                    x: {
                      grid: {
                        display: false,
                      },
                    },
                    y: {
                      beginAtZero: true,
                      grid: {
                        color: "#eee",
                      },
                    },
                  },
                }}
              />
            </CardContent>
          </Card>

          {/* Traffic Sources Section */}
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Card sx={{ boxShadow: 3 }}>
                <CardContent>
                  <Typography
                    variant="h6"
                    sx={{ marginBottom: "24px", fontWeight: 600 }}
                  >
                    Traffic Sources
                  </Typography>
                  <Pie
                    data={getPieChartData()}
                    options={{
                      responsive: true,
                      plugins: {
                        legend: {
                          position: "bottom",
                        },
                      },
                    }}
                  />
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={6}>
              <Card sx={{ boxShadow: 3 }}>
                <CardContent>
                  <Typography
                    variant="h6"
                    sx={{ marginBottom: "24px", fontWeight: 600 }}
                  >
                    Top Countries
                  </Typography>
                  <TableContainer component={Paper}>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>Country</TableCell>
                          <TableCell align="right">Share</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {trafficData.TopCountryShares.map((country) => (
                          <TableRow key={country.CountryCode}>
                            <TableCell>
                              <Box sx={{ display: "flex", alignItems: "center" }}>
                                <Avatar
                                  alt={country.Name}
                                  src={`https://flagcdn.com/${country.CountryCode.toLowerCase()}.svg`}
                                  sx={{ width: 24, height: 24, marginRight: 1 }}
                                />
                                {country.Name}
                              </Box>
                            </TableCell>
                            <TableCell align="right">
                              <Chip
                                label={`${(country.Value * 100).toFixed(2)}%`}
                                color="primary"
                                variant="outlined"
                              />
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          {/* Keywords Section */}
          <Card sx={{ marginTop: "40px", boxShadow: 3 }}>
            <CardContent>
              <Typography
                variant="h6"
                sx={{ marginBottom: "24px", fontWeight: 600 }}
              >
                Top Keywords
              </Typography>
              <Grid container spacing={2}>
                {trafficData.TopKeywords.map((keyword) => (
                  <Grid item xs={12} sm={6} md={4} key={keyword.Name}>
                    <Chip
                      icon={<Search />}
                      label={
                        <Box sx={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
                          <span>{keyword.Name}</span>
                          <Box sx={{ marginLeft: "8px" }}>
                            <Typography variant="caption">
                              {keyword.Volume ? `${keyword.Volume} searches` : "N/A"}
                            </Typography>
                          </Box>
                        </Box>
                      }
                      variant="outlined"
                      sx={{ width: "100%", marginBottom: "8px" }}
                    />
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>
        </Box>
      )}
    </Box>
  );
};

export default Dashboard;