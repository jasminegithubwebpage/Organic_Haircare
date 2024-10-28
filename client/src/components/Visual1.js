import React, { useEffect, useState } from "react";
import axios from "axios";
import { Pie, Bar } from "react-chartjs-2";
import "chart.js/auto";

function Visual1() {
    const [adminData, setAdminData] = useState([]);
    const [userData, setUserData] = useState([]);
    const [showAdminChart, setShowAdminChart] = useState(true); // State to toggle Admin Roles chart
    const [showUserChart, setShowUserChart] = useState(true); // State to toggle User Roles chart

    useEffect(() => {
        // Fetch data for admin users
        axios.get("http://localhost:3002/api/admin-users")
            .then(response => setAdminData(response.data))
            .catch(error => console.error("Error fetching admin data:", error));

        // Fetch data for regular users
        axios.get("http://localhost:3002/api/users")
            .then(response => setUserData(response.data))
            .catch(error => console.error("Error fetching user data:", error));
    }, []);

    // Prepare data for pie chart (Admin Roles Distribution)
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

    // Prepare data for bar chart (User Roles Distribution)
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

    return (
        <div style={{ padding: "2rem" }}>
            <h2>Data Visualization Dashboard</h2>
            
            <div style={{ marginBottom: "1rem" }}>
                {/* Toggle for Admin Roles Chart */}
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
                {/* Toggle for User Roles Chart */}
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
        </div>
    );
}

export default Visual1;
