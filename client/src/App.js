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
import PaymentForm from "./components/PaymentForm";
import AddProduct from "./pages/AddProduct";
// import DashProduct from "./pages/DashProduct";
import PaymentSuccess from "./pages/PaymentSuccess";

import UserLogin from "./pages/UserLogin";

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
        {/* <Route
          path="/dashboard/product"
          element={
            <AdminLayout>
              <DashProduct />
            </AdminLayout>
          }
        /> */}
        <Route
          path="/add-product"
          element={
            <AdminLayout>
              {" "}
              <AddProduct />{" "}
            </AdminLayout>
          }
        />

        <Route
          path="/userLogin"
          element={
            <AdminLayout>
              <UserLogin />
            </AdminLayout>
          }
        />
        <Route
          path="/userLogin"
          element={
            <AdminLayout>
              <PaymentSuccess />
            </AdminLayout>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
