import React from 'react';

function SuperAdminDashboard() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      {/* Header */}
      <header className="bg-burgundy text-white py-4 px-6">
        <h1 className="text-3xl font-bold">Super Admin Dashboard</h1>
      </header>

      {/* Main Content */}
      <main className="mt-6">
        {/* User Management Section */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">User Management</h2>
          <div className="bg-white shadow rounded-lg p-6">
            <p className="text-gray-600">
              Manage user roles, permissions, and create new admin accounts.
            </p>
            <button className="mt-4 px-4 py-2 bg-burgundy text-white rounded hover:bg-opacity-90">
              Manage Users
            </button>
          </div>
        </section>

        {/* System Settings Section */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">System Settings</h2>
          <div className="bg-white shadow rounded-lg p-6">
            <p className="text-gray-600">Configure system-wide settings like site maintenance, backup schedules, and more.</p>
            <button className="mt-4 px-4 py-2 bg-burgundy text-white rounded hover:bg-opacity-90">
              Go to Settings
            </button>
          </div>
        </section>

        {/* Analytics Section */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Analytics Overview</h2>
          <div className="bg-white shadow rounded-lg p-6">
            <p className="text-gray-600">
              View key metrics about the system, users, and recent activities.
            </p>
            <button className="mt-4 px-4 py-2 bg-burgundy text-white rounded hover:bg-opacity-90">
              View Analytics
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}

export default SuperAdminDashboard;
