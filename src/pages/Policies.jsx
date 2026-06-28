import React, { useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Shield, FileText, RefreshCw, Truck, ArrowLeft } from 'lucide-react';
import Footer from '../components/Footer';

const Policies = () => {
  const [searchParams] = useSearchParams();
  const type = searchParams.get('type') || 'privacy';

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [type]);

  const policyData = {
    privacy: {
      title: 'Privacy Policy',
      icon: <Shield size={36} color="var(--color-primary)" />,
      updated: 'Last Updated: June 2026',
      sections: [
        {
          heading: '1. Information We Collect',
          content: 'We collect personal information that you provide directly to us when registering a B2B profile, placing wholesale orders, or subscribing to our newsletters. This includes business name, GST number, contact details, delivery address, and payment information.'
        },
        {
          heading: '2. How We Use Your Information',
          content: 'We use the collected information to process bulk orders, verify business identity/GST compliance, handle logistics, send order tracking updates, and periodically inform you about bulk pricing adjustments or catalog updates.'
        },
        {
          heading: '3. Data Security',
          content: 'We implement industry-standard technical and organizational security measures to protect your commercial transactions and business details from unauthorized access, disclosure, or modification.'
        }
      ]
    },
    terms: {
      title: 'Terms & Conditions',
      icon: <FileText size={36} color="var(--color-primary)" />,
      updated: 'Last Updated: June 2026',
      sections: [
        {
          heading: '1. B2B Registration & Eligibility',
          content: 'DND Wholesale serves retail stores, hotels, caterers, and corporate clients. By registering, you confirm that you are a valid commercial entity with a registered GSTIN or local business license.'
        },
        {
          heading: '2. Bulk Pricing & Order Limits',
          content: 'Wholesale prices are based on current commodity market rates. Minimum order quantities (MOQ) apply to specific staple items and are listed on the product detail cards.'
        },
        {
          heading: '3. Payments & Credit Terms',
          content: 'Payments must be settled online via UPI, net banking, or corporate credit cards upon checkout. Custom credit terms can be configured upon credit verification by our finance desk.'
        }
      ]
    },
    returns: {
      title: 'Return & Exchange Policy',
      icon: <RefreshCw size={36} color="var(--color-primary)" />,
      updated: 'Last Updated: June 2026',
      sections: [
        {
          heading: '1. Inspection Upon Delivery',
          content: 'B2B clients must inspect goods immediately upon receipt. Any claims regarding damages, moisture levels, or package tampering must be logged with our delivery executive on-site.'
        },
        {
          heading: '2. Non-Returnable Categories',
          content: 'Staples, perishables, and ground spices are non-returnable once delivery is accepted, due to quality control and storage temperature compliance requirements.'
        },
        {
          heading: '3. Credits & Refunds',
          content: 'Approved returns will be processed within 48 working hours, and credit memos will be applied directly to your registered DND Wholesale wallet for use in subsequent orders.'
        }
      ]
    },
    shipping: {
      title: 'Shipping & Delivery Policy',
      icon: <Truck size={36} color="var(--color-primary)" />,
      updated: 'Last Updated: June 2026',
      sections: [
        {
          heading: '1. Same-Day Delivery Areas',
          content: 'Orders placed before 11:00 AM are eligible for same-day logistics routing across all major sectors of Chennai, Tamil Nadu.'
        },
        {
          heading: '2. Freight Charges',
          content: 'Free delivery is applicable to all wholesale cart values exceeding ₹5,000. Orders below this limit carry a flat local logistics surcharge of ₹250.'
        },
        {
          heading: '3. Warehouse Pickup',
          content: 'B2B partners can choose "Self-Pickup" during checkout to pick up bulk purchases directly from our central fulfillment hubs within 4 hours of order confirmation.'
        }
      ]
    }
  };

  const currentPolicy = policyData[type] || policyData.privacy;

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#f9fafb' }}>
      <div className="container" style={{ flex: 1, padding: '3rem 1.5rem', maxWidth: '800px', margin: '0 auto' }}>
        
        {/* Back Link */}
        <Link to="/shop" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-primary)', textDecoration: 'none', marginBottom: '2rem', fontWeight: '600', fontSize: '0.875rem' }}>
          <ArrowLeft size={16} /> Back to Catalog
        </Link>

        {/* Policy Header Box */}
        <div style={{ backgroundColor: 'white', border: '1px solid var(--color-border)', borderRadius: '16px', padding: '2.5rem', boxShadow: 'var(--shadow-soft)', marginBottom: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', marginBottom: '1rem' }}>
            <div style={{ backgroundColor: '#e8f5e9', padding: '0.75rem', borderRadius: '12px' }}>
              {currentPolicy.icon}
            </div>
            <div>
              <h1 style={{ fontSize: '2rem', margin: 0, fontWeight: '800', color: 'var(--color-text)' }}>{currentPolicy.title}</h1>
              <p style={{ margin: '0.25rem 0 0', fontSize: '0.875rem', color: 'var(--color-text-light)' }}>{currentPolicy.updated}</p>
            </div>
          </div>
          
          <hr style={{ border: 0, borderTop: '1px solid var(--color-border)', margin: '1.5rem 0' }} />

          {/* Policy Content */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {currentPolicy.sections.map((section, index) => (
              <div key={index}>
                <h3 style={{ fontSize: '1.125rem', fontWeight: '700', marginBottom: '0.75rem', color: 'var(--color-primary)' }}>{section.heading}</h3>
                <p style={{ margin: 0, fontSize: '0.9375rem', lineHeight: 1.7, color: '#4b5563' }}>{section.content}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Info Support Note */}
        <div style={{ backgroundColor: '#e8f5e9', border: '1px solid #c8e6c9', borderRadius: '12px', padding: '1.25rem', textAlign: 'center', color: 'var(--color-primary)', fontWeight: '500', fontSize: '0.875rem', marginBottom: '4rem' }}>
          Have questions? Reach out to our B2B compliance desk at <a href="mailto:dnd.studio.in@gmail.com" style={{ color: 'inherit', fontWeight: '700' }}>dnd.studio.in@gmail.com</a>
        </div>

      </div>
      <Footer />
    </div>
  );
};

export default Policies;
