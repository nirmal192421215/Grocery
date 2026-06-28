import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { ShoppingCart, User, Menu, X, Heart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import './Navbar.css';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { cart } = useCart();
  const { wishlist } = useWishlist();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`navbar ${isScrolled ? 'navbar-scrolled glass' : ''}`}>
      <div className="container navbar-container">
        <Link to="/" className="navbar-logo">
          <span className="logo-text">DND Wholesale</span>
        </Link>

        <nav className={`navbar-links ${isMobileMenuOpen ? 'open' : ''}`}>
          <NavLink to="/" onClick={() => setIsMobileMenuOpen(false)} end>Home</NavLink>
          <NavLink to="/shop" onClick={() => setIsMobileMenuOpen(false)}>Shop</NavLink>
          <NavLink to="/about" onClick={() => setIsMobileMenuOpen(false)}>About Us</NavLink>
          <NavLink to="/blog" onClick={() => setIsMobileMenuOpen(false)}>Blog</NavLink>
          <NavLink to="/contact" onClick={() => setIsMobileMenuOpen(false)}>Contact</NavLink>
          <NavLink to="/admin" onClick={() => setIsMobileMenuOpen(false)}>Admin Panel</NavLink>
        </nav>

        <div className="navbar-actions">

          <Link to="/login" className="icon-btn" aria-label="User Profile">
            <User size={20} />
          </Link>
          <Link to="/wishlist" className="icon-btn cart-btn" aria-label="Wishlist">
            <Heart size={20} />
            {wishlist && wishlist.length > 0 && <span className="cart-badge" style={{ backgroundColor: '#ef4444' }}>{wishlist.length}</span>}
          </Link>
          <Link to="/cart" className="icon-btn cart-btn" aria-label="Shopping Cart">
            <ShoppingCart size={20} />
            {cart.length > 0 && <span className="cart-badge">{cart.length}</span>}
          </Link>
          <button 
            className="mobile-menu-btn icon-btn" 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
