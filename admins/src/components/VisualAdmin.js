import React, { useEffect, useState } from "react";
import axios from "axios";
import { Pie, Bar } from "react-chartjs-2";
import "chart.js/auto";

function VisualAdmin() {
    const [adminData, setAdminData] = useState([]);
    const [userData, setUserData] = useState([]);
    const [showAdminChart, setShowAdminChart] = useState(true);
    const [showUserChart, setShowUserChart] = useState(true);
    const [showCityChart, setShowCityChart] = useState(false);
    const [showStateChart, setShowStateChart] = useState(false);
    const [showGenderChart, setShowGenderChart] = useState(false);

    useEffect(() => {
        axios.get("http://localhost:3002/api/admin-users")
            .then(response => setAdminData(response.data))
            .catch(error => console.error("Error fetching admin data:", error));

        axios.get("http://localhost:3002/api/users")
            .then(response => setUserData(response.data))
            .catch(error => console.error("Error fetching user data:", error));
    }, []);

    const roleData = adminData.reduce((acc, curr) => {
        acc[curr.role] = (acc[curr.role] || 0) + 1;
        return acc;
    }, {});

    const roleChartData = {
        labels: Object.keys(roleData),
        datasets: [
            {
                label: "Admin Roles",
                data: Object.values(roleData),
                backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
            },
        ],
    };

    const userRoleData = userData.reduce((acc, curr) => {
        acc[curr.role] = (acc[curr.role] || 0) + 1;
        return acc;
    }, {});

    const userRoleChartData = {
        labels: Object.keys(userRoleData),
        datasets: [
            {
                label: "User Roles",
                data: Object.values(userRoleData),
                backgroundColor: "#36A2EB",
            },
        ],
    };

    const cityData = userData.reduce((acc, curr) => {
        acc[curr.city] = (acc[curr.city] || 0) + 1;
        return acc;
    }, {});

    const cityChartData = {
        labels: Object.keys(cityData),
        datasets: [
            {
                label: "Users by City",
                data: Object.values(cityData),
                backgroundColor: "#FFA500",
            },
        ],
    };

    const stateData = userData.reduce((acc, curr) => {
        acc[curr.state] = (acc[curr.state] || 0) + 1;
        return acc;
    }, {});

    const stateChartData = {
        labels: Object.keys(stateData),
        datasets: [
            {
                label: "Users by State",
                data: Object.values(stateData),
                backgroundColor: "#8A2BE2",
            },
        ],
    };

    const genderData = userData.reduce((acc, curr) => {
        acc[curr.gender] = (acc[curr.gender] || 0) + 1;
        return acc;
    }, {});

    const genderChartData = {
        labels: Object.keys(genderData),
        datasets: [
            {
                label: "Users by Gender",
                data: Object.values(genderData),
                backgroundColor: ["#FF69B4", "#1E90FF"],
            },
        ],
    };

    return (
        <div style={{ padding: "2rem" }}>
            <h2>Users Report</h2>

            <div style={{ marginBottom: "1rem" }}>
                <label>
                    <input
                        type="checkbox"
                        checked={showAdminChart}
                        onChange={() => setShowAdminChart(!showAdminChart)}
                    />{" "}
                    Show Admin Roles Distribution
                </label>
            </div>
            {showAdminChart && (
                <>
                    <h3>Admin Roles Distribution</h3>
                    <Pie data={roleChartData} />
                </>
            )}

            <div style={{ marginBottom: "1rem", marginTop: "1rem" }}>
                <label>
                    <input
                        type="checkbox"
                        checked={showUserChart}
                        onChange={() => setShowUserChart(!showUserChart)}
                    />{" "}
                    Show User Roles Distribution
                </label>
            </div>
            {showUserChart && (
                <>
                    <h3>User Roles Distribution</h3>
                    <Bar data={userRoleChartData} />
                </>
            )}

            <div style={{ marginBottom: "1rem", marginTop: "1rem" }}>
                <label>
                    <input
                        type="checkbox"
                        checked={showCityChart}
                        onChange={() => setShowCityChart(!showCityChart)}
                    />{" "}
                    Show Users by City
                </label>
            </div>
            {showCityChart && (
                <>
                    <h3>Users by City</h3>
                    <Bar data={cityChartData} />
                </>
            )}

            <div style={{ marginBottom: "1rem", marginTop: "1rem" }}>
                <label>
                    <input
                        type="checkbox"
                        checked={showStateChart}
                        onChange={() => setShowStateChart(!showStateChart)}
                    />{" "}
                    Show Users by State
                </label>
            </div>
            {showStateChart && (
                <>
                    <h3>Users by State</h3>
                    <Bar data={stateChartData} />
                </>
            )}

            <div style={{ marginBottom: "1rem", marginTop: "1rem" }}>
                <label>
                    <input
                        type="checkbox"
                        checked={showGenderChart}
                        onChange={() => setShowGenderChart(!showGenderChart)}
                    />{" "}
                    Show Users by Gender
                </label>
            </div>
            {showGenderChart && (
                <>
                    <h3>Users by Gender</h3>
                    <Pie data={genderChartData} />
                </>
            )}
        </div>
    );
}

export default VisualAdmin;
