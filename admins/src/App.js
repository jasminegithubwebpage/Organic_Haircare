import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Customers from "./pages/Customers";
import AdminMsg from "./pages/AdminMsg";
import Layout from "./components/Layout";
import AdminLayout from "./components/AdminLayout";
import Dashboard from "./pages/Dashboard";
import { UserProvider } from './pages/UserContext';
import DashInventory from "./pages/DashInventory";
import DashProduct from "./pages/DashProduct";
import AddProduct from "./pages/AddProduct";
import UpdateProduct from "./pages/UpdateProduct";

// Super Admin
import SADashboard from "./components/SADashboard";
import SALayout from "./components/SALayout";
import SACustomer from "./pages/SACustomer";
import SAInventory from "./pages/SAInventory";
import SAProduct from "./pages/SAProduct";
import AdminsLogin from "./pages/AdminsLogin";
import SAPage from './pages/SAPage';
import AddUserForm from "./pages/AddUserForm"

// Visual
import Reports from "./pages/Reports";

function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          {/* Admin Routes */}
          <Route path="/dashboard" element={<AdminLayout><Dashboard /></AdminLayout>} />
          <Route path="/dashboard/customer" element={<AdminLayout><Customers /></AdminLayout>} />
          <Route path="/dashboard/inventory" element={<AdminLayout><DashInventory /></AdminLayout>} />
          <Route path="/dashboard/update-product" element={<AdminLayout><UpdateProduct /></AdminLayout>} />
          <Route path="/dashboard/product" element={<AdminLayout><DashProduct /></AdminLayout>} />
          <Route path="/dashboard/messages" element={<AdminLayout><AdminMsg /></AdminLayout>} />
          <Route path="/add-product" element={<AdminLayout><AddProduct /></AdminLayout>} />
          {/* <Route path="/add-user" element={<AdminLayout><AddUserForm /></AdminLayout>} /> */}

          {/* Super Admin Routes */}
          <Route path="/superdashboard" element={<SALayout><SADashboard /></SALayout>} />
          <Route path="sapage" element={<SAPage />} />
          <Route path="sa/customer" element={<SALayout><SACustomer /></SALayout>} />
          <Route path="sa/inventory" element={<SALayout><SAInventory /></SALayout>} />
          <Route path="sa/update-product" element={<SALayout><UpdateProduct /></SALayout>} />
          <Route path="sa/product" element={<SALayout><SAProduct /></SALayout>} />
          <Route path="sa/messages" element={<SALayout><AdminMsg /></SALayout>} />
          <Route path="sa/add-product" element={<SALayout><AddProduct /></SALayout>} />
          <Route path="sa/reports" element={<SALayout><Reports /></SALayout>} />
          <Route path="/add-admin" element={<AddUserForm />} />

          {/* Admin Login */}
          <Route path="/admins" element={<Layout><AdminsLogin /></Layout>} />
          <Route path="/" element={<Layout><AdminsLogin /></Layout>} />

        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
