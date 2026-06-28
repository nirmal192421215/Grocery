import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Send, MessageCircle } from 'lucide-react';
import Footer from '../components/Footer';

const FaqItem = ({ faq }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div style={{ backgroundColor: 'white', border: '1px solid var(--color-border)', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.02)', marginBottom: '0.5rem' }}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        style={{ width: '100%', padding: '1.25rem 1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', fontWeight: '600', fontSize: '1rem', color: 'var(--color-text)', outline: 'none' }}
      >
        <span>{faq.q}</span>
        <span style={{ fontSize: '1.25rem', color: 'var(--color-primary)', transition: 'transform 0.2s', transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)' }}>＋</span>
      </button>
      {isOpen && (
        <div style={{ padding: '0 1.5rem 1.25rem', fontSize: '0.9375rem', lineHeight: 1.6, color: '#4b5563', borderTop: '1px solid #f3f4f6' }}>
          {faq.a}
        </div>
      )}
    </div>
  );
};

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    businessName: '',
    email: '',
    phone: '',
    message: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (window.location.hash === '#faq') {
      setTimeout(() => {
        const element = document.getElementById('faq');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate API call
    setTimeout(() => {
      setIsSubmitted(true);
      setFormData({ name: '', businessName: '', email: '', phone: '', message: '' });
    }, 1000);
  };

  return (
    <div className="contact-page" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      
      {/* Page Header */}
      <div style={{ backgroundColor: 'var(--color-primary)', color: 'white', padding: '3rem 0' }}>
        <div className="container">
          <h1 style={{ color: 'white', marginBottom: '1rem' }}>Contact Our Wholesale Team</h1>
          <p style={{ color: '#a7f3d0', maxWidth: '600px' }}>Have questions about bulk pricing, corporate accounts, or delivery? Our dedicated B2B support team is here to help.</p>
        </div>
      </div>

      <div className="container section grid-2" style={{ alignItems: 'start' }}>
        
        {/* Contact Info & Map */}
        <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
          <h2 style={{ fontSize: '2rem', marginBottom: '1.5rem' }}>Get in Touch</h2>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '2.5rem' }}>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
              <div style={{ backgroundColor: 'var(--color-bg)', padding: '0.75rem', borderRadius: '50%', color: 'var(--color-primary)' }}><MapPin size={24} /></div>
              <div>
                <h3 style={{ margin: '0 0 0.25rem', fontSize: '1.125rem' }}>Head Office / Main Warehouse</h3>
                <p className="text-sub" style={{ margin: 0 }}>Chennai, Tamil Nadu</p>
              </div>
            </div>
            
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
              <div style={{ backgroundColor: 'var(--color-bg)', padding: '0.75rem', borderRadius: '50%', color: 'var(--color-primary)' }}><Phone size={24} /></div>
              <div>
                <h3 style={{ margin: '0 0 0.25rem', fontSize: '1.125rem' }}>B2B Support Hotline</h3>
                <p className="text-sub" style={{ margin: 0 }}>
                  <a href="tel:+919342626096" style={{ color: 'inherit', textDecoration: 'none', display: 'block' }}>+91 93426 26096</a>
                  <a href="tel:+919597574989" style={{ color: 'inherit', textDecoration: 'none', display: 'block' }}>+91 95975 74989</a>
                  <a href="tel:+916374160068" style={{ color: 'inherit', textDecoration: 'none', display: 'block' }}>+91 63741 60068</a>
                </p>
              </div>
            </div>
            
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
              <div style={{ backgroundColor: 'var(--color-bg)', padding: '0.75rem', borderRadius: '50%', color: 'var(--color-primary)' }}><Mail size={24} /></div>
              <div>
                <h3 style={{ margin: '0 0 0.25rem', fontSize: '1.125rem' }}>Email Inquiries</h3>
                <p className="text-sub" style={{ margin: 0 }}>
                  <a href="mailto:dnd.studio.in@gmail.com" style={{ color: 'inherit', textDecoration: 'none' }}>dnd.studio.in@gmail.com</a>
                </p>
              </div>
            </div>
            
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
              <div style={{ backgroundColor: 'var(--color-bg)', padding: '0.75rem', borderRadius: '50%', color: 'var(--color-primary)' }}><Clock size={24} /></div>
              <div>
                <h3 style={{ margin: '0 0 0.25rem', fontSize: '1.125rem' }}>Business Hours</h3>
                <p className="text-sub" style={{ margin: 0 }}>Monday - Saturday: 6:00 AM - 8:00 PM<br/>Sunday: 6:00 AM - 2:00 PM</p>
              </div>
            </div>
          </div>

          {/* Google Maps Embed - Chennai */}
          <div style={{ width: '100%', height: '300px', borderRadius: 'var(--radius)', overflow: 'hidden', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-soft)' }}>
            <iframe
              title="DND Wholesale Location - Chennai"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d497511.23099555617!2d79.87867545!3d13.04821375!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5265ea4f7d3361%3A0x6e61a70b6863d433!2sChennai%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </motion.div>

        {/* Contact Form */}
        <motion.div className="card" style={{ padding: '2.5rem' }} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
          <h2 style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>Send an Inquiry</h2>
          <p className="text-sub" style={{ marginBottom: '2rem' }}>Fill out the form below and our sales team will contact you within 2 hours.</p>

          {isSubmitted ? (
            <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
              <div style={{ backgroundColor: '#dcfce7', width: '80px', height: '80px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', color: 'var(--color-success)' }}>
                <Send size={40} />
              </div>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Message Sent Successfully!</h3>
              <p className="text-sub" style={{ marginBottom: '2rem' }}>Thank you for reaching out. A wholesale representative will be in touch with you shortly.</p>
              <button className="btn btn-primary" onClick={() => setIsSubmitted(false)}>Send Another Message</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: '500' }}>Your Name *</label>
                  <input type="text" name="name" value={formData.name} onChange={handleChange} required style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)', outline: 'none' }} placeholder="John Doe" />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: '500' }}>Business Name *</label>
                  <input type="text" name="businessName" value={formData.businessName} onChange={handleChange} required style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)', outline: 'none' }} placeholder="ABC Supermart" />
                </div>
              </div>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: '500' }}>Email Address *</label>
                  <input type="email" name="email" value={formData.email} onChange={handleChange} required style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)', outline: 'none' }} placeholder="john@example.com" />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: '500' }}>Phone Number *</label>
                  <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)', outline: 'none' }} placeholder="+91 98765 43210" />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: '500' }}>How can we help? *</label>
                <textarea name="message" value={formData.message} onChange={handleChange} required rows="5" style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)', outline: 'none', resize: 'vertical' }} placeholder="Tell us about your bulk requirement..."></textarea>
              </div>
              
              <button type="submit" className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', padding: '1rem', fontSize: '1rem' }}>
                <MessageCircle size={20} /> Submit Inquiry
              </button>
            </form>
          )}
        </motion.div>
      </div>

      {/* FAQ Section */}
      <section style={{ backgroundColor: '#f9fafb', padding: '5rem 0', borderTop: '1px solid var(--color-border)' }} id="faq">
        <div className="container" style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '2.25rem', fontWeight: '800', textAlign: 'center', marginBottom: '3rem', color: 'var(--color-text)' }}>Frequently Asked Questions</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {[
              {
                q: 'What is the minimum order quantity (MOQ) for bulk orders?',
                a: 'To maintain wholesale pricing, Staples, Dals, and Spices carry specific MOQs (like 5kg). Dry Fruits like Cashew Nuts or Pistachios have a lower MOQ of 1kg. Specific MOQ requirements are listed clearly on each product card.'
              },
              {
                q: 'What delivery options do you offer in Chennai?',
                a: 'We offer free delivery within Chennai on wholesale orders exceeding ₹5,000. Orders placed before 11:00 AM qualify for same-day delivery. Self-pickup from our central fulfillment warehouse is also available within 4 hours of order confirmation.'
              },
              {
                q: 'How do I download my GST-compliant invoices?',
                a: 'All invoices are automatically generated with your registered business GSTIN. You can view, print, or download invoices directly from your B2B account dashboard under the orders history tab.'
              },
              {
                q: 'Can I apply for credit terms on corporate accounts?',
                a: 'Yes, corporate accounts can apply for standard net-15 or net-30 credit terms. Simply contact our compliance and credit desk via support or submit a corporate request form in the Dashboard.'
              }
            ].map((faq, i) => (
              <FaqItem key={i} faq={faq} />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
