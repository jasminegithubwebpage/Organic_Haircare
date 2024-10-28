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
import AddUserForm from "./pages/AddUserForm";

import DashInventory from "./pages/DashInventory";
import DashProduct from "./pages/DashProduct";
import PaymentForm from "./components/PaymentForm";
import AddProduct from "./pages/AddProduct";
import Login from "./pages/Login";

import UpdateProduct from "./pages/UpdateProduct";

import About from "./pages/About";
import Contactus from "./pages/Contactus";

import PaymentSuccess from "./pages/PaymentSuccess";
import SuperAdminDashboard from "./pages/SAPage";
import ResetPasswordForm from "./pages/ResetPasswordForm";

//Super Admin
import SADashboard from "./components/SADashboard";
import SALayout from "./components/SALayout";
import SACustomer from "./pages/SACustomer";
import SAInventory from "./pages/SAInventory";
import SAProduct from "./pages/SAProduct";

import AdminsLogin from "./pages/AdminsLogin";

// visual
import Reports from "./pages/Reports";

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

        <Route path="/superadmin-dashboard" element={<SuperAdminDashboard />} />

        <Route
          path="/superdashboard"
          element={
            <SALayout>
              <SADashboard />
            </SALayout>
          }
        />

        <Route
          path="sa/customer"
          element={
            <SALayout>
              <SACustomer />
            </SALayout>
          }
        />
        <Route
          path="sa/inventory"
          element={
            <SALayout>
              <SAInventory />
            </SALayout>
          }
        />
        <Route
          path="sa/update-product"
          element={
            <SALayout>
              <UpdateProduct />
            </SALayout>
          }
        />
        <Route
          path="sa/product"
          element={
            <SALayout>
              <SAProduct />
            </SALayout>
          }
        />
        <Route
          path="sa/messages"
          element={
            <SALayout>
              <AdminMsg />
            </SALayout>
          }
        />
        <Route
          path="sa/add-product"
          element={
            <SALayout>
              <AddProduct />
            </SALayout>
          }
        />

        <Route
          path="sa/reports"
          element={
            <SALayout>
              <Reports/>
            </SALayout>
          }
        />

        {/* admins */}
        <Route
          path="/admins"
          element={
            <Layout>
              <AdminsLogin />
            </Layout>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
