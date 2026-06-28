import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ShoppingCart, Search, Home, AlertCircle } from 'lucide-react';
import Footer from '../components/Footer';

const NotFound = () => {
  return (
    <div className="not-found-page" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--color-bg)' }}>
      <div className="container" style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '4rem 2rem' }}>
        <motion.div 
          className="card" 
          style={{ width: '100%', maxWidth: '600px', padding: '4rem 2rem', textAlign: 'center' }}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem', color: '#ef4444' }}>
            <AlertCircle size={80} />
          </div>
          
          <h1 style={{ fontSize: '4rem', margin: '0 0 1rem', color: 'var(--color-text)', lineHeight: 1 }}>404</h1>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Page Not Found</h2>
          
          <p className="text-sub" style={{ marginBottom: '2.5rem', maxWidth: '400px', margin: '0 auto 2.5rem' }}>
            Oops! The wholesale aisle you're looking for doesn't exist or has been moved. Let's get you back to stocking up on supplies.
          </p>
          
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center' }}>
            <Link to="/" className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Home size={18} /> Back to Home
            </Link>
            <Link to="/shop" className="btn btn-outline" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <ShoppingCart size={18} /> Browse Shop
            </Link>
          </div>
        </motion.div>
      </div>
      <Footer />
    </div>
  );
};

export default NotFound;
