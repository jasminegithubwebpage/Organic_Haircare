import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Customers from "./pages/Customers";
import AdminMsg from "./pages/AdminMsg";
import LandingPage from "./pages/LandingPage";
import Product from "./pages/Product";
import ProductDetail from "./pages/ProductDetail";
import Layout from "./components/Layout";
import AdminLayout from "./components/AdminLayout";
import Dashboard from "./pages/Dashboard";
import DashboardCopy from "./pages/Dashboard";
import SuperAdminLayout from "./components/AdminLayout copy";
import AddUserForm from "./pages/AddUserForm";

import DashInventory from "./pages/DashInventory";
import DashProduct from "./pages/DashProduct";
import PaymentForm from "./components/PaymentForm";
import AddProduct from "./pages/AddProduct";
import Login from "./pages/Login";

import UpdateProduct from "./pages/UpdateProduct";

import About from "./pages/About";
import Contactus from "./pages/Contactus";

// import UserLogin from "./pages/UserLogin";
// import Dashboard from "./pages/Dashboard";
import PaymentSuccess from "./pages/PaymentSuccess";
import SuperAdminDashboard from "./pages/SuperAdminDashBoard";
import ResetPasswordForm from "./pages/ResetPasswordForm";

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
          path="/about"
          element={
            <Layout>
              <About />
            </Layout>
          }
        />
        <Route
          path="/contact"
          element={
            <Layout>
              <Contactus />
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
        <Route
          path="/reset"
          element={
            <Layout>
              <ResetPasswordForm />
            </Layout>
          }
        />
        <Route path="/admin-dashboard" element={<Dashboard />} />
        <Route path="/superdashboard" element={<SuperAdminLayout />} />

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
          path="/payment-success"
          element={
            <Layout>
              <PaymentSuccess />
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
          path="/dashboard/customer"
          element={
            <AdminLayout>
              <Customers />
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
          path="/dashboard/update-product"
          element={
            <AdminLayout>
              <UpdateProduct />
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
        <Route
          path="/dashboard/messages"
          element={
            <AdminLayout>
              <AdminMsg />
            </AdminLayout>
          }
        />
        <Route
          path="/add-product"
          element={
            <AdminLayout>
              {" "}
              <AddProduct />{" "}
            </AdminLayout>
          }
        />
        <Route path="/add-user" element={<AddUserForm />} />
      </Routes>
    </Router>
  );
}

export default App;
