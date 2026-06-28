import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, Building, FileText, CheckCircle } from 'lucide-react';
import Footer from '../components/Footer';

const Register = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    businessName: '',
    businessType: 'Retailer',
    gstin: '',
    contactName: '',
    email: '',
    phone: '',
    password: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNext = (e) => {
    e.preventDefault();
    setStep(2);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate API call for standalone frontend sample
    localStorage.setItem('user', JSON.stringify({ name: formData.contactName, role: 'user' }));
    setStep(3);
  };

  return (
    <div className="register-page" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--color-bg)' }}>
      <div className="container" style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '4rem 2rem' }}>
        
        {step === 3 ? (
          <div className="card" style={{ width: '100%', maxWidth: '500px', padding: '3rem', textAlign: 'center' }}>
            <div style={{ backgroundColor: '#dcfce7', width: '80px', height: '80px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', color: 'var(--color-success)' }}>
              <CheckCircle size={40} />
            </div>
            <h2 style={{ marginBottom: '1rem' }}>Application Submitted!</h2>
            <p className="text-sub" style={{ marginBottom: '2rem' }}>
              Thank you for applying for a DND Wholesale account. Our team is reviewing your GSTIN and business details. You will receive an approval email within 24 hours.
            </p>
            <button className="btn btn-primary" onClick={() => navigate('/')}>Return Home</button>
          </div>
        ) : (
          <div className="card" style={{ width: '100%', maxWidth: '600px', padding: '2.5rem' }}>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
              <h1 style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>Partner with Us</h1>
              <p className="text-sub">Apply for a B2B wholesale account.</p>
              
              <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '1.5rem' }}>
                <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: step === 1 ? 'var(--color-primary)' : 'var(--color-border)' }}></div>
                <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: step === 2 ? 'var(--color-primary)' : 'var(--color-border)' }}></div>
              </div>
            </div>

            {step === 1 && (
              <form onSubmit={handleNext} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <h3 style={{ fontSize: '1.125rem', margin: 0, paddingBottom: '0.5rem', borderBottom: '1px solid var(--color-border)' }}>Business Details</h3>
                
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: '500' }}>Legal Business Name *</label>
                  <div style={{ position: 'relative' }}>
                    <Building size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-light)' }} />
                    <input type="text" name="businessName" value={formData.businessName} onChange={handleChange} required style={{ width: '100%', padding: '0.75rem 1rem 0.75rem 2.5rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)', outline: 'none' }} placeholder="e.g. FreshMart Grocers" />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: '500' }}>Business Type *</label>
                    <select name="businessType" value={formData.businessType} onChange={handleChange} style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)', outline: 'none', backgroundColor: 'white' }}>
                      <option value="Retailer">Retailer / Supermarket</option>
                      <option value="Hotel">Hotel / Restaurant</option>
                      <option value="Caterer">Caterer</option>
                      <option value="Other">Other B2B</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: '500' }}>GSTIN Number *</label>
                    <div style={{ position: 'relative' }}>
                      <FileText size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-light)' }} />
                      <input type="text" name="gstin" value={formData.gstin} onChange={handleChange} required style={{ width: '100%', padding: '0.75rem 1rem 0.75rem 2.5rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)', outline: 'none' }} placeholder="22AAAAA0000A1Z5" />
                    </div>
                  </div>
                </div>

                <button type="submit" className="btn btn-primary" style={{ padding: '1rem', marginTop: '1rem' }}>Continue to Next Step</button>
              </form>
            )}

            {step === 2 && (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <h3 style={{ fontSize: '1.125rem', margin: 0, paddingBottom: '0.5rem', borderBottom: '1px solid var(--color-border)' }}>Account Creator</h3>
                
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: '500' }}>Full Name *</label>
                  <div style={{ position: 'relative' }}>
                    <User size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-light)' }} />
                    <input type="text" name="contactName" value={formData.contactName} onChange={handleChange} required style={{ width: '100%', padding: '0.75rem 1rem 0.75rem 2.5rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)', outline: 'none' }} placeholder="John Doe" />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: '500' }}>Email Address *</label>
                    <div style={{ position: 'relative' }}>
                      <Mail size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-light)' }} />
                      <input type="email" name="email" value={formData.email} onChange={handleChange} required style={{ width: '100%', padding: '0.75rem 1rem 0.75rem 2.5rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)', outline: 'none' }} placeholder="john@business.com" />
                    </div>
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: '500' }}>Password *</label>
                    <div style={{ position: 'relative' }}>
                      <Lock size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-light)' }} />
                      <input type="password" name="password" value={formData.password} onChange={handleChange} required style={{ width: '100%', padding: '0.75rem 1rem 0.75rem 2.5rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)', outline: 'none' }} placeholder="••••••••" />
                    </div>
                  </div>
                </div>
                
                <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                  <button type="button" className="btn btn-outline" style={{ flex: 1 }} onClick={() => setStep(1)}>Back</button>
                  <button type="submit" className="btn btn-primary" style={{ flex: 2 }}>Submit Application</button>
                </div>
              </form>
            )}

            <div style={{ textAlign: 'center', marginTop: '2rem', fontSize: '0.875rem' }}>
              <span style={{ color: 'var(--color-text-light)' }}>Already have an account? </span>
              <Link to="/login" style={{ color: 'var(--color-primary)', fontWeight: '600' }}>Sign In</Link>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Register;
