import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, User, ChevronRight, ArrowLeft } from 'lucide-react';
import Footer from '../components/Footer';
import { blogPosts } from './Blog';

const BlogPost = () => {
  const { id } = useParams();
  
  const post = blogPosts.find(p => p.id === parseInt(id));
  
  if (!post) {
    return <div className="container section" style={{ textAlign: 'center', padding: '4rem 0' }}><h2>Post not found</h2><Link to="/blog" className="btn btn-primary" style={{ marginTop: '1rem' }}>Return to Blog</Link></div>;
  }

  return (
    <div className="blog-post-page" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <div className="container" style={{ padding: '2rem', display: 'flex', gap: '0.5rem', alignItems: 'center', fontSize: '0.875rem', color: 'var(--color-text-light)' }}>
        <Link to="/">Home</Link> <ChevronRight size={14} /> 
        <Link to="/blog">Blog</Link> <ChevronRight size={14} /> 
        <span style={{ color: 'var(--color-text)', fontWeight: '600' }}>{post.category}</span>
      </div>

      <div className="container" style={{ maxWidth: '800px', marginBottom: '4rem' }}>
        <Link to="/blog" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-primary)', textDecoration: 'none', marginBottom: '2rem', fontWeight: '500' }}>
          <ArrowLeft size={16} /> Back to all articles
        </Link>
        
        <div style={{ marginBottom: '2rem' }}>
          <div style={{ display: 'inline-block', backgroundColor: 'var(--color-primary-light)', color: 'white', padding: '0.25rem 0.75rem', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 'bold', marginBottom: '1rem' }}>
            {post.category}
          </div>
          <h1 style={{ fontSize: '2.5rem', lineHeight: '1.3', marginBottom: '1rem' }}>{post.title}</h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', color: 'var(--color-text-light)', fontSize: '0.875rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Calendar size={16} /> {post.date}</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><User size={16} /> By {post.author}</div>
          </div>
        </div>

        <div style={{ width: '100%', height: '400px', borderRadius: 'var(--radius)', overflow: 'hidden', marginBottom: '2rem' }}>
          <img src={post.image} alt={post.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>

        <div className="post-content" style={{ fontSize: '1.125rem', lineHeight: '1.8', color: 'var(--color-text)' }}>
          <p style={{ fontSize: '1.25rem', fontWeight: '500', marginBottom: '2rem' }}>{post.excerpt}</p>
          <p style={{ marginBottom: '1.5rem' }}>
            The agricultural market is constantly evolving, and keeping up with the latest trends is essential for success. This detailed breakdown explores how you can leverage these changes to optimize your procurement strategy and maximize profitability.
          </p>
          <p style={{ marginBottom: '1.5rem' }}>
            Whether you are managing a small retail outlet or a large-scale hospitality operation, understanding the nuances of supply and demand for essential commodities is key to staying ahead of the competition. 
          </p>
          <h2 style={{ fontSize: '1.5rem', marginTop: '2.5rem', marginBottom: '1rem' }}>Strategic Takeaways</h2>
          <ul style={{ listStyleType: 'disc', paddingLeft: '2rem', marginBottom: '1.5rem' }}>
            <li style={{ marginBottom: '0.5rem' }}>Monitor seasonal shifts and plan bulk purchases accordingly.</li>
            <li style={{ marginBottom: '0.5rem' }}>Leverage our B2B dashboard for predictive analytics on pricing.</li>
            <li style={{ marginBottom: '0.5rem' }}>Diversify your inventory to mitigate supply chain risks.</li>
          </ul>
          <p>
            For more personalized advice, don't hesitate to reach out to your dedicated DND Wholesale account manager.
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BlogPost;
