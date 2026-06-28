import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import CategoryCard from '../components/CategoryCard';
import ProductCard from '../components/ProductCard';
import Footer from '../components/Footer';
import { Truck, ShieldCheck, Percent, Clock, Repeat, Headphones, Star, Smartphone, Download, CheckCircle, TrendingUp, Users, Globe } from 'lucide-react';
import { allProducts } from './Shop';

// Mock Data
const categories = [
  { id: 1, name: 'Vegetables', icon: '🥬', color: '#4CAF50' },
  { id: 4, name: 'Dal & Pulses', icon: '🥣', color: '#FF9800' },
  { id: 5, name: 'Spices', icon: '🌶️', color: '#E91E63' },
  { id: 7, name: 'Dry Fruits', icon: '🥜', color: '#795548' }
];

const featuredProducts = allProducts.slice(0, 8);

const benefits = [
  { icon: <Percent size={32} />, title: 'Bulk Discounts', desc: 'Get tiered pricing based on your order volume.' },
  { icon: <Truck size={32} />, title: 'Fast Delivery', desc: 'Next-day delivery for all major wholesale orders.' },
  { icon: <ShieldCheck size={32} />, title: 'Quality Guaranteed', desc: '100% genuine products sourced directly from farms & brands.' },
  { icon: <Clock size={32} />, title: '24/7 Ordering', desc: 'Place orders anytime through our app or website.' },
  { icon: <Repeat size={32} />, title: 'Easy Returns', desc: 'Hassle-free returns on damaged or incorrect items.' },
  { icon: <Headphones size={32} />, title: 'Dedicated Support', desc: 'Priority customer service for B2B partners.' }
];

const Home = () => {
  const [timeLeft, setTimeLeft] = useState({
    hours: 12,
    minutes: 45,
    seconds: 30
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 24, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="section hero" style={{ 
        position: 'relative', 
        overflow: 'hidden',
        background: 'linear-gradient(135deg, #F8FAF8 0%, #E8F5E9 100%)',
        paddingTop: '8rem',
        paddingBottom: '8rem'
      }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>
          <div className="hero-content">
            <motion.h1 
              className="heading-hero"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              Your Trusted <br/>
              <span style={{ color: 'var(--color-secondary)' }}>Wholesale</span> Grocery Partner
            </motion.h1>
            <motion.p 
              className="text-sub"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              style={{ marginBottom: '2rem', maxWidth: '500px' }}
            >
              Supplying Fresh Groceries, Daily Essentials, and Bulk Products at Competitive Wholesale Prices.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              style={{ display: 'flex', gap: '1rem' }}
            >
              <Link to="/shop">
                <button className="btn btn-primary">Shop Now</button>
              </Link>
              <Link to="/shop">
                <button className="btn btn-outline">Explore Categories</button>
              </Link>
            </motion.div>
          </div>
          
          <motion.div 
            className="hero-image"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            style={{ position: 'relative' }}
          >
            <div style={{
              width: '100%',
              height: '400px',
              borderRadius: 'var(--radius)',
              overflow: 'hidden',
              boxShadow: 'var(--shadow-premium)',
              backgroundColor: 'transparent'
            }}>
              <img 
                src="https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=800" 
                alt="Spices and Staples Display"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  mixBlendMode: 'multiply'
                }}
              />
            </div>
            
            {/* Floating Element */}
            <motion.div
              animate={{ y: [0, -15, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              style={{
                position: 'absolute',
                bottom: '-20px',
                left: '-20px',
                background: 'white',
                padding: '1.5rem',
                borderRadius: 'var(--radius)',
                boxShadow: 'var(--shadow-hover)',
                display: 'flex',
                alignItems: 'center',
                gap: '1rem'
              }}
            >
              <div style={{ background: '#dcfce7', padding: '0.5rem', borderRadius: '50%' }}>
                <ShieldCheck color="var(--color-success)" />
              </div>
              <div>
                <h4 style={{ margin: 0, fontSize: '1rem' }}>100% Quality</h4>
                <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--color-text-light)' }}>Guaranteed</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="section">
        <div className="container">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="heading-section">Shop by Category</h2>
            <div className="grid-4">
              {categories.map((category) => (
                <CategoryCard key={category.id} category={category} />
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="section" style={{ backgroundColor: 'white' }}>
        <div className="container">
          <div className="flex-between" style={{ marginBottom: '2rem' }}>
            <h2 className="heading-section" style={{ margin: 0 }}>Featured Products</h2>
            <Link to="/shop">
              <button className="btn btn-outline" style={{ padding: '0.5rem 1rem' }}>View All</button>
            </Link>
          </div>
          
          <div className="grid-4">
            {featuredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Deals of the Day */}
      <section className="section" style={{ backgroundColor: 'var(--color-bg)' }}>
        <div className="container">
          <div className="flex-between" style={{ marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
              <h2 className="heading-section" style={{ margin: 0 }}>Flash Wholesale Deals</h2>
              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                <span style={{ fontSize: '0.875rem', fontWeight: '500', color: '#ef4444' }}>Ends in:</span>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <div style={{ backgroundColor: '#ef4444', color: 'white', padding: '0.25rem 0.5rem', borderRadius: '4px', fontWeight: 'bold' }}>{String(timeLeft.hours).padStart(2, '0')}</div>
                  <span style={{ fontWeight: 'bold' }}>:</span>
                  <div style={{ backgroundColor: '#ef4444', color: 'white', padding: '0.25rem 0.5rem', borderRadius: '4px', fontWeight: 'bold' }}>{String(timeLeft.minutes).padStart(2, '0')}</div>
                  <span style={{ fontWeight: 'bold' }}>:</span>
                  <div style={{ backgroundColor: '#ef4444', color: 'white', padding: '0.25rem 0.5rem', borderRadius: '4px', fontWeight: 'bold' }}>{String(timeLeft.seconds).padStart(2, '0')}</div>
                </div>
              </div>
            </div>
            <button className="btn btn-outline" style={{ padding: '0.5rem 1rem' }}>View All Deals</button>
          </div>
          
          <div className="grid-4">
            {featuredProducts.slice(0, 4).map((product, index) => (
              <motion.div
                key={`deal-${product.id}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div style={{ position: 'relative' }}>
                  <div style={{ position: 'absolute', top: '10px', left: '10px', zIndex: 10, backgroundColor: '#ef4444', color: 'white', padding: '0.25rem 0.75rem', borderRadius: '4px', fontWeight: 'bold', fontSize: '0.875rem' }}>
                    Save {product.discount}%
                  </div>
                  <ProductCard product={product} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Wholesale Benefits Section */}
      <section className="section">
        <div className="container">
          <h2 className="heading-section">Why Choose DND Wholesale</h2>
          <div className="grid-3">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                className="card flex-center"
                style={{ flexDirection: 'column', textAlign: 'center', gap: '1rem' }}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div style={{ 
                  color: 'var(--color-primary)', 
                  backgroundColor: 'var(--color-bg)',
                  padding: '1rem',
                  borderRadius: '50%'
                }}>
                  {benefit.icon}
                </div>
                <h3>{benefit.title}</h3>
                <p className="text-sub" style={{ fontSize: '0.875rem' }}>{benefit.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="section" style={{ backgroundColor: 'var(--color-primary)', color: 'white', padding: '4rem 0' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '2rem', textAlign: 'center' }}>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
              <Users size={48} style={{ marginBottom: '1rem', opacity: 0.8 }} />
              <h3 style={{ fontSize: '2.5rem', margin: 0, color: 'white' }}>10k+</h3>
              <p style={{ color: '#a7f3d0', margin: 0 }}>Happy B2B Clients</p>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}>
              <Globe size={48} style={{ marginBottom: '1rem', opacity: 0.8 }} />
              <h3 style={{ fontSize: '2.5rem', margin: 0, color: 'white' }}>50+</h3>
              <p style={{ color: '#a7f3d0', margin: 0 }}>Cities Covered</p>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }}>
              <ShieldCheck size={48} style={{ marginBottom: '1rem', opacity: 0.8 }} />
              <h3 style={{ fontSize: '2.5rem', margin: 0, color: 'white' }}>500+</h3>
              <p style={{ color: '#a7f3d0', margin: 0 }}>Verified Brands</p>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.3 }}>
              <TrendingUp size={48} style={{ marginBottom: '1rem', opacity: 0.8 }} />
              <h3 style={{ fontSize: '2.5rem', margin: 0, color: 'white' }}>₹100Cr+</h3>
              <p style={{ color: '#a7f3d0', margin: 0 }}>Monthly Volume</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="section" style={{ backgroundColor: 'white' }}>
        <div className="container">
          <h2 className="heading-section">What Our Partners Say</h2>
          <div className="marquee-container">
            <div className="marquee-track">
              {[...Array(2)].map((_, loopIndex) => (
                <React.Fragment key={loopIndex}>
                  {[
                    { name: 'Ramesh Patel', role: 'Owner, FreshMart', review: 'DND Wholesale has completely streamlined our procurement. The quality is consistent and the prices are unbeatable.' },
                    { name: 'Sanjay Gupta', role: 'Manager, City Hotels', review: 'Their bulk delivery service is always on time. The B2B dashboard makes reordering our monthly staples a breeze.' },
                    { name: 'Anita Sharma', role: 'Catering Director', review: 'We rely on DND for all our bulk spices and pulses. The GST invoicing is automated and saves us hours of paperwork.' },
                    { name: 'Kiran Desai', role: 'Restaurant Owner', review: 'The quality of dry fruits and nuts is top-notch. Our customers love the premium taste, and the wholesale pricing helps our margins.' },
                    { name: 'Vikram Singh', role: 'Event Planner', review: 'Managing bulk orders for large events used to be a nightmare before DND. Their fast delivery and wide range of products saved us multiple times.' },
                    { name: 'Meera Reddy', role: 'Supermarket Manager', review: 'Excellent packaging and guaranteed freshness. The direct-from-farm approach really shows in the quality of their pulses.' }
                  ].map((testimonial, i) => (
                    <div key={i} className="card" style={{ width: '350px', whiteSpace: 'normal', flexShrink: 0 }}>
                      <div style={{ display: 'flex', color: '#f59e0b', marginBottom: '1rem' }}>
                        {[1, 2, 3, 4, 5].map(star => <Star key={star} size={16} fill="currentColor" />)}
                      </div>
                      <p style={{ fontSize: '1rem', fontStyle: 'italic', marginBottom: '1.5rem', color: 'var(--color-text)' }}>"{testimonial.review}"</p>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <div style={{ width: '40px', height: '40px', backgroundColor: 'var(--color-primary-light)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 'bold' }}>
                          {testimonial.name.charAt(0)}
                        </div>
                        <div>
                          <h4 style={{ margin: 0, fontSize: '0.875rem' }}>{testimonial.name}</h4>
                          <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--color-text-light)' }}>{testimonial.role}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mobile App Promotion */}
      <section className="section" style={{ backgroundColor: 'var(--color-bg)' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem', lineHeight: 1.2 }}>Manage Wholesale Orders on the Go!</h2>
            <p className="text-sub" style={{ marginBottom: '2rem' }}>Download the DND Wholesale App to track deliveries, manage multiple store addresses, and approve purchase orders directly from your phone.</p>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2.5rem' }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}><CheckCircle color="var(--color-primary)" size={20}/> Real-time stock alerts</li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}><CheckCircle color="var(--color-primary)" size={20}/> Instant GST invoice downloads</li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}><CheckCircle color="var(--color-primary)" size={20}/> 24/7 dedicated B2B chat support</li>
            </ul>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <button className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Smartphone size={20} /> App Store</button>
              <button className="btn btn-outline" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Download size={20} /> Google Play</button>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} style={{ display: 'flex', justifyContent: 'center' }}>
            <div style={{ width: '300px', height: '600px', backgroundColor: '#111827', borderRadius: '40px', border: '12px solid #1f2937', position: 'relative', overflow: 'hidden', boxShadow: '20px 20px 60px rgba(0,0,0,0.1)' }}>
              <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: '120px', height: '25px', backgroundColor: '#1f2937', borderBottomLeftRadius: '15px', borderBottomRightRadius: '15px', zIndex: 10 }}></div>
              <img src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&q=80&w=600" alt="App Preview" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.6 }} />
              <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center', width: '100%' }}>
                <h3 style={{ color: 'white', margin: 0, fontSize: '1.5rem' }}>DND Mobile</h3>
                <p style={{ color: '#a7f3d0' }}>Wholesale made easy</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="section" style={{ paddingBottom: '0' }}>
        <div className="container">
          <div className="card" style={{ 
            background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-light) 100%)',
            color: 'white',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            padding: '4rem 2rem'
          }}>
            <h2 style={{ color: 'white', marginBottom: '1rem', fontSize: '2rem' }}>Stay Updated with Daily Wholesale Prices</h2>
            <p style={{ color: '#a7f3d0', marginBottom: '2rem', maxWidth: '600px' }}>
              Subscribe to our newsletter to receive the latest market rates, special bulk discounts, and new product arrivals directly in your inbox.
            </p>
            <div style={{ display: 'flex', gap: '0.5rem', width: '100%', maxWidth: '500px' }}>
              <input 
                type="email" 
                placeholder="Enter your email address" 
                style={{ 
                  flex: 1, 
                  padding: '1rem', 
                  borderRadius: 'var(--radius-sm)', 
                  border: 'none',
                  outline: 'none',
                  fontSize: '1rem'
                }} 
              />
              <button className="btn btn-accent">Subscribe</button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
