import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Trash2, ShoppingCart } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import Footer from '../components/Footer';

const Wishlist = () => {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  const handleMoveToCart = (product) => {
    addToCart(product, product.minOrder || 1);
    removeFromWishlist(product.id);
  };

  return (
    <div className="wishlist-page" style={{ backgroundColor: 'var(--color-bg)', minHeight: '100vh', paddingTop: '2rem' }}>
      <div className="container" style={{ minHeight: '60vh' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
          <Heart size={32} color="var(--color-primary)" fill="var(--color-primary)" />
          <h1 className="heading-section" style={{ margin: 0, textAlign: 'left' }}>My Wishlist</h1>
        </div>

        {wishlist.length === 0 ? (
          <div className="card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '4rem 2rem', textAlign: 'center' }}>
            <Heart size={64} style={{ color: 'var(--color-border)', marginBottom: '1rem' }} />
            <h3 style={{ marginBottom: '0.5rem' }}>Your wishlist is empty</h3>
            <p className="text-sub" style={{ marginBottom: '2rem' }}>Save items you want to buy later by clicking the heart icon.</p>
            <Link to="/shop" className="btn btn-primary">Browse Products</Link>
          </div>
        ) : (
          <div className="card" style={{ padding: '0', overflow: 'hidden' }}>
            <div style={{ padding: '1rem 1.5rem', borderBottom: '1px solid var(--color-border)', backgroundColor: '#f9fafb', display: 'grid', gridTemplateColumns: '3fr 1fr 1fr', fontWeight: '600', color: 'var(--color-text-light)' }}>
              <span>Product Details</span>
              <span style={{ textAlign: 'center' }}>Price</span>
              <span style={{ textAlign: 'right' }}>Actions</span>
            </div>

            {wishlist.map((item) => (
              <div key={item.id} style={{ padding: '1.5rem', borderBottom: '1px solid var(--color-border)', display: 'grid', gridTemplateColumns: '3fr 1fr 1fr', alignItems: 'center', gap: '1rem' }}>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                  <div style={{ width: '80px', height: '80px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)', overflow: 'hidden', padding: '0.5rem', backgroundColor: 'white' }}>
                    <img src={item.images ? item.images[0] : item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                  </div>
                  <div>
                    <Link to={`/product/${item.id}`} style={{ fontWeight: '600', display: 'block', marginBottom: '0.25rem', color: 'var(--color-text)' }}>{item.name}</Link>
                    <span style={{ fontSize: '0.875rem', color: 'var(--color-text-light)' }}>Unit: {item.unit} | Min Order: {item.minOrder}</span>
                    <br />
                    {item.inStock ? (
                      <span style={{ fontSize: '0.75rem', color: 'var(--color-success)', fontWeight: 'bold' }}>In Stock</span>
                    ) : (
                      <span style={{ fontSize: '0.75rem', color: '#ef4444', fontWeight: 'bold' }}>Out of Stock</span>
                    )}
                  </div>
                </div>

                <div style={{ textAlign: 'center', fontWeight: '700', color: 'var(--color-primary)' }}>
                  ₹{item.wholesalePrice}
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
                  <button 
                    className="btn btn-primary"
                    style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}
                    onClick={() => handleMoveToCart(item)}
                    disabled={!item.inStock}
                  >
                    <ShoppingCart size={16} /> Move to Cart
                  </button>
                  <button 
                    onClick={() => removeFromWishlist(item.id)} 
                    style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', padding: '0.5rem' }}
                    title="Remove from wishlist"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Wishlist;
