import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, Users, ShoppingBag, DollarSign, 
  Package, LayoutDashboard, Settings, Bell, 
  ChevronDown, Search, Filter, Edit, Trash2, Plus
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { allProducts } from './Shop';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  // Initialize with actual products
  const [products, setProducts] = useState([...allProducts]);

  // Form State
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '', unit: '', wholesalePrice: '', retailPrice: '', minOrder: '', category: 'Dal & Pulses', brand: '', inStock: true, image: ''
  });
  const [imagePreview, setImagePreview] = useState(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
      setFormData(prev => ({ ...prev, image: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, text: 'New order #ORD-7829 from FreshMart Supermarket', time: '2 min ago', read: false },
    { id: 2, text: 'Low stock alert: Kabuli Chana (< 10 bags left)', time: '15 min ago', read: false },
    { id: 3, text: 'Payment received for #ORD-7827 - ₹12,800', time: '1 hour ago', read: false },
    { id: 4, text: 'New B2B registration: Metro Superstore', time: '3 hours ago', read: true },
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAllRead = () => setNotifications(prev => prev.map(n => ({ ...n, read: true })));

  const [dateFilter, setDateFilter] = useState('Last 30 Days');
  const [showDateDropdown, setShowDateDropdown] = useState(false);

  const dateOptions = ['Last 7 Days', 'Last 30 Days', 'Last 90 Days', 'This Year'];

  const kpiData = {
    'Last 7 Days':  { revenue: '₹5,82,300', orders: '287', customers: '194', rate: '3.1%', revChange: '+4.2%', ordChange: '+3.1%', custChange: '+1.8%', rateChange: '+0.4%' },
    'Last 30 Days': { revenue: '₹24,56,800', orders: '1,248', customers: '842', rate: '3.8%', revChange: '+12.5%', ordChange: '+8.2%', custChange: '+5.4%', rateChange: '+1.2%' },
    'Last 90 Days': { revenue: '₹71,20,500', orders: '3,641', customers: '1,203', rate: '4.2%', revChange: '+18.3%', ordChange: '+14.6%', custChange: '+9.1%', rateChange: '+2.1%' },
    'This Year':    { revenue: '₹2,84,63,200', orders: '14,892', customers: '3,480', rate: '5.1%', revChange: '+28.7%', ordChange: '+22.4%', custChange: '+18.3%', rateChange: '+3.4%' },
  };

  const currentKpi = kpiData[dateFilter];

  const handleDownloadReport = () => {
    const rows = [
      ['DND Wholesale - Dashboard Report', '', '', ''],
      ['Period', dateFilter, '', ''],
      ['Generated', new Date().toLocaleDateString('en-IN'), '', ''],
      ['', '', '', ''],
      ['Metric', 'Value', 'Change vs Previous', ''],
      ['Total Revenue', currentKpi.revenue, currentKpi.revChange, ''],
      ['Wholesale Orders', currentKpi.orders, currentKpi.ordChange, ''],
      ['B2B Customers', currentKpi.customers, currentKpi.custChange, ''],
      ['Conversion Rate', currentKpi.rate, currentKpi.rateChange, ''],
      ['', '', '', ''],
      ['Recent Orders', '', '', ''],
      ['Order ID', 'Customer', 'Amount', 'Status'],
      ['#ORD-7829', 'FreshMart Supermarket', '1,24,500', 'Processing'],
      ['#ORD-7828', 'City Hotel & Suites', '45,200', 'Shipped'],
      ['#ORD-7827', 'Green Leaf Cafe', '12,800', 'Delivered'],
      ['#ORD-7826', 'Daily Needs Grocers', '89,000', 'Processing'],
    ];
    const csv = rows.map(r => r.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `DND_Report_${dateFilter.replace(/ /g,'_')}_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };
  const handleDelete = (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    setProducts(products.filter(p => p.id !== id));
  };

  const handleAddSubmit = (e) => {
    e.preventDefault();
    const newProduct = {
      ...formData,
      id: Date.now()
    };
    setProducts([...products, newProduct]);
    setShowForm(false);
    setFormData({ name: '', unit: '', wholesalePrice: '', retailPrice: '', minOrder: '', category: 'Dal & Pulses', brand: '', inStock: true, image: '' });
    setImagePreview(null);
  };

  return (
    <div className="admin-layout" style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f3f4f6' }}>
      {/* Admin Sidebar */}
      <aside style={{ width: '260px', backgroundColor: '#111827', color: 'white', display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '1.5rem', borderBottom: '1px solid #1f2937' }}>
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'white', textDecoration: 'none' }}>
            <div style={{ width: '32px', height: '32px', backgroundColor: 'var(--color-primary)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
              D
            </div>
            <span style={{ fontSize: '1.25rem', fontWeight: '700' }}>Admin Panel</span>
          </Link>
        </div>
        
        <nav style={{ padding: '1rem', flex: 1, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <button 
            onClick={() => setActiveTab('overview')}
            style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem 1rem', background: activeTab === 'overview' ? '#1f2937' : 'transparent', color: activeTab === 'overview' ? 'white' : '#9ca3af', border: 'none', borderRadius: '8px', cursor: 'pointer', textAlign: 'left', fontWeight: '500', transition: 'all 0.2s' }}
          >
            <LayoutDashboard size={18} /> Overview
          </button>
          <button 
            onClick={() => setActiveTab('orders')}
            style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem 1rem', background: activeTab === 'orders' ? '#1f2937' : 'transparent', color: activeTab === 'orders' ? 'white' : '#9ca3af', border: 'none', borderRadius: '8px', cursor: 'pointer', textAlign: 'left', fontWeight: '500', transition: 'all 0.2s' }}
          >
            <ShoppingBag size={18} /> Orders
            <span style={{ marginLeft: 'auto', backgroundColor: 'var(--color-primary)', color: 'white', fontSize: '0.75rem', padding: '2px 8px', borderRadius: '12px' }}>12</span>
          </button>
          <button 
            onClick={() => setActiveTab('products')}
            style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem 1rem', background: activeTab === 'products' ? '#1f2937' : 'transparent', color: activeTab === 'products' ? 'white' : '#9ca3af', border: 'none', borderRadius: '8px', cursor: 'pointer', textAlign: 'left', fontWeight: '500', transition: 'all 0.2s' }}
          >
            <Package size={18} /> Products
          </button>
          <button 
            onClick={() => setActiveTab('customers')}
            style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem 1rem', background: activeTab === 'customers' ? '#1f2937' : 'transparent', color: activeTab === 'customers' ? 'white' : '#9ca3af', border: 'none', borderRadius: '8px', cursor: 'pointer', textAlign: 'left', fontWeight: '500', transition: 'all 0.2s' }}
          >
            <Users size={18} /> B2B Customers
          </button>
        </nav>
        
        <div style={{ padding: '1rem', borderTop: '1px solid #1f2937' }}>
          <button style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem 1rem', background: 'transparent', color: '#9ca3af', border: 'none', width: '100%', cursor: 'pointer', textAlign: 'left', fontWeight: '500' }}>
            <Settings size={18} /> Settings
          </button>
        </div>
      </aside>

      {/* Admin Content Area */}
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        
        {/* Admin Header */}
        <header style={{ height: '70px', backgroundColor: 'white', borderBottom: '1px solid var(--color-border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 2rem' }}>
          <div style={{ position: 'relative', width: '300px' }}>
            <Search size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-light)' }} />
            <input type="text" placeholder="Search orders, products..." style={{ width: '100%', padding: '0.5rem 1rem 0.5rem 2.5rem', borderRadius: '20px', border: '1px solid var(--color-border)', outline: 'none', backgroundColor: '#f9fafb' }} />
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            {/* Bell Notification */}
            <div style={{ position: 'relative' }}>
              <button
                onClick={() => { setShowNotifications(!showNotifications); setShowUserMenu(false); }}
                style={{ background: 'none', border: 'none', position: 'relative', cursor: 'pointer', color: 'var(--color-text-light)', padding: '0.25rem' }}
              >
                <Bell size={20} />
                {unreadCount > 0 && (
                  <span style={{ position: 'absolute', top: 0, right: 0, width: '16px', height: '16px', backgroundColor: '#ef4444', borderRadius: '50%', fontSize: '0.625rem', fontWeight: '700', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{unreadCount}</span>
                )}
              </button>
              {showNotifications && (
                <div style={{ position: 'absolute', top: '130%', right: 0, width: '340px', backgroundColor: 'white', border: '1px solid var(--color-border)', borderRadius: '12px', boxShadow: 'var(--shadow-hover)', zIndex: 200 }}>
                  <div style={{ padding: '1rem 1.25rem', borderBottom: '1px solid var(--color-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h4 style={{ margin: 0, fontSize: '0.95rem' }}>Notifications</h4>
                    <button onClick={markAllRead} style={{ background: 'none', border: 'none', color: 'var(--color-primary)', fontSize: '0.75rem', cursor: 'pointer', fontWeight: '500' }}>Mark all read</button>
                  </div>
                  {notifications.map(n => (
                    <div key={n.id} style={{ padding: '0.85rem 1.25rem', borderBottom: '1px solid #f3f4f6', display: 'flex', gap: '0.75rem', alignItems: 'flex-start', backgroundColor: n.read ? 'white' : '#f0fdf4' }}>
                      <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: n.read ? '#d1d5db' : 'var(--color-primary)', marginTop: '5px', flexShrink: 0 }} />
                      <div>
                        <p style={{ margin: 0, fontSize: '0.8125rem', color: 'var(--color-text)', lineHeight: 1.4 }}>{n.text}</p>
                        <p style={{ margin: '0.25rem 0 0', fontSize: '0.75rem', color: 'var(--color-text-light)' }}>{n.time}</p>
                      </div>
                    </div>
                  ))}
                  <div style={{ padding: '0.75rem', textAlign: 'center' }}>
                    <button style={{ background: 'none', border: 'none', color: 'var(--color-primary)', fontSize: '0.8125rem', cursor: 'pointer', fontWeight: '500' }}>View all notifications</button>
                  </div>
                </div>
              )}
            </div>

            {/* Admin User Menu */}
            <div style={{ position: 'relative' }}>
              <div
                onClick={() => { setShowUserMenu(!showUserMenu); setShowNotifications(false); }}
                style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}
              >
                <img src="https://i.pravatar.cc/150?img=11" alt="Admin" style={{ width: '36px', height: '36px', borderRadius: '50%', border: '2px solid var(--color-primary)' }} />
                <span style={{ fontWeight: '500', fontSize: '0.875rem' }}>Admin User</span>
                <ChevronDown size={16} style={{ transition: 'transform 0.2s', transform: showUserMenu ? 'rotate(180deg)' : 'rotate(0deg)' }} />
              </div>
              {showUserMenu && (
                <div style={{ position: 'absolute', top: '130%', right: 0, width: '200px', backgroundColor: 'white', border: '1px solid var(--color-border)', borderRadius: '12px', boxShadow: 'var(--shadow-hover)', zIndex: 200, overflow: 'hidden' }}>
                  <div style={{ padding: '1rem', borderBottom: '1px solid var(--color-border)' }}>
                    <p style={{ margin: 0, fontWeight: '600', fontSize: '0.875rem' }}>Admin User</p>
                    <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--color-text-light)' }}>dnd.studio.in@gmail.com</p>
                  </div>
                  {[{ label: '👤  My Profile', action: () => {} }, { label: '⚙️  Settings', action: () => {} }, { label: '🏠  Go to Website', action: () => window.open('/', '_blank') }].map((item, i) => (
                    <div key={i} onClick={item.action} style={{ padding: '0.75rem 1rem', cursor: 'pointer', fontSize: '0.875rem', color: 'var(--color-text)' }}
                      onMouseEnter={e => e.currentTarget.style.backgroundColor = '#f9fafb'}
                      onMouseLeave={e => e.currentTarget.style.backgroundColor = 'white'}
                    >{item.label}</div>
                  ))}
                  <div style={{ borderTop: '1px solid var(--color-border)' }}>
                    <Link to="/login" style={{ display: 'block', padding: '0.75rem 1rem', fontSize: '0.875rem', color: '#ef4444', textDecoration: 'none' }}
                      onMouseEnter={e => e.currentTarget.style.backgroundColor = '#fef2f2'}
                      onMouseLeave={e => e.currentTarget.style.backgroundColor = 'white'}
                    >🚪  Logout</Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>
        
        {/* Dashboard Content */}
        <div style={{ padding: '2rem', overflowY: 'auto', flex: 1 }}>
          
          {activeTab === 'overview' && (
            <>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h1 style={{ fontSize: '1.5rem', margin: 0 }}>Dashboard Overview</h1>
                <div style={{ display: 'flex', gap: '1rem', position: 'relative' }}>
                  <div style={{ position: 'relative' }}>
                    <button
                      className="btn btn-outline"
                      style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem', fontSize: '0.875rem' }}
                      onClick={() => setShowDateDropdown(!showDateDropdown)}
                    >
                      <Filter size={16} /> {dateFilter} <ChevronDown size={14} />
                    </button>
                    {showDateDropdown && (
                      <div style={{ position: 'absolute', top: '110%', left: 0, backgroundColor: 'white', border: '1px solid var(--color-border)', borderRadius: '8px', boxShadow: 'var(--shadow-hover)', zIndex: 100, minWidth: '160px', overflow: 'hidden' }}>
                        {dateOptions.map(opt => (
                          <div
                            key={opt}
                            onClick={() => { setDateFilter(opt); setShowDateDropdown(false); }}
                            style={{ padding: '0.6rem 1rem', cursor: 'pointer', fontSize: '0.875rem', backgroundColor: dateFilter === opt ? '#f0fdf4' : 'white', color: dateFilter === opt ? 'var(--color-primary)' : 'var(--color-text)', fontWeight: dateFilter === opt ? '600' : '400' }}
                            onMouseEnter={e => e.currentTarget.style.backgroundColor = '#f9fafb'}
                            onMouseLeave={e => e.currentTarget.style.backgroundColor = dateFilter === opt ? '#f0fdf4' : 'white'}
                          >
                            {opt}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  <button className="btn btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }} onClick={handleDownloadReport}>
                    ⬇ Download Report
                  </button>
                </div>
              </div>

              {/* KPI Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem', marginBottom: '2rem' }}>
                {[
                  { title: 'Total Revenue', value: currentKpi.revenue, change: currentKpi.revChange, icon: <DollarSign size={24} color="#10b981" />, bg: '#d1fae5' },
                  { title: 'Wholesale Orders', value: currentKpi.orders, change: currentKpi.ordChange, icon: <ShoppingBag size={24} color="#3b82f6" />, bg: '#dbeafe' },
                  { title: 'B2B Customers', value: currentKpi.customers, change: currentKpi.custChange, icon: <Users size={24} color="#8b5cf6" />, bg: '#ede9fe' },
                  { title: 'Conversion Rate', value: currentKpi.rate, change: currentKpi.rateChange, icon: <TrendingUp size={24} color="#f59e0b" />, bg: '#fef3c7' }
                ].map((kpi, index) => (
                  <div key={index} style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '12px', border: '1px solid var(--color-border)', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                      <div>
                        <p style={{ fontSize: '0.875rem', color: 'var(--color-text-light)', marginBottom: '0.25rem' }}>{kpi.title}</p>
                        <h3 style={{ fontSize: '1.5rem', margin: 0 }}>{kpi.value}</h3>
                      </div>
                      <div style={{ width: '48px', height: '48px', borderRadius: '12px', backgroundColor: kpi.bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        {kpi.icon}
                      </div>
                    </div>
                    <div style={{ fontSize: '0.875rem', color: '#10b981', fontWeight: '500' }}>
                      {kpi.change} <span style={{ color: 'var(--color-text-light)', fontWeight: 'normal' }}>vs last month</span>
                    </div>
                  </div>
                ))}
              </div>
              
              <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem' }}>
                {/* Recent Orders Table */}
                <div style={{ backgroundColor: 'white', borderRadius: '12px', border: '1px solid var(--color-border)', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
                  <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--color-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h3 style={{ margin: 0, fontSize: '1.125rem' }}>Recent B2B Orders</h3>
                    <a href="#" style={{ color: 'var(--color-primary)', fontSize: '0.875rem', fontWeight: '500' }}>View All</a>
                  </div>
                  <div style={{ padding: '0 1.5rem' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                      <thead>
                        <tr style={{ borderBottom: '1px solid var(--color-border)', color: 'var(--color-text-light)', fontSize: '0.875rem' }}>
                          <th style={{ padding: '1rem 0', fontWeight: '500' }}>Order ID</th>
                          <th style={{ padding: '1rem 0', fontWeight: '500' }}>Customer</th>
                          <th style={{ padding: '1rem 0', fontWeight: '500' }}>Amount</th>
                          <th style={{ padding: '1rem 0', fontWeight: '500' }}>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          { id: '#ORD-7829', customer: 'FreshMart Supermarket', amount: '₹1,24,500', status: 'Processing', color: '#f59e0b', bg: '#fef3c7' },
                          { id: '#ORD-7828', customer: 'City Hotel & Suites', amount: '₹45,200', status: 'Shipped', color: '#3b82f6', bg: '#dbeafe' },
                          { id: '#ORD-7827', customer: 'Green Leaf Cafe', amount: '₹12,800', status: 'Delivered', color: '#10b981', bg: '#d1fae5' },
                          { id: '#ORD-7826', customer: 'Daily Needs Grocers', amount: '₹89,000', status: 'Processing', color: '#f59e0b', bg: '#fef3c7' }
                        ].map((order, i) => (
                          <tr key={i} style={{ borderBottom: '1px solid #f3f4f6', fontSize: '0.875rem' }}>
                            <td style={{ padding: '1rem 0', fontWeight: '500' }}>{order.id}</td>
                            <td style={{ padding: '1rem 0' }}>{order.customer}</td>
                            <td style={{ padding: '1rem 0', fontWeight: '600' }}>{order.amount}</td>
                            <td style={{ padding: '1rem 0' }}>
                              <span style={{ padding: '0.25rem 0.75rem', borderRadius: '12px', fontSize: '0.75rem', fontWeight: '600', color: order.color, backgroundColor: order.bg }}>
                                {order.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Top Products */}
                <div style={{ backgroundColor: 'white', borderRadius: '12px', border: '1px solid var(--color-border)', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
                  <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--color-border)' }}>
                    <h3 style={{ margin: 0, fontSize: '1.125rem' }}>Top Selling Products</h3>
                  </div>
                  <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                    {allProducts.slice(0, 4).map((prod, i) => (
                      <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                          <p style={{ margin: 0, fontWeight: '500', fontSize: '0.875rem' }}>{prod.name}</p>
                          <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--color-text-light)' }}>
                            {845 - (i * 123)} {prod.unit.includes('kg') ? 'bags' : 'units'} sold
                          </p>
                        </div>
                        <div style={{ fontWeight: '600', fontSize: '0.875rem' }}>₹{(prod.wholesalePrice * (845 - i * 123)).toLocaleString('en-IN')}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}

          {activeTab === 'products' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h1 style={{ fontSize: '1.5rem', margin: 0 }}>Product Management</h1>
                <button 
                  className="btn btn-primary" 
                  onClick={() => setShowForm(!showForm)}
                  style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem', fontSize: '0.875rem' }}
                >
                  <Plus size={16} /> {showForm ? 'Cancel' : 'Add New Product'}
                </button>
              </div>

              {showForm && (
                <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '12px', border: '1px solid var(--color-border)', marginBottom: '2rem' }}>
                  <h3 style={{ margin: '0 0 1rem 0' }}>Add New Product</h3>
                  <form onSubmit={handleAddSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.875rem', marginBottom: '0.25rem' }}>Name</label>
                      <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--color-border)' }} />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.875rem', marginBottom: '0.5rem', fontWeight: '500' }}>Product Image</label>
                      <label htmlFor="image-upload" style={{ display: 'block', cursor: 'pointer' }}>
                        <div style={{ border: '2px dashed var(--color-border)', borderRadius: '8px', padding: '1rem', textAlign: 'center', backgroundColor: '#f9fafb', transition: 'border-color 0.2s', position: 'relative', minHeight: '110px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                          {imagePreview ? (
                            <>
                              <img src={imagePreview} alt="Preview" style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '8px', border: '1px solid var(--color-border)' }} />
                              <span style={{ fontSize: '0.75rem', color: 'var(--color-primary)', fontWeight: '500' }}>Click to change image</span>
                            </>
                          ) : (
                            <>
                              <div style={{ fontSize: '2rem' }}>📷</div>
                              <div>
                                <p style={{ margin: 0, fontWeight: '500', fontSize: '0.875rem', color: 'var(--color-text)' }}>Click to upload image</p>
                                <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--color-text-light)' }}>PNG, JPG, WEBP up to 5MB</p>
                              </div>
                            </>
                          )}
                        </div>
                      </label>
                      <input id="image-upload" type="file" accept="image/*" onChange={handleImageUpload} style={{ display: 'none' }} />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.875rem', marginBottom: '0.25rem' }}>Wholesale Price (₹)</label>
                      <input required type="number" value={formData.wholesalePrice} onChange={e => setFormData({...formData, wholesalePrice: e.target.value})} style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--color-border)' }} />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.875rem', marginBottom: '0.25rem' }}>Retail Price (₹)</label>
                      <input required type="number" value={formData.retailPrice} onChange={e => setFormData({...formData, retailPrice: e.target.value})} style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--color-border)' }} />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.875rem', marginBottom: '0.25rem' }}>Unit (e.g. 25 kg Bag)</label>
                      <input required type="text" value={formData.unit} onChange={e => setFormData({...formData, unit: e.target.value})} style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--color-border)' }} />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.875rem', marginBottom: '0.25rem' }}>Min Order</label>
                      <input required type="text" value={formData.minOrder} onChange={e => setFormData({...formData, minOrder: e.target.value})} style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--color-border)' }} />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.875rem', marginBottom: '0.25rem' }}>Brand</label>
                      <input required type="text" value={formData.brand} onChange={e => setFormData({...formData, brand: e.target.value})} style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--color-border)' }} />
                    </div>
                    <div style={{ display: 'flex', alignItems: 'flex-end' }}>
                      <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Save Product</button>
                    </div>
                  </form>
                </div>
              )}

              <div style={{ backgroundColor: 'white', borderRadius: '12px', border: '1px solid var(--color-border)' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid var(--color-border)', color: 'var(--color-text-light)', fontSize: '0.875rem' }}>
                      <th style={{ padding: '1rem', fontWeight: '500' }}>Product</th>
                      <th style={{ padding: '1rem', fontWeight: '500' }}>Price (Wholesale)</th>
                      <th style={{ padding: '1rem', fontWeight: '500' }}>Stock</th>
                      <th style={{ padding: '1rem', fontWeight: '500', textAlign: 'right' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((product) => (
                      <tr key={product.id} style={{ borderBottom: '1px solid #f3f4f6' }}>
                        <td style={{ padding: '1rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                          <img src={product.image} alt={product.name} style={{ width: '40px', height: '40px', borderRadius: '4px', objectFit: 'cover' }} />
                          <div>
                            <p style={{ margin: 0, fontWeight: '500', fontSize: '0.875rem' }}>{product.name}</p>
                            <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--color-text-light)' }}>{product.unit} • {product.brand}</p>
                          </div>
                        </td>
                        <td style={{ padding: '1rem', fontWeight: '500' }}>₹{product.wholesalePrice}</td>
                        <td style={{ padding: '1rem' }}>
                          {product.inStock ? (
                            <span style={{ padding: '0.25rem 0.5rem', borderRadius: '4px', fontSize: '0.75rem', color: '#10b981', backgroundColor: '#d1fae5' }}>In Stock</span>
                          ) : (
                            <span style={{ padding: '0.25rem 0.5rem', borderRadius: '4px', fontSize: '0.75rem', color: '#ef4444', backgroundColor: '#fee2e2' }}>Out of Stock</span>
                          )}
                        </td>
                        <td style={{ padding: '1rem', textAlign: 'right' }}>
                          <button onClick={() => handleDelete(product.id)} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', padding: '0.5rem' }} title="Delete">
                            <Trash2 size={18} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'orders' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h1 style={{ fontSize: '1.5rem', margin: 0 }}>B2B Order Management</h1>
                <button className="btn btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}>+ New Order</button>
              </div>
              <div style={{ backgroundColor: 'white', borderRadius: '12px', border: '1px solid var(--color-border)', overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid var(--color-border)', backgroundColor: '#f9fafb', fontSize: '0.875rem', color: 'var(--color-text-light)' }}>
                      <th style={{ padding: '1rem', fontWeight: '500' }}>Order ID</th>
                      <th style={{ padding: '1rem', fontWeight: '500' }}>Customer</th>
                      <th style={{ padding: '1rem', fontWeight: '500' }}>Products</th>
                      <th style={{ padding: '1rem', fontWeight: '500' }}>Amount</th>
                      <th style={{ padding: '1rem', fontWeight: '500' }}>Date</th>
                      <th style={{ padding: '1rem', fontWeight: '500' }}>Status</th>
                      <th style={{ padding: '1rem', fontWeight: '500', textAlign: 'right' }}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { id: '#ORD-7829', customer: 'FreshMart Supermarket', products: 'Cashew Nuts, Toor Dal', amount: '₹1,24,500', date: 'Jun 27, 2026', status: 'Processing', color: '#f59e0b', bg: '#fef3c7' },
                      { id: '#ORD-7828', customer: 'City Hotel & Suites', products: 'Spices Pack, Green Peas', amount: '₹45,200', date: 'Jun 26, 2026', status: 'Shipped', color: '#3b82f6', bg: '#dbeafe' },
                      { id: '#ORD-7827', customer: 'Green Leaf Cafe', products: 'Pistachios, Rajma', amount: '₹12,800', date: 'Jun 25, 2026', status: 'Delivered', color: '#10b981', bg: '#d1fae5' },
                      { id: '#ORD-7826', customer: 'Daily Needs Grocers', products: 'Kabuli Chana, Kala Chana', amount: '₹89,000', date: 'Jun 24, 2026', status: 'Processing', color: '#f59e0b', bg: '#fef3c7' },
                      { id: '#ORD-7825', customer: 'Sunrise Restaurants', products: 'Soybeans, Whole Peas', amount: '₹34,600', date: 'Jun 23, 2026', status: 'Delivered', color: '#10b981', bg: '#d1fae5' },
                      { id: '#ORD-7824', customer: 'Metro Superstore', products: 'Mixed Pulses Bulk', amount: '₹2,11,000', date: 'Jun 22, 2026', status: 'Cancelled', color: '#ef4444', bg: '#fee2e2' },
                    ].map((order, i) => (
                      <tr key={i} style={{ borderBottom: '1px solid #f3f4f6', fontSize: '0.875rem' }}>
                        <td style={{ padding: '1rem', fontWeight: '600', color: 'var(--color-primary)' }}>{order.id}</td>
                        <td style={{ padding: '1rem', fontWeight: '500' }}>{order.customer}</td>
                        <td style={{ padding: '1rem', color: 'var(--color-text-light)' }}>{order.products}</td>
                        <td style={{ padding: '1rem', fontWeight: '600' }}>{order.amount}</td>
                        <td style={{ padding: '1rem', color: 'var(--color-text-light)' }}>{order.date}</td>
                        <td style={{ padding: '1rem' }}>
                          <span style={{ padding: '0.25rem 0.75rem', borderRadius: '12px', fontSize: '0.75rem', fontWeight: '600', color: order.color, backgroundColor: order.bg }}>
                            {order.status}
                          </span>
                        </td>
                        <td style={{ padding: '1rem', textAlign: 'right' }}>
                          <button style={{ background: 'none', border: '1px solid var(--color-border)', borderRadius: '6px', padding: '0.25rem 0.75rem', cursor: 'pointer', fontSize: '0.75rem', fontWeight: '500' }}>View</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'customers' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h1 style={{ fontSize: '1.5rem', margin: 0 }}>B2B Customers</h1>
                <button className="btn btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}>+ Add Customer</button>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
                {[
                  { name: 'FreshMart Supermarket', type: 'Supermarket Chain', orders: 48, spent: '₹12.4L', status: 'Active', initials: 'FS' },
                  { name: 'City Hotel & Suites', type: 'Hospitality', orders: 22, spent: '₹4.8L', status: 'Active', initials: 'CH' },
                  { name: 'Green Leaf Cafe', type: 'Restaurant', orders: 15, spent: '₹1.9L', status: 'Active', initials: 'GL' },
                  { name: 'Daily Needs Grocers', type: 'Retail Store', orders: 31, spent: '₹6.2L', status: 'Active', initials: 'DN' },
                  { name: 'Sunrise Restaurants', type: 'Restaurant Chain', orders: 9, spent: '₹98K', status: 'Inactive', initials: 'SR' },
                  { name: 'Metro Superstore', type: 'Wholesale Buyer', orders: 64, spent: '₹28.3L', status: 'Active', initials: 'MS' },
                ].map((cust, i) => (
                  <div key={i} style={{ backgroundColor: 'white', borderRadius: '12px', padding: '1.5rem', border: '1px solid var(--color-border)', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                      <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: 'var(--color-primary)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '700', fontSize: '1rem' }}>{cust.initials}</div>
                      <div>
                        <p style={{ margin: 0, fontWeight: '600' }}>{cust.name}</p>
                        <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--color-text-light)' }}>{cust.type}</p>
                      </div>
                      <span style={{ marginLeft: 'auto', padding: '0.2rem 0.6rem', borderRadius: '12px', fontSize: '0.7rem', fontWeight: '600', color: cust.status === 'Active' ? '#10b981' : '#9ca3af', backgroundColor: cust.status === 'Active' ? '#d1fae5' : '#f3f4f6' }}>{cust.status}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid var(--color-border)', paddingTop: '1rem', fontSize: '0.875rem' }}>
                      <div style={{ textAlign: 'center' }}>
                        <p style={{ margin: 0, fontWeight: '700', fontSize: '1.125rem' }}>{cust.orders}</p>
                        <p style={{ margin: 0, color: 'var(--color-text-light)', fontSize: '0.75rem' }}>Orders</p>
                      </div>
                      <div style={{ textAlign: 'center' }}>
                        <p style={{ margin: 0, fontWeight: '700', fontSize: '1.125rem' }}>{cust.spent}</p>
                        <p style={{ margin: 0, color: 'var(--color-text-light)', fontSize: '0.75rem' }}>Total Spent</p>
                      </div>
                      <button style={{ background: 'none', border: '1px solid var(--color-border)', borderRadius: '6px', padding: '0.4rem 0.8rem', cursor: 'pointer', fontSize: '0.75rem', fontWeight: '500', alignSelf: 'center' }}>View Profile</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
