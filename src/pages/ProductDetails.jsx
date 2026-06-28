import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShoppingCart, CheckCircle, Truck, ShieldCheck, ChevronRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';

import { allProducts } from './Shop';

const ProductDetails = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  
  const shopProduct = allProducts.find(p => p.id === parseInt(id));
  
  const [activeImage, setActiveImage] = useState(0);
  const [quantity, setQuantity] = useState(shopProduct ? shopProduct.minOrder : 1);
  const [added, setAdded] = useState(false);
  
  if (!shopProduct) {
    return <div className="container section" style={{ textAlign: 'center', padding: '4rem 0' }}><h2>Product not found</h2><Link to="/shop" className="btn btn-primary" style={{ marginTop: '1rem' }}>Return to Shop</Link></div>;
  }

  // Augment shop product with missing details for the detail view
  const product = {
    ...shopProduct,
    sku: `SKU-${shopProduct.name.substring(0,3).toUpperCase().replace(/\s/g, '')}-${shopProduct.id}`,
    description: `Premium quality ${shopProduct.name} sourced directly from verified suppliers. Guaranteed freshness and authentic taste. Perfect for daily use and bulk requirements. Buy more to save more with our tier-based wholesale pricing.`,
    images: [shopProduct.image],
    bulkPricing: [
      { qty: `5-10 ${shopProduct.unit}`, price: shopProduct.wholesalePrice },
      { qty: `11-50 ${shopProduct.unit}`, price: Math.floor(shopProduct.wholesalePrice * 0.95) },
      { qty: `50+ ${shopProduct.unit}`, price: Math.floor(shopProduct.wholesalePrice * 0.90) }
    ],
    specs: {
      'Brand': shopProduct.brand,
      'Category': shopProduct.category,
      'Unit Size': shopProduct.unit,
      'Shelf Life': '12 Months',
      'Quality': 'Premium Grade A'
    }
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 3000);
  };

  return (
    <div className="product-page">
      {/* Breadcrumbs */}
      <div className="container" style={{ padding: '2rem', display: 'flex', gap: '0.5rem', alignItems: 'center', fontSize: '0.875rem', color: 'var(--color-text-light)' }}>
        <Link to="/">Home</Link> <ChevronRight size={14} /> 
        <Link to="/shop">Shop</Link> <ChevronRight size={14} /> 
        <span>{product.category}</span> <ChevronRight size={14} /> 
        <span style={{ color: 'var(--color-text)', fontWeight: '600' }}>{product.name}</span>
      </div>

      <div className="container grid-2" style={{ marginBottom: '4rem' }}>
        {/* Gallery */}
        <div className="product-gallery">
          <div className="card" style={{ padding: '1rem', marginBottom: '1rem', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '500px' }}>
            <img 
              src={product.images[activeImage]} 
              alt={product.name} 
              style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }} 
            />
          </div>
          {product.images.length > 1 && (
            <div style={{ display: 'flex', gap: '1rem' }}>
              {product.images.map((img, idx) => (
                <div 
                  key={idx} 
                  className="card"
                  style={{ 
                    width: '80px', 
                    height: '80px', 
                    padding: '0.5rem', 
                    cursor: 'pointer',
                    border: activeImage === idx ? '2px solid var(--color-primary)' : '1px solid var(--color-border)'
                  }}
                  onClick={() => setActiveImage(idx)}
                >
                  <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Details */}
        <div className="product-details-content">
          <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>{product.name}</h1>
          <p className="text-sub" style={{ marginBottom: '1rem' }}>SKU: {product.sku} | Unit: {product.unit}</p>
          
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: '1rem', marginBottom: '1.5rem', paddingBottom: '1.5rem', borderBottom: '1px solid var(--color-border)' }}>
            <span style={{ fontSize: '2rem', fontWeight: '700', color: 'var(--color-primary)' }}>₹{product.wholesalePrice}</span>
            <span style={{ fontSize: '1.25rem', color: 'var(--color-text-light)', textDecoration: 'line-through', marginBottom: '0.3rem' }}>₹{product.retailPrice}</span>
            {product.discount && (
              <span className="badge badge-discount" style={{ marginBottom: '0.5rem' }}>Save {product.discount}%</span>
            )}
          </div>

          <p style={{ marginBottom: '2rem', lineHeight: '1.8' }}>{product.description}</p>

          {/* Bulk Pricing Table */}
          <div className="card" style={{ marginBottom: '2rem', background: '#F8FAF8' }}>
            <h3 style={{ marginBottom: '1rem', fontSize: '1.125rem' }}>Bulk Wholesale Pricing</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', textAlign: 'center' }}>
              {product.bulkPricing.map((tier, idx) => (
                <div key={idx} style={{ background: 'white', padding: '1rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)' }}>
                  <div style={{ fontWeight: '600', marginBottom: '0.5rem' }}>{tier.qty}</div>
                  <div style={{ color: 'var(--color-primary)', fontWeight: '700' }}>₹{tier.price}/unit</div>
                </div>
              ))}
            </div>
          </div>

          {/* Add to Cart Actions */}
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '2rem' }}>
            <div style={{ display: 'flex', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)', overflow: 'hidden' }}>
              <button 
                onClick={() => setQuantity(Math.max(product.minOrder, quantity - 1))}
                style={{ padding: '0.75rem 1rem', background: '#f3f4f6', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}
              >-</button>
              <input 
                type="number" 
                value={quantity} 
                onChange={(e) => setQuantity(Math.max(product.minOrder, parseInt(e.target.value) || product.minOrder))}
                style={{ width: '60px', textAlign: 'center', border: 'none', outline: 'none', borderLeft: '1px solid var(--color-border)', borderRight: '1px solid var(--color-border)' }}
              />
              <button 
                onClick={() => setQuantity(quantity + 1)}
                style={{ padding: '0.75rem 1rem', background: '#f3f4f6', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}
              >+</button>
            </div>
            
            <button 
              className={`btn ${added ? 'btn-secondary' : 'btn-primary'}`} 
              style={{ flex: 1, padding: '1rem' }}
              onClick={handleAddToCart}
            >
              {added ? <><CheckCircle size={20} /> Added to Cart</> : <><ShoppingCart size={20} /> Add to Cart (Min. {product.minOrder})</>}
            </button>
          </div>

          {/* Value Props */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-text-light)' }}>
              <Truck size={18} color="var(--color-primary)" /> Dispatch in 24 hrs
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-text-light)' }}>
              <ShieldCheck size={18} color="var(--color-success)" /> GST Invoice Available
            </div>
          </div>
        </div>
      </div>

      {/* Specifications */}
      <div className="container" style={{ marginBottom: '4rem' }}>
        <div className="card">
          <h2 style={{ marginBottom: '1.5rem' }}>Product Specifications</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            {Object.entries(product.specs).map(([key, val], idx) => (
              <div key={idx} style={{ display: 'flex', borderBottom: '1px solid var(--color-border)', paddingBottom: '0.5rem' }}>
                <span style={{ width: '150px', color: 'var(--color-text-light)' }}>{key}</span>
                <span style={{ fontWeight: '500' }}>{val}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Related Products Section */}
      <div className="container section" style={{ borderTop: '1px solid var(--color-border)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <h2 className="heading-section" style={{ margin: 0, textAlign: 'left' }}>Frequently Bought Together</h2>
        </div>
        
        <div className="grid-4">
          {allProducts.filter(p => p.id !== product.id).slice(0, 4).map(relatedProduct => (
            <ProductCard key={relatedProduct.id} product={relatedProduct} />
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ProductDetails;
