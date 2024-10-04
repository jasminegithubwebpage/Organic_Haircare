import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Product from "./pages/Product";
import ProductDetail from "./pages/ProductDetail";
import Layout from "./components/Layout";
import AdminLayout from "./components/AdminLayout";
import Dashboard from "./pages/Dashboard";
import DashCustomer from "./pages/DashCustomer";
import DashInventory from "./pages/DashInventory";
import DashProduct from "./pages/DashProduct";
import PaymentForm from "./components/PaymentForm";
import AddProduct from "./pages/AddProduct";
import Login from "./pages/Login";
// import UserLogin from "./pages/UserLogin";
// import Dashboard from "./pages/Dashboard";
import SuperAdminDashboard from "./pages/SuperAdminDashBoard";
function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <LandingPage />
            </Layout>
          }
        />
        <Route
          path="/products"
          element={
            <Layout>
              <Product />
            </Layout>
          }
        />
         <Route
          path="/login"
          element={
            <Layout>
              <Login />
            </Layout>
          }
        />
         <Route path="/admin-dashboard" element={<Dashboard />} />  
         <Route path="/superadmin-dashboard" element={<SuperAdminDashboard />} />
        <Route
          path="/products/:id"
          element={
            <Layout>
              <ProductDetail />
            </Layout>
          }
        />
        <Route
          path="/payment"
          element={
            <Layout>
              <PaymentForm />
            </Layout>
          }
        />
        <Route
          path="/dashboard"
          element={
            <AdminLayout>
              <Dashboard />
            </AdminLayout>
          }
        />
        <Route
          path="/dashboard/customers"
          element={
            <AdminLayout>
              <DashCustomer />
            </AdminLayout>
          }
        />
        <Route
          path="/dashboard/inventory"
          element={
            <AdminLayout>
              <DashInventory />
            </AdminLayout>
          }
        />
        <Route
          path="/dashboard/product"
          element={
            <AdminLayout>
              <DashProduct />
            </AdminLayout>
          }
        />
         <Route path="/add-product" element={<AdminLayout> <AddProduct /> </AdminLayout>} />
      </Routes>
    
    </Router>
    
  );
}

export default App;
