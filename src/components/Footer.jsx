import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin } from 'lucide-react';
import './Footer.css';

const WhatsAppIcon = ({ size = 20 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" style={{ display: 'inline-block', verticalAlign: 'middle' }}>
    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.262 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.623-1.023-5.09-2.885-6.956C16.63 2.005 14.155.98 11.536.98c-5.438 0-9.862 4.371-9.866 9.802-.001 1.84.501 3.637 1.458 5.223L2.126 21.3l5.521-1.446zm11.367-7.051c-.07-.117-.257-.188-.539-.329-.281-.14-1.666-.822-1.924-.916-.258-.094-.446-.14-.633.14-.188.281-.727.916-.891 1.101-.163.188-.328.211-.609.071-.28-.14-1.185-.437-2.257-1.393-.834-.744-1.397-1.662-1.56-1.943-.164-.282-.018-.434.122-.574.127-.127.282-.328.422-.492.141-.164.188-.282.281-.47.094-.188.047-.353-.023-.493-.07-.14-.633-1.524-.868-2.088-.228-.55-.46-.475-.633-.484-.164-.008-.352-.01-.539-.01-.188 0-.493.07-.75.352-.258.282-.985.962-.985 2.348 0 1.386 1.008 2.722 1.149 2.91.14.188 1.984 3.029 4.81 4.249.672.291 1.2.464 1.611.596.675.214 1.289.184 1.774.111.541-.081 1.666-.681 1.9-.1338.234-.657.234-1.22.164-1.32-.07-.101-.258-.171-.539-.312z"/>
  </svg>
);

const InstagramIcon = ({ size = 20 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline-block', verticalAlign: 'middle' }}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <h2 className="footer-logo">DND Wholesale</h2>
            <p className="footer-desc">
              Your trusted partner for fresh groceries, daily essentials, and bulk products at competitive wholesale prices.
            </p>
            <div className="social-links" style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
              <a href="https://wa.me/919342626096" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" style={{ color: 'white' }}>
                <WhatsAppIcon size={18} />
              </a>
              <a href="mailto:dnd.studio.in@gmail.com" aria-label="Email" style={{ color: 'white' }}>
                <Mail size={18} />
              </a>
              <a href="https://www.instagram.com/the.dnd.studio" target="_blank" rel="noopener noreferrer" aria-label="Instagram" style={{ color: 'white' }}>
                <InstagramIcon size={18} />
              </a>
            </div>
          </div>
          
          <div className="footer-links">
            <h3>Quick Links</h3>
            <ul>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/shop">Shop by Category</Link></li>
              <li><Link to="/about">Wholesale Benefits</Link></li>
              <li><Link to="/shop">Latest Offers</Link></li>
              <li><Link to="/contact">Contact Us</Link></li>
            </ul>
          </div>
          
          <div className="footer-links">
            <h3>Policies</h3>
            <ul>
              <li><Link to="/policies?type=privacy">Privacy Policy</Link></li>
              <li><Link to="/policies?type=terms">Terms & Conditions</Link></li>
              <li><Link to="/policies?type=returns">Return Policy</Link></li>
              <li><Link to="/policies?type=shipping">Shipping Policy</Link></li>
              <li><Link to="/contact#faq">FAQs</Link></li>
            </ul>
          </div>
          
          <div className="footer-contact">
            <h3>Contact Info</h3>
            <ul>
              <li>
                <MapPin size={18} />
                <span>Chennai, Tamil Nadu</span>
              </li>
              <li>
                <Phone size={18} />
                <span>
                  <a href="tel:+919342626096" style={{ color: 'inherit', textDecoration: 'none', display: 'block' }}>+91 93426 26096</a>
                  <a href="tel:+919597574989" style={{ color: 'inherit', textDecoration: 'none', display: 'block' }}>+91 95975 74989</a>
                  <a href="tel:+916374160068" style={{ color: 'inherit', textDecoration: 'none', display: 'block' }}>+91 63741 60068</a>
                </span>
              </li>
              <li>
                <Mail size={18} />
                <a href="mailto:dnd.studio.in@gmail.com" style={{ color: 'inherit', textDecoration: 'none' }}>dnd.studio.in@gmail.com</a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} DND Wholesale. All rights reserved.</p>
          <div className="payment-methods">
            {/* Payment Icons placehoder */}
            <span className="payment-icon">Visa</span>
            <span className="payment-icon">Mastercard</span>
            <span className="payment-icon">UPI</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
