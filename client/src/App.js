import React from "react";
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom';
import LandingPage from "./pages/LandingPage";
// import Login from "./pages/Login";
import Product from "./pages/Product";
// import PaymentForm from "./components/PaymentForm";
// import OrderTrack from "./components/OrderTrack";
import ProductDetail from "./pages/ProductDetail";
import Layout from "./components/Layout";
function App() {
  return (
    // <>
    //   <LandingPage />
    //   {/* <Login /> */}
    //   {/* <PaymentForm /> */}
    //   {/* <OrderTrack /> */}
    // </>
    <Router>
       <Routes>
      <Route path="/" element={<Layout><LandingPage /></Layout>} />
      <Route path="/products" element={<Layout><Product/></Layout>} />
      <Route path="/products/:id" element={<Layout><ProductDetail /></Layout>} />
     </Routes>
    </Router>
   
  );
}

export default App;
