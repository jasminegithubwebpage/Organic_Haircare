<<<<<<< HEAD
// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Home from './pages/Home';
import Products from './pages/Products';
import About from './pages/About';
import Contact from './pages/Contact'


function App() {
  return (
    <Router>
      
      
      <Routes>
        <Route path="/" element={<Home />} />
         <Route path="/about" element={<About />} />
        <Route path="/products" element={<Products />} />
        <Route path="/contact" element={<Contact />} /> 
      </Routes> 
   
    </Router>
     
     
  );
}

export default App;
=======
// src/App.jsx
// import React from 'react';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// import Login from './pages/Login';

// import Home from './pages/Home';
// import Products from './pages/Products';
// import About from './pages/About';
// import Contact from './pages/Contact'

// import LandingPage from "./pages/LandingPage";

// import PaymentForm from "./components/PaymentForm";

import OrderTrack from "./components/OrderTrack";

function App() {
  return (
    // <Login/>
    // <LandingPage/>
    // <PaymentForm/>
    <OrderTrack/>
     
  );
}

export default App;
    // <Router>
      
      
    //   <Routes>
    //     <Route path="/" element={<Home />} />
        /* <Route path="/about" element={<About />} />
        <Route path="/about" element={<Products />} />
        <Route path="/contact" element={<Contact />} /> */
    //   </Routes>
   
    // </Router>
    
>>>>>>> pages
