import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, User, ArrowRight } from 'lucide-react';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';

export const blogPosts = [
  {
    id: 1,
    title: 'Navigating the 2024 Pulses Market: Trends and Predictions',
    category: 'Market Trends',
    date: 'June 15, 2026',
    author: 'Amit Desai',
    excerpt: 'With shifting weather patterns, the pulses market is expected to see significant price volatility. Here is how B2B buyers can hedge their procurement.',
    image: '/images/blog_pulses_market_1782584137550.png'
  },
  {
    id: 2,
    title: 'Top 5 Merchandising Tips for Supermarkets in Festive Seasons',
    category: 'Retailer Tips',
    date: 'June 10, 2026',
    author: 'Neha Sharma',
    excerpt: 'Maximize your floor space and drive impulse purchases during Diwali and Dasara with these proven merchandising strategies for FMCG products.',
    image: 'https://images.unsplash.com/photo-1534723452862-4c874018d66d?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 3,
    title: 'Why DND Premium Cashews are the Choice for Top Bakeries',
    category: 'Product Spotlight',
    date: 'June 5, 2026',
    author: 'Karan Singh',
    excerpt: 'An inside look at the sourcing, grading, and quality control processes that make our Premium Cashews the go-to choice for fine dining and baking.',
    image: '/images/cashew_nuts_1782576082471.png'
  },
  {
    id: 4,
    title: 'Understanding B2B Credit Limits and Bulk Financing',
    category: 'Finance',
    date: 'May 28, 2026',
    author: 'Priya Verma',
    excerpt: 'Learn how to leverage DND Wholesale credit lines to expand your inventory without disrupting your working capital.',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=600'
  }
];

const Blog = () => {
  return (
    <div className="blog-page" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <div style={{ backgroundColor: 'var(--color-primary)', color: 'white', padding: '4rem 0' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={{ fontSize: '2.5rem', marginBottom: '1rem', color: 'white' }}
          >
            DND Insights & Market Trends
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            style={{ color: '#a7f3d0', maxWidth: '600px', margin: '0 auto', fontSize: '1.125rem' }}
          >
            Stay ahead of the curve with expert analysis, retail tips, and supply chain updates tailored for B2B grocery businesses.
          </motion.p>
        </div>
      </div>

      <div className="container section" style={{ flex: 1, padding: '4rem 2rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '2rem' }}>
          {blogPosts.map((post, index) => (
            <motion.article 
              key={post.id} 
              className="card" 
              style={{ padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div style={{ height: '220px', overflow: 'hidden', position: 'relative' }}>
                <img 
                  src={post.image} 
                  alt={post.title} 
                  style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.3s ease' }} 
                  onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                  onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                />
                <div style={{ position: 'absolute', top: '1rem', left: '1rem', backgroundColor: 'var(--color-primary)', color: 'white', padding: '0.25rem 0.75rem', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 'bold' }}>
                  {post.category}
                </div>
              </div>
              
              <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <h2 style={{ fontSize: '1.25rem', marginBottom: '1rem', lineHeight: 1.4 }}>
                  <Link to={`/blog/${post.id}`} style={{ color: 'var(--color-text)', textDecoration: 'none' }}>
                    {post.title}
                  </Link>
                </h2>
                
                <p className="text-sub" style={{ fontSize: '0.875rem', marginBottom: '1.5rem', flex: 1 }}>
                  {post.excerpt}
                </p>
                
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--color-border)', paddingTop: '1rem', fontSize: '0.75rem', color: 'var(--color-text-light)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Calendar size={14} /> {post.date}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <User size={14} /> {post.author}
                  </div>
                </div>
                
                <Link to={`/blog/${post.id}`} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-primary)', fontWeight: '600', marginTop: '1rem', textDecoration: 'none' }}>
                  Read Full Article <ArrowRight size={16} />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Blog;
