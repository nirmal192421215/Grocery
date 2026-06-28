import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Heart, Eye, BarChart2, CheckCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const navigate = useNavigate();
  
  const handleAddToCart = (e) => {
    e.preventDefault();
    addToCart(product, product.minOrder || 1);
  };

  const handleWishlist = (e) => {
    e.preventDefault();
    toggleWishlist(product);
  };

  return (
    <div className="product-card card">
      <div className="product-image-container">
        {product.discount > 0 && (
          <span className="badge badge-discount product-badge">
            {product.discount}% OFF
          </span>
        )}
        <Link to={`/product/${product.id}`} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
          <img src={product.image} alt={product.name} className="product-image" />
        </Link>
        <div className="product-actions-overlay">
          <button className="icon-btn-overlay" title="Quick View" onClick={(e) => { e.preventDefault(); navigate(`/product/${product.id}`); }}><Eye size={18} /></button>
          <button 
            className="icon-btn-overlay" 
            title={isInWishlist(product.id) ? "Remove from Wishlist" : "Add to Wishlist"}
            onClick={handleWishlist}
            style={{ color: isInWishlist(product.id) ? 'var(--color-primary)' : 'inherit' }}
          >
            <Heart size={18} fill={isInWishlist(product.id) ? 'var(--color-primary)' : 'none'} />
          </button>
          <button className="icon-btn-overlay" title="Compare" onClick={(e) => { e.preventDefault(); alert('Compare feature coming soon!'); }}><BarChart2 size={18} /></button>
        </div>
      </div>
      
      <div className="product-info">
        <Link to={`/product/${product.id}`}>
          <h3 className="product-name" style={{ transition: 'color 0.3s' }}>{product.name}</h3>
        </Link>
        <p className="product-unit">{product.unit} • Min Order: {product.minOrder}</p>
        
        <div className="product-pricing">
          <div className="wholesale-price">
            <span className="price-label">Wholesale</span>
            <span className="price-amount">₹{product.wholesalePrice}</span>
          </div>
          <div className="retail-price">
            <span className="price-label">Retail</span>
            <span className="price-amount strike">₹{product.retailPrice}</span>
          </div>
        </div>
        
        <button className="btn btn-primary w-100 add-to-cart-btn" onClick={handleAddToCart}>
          <ShoppingCart size={18} /> Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
