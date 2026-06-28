import React, { useState, useEffect, useMemo } from 'react';
import { Search, Filter, ChevronDown, SlidersHorizontal, X, Loader } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import Footer from '../components/Footer';

// Hardcoded mock data for the standalone sample
export const allProducts = [
  { id: 1, name: 'Cashew Nuts', unit: '1 kg', wholesalePrice: 780, retailPrice: 900, minOrder: '1 kg', discount: 0, category: 'Dry Fruits', brand: 'NutriChoice', inStock: true, image: '/images/cashew_nuts_1782576082471.png' },
  { id: 2, name: 'Pistachios', unit: '1 kg', wholesalePrice: 980, retailPrice: 1100, minOrder: '1 kg', discount: 0, category: 'Dry Fruits', brand: 'NutriChoice', inStock: true, image: '/images/pistachios_1782576093420.png' },
  { id: 3, name: 'Garlic', unit: '1 kg', wholesalePrice: 140, retailPrice: 180, minOrder: '5 kg', discount: 0, category: 'Vegetables', brand: 'FarmFresh', inStock: true, image: '/images/garlic_1782576104041.png' },
  { id: 4, name: 'Red Chilli', unit: '1 kg', wholesalePrice: 220, retailPrice: 280, minOrder: '5 kg', discount: 0, category: 'Spices', brand: 'SpiceKing', inStock: true, image: '/images/red_chilli_1782576115654.png' },
  { id: 5, name: 'Cinnamon', unit: '1 kg', wholesalePrice: 480, retailPrice: 550, minOrder: '1 kg', discount: 0, category: 'Spices', brand: 'SpiceKing', inStock: true, image: '/images/cinnamon_sticks_1782576129851.png' },
  { id: 6, name: 'Black Pepper', unit: '1 kg', wholesalePrice: 580, retailPrice: 650, minOrder: '1 kg', discount: 0, category: 'Spices', brand: 'SpiceKing', inStock: true, image: '/images/black_pepper_1782576143806.png' },
  { id: 7, name: 'Green Cardamom', unit: '1 kg', wholesalePrice: 1450, retailPrice: 1600, minOrder: '1 kg', discount: 0, category: 'Spices', brand: 'SpiceKing', inStock: true, image: '/images/green_cardamom_1782576556431.png' },
  { id: 8, name: 'Star Anise', unit: '1 kg', wholesalePrice: 950, retailPrice: 1100, minOrder: '1 kg', discount: 0, category: 'Spices', brand: 'SpiceKing', inStock: true, image: '/images/star_anise_1782576570070.png' },
  { id: 9, name: 'Peanuts', unit: '1 kg', wholesalePrice: 110, retailPrice: 140, minOrder: '5 kg', discount: 0, category: 'Dry Fruits', brand: 'NutriChoice', inStock: true, image: '/images/peanuts_1782576582675.png' },
  { id: 10, name: 'Mixed Pulses', unit: '1 kg', wholesalePrice: 160, retailPrice: 200, minOrder: '5 kg', discount: 0, category: 'Dal & Pulses', brand: 'FarmFresh', inStock: true, image: '/images/mixed_pulses_1782576593093.png' },
  { id: 11, name: 'Cloves', unit: '1 kg', wholesalePrice: 920, retailPrice: 1050, minOrder: '1 kg', discount: 0, category: 'Spices', brand: 'SpiceKing', inStock: true, image: '/images/cloves_1782576604410.png' },
  { id: 12, name: 'Fennel Seeds', unit: '1 kg', wholesalePrice: 180, retailPrice: 220, minOrder: '5 kg', discount: 0, category: 'Spices', brand: 'SpiceKing', inStock: true, image: '/images/fennel_seeds_1782576615947.png' },
  { id: 13, name: 'Cumin Seeds', unit: '1 kg', wholesalePrice: 320, retailPrice: 380, minOrder: '2 kg', discount: 0, category: 'Spices', brand: 'SpiceKing', inStock: true, image: '/images/cumin_seeds_1782576626641.png' },
  { id: 14, name: 'Mustard Seeds', unit: '1 kg', wholesalePrice: 120, retailPrice: 150, minOrder: '5 kg', discount: 0, category: 'Spices', brand: 'SpiceKing', inStock: true, image: '/images/mustard_seeds_1782576636886.png' },
  { id: 15, name: 'Makhana (Fox Nuts)', unit: '1 kg', wholesalePrice: 850, retailPrice: 1000, minOrder: '1 kg', discount: 0, category: 'Dry Fruits', brand: 'NutriChoice', inStock: true, image: '/images/makhana_1782576995814.png' },
  { id: 16, name: 'Chana Dal', unit: '1 kg', wholesalePrice: 95, retailPrice: 120, minOrder: '5 kg', discount: 0, category: 'Dal & Pulses', brand: 'FarmFresh', inStock: true, image: '/images/chana_dal_1782577007690.png' },
  { id: 17, name: 'Moong Dal', unit: '1 kg', wholesalePrice: 125, retailPrice: 150, minOrder: '5 kg', discount: 0, category: 'Dal & Pulses', brand: 'FarmFresh', inStock: true, image: '/images/moong_dal_1782579162854.png' },
  { id: 18, name: 'Urad Dal', unit: '1 kg', wholesalePrice: 120, retailPrice: 145, minOrder: '5 kg', discount: 0, category: 'Dal & Pulses', brand: 'FarmFresh', inStock: true, image: '/images/urad_dal_1782579179050.png' },
  { id: 19, name: 'Toor Dal', unit: '1 kg', wholesalePrice: 130, retailPrice: 160, minOrder: '5 kg', discount: 0, category: 'Dal & Pulses', brand: 'FarmFresh', inStock: true, image: '/images/toor_dal_1782579191154.png' },
  { id: 20, name: 'Masoor Dal', unit: '1 kg', wholesalePrice: 115, retailPrice: 140, minOrder: '5 kg', discount: 0, category: 'Dal & Pulses', brand: 'FarmFresh', inStock: true, image: '/images/masoor_dal_1782579202363.png' },
  { id: 21, name: 'Kabuli Chana', unit: '1 kg', wholesalePrice: 110, retailPrice: 135, minOrder: '5 kg', discount: 0, category: 'Dal & Pulses', brand: 'FarmFresh', inStock: true, image: '/images/kabuli_chana_1782579878703.png' },
  { id: 22, name: 'Kala Chana', unit: '1 kg', wholesalePrice: 95, retailPrice: 120, minOrder: '5 kg', discount: 0, category: 'Dal & Pulses', brand: 'FarmFresh', inStock: true, image: '/images/kala_chana_1782579893936.png' },
  { id: 23, name: 'Green Peas (Dry)', unit: '1 kg', wholesalePrice: 90, retailPrice: 115, minOrder: '5 kg', discount: 0, category: 'Dal & Pulses', brand: 'FarmFresh', inStock: true, image: '/images/green_peas_dry_1782580841288.png' },
  { id: 24, name: 'White Peas', unit: '1 kg', wholesalePrice: 85, retailPrice: 110, minOrder: '5 kg', discount: 0, category: 'Dal & Pulses', brand: 'FarmFresh', inStock: true, image: '/images/white_peas_1782580856289.png' },
  { id: 25, name: 'Rajma (Red Kidney Beans)', unit: '1 kg', wholesalePrice: 160, retailPrice: 200, minOrder: '5 kg', discount: 0, category: 'Dal & Pulses', brand: 'FarmFresh', inStock: true, image: '/images/rajma_1782580886247.png' },
  { id: 26, name: 'Soybeans', unit: '1 kg', wholesalePrice: 75, retailPrice: 95, minOrder: '5 kg', discount: 0, category: 'Dal & Pulses', brand: 'FarmFresh', inStock: true, image: '/images/soybeans_1782580903992.png' }
];

const categories = ['All', 'Vegetables', 'Dal & Pulses', 'Spices', 'Dry Fruits'];
const brands = ['All', 'DND Premium', 'SunPure', 'FarmFresh', 'SpiceKing', 'NutriChoice'];

const Shop = () => {
  const [products, setProducts] = useState(allProducts);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || 'All';
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedBrand, setSelectedBrand] = useState('All');
  const [showInStockOnly, setShowInStockOnly] = useState(false);
  const [sortBy, setSortBy] = useState('featured');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  useEffect(() => {
    const categoryFromQuery = searchParams.get('category');
    if (categoryFromQuery) {
      setSelectedCategory(categoryFromQuery);
    }
  }, [searchParams]);

  // Filtering & Sorting Logic
  const filteredProducts = useMemo(() => {
    let result = products;

    // Search
    if (searchQuery) {
      result = result.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()));
    }

    // Category
    if (selectedCategory !== 'All') {
      result = result.filter(p => p.category === selectedCategory);
    }

    // Brand
    if (selectedBrand !== 'All') {
      result = result.filter(p => p.brand === selectedBrand);
    }

    // Availability
    if (showInStockOnly) {
      result = result.filter(p => p.inStock);
    }

    // Sorting
    if (sortBy === 'price-low') {
      result.sort((a, b) => a.wholesalePrice - b.wholesalePrice);
    } else if (sortBy === 'price-high') {
      result.sort((a, b) => b.wholesalePrice - a.wholesalePrice);
    } else if (sortBy === 'name-asc') {
      result.sort((a, b) => a.name.localeCompare(b.name));
    }

    // Sort
    if (sortBy === 'price-low') {
      result = [...result].sort((a, b) => a.wholesalePrice - b.wholesalePrice);
    } else if (sortBy === 'price-high') {
      result = [...result].sort((a, b) => b.wholesalePrice - a.wholesalePrice);
    } else if (sortBy === 'discount') {
      result = [...result].sort((a, b) => (b.discount || 0) - (a.discount || 0));
    }

    return result;
  }, [searchQuery, selectedCategory, selectedBrand, showInStockOnly, sortBy, products]);

  return (
    <div className="shop-page" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      
      {/* Page Header */}
      <div style={{ backgroundColor: 'var(--color-primary)', color: 'white', padding: '3rem 0' }}>
        <div className="container">
          <h1 style={{ color: 'white', marginBottom: '1rem' }}>Wholesale Catalog</h1>
          <p style={{ color: '#a7f3d0', maxWidth: '600px' }}>Browse our extensive catalog of premium grocery products available at B2B wholesale prices.</p>
        </div>
      </div>

      <div className="container" style={{ flex: 1, padding: '3rem 2rem', display: 'grid', gridTemplateColumns: '250px 1fr', gap: '2rem' }}>
        
        {/* Mobile Filter Toggle */}
        <div style={{ display: 'none', gridColumn: '1 / -1', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }} className="mobile-filter-header">
          <button className="btn btn-outline" onClick={() => setIsMobileFilterOpen(true)} style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            <SlidersHorizontal size={18} /> Filters
          </button>
          <span style={{ fontSize: '0.875rem', fontWeight: '500' }}>{filteredProducts.length} Results</span>
        </div>

        {/* Sidebar Filters */}
        <aside className={`shop-sidebar ${isMobileFilterOpen ? 'open' : ''}`} style={{ backgroundColor: 'white', borderRight: '1px solid var(--color-border)', paddingRight: '2rem' }}>
          
          <div className="sidebar-close-btn" style={{ display: 'none', justifyContent: 'flex-end', marginBottom: '1rem' }}>
            <button onClick={() => setIsMobileFilterOpen(false)} style={{ background: 'none', border: 'none' }}><X size={24} /></button>
          </div>

          <div style={{ marginBottom: '2rem' }}>
            <h3 style={{ fontSize: '0.875rem', fontWeight: '700', marginBottom: '0.875rem', paddingBottom: '0.5rem', borderBottom: '2px solid var(--color-primary)', color: 'var(--color-text)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Categories</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
              {categories.map(cat => (
                <label 
                  key={cat} 
                  style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '0.75rem', 
                    cursor: 'pointer', 
                    padding: '0.5rem 0.75rem', 
                    backgroundColor: selectedCategory === cat ? '#e8f5e9' : 'transparent', 
                    color: selectedCategory === cat ? 'var(--color-primary)' : 'var(--color-text)',
                    fontWeight: selectedCategory === cat ? '600' : '400',
                    borderRadius: '8px',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    if (selectedCategory !== cat) e.currentTarget.style.backgroundColor = '#f9fafb';
                  }}
                  onMouseLeave={(e) => {
                    if (selectedCategory !== cat) e.currentTarget.style.backgroundColor = 'transparent';
                  }}
                >
                  <input
                    type="radio"
                    name="category"
                    checked={selectedCategory === cat}
                    onChange={() => setSelectedCategory(cat)}
                    style={{ width: '16px', height: '16px', accentColor: 'var(--color-primary)', flexShrink: 0, margin: 0, cursor: 'pointer' }}
                  />
                  <span style={{ fontSize: '0.875rem', userSelect: 'none' }}>{cat}</span>
                </label>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: '2rem' }}>
            <h3 style={{ fontSize: '0.875rem', fontWeight: '700', marginBottom: '0.875rem', paddingBottom: '0.5rem', borderBottom: '2px solid var(--color-primary)', color: 'var(--color-text)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Brands</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
              {brands.map(brand => (
                <label 
                  key={brand} 
                  style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '0.75rem', 
                    cursor: 'pointer', 
                    padding: '0.5rem 0.75rem', 
                    backgroundColor: selectedBrand === brand ? '#e8f5e9' : 'transparent', 
                    color: selectedBrand === brand ? 'var(--color-primary)' : 'var(--color-text)',
                    fontWeight: selectedBrand === brand ? '600' : '400',
                    borderRadius: '8px',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    if (selectedBrand !== brand) e.currentTarget.style.backgroundColor = '#f9fafb';
                  }}
                  onMouseLeave={(e) => {
                    if (selectedBrand !== brand) e.currentTarget.style.backgroundColor = 'transparent';
                  }}
                >
                  <input
                    type="radio"
                    name="brand"
                    checked={selectedBrand === brand}
                    onChange={() => setSelectedBrand(brand)}
                    style={{ width: '16px', height: '16px', accentColor: 'var(--color-primary)', flexShrink: 0, margin: 0, cursor: 'pointer' }}
                  />
                  <span style={{ fontSize: '0.875rem', userSelect: 'none' }}>{brand}</span>
                </label>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: '2rem' }}>
            <h3 style={{ fontSize: '0.875rem', fontWeight: '700', marginBottom: '0.875rem', paddingBottom: '0.5rem', borderBottom: '2px solid var(--color-primary)', color: 'var(--color-text)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Availability</h3>
            <label 
              style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '0.75rem', 
                cursor: 'pointer', 
                padding: '0.5rem 0.75rem', 
                backgroundColor: showInStockOnly ? '#e8f5e9' : 'transparent', 
                color: showInStockOnly ? 'var(--color-primary)' : 'var(--color-text)',
                fontWeight: showInStockOnly ? '600' : '400',
                borderRadius: '8px',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                if (!showInStockOnly) e.currentTarget.style.backgroundColor = '#f9fafb';
              }}
              onMouseLeave={(e) => {
                if (!showInStockOnly) e.currentTarget.style.backgroundColor = 'transparent';
              }}
            >
              <input
                type="checkbox"
                checked={showInStockOnly}
                onChange={(e) => setShowInStockOnly(e.target.checked)}
                style={{ width: '16px', height: '16px', accentColor: 'var(--color-primary)', flexShrink: 0, margin: 0, cursor: 'pointer' }}
              />
              <span style={{ fontSize: '0.875rem', userSelect: 'none' }}>In Stock Only</span>
            </label>
          </div>
          
          <button 
            className="btn btn-outline" 
            style={{ width: '100%' }}
            onClick={() => {
              setSelectedCategory('All');
              setSelectedBrand('All');
              setShowInStockOnly(false);
              setSearchQuery('');
            }}
          >
            Clear All Filters
          </button>
        </aside>

        {/* Main Product Area */}
        <main style={{ minWidth: 0 }}>
          
          {/* Top Bar: Search & Sort */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
            <div style={{ position: 'relative', flex: '1 1 260px' }}>
              <Search size={16} style={{ position: 'absolute', left: '0.875rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-light)' }} />
              <input
                type="text"
                placeholder="Search products by name or SKU..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ width: '100%', padding: '0.625rem 1rem 0.625rem 2.25rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)', outline: 'none', fontSize: '0.875rem' }}
              />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexShrink: 0 }}>
              <label style={{ fontSize: '0.875rem', fontWeight: '500', whiteSpace: 'nowrap' }}>Sort by:</label>
              <div style={{ position: 'relative' }}>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  style={{ padding: '0.5rem 2rem 0.5rem 0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)', outline: 'none', backgroundColor: 'white', appearance: 'none', minWidth: '150px', fontSize: '0.875rem' }}
                >
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="discount">Highest Discount</option>
                  <option value="name-asc">Name: A to Z</option>
                </select>
                <ChevronDown size={14} style={{ position: 'absolute', right: '0.5rem', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: 'var(--color-text-light)' }} />
              </div>
            </div>
          </div>
          <p className="text-sub" style={{ margin: '0 0 1.25rem', fontSize: '0.875rem' }}>Showing <strong>{filteredProducts.length}</strong> wholesale products</p>

            {loading ? (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '4rem 0', color: 'var(--color-primary)' }}>
                <Loader className="spin" size={40} style={{ marginBottom: '1rem' }} />
                <p>Loading catalog...</p>
              </div>
            ) : filteredProducts.length > 0 ? (
              <div className="grid-3">
                {filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: '4rem 0', backgroundColor: 'white', borderRadius: 'var(--radius)' }}>
                <Filter size={48} color="var(--color-border)" style={{ marginBottom: '1rem' }} />
                <h3>No products found</h3>
                <p className="text-sub" style={{ marginBottom: '1.5rem' }}>Try adjusting your filters or search query.</p>
                <button className="btn btn-outline" onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('All');
                  setSelectedBrand('All');
                  setShowInStockOnly(false);
                }}>Clear Filters</button>
              </div>
            )}

        </main>
      </div>

      {/* Internal CSS for Mobile Filters */}
      <style>{`
        @media (max-width: 768px) {
          .shop-page .container { grid-template-columns: 1fr !important; }
          .mobile-filter-header { display: flex !important; }
          .desktop-results { display: none !important; }
          .shop-sidebar {
            position: fixed; top: 0; left: -100%; width: 280px; height: 100vh;
            background: white; z-index: 2000; padding: 2rem; overflow-y: auto;
            transition: left 0.3s ease; box-shadow: 2px 0 10px rgba(0,0,0,0.1);
          }
          .shop-sidebar.open { left: 0; }
          .sidebar-close-btn { display: flex !important; }
        }
        @media (min-width: 769px) {
          .desktop-results { display: block !important; }
        }
      `}</style>
      
      <Footer />
    </div>
  );
};

export default Shop;
