import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { CheckCircle } from 'lucide-react';
import Footer from '../components/Footer';

const Checkout = () => {
  const { cart, total, clearCart } = useCart();
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // 1: Address, 2: Payment, 3: Success

  const gstPercentage = 5;
  const gstAmount = (total * gstPercentage) / 100;
  const shipping = total > 5000 ? 0 : 500;
  const finalTotal = total + gstAmount + shipping;

  const [formData, setFormData] = useState({
    businessName: '',
    gstNumber: '',
    address: '',
    city: '',
    pincode: '',
    paymentMethod: 'upi'
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    // In a real app, send data to backend here
    setStep(3);
    clearCart();
  };

  if (cart.length === 0 && step !== 3) {
    navigate('/cart');
    return null;
  }

  return (
    <div className="checkout-page" style={{ backgroundColor: 'var(--color-bg)', minHeight: '100vh', paddingTop: '2rem' }}>
      <div className="container">
        {step === 3 ? (
          <div className="card" style={{ maxWidth: '600px', margin: '4rem auto', textAlign: 'center', padding: '4rem 2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem', color: 'var(--color-success)' }}>
              <CheckCircle size={80} />
            </div>
            <h1 style={{ marginBottom: '1rem' }}>Order Placed Successfully!</h1>
            <p className="text-sub" style={{ marginBottom: '2rem' }}>
              Your B2B wholesale order has been received. You will receive a confirmation email shortly.
            </p>
            <p style={{ marginBottom: '2rem', fontWeight: 'bold' }}>Order ID: #{Math.floor(100000 + Math.random() * 900000)}</p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
              <button className="btn btn-outline" onClick={() => navigate('/dashboard')}>Go to Dashboard</button>
              <button className="btn btn-primary" onClick={() => navigate('/')}>Continue Shopping</button>
            </div>
          </div>
        ) : (
          <>
            <h1 className="heading-section" style={{ textAlign: 'left', marginBottom: '2rem' }}>Checkout</h1>
            
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem', alignItems: 'start' }}>
              {/* Checkout Form */}
              <div className="card" style={{ padding: '2rem' }}>
                {step === 1 && (
                  <form onSubmit={() => setStep(2)}>
                    <h3 style={{ marginBottom: '1.5rem', paddingBottom: '0.5rem', borderBottom: '1px solid var(--color-border)' }}>1. Business Details</h3>
                    
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                      <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: '500' }}>Business Name *</label>
                        <input type="text" name="businessName" value={formData.businessName} onChange={handleInputChange} required style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)' }} />
                      </div>
                      <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: '500' }}>GST Number (Optional)</label>
                        <input type="text" name="gstNumber" value={formData.gstNumber} onChange={handleInputChange} style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)' }} />
                      </div>
                    </div>
                    
                    <div style={{ marginBottom: '1rem' }}>
                      <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: '500' }}>Shipping Address *</label>
                      <textarea name="address" value={formData.address} onChange={handleInputChange} required rows="3" style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)' }}></textarea>
                    </div>
                    
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
                      <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: '500' }}>City *</label>
                        <input type="text" name="city" value={formData.city} onChange={handleInputChange} required style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)' }} />
                      </div>
                      <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: '500' }}>Pincode *</label>
                        <input type="text" name="pincode" value={formData.pincode} onChange={handleInputChange} required style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)' }} />
                      </div>
                    </div>
                    
                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                      <button type="submit" className="btn btn-primary">Continue to Payment</button>
                    </div>
                  </form>
                )}
                
                {step === 2 && (
                  <form onSubmit={handlePlaceOrder}>
                    <h3 style={{ marginBottom: '1.5rem', paddingBottom: '0.5rem', borderBottom: '1px solid var(--color-border)' }}>2. Payment Method</h3>
                    
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
                      <label style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)', cursor: 'pointer' }}>
                        <input type="radio" name="paymentMethod" value="upi" checked={formData.paymentMethod === 'upi'} onChange={handleInputChange} />
                        <span style={{ fontWeight: '500' }}>UPI (Google Pay, PhonePe, Paytm)</span>
                      </label>
                      <label style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)', cursor: 'pointer' }}>
                        <input type="radio" name="paymentMethod" value="netbanking" checked={formData.paymentMethod === 'netbanking'} onChange={handleInputChange} />
                        <span style={{ fontWeight: '500' }}>Net Banking</span>
                      </label>
                      <label style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)', cursor: 'pointer' }}>
                        <input type="radio" name="paymentMethod" value="credit" checked={formData.paymentMethod === 'credit'} onChange={handleInputChange} />
                        <span style={{ fontWeight: '500' }}>Credit / Debit Card</span>
                      </label>
                    </div>
                    
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <button type="button" className="btn btn-outline" onClick={() => setStep(1)}>Back</button>
                      <button type="submit" className="btn btn-primary">Place Order (₹{finalTotal.toLocaleString()})</button>
                    </div>
                  </form>
                )}
              </div>
              
              {/* Order Summary Sidebar */}
              <div className="card" style={{ position: 'sticky', top: '100px' }}>
                <h3 style={{ marginBottom: '1.5rem', fontSize: '1.25rem', borderBottom: '1px solid var(--color-border)', paddingBottom: '1rem' }}>Order Summary</h3>
                
                <div style={{ marginBottom: '1.5rem', maxHeight: '300px', overflowY: 'auto' }}>
                  {cart.map(item => (
                    <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.875rem' }}>
                      <span>{item.quantity}x {item.name}</span>
                      <span>₹{(item.wholesalePrice * item.quantity).toLocaleString()}</span>
                    </div>
                  ))}
                </div>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem', borderTop: '1px solid var(--color-border)', paddingTop: '1rem' }}>
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
                </div>
                
                <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '2px dashed var(--color-border)', paddingTop: '1.5rem' }}>
                  <span style={{ fontSize: '1.125rem', fontWeight: '700' }}>Total Amount</span>
                  <span style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--color-primary)' }}>₹{finalTotal.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Checkout;
