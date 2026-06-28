import React, { useState } from 'react';
import { ShoppingBag, FileText, User, Settings, LogOut, ArrowRight, RefreshCcw } from 'lucide-react';
import Footer from '../components/Footer';

// Mock Data
const recentOrders = [
  { id: 'ORD-58291', date: '2026-06-20', amount: 42500, status: 'Delivered', items: 3 },
  { id: 'ORD-58102', date: '2026-06-05', amount: 18200, status: 'Delivered', items: 1 },
  { id: 'ORD-57999', date: '2026-05-22', amount: 56000, status: 'Processing', items: 5 }
];

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('orders');

  return (
    <div className="dashboard-page" style={{ backgroundColor: 'var(--color-bg)', minHeight: '100vh', paddingTop: '2rem' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '250px 1fr', gap: '2rem', alignItems: 'start', marginBottom: '4rem' }}>
          
          {/* Sidebar */}
          <div className="card" style={{ padding: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem', paddingBottom: '1rem', borderBottom: '1px solid var(--color-border)' }}>
              <div style={{ width: '50px', height: '50px', borderRadius: '50%', backgroundColor: 'var(--color-primary-light)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.25rem', fontWeight: 'bold' }}>
                AB
              </div>
              <div>
                <h3 style={{ fontSize: '1rem', margin: 0 }}>ABC Supermart</h3>
                <p style={{ fontSize: '0.75rem', color: 'var(--color-text-light)', margin: 0 }}>B2B Partner</p>
              </div>
            </div>
            
            <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <button 
                onClick={() => setActiveTab('orders')}
                style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.75rem 1rem', background: activeTab === 'orders' ? 'var(--color-primary)' : 'transparent', color: activeTab === 'orders' ? 'white' : 'var(--color-text)', border: 'none', borderRadius: 'var(--radius-sm)', cursor: 'pointer', textAlign: 'left', fontWeight: '500', transition: 'var(--transition)' }}
              >
                <ShoppingBag size={18} /> My Orders
              </button>
              <button 
                onClick={() => setActiveTab('invoices')}
                style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.75rem 1rem', background: activeTab === 'invoices' ? 'var(--color-primary)' : 'transparent', color: activeTab === 'invoices' ? 'white' : 'var(--color-text)', border: 'none', borderRadius: 'var(--radius-sm)', cursor: 'pointer', textAlign: 'left', fontWeight: '500', transition: 'var(--transition)' }}
              >
                <FileText size={18} /> GST Invoices
              </button>
              <button 
                onClick={() => setActiveTab('profile')}
                style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.75rem 1rem', background: activeTab === 'profile' ? 'var(--color-primary)' : 'transparent', color: activeTab === 'profile' ? 'white' : 'var(--color-text)', border: 'none', borderRadius: 'var(--radius-sm)', cursor: 'pointer', textAlign: 'left', fontWeight: '500', transition: 'var(--transition)' }}
              >
                <User size={18} /> Profile & Addresses
              </button>
              <button 
                onClick={() => setActiveTab('settings')}
                style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.75rem 1rem', background: activeTab === 'settings' ? 'var(--color-primary)' : 'transparent', color: activeTab === 'settings' ? 'white' : 'var(--color-text)', border: 'none', borderRadius: 'var(--radius-sm)', cursor: 'pointer', textAlign: 'left', fontWeight: '500', transition: 'var(--transition)' }}
              >
                <Settings size={18} /> Settings
              </button>
              
              <div style={{ borderTop: '1px solid var(--color-border)', margin: '1rem 0' }}></div>
              
              <button 
                style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.75rem 1rem', background: 'transparent', color: '#ef4444', border: 'none', borderRadius: 'var(--radius-sm)', cursor: 'pointer', textAlign: 'left', fontWeight: '500' }}
              >
                <LogOut size={18} /> Logout
              </button>
            </nav>
          </div>

          {/* Main Content */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            
            {/* KPI Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
              <div className="card" style={{ padding: '1.5rem' }}>
                <p style={{ color: 'var(--color-text-light)', fontSize: '0.875rem', marginBottom: '0.5rem' }}>Total Spent (YTD)</p>
                <h2 style={{ fontSize: '1.75rem', color: 'var(--color-primary)' }}>₹1,45,200</h2>
              </div>
              <div className="card" style={{ padding: '1.5rem' }}>
                <p style={{ color: 'var(--color-text-light)', fontSize: '0.875rem', marginBottom: '0.5rem' }}>Active Orders</p>
                <h2 style={{ fontSize: '1.75rem', color: 'var(--color-primary)' }}>1</h2>
              </div>
              <div className="card" style={{ padding: '1.5rem' }}>
                <p style={{ color: 'var(--color-text-light)', fontSize: '0.875rem', marginBottom: '0.5rem' }}>Saved with Wholesale</p>
                <h2 style={{ fontSize: '1.75rem', color: 'var(--color-success)' }}>₹22,500</h2>
              </div>
            </div>

            {/* Content Area */}
            <div className="card" style={{ padding: '2rem', minHeight: '400px' }}>
              {activeTab === 'orders' && (
                <>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                    <h2 style={{ margin: 0, fontSize: '1.5rem' }}>Recent Orders</h2>
                    <button className="btn btn-outline" style={{ padding: '0.5rem 1rem' }}>View All</button>
                  </div>
                  
                  <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                      <thead>
                        <tr style={{ borderBottom: '2px solid var(--color-border)', color: 'var(--color-text-light)' }}>
                          <th style={{ padding: '1rem 0' }}>Order ID</th>
                          <th style={{ padding: '1rem 0' }}>Date</th>
                          <th style={{ padding: '1rem 0' }}>Items</th>
                          <th style={{ padding: '1rem 0' }}>Total</th>
                          <th style={{ padding: '1rem 0' }}>Status</th>
                          <th style={{ padding: '1rem 0', textAlign: 'right' }}>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {recentOrders.map(order => (
                          <tr key={order.id} style={{ borderBottom: '1px solid var(--color-border)' }}>
                            <td style={{ padding: '1rem 0', fontWeight: '600' }}>{order.id}</td>
                            <td style={{ padding: '1rem 0', color: 'var(--color-text-light)' }}>{order.date}</td>
                            <td style={{ padding: '1rem 0' }}>{order.items} Items</td>
                            <td style={{ padding: '1rem 0', fontWeight: '600' }}>₹{order.amount.toLocaleString()}</td>
                            <td style={{ padding: '1rem 0' }}>
                              <span className={`badge ${order.status === 'Delivered' ? 'badge-success' : 'badge-discount'}`}>
                                {order.status}
                              </span>
                            </td>
                            <td style={{ padding: '1rem 0', textAlign: 'right' }}>
                              <button style={{ background: 'none', border: 'none', color: 'var(--color-primary)', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '0.25rem', fontWeight: '600' }}>
                                <RefreshCcw size={16} /> Reorder
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </>
              )}
              
              {activeTab !== 'orders' && (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '300px', color: 'var(--color-text-light)' }}>
                  <FileText size={48} style={{ marginBottom: '1rem', opacity: 0.5 }} />
                  <p>This section is under development for B2B accounts.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;
