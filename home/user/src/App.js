// /home/user/src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Map from './pages/Map';
import Cart from './pages/Cart';
// import Login from './pages/Login';
import Register from './pages/Register';
import Deals from './pages/Deals';
import StoreDetails from './pages/StoreDetails';
import Checkout from './pages/Checkout';
import UserProfile from './pages/UserProfiles';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/map" element={<Map />} />
        <Route path="/cart" element={<Cart />} />
        {/* <Route path="/login" element={<Login />} /> */}
        <Route path="/register" element={<Register />} />
        <Route path="/deals" element={<Deals />} />
        <Route path="/store/:storeId" element={<StoreDetails />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/profile" element={<UserProfile />} />
      </Routes>
    </Router>
  );
}

export default App;