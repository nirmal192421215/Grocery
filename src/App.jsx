import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Dashboard from './pages/Dashboard';
import Shop from './pages/Shop';
import Wishlist from './pages/Wishlist';
import AdminDashboard from './pages/AdminDashboard';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Register from './pages/Register';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import NotFound from './pages/NotFound';
import Policies from './pages/Policies';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import PageWrapper from './components/PageWrapper';
import ScrollToTop from './components/ScrollToTop';
import { AnimatePresence } from 'framer-motion';
import './App.css';

function App() {
  return (
    <HelmetProvider>
      <WishlistProvider>
        <CartProvider>
          <Router>
          <ScrollToTop />
          <div className="app-container">
            <Navbar />
            <main className="main-content" style={{ marginTop: '80px' }}>
              <AnimatePresence mode="wait">
                <Routes>
                  <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
                  <Route path="/shop" element={<PageWrapper><Shop /></PageWrapper>} />
                  <Route path="/wishlist" element={<PageWrapper><Wishlist /></PageWrapper>} />
                  <Route path="/admin" element={<PageWrapper><AdminDashboard /></PageWrapper>} />
                  <Route path="/product/:id" element={<PageWrapper><ProductDetails /></PageWrapper>} />
                  <Route path="/cart" element={<PageWrapper><Cart /></PageWrapper>} />
                  <Route path="/checkout" element={<PageWrapper><Checkout /></PageWrapper>} />
                  <Route path="/dashboard" element={<PageWrapper><Dashboard /></PageWrapper>} />
                  <Route path="/about" element={<PageWrapper><About /></PageWrapper>} />
                  <Route path="/contact" element={<PageWrapper><Contact /></PageWrapper>} />
                  <Route path="/login" element={<PageWrapper><Login /></PageWrapper>} />
                  <Route path="/register" element={<PageWrapper><Register /></PageWrapper>} />
                  <Route path="/blog" element={<PageWrapper><Blog /></PageWrapper>} />
                  <Route path="/blog/:id" element={<PageWrapper><BlogPost /></PageWrapper>} />
                  <Route path="/policies" element={<PageWrapper><Policies /></PageWrapper>} />
                  <Route path="*" element={<PageWrapper><NotFound /></PageWrapper>} />
                </Routes>
              </AnimatePresence>
            </main>
          </div>
          </Router>
        </CartProvider>
      </WishlistProvider>
    </HelmetProvider>
  );
}

export default App;
