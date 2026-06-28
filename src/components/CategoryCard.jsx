import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import './CategoryCard.css';

const CategoryCard = ({ category }) => {
  return (
    <Link to={`/shop?category=${encodeURIComponent(category.name)}`} style={{ textDecoration: 'none', color: 'inherit' }}>
      <motion.div 
        className="category-card"
        whileHover={{ y: -10 }}
        transition={{ duration: 0.3 }}
      >
        <div className="category-icon-wrapper" style={{ backgroundColor: category.color + '20' }}>
          <span className="category-emoji" style={{ fontSize: '3rem' }}>{category.icon}</span>
        </div>
        <h3 className="category-name">{category.name}</h3>
        <div className="category-action">
          <span className="category-link">Explore</span>
          <ArrowRight size={16} className="category-arrow" />
        </div>
      </motion.div>
    </Link>
  );
};

export default CategoryCard;
