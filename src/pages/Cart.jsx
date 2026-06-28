import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, ArrowLeft, ArrowRight, ShieldCheck } from 'lucide-react';
import { useCart } from '../context/CartContext';
import Footer from '../components/Footer';

const Cart = () => {
  const { cart, total, updateQuantity, removeFromCart, clearCart } = useCart();
  const navigate = useNavigate();

  const gstPercentage = 5; // Example GST for groceries
  const gstAmount = (total * gstPercentage) / 100;
  const shipping = total > 5000 ? 0 : 500;
  const finalTotal = total + gstAmount + shipping;

  if (cart.length === 0) {
    return (
      <div className="container section" style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <h1 className="heading-section">Your Cart is Empty</h1>
        <p className="text-sub" style={{ marginBottom: '2rem' }}>Looks like you haven't added any wholesale products yet.</p>
        <Link to="/" className="btn btn-primary">Start Shopping</Link>
      </div>
    );
  }

  return (
    <div className="cart-page" style={{ backgroundColor: 'var(--color-bg)', minHeight: '100vh', paddingTop: '2rem' }}>
      <div className="container">
        <h1 className="heading-section" style={{ textAlign: 'left', marginBottom: '2rem' }}>Shopping Cart</h1>
        
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem', alignItems: 'start' }}>
          {/* Cart Items */}
          <div className="cart-items-container">
            <div className="card" style={{ padding: '0', overflow: 'hidden' }}>
              <div style={{ padding: '1rem 1.5rem', borderBottom: '1px solid var(--color-border)', backgroundColor: '#f9fafb', display: 'grid', gridTemplateColumns: '3fr 1fr 1fr 0.5fr', fontWeight: '600', color: 'var(--color-text-light)' }}>
                <span>Product</span>
                <span style={{ textAlign: 'center' }}>Quantity</span>
                <span style={{ textAlign: 'right' }}>Total</span>
                <span></span>
              </div>
              
              {cart.map((item) => (
                <div key={item.id} style={{ padding: '1.5rem', borderBottom: '1px solid var(--color-border)', display: 'grid', gridTemplateColumns: '3fr 1fr 1fr 0.5fr', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    <div style={{ width: '80px', height: '80px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)', overflow: 'hidden', padding: '0.5rem', backgroundColor: 'white' }}>
                      <img src={item.images ? item.images[0] : item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                    </div>
                    <div>
                      <Link to={`/product/${item.id}`} style={{ fontWeight: '600', display: 'block', marginBottom: '0.25rem', color: 'var(--color-text)' }}>{item.name}</Link>
                      <span style={{ fontSize: '0.875rem', color: 'var(--color-text-light)' }}>₹{item.wholesalePrice} / {item.unit}</span>
                      {item.quantity < item.minOrder && (
                        <div style={{ color: '#ef4444', fontSize: '0.75rem', marginTop: '0.25rem' }}>Min order: {item.minOrder}</div>
                      )}
                    </div>
                  </div>
                  
                  <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <div style={{ display: 'flex', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)', overflow: 'hidden', width: 'fit-content' }}>
                      <button onClick={() => updateQuantity(item.id, item.quantity - 1)} style={{ padding: '0.5rem', background: '#f3f4f6', border: 'none', cursor: 'pointer' }}>-</button>
                      <input 
                        type="number" 
                        value={item.quantity} 
                        onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 0)}
                        style={{ width: '40px', textAlign: 'center', border: 'none', outline: 'none', borderLeft: '1px solid var(--color-border)', borderRight: '1px solid var(--color-border)' }}
                      />
                      <button onClick={() => updateQuantity(item.id, item.quantity + 1)} style={{ padding: '0.5rem', background: '#f3f4f6', border: 'none', cursor: 'pointer' }}>+</button>
                    </div>
                  </div>
                  
                  <div style={{ textAlign: 'right', fontWeight: '700', color: 'var(--color-primary)' }}>
                    ₹{(item.wholesalePrice * item.quantity).toLocaleString()}
                  </div>
                  
                  <div style={{ textAlign: 'right' }}>
                    <button onClick={() => removeFromCart(item.id)} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer' }}>
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
              ))}
              
              <div style={{ padding: '1.5rem', display: 'flex', justifyContent: 'space-between', backgroundColor: '#f9fafb' }}>
                <Link to="/" className="btn btn-outline" style={{ padding: '0.5rem 1rem' }}><ArrowLeft size={16} style={{ marginRight: '0.5rem' }} /> Continue Shopping</Link>
                <button onClick={clearCart} className="btn" style={{ padding: '0.5rem 1rem', background: 'none', border: 'none', color: 'var(--color-text-light)', cursor: 'pointer' }}>Clear Cart</button>
              </div>
            </div>
          </div>
          
          {/* Order Summary */}
          <div className="cart-summary">
            <div className="card" style={{ position: 'sticky', top: '100px' }}>
              <h3 style={{ marginBottom: '1.5rem', fontSize: '1.25rem', borderBottom: '1px solid var(--color-border)', paddingBottom: '1rem' }}>Order Summary</h3>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--color-text-light)' }}>Subtotal</span>
                  <span style={{ fontWeight: '600' }}>₹{total.toLocaleString()}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--color-text-light)' }}>GST (5%)</span>
                  <span style={{ fontWeight: '600' }}>₹{gstAmount.toLocaleString()}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--color-text-light)' }}>Shipping</span>
                  <span style={{ fontWeight: '600' }}>
                    {shipping === 0 ? <span style={{ color: 'var(--color-success)' }}>Free</span> : `₹${shipping}`}
                  </span>
                </div>
                
                {shipping > 0 && (
                  <div style={{ fontSize: '0.75rem', color: 'var(--color-text-light)', background: '#f3f4f6', padding: '0.5rem', borderRadius: '4px' }}>
                    Add ₹{(5000 - total).toLocaleString()} more to your cart for free shipping!
                  </div>
                )}
              </div>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '2px dashed var(--color-border)', paddingTop: '1.5rem', marginBottom: '2rem' }}>
                <span style={{ fontSize: '1.125rem', fontWeight: '700' }}>Total Amount</span>
                <span style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--color-primary)' }}>₹{finalTotal.toLocaleString()}</span>
              </div>
              
              <button 
                className="btn btn-primary" 
                style={{ width: '100%', padding: '1rem', fontSize: '1.125rem' }}
                onClick={() => navigate('/checkout')}
              >
                Proceed to Checkout <ArrowRight size={20} style={{ marginLeft: '0.5rem' }} />
              </button>
              
              <div style={{ marginTop: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', color: 'var(--color-success)', fontSize: '0.875rem' }}>
                <ShieldCheck size={16} /> Safe & Secure B2B Checkout
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Cart;
