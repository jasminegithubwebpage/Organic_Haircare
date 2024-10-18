import React from "react";
import { Link, useNavigate } from "react-router-dom";

function SuperAdminDashboard() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      {/* Header */}
      <header className="bg-burgundy text-white flex justify-between py-4 px-6">
        <div>
          <h1 className="text-3xl font-bold">Super Admin Dashboard</h1>
        </div>
        <div>
          <Link to="/login">
            <p>Logout</p>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="mt-6">
        {/* User Management Section */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            User Management
          </h2>
          <div className="bg-white shadow rounded-lg p-6">
            <p className="text-gray-600">
              Manage user roles, permissions, and create new admin accounts.
            </p>
            <button
              className="mt-4 px-4 py-2 bg-burgundy text-white rounded hover:bg-opacity-90"
              onClick={() => navigate("/add-user")}
            >
              Add New Admin
            </button>
          </div>
        </section>

        {/* System Settings Section */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            Dashboard
          </h2>
          <div className="bg-white shadow rounded-lg p-6">
            <p className="text-gray-600">Go to Dashboard</p>
            <Link to="/superdashboard">
              <button className="mt-4 px-4 py-2 bg-burgundy text-white rounded hover:bg-opacity-90">
                Dashboard
              </button>
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}

export default SuperAdminDashboard;
