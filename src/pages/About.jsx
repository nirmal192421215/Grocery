import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Truck, Percent, Users, Award, Clock, TrendingUp, Leaf, MapPin, Star, CheckCircle, ArrowRight } from 'lucide-react';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';

const fadeUp = { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } };
const fadeLeft = { hidden: { opacity: 0, x: -40 }, visible: { opacity: 1, x: 0, transition: { duration: 0.6 } } };
const fadeRight = { hidden: { opacity: 0, x: 40 }, visible: { opacity: 1, x: 0, transition: { duration: 0.6 } } };

const About = () => {
  return (
    <div className="about-page" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>

      {/* ─── HERO ─────────────────────────────────────────────────── */}
      <section style={{
        background: 'linear-gradient(135deg, #1B5E20 0%, #2E7D32 50%, #1a472a 100%)',
        color: 'white',
        padding: '7rem 0 5rem',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* decorative circles */}
        <div style={{ position: 'absolute', top: '-80px', right: '-80px', width: '400px', height: '400px', borderRadius: '50%', background: 'rgba(255,255,255,0.04)' }} />
        <div style={{ position: 'absolute', bottom: '-60px', left: '-60px', width: '300px', height: '300px', borderRadius: '50%', background: 'rgba(255,255,255,0.04)' }} />

        <div className="container" style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', backgroundColor: 'rgba(255,255,255,0.12)', padding: '0.4rem 1rem', borderRadius: '20px', fontSize: '0.875rem', color: '#a7f3d0', marginBottom: '1.5rem', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.15)' }}>
            <Leaf size={14} /> Chennai's #1 B2B Wholesale Partner
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
            style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', marginBottom: '1.25rem', color: 'white', lineHeight: 1.15, fontWeight: 800 }}>
            About <span style={{ color: '#86efac' }}>DND Wholesale</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
            style={{ fontSize: '1.125rem', color: '#bbf7d0', maxWidth: '650px', margin: '0 auto 2.5rem', lineHeight: 1.7 }}>
            Chennai's most trusted B2B wholesale platform — delivering premium groceries, dry fruits, pulses and spices to thousands of retailers, hotels, and businesses.
          </motion.p>

          {/* Stats Row */}
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.35 }}
            style={{ display: 'flex', justifyContent: 'center', gap: '3rem', flexWrap: 'wrap' }}>
            {[
              { num: '10,000+', label: 'B2B Partners' },
              { num: '500+', label: 'Products' },
              { num: '99%', label: 'On-Time Delivery' },
              { num: '8+', label: 'Years Experience' },
            ].map((s, i) => (
              <div key={i} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '2rem', fontWeight: 800, color: 'white', lineHeight: 1 }}>{s.num}</div>
                <div style={{ fontSize: '0.8rem', color: '#a7f3d0', marginTop: '0.3rem', letterSpacing: '0.05em', textTransform: 'uppercase' }}>{s.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── MISSION ──────────────────────────────────────────────── */}
      <section className="section" style={{ backgroundColor: 'white' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem', alignItems: 'center' }}>
          <motion.div variants={fadeLeft} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <div style={{ display: 'inline-block', backgroundColor: '#dcfce7', color: 'var(--color-primary)', padding: '0.3rem 0.9rem', borderRadius: '20px', fontSize: '0.8rem', fontWeight: '600', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Our Mission</div>
            <h2 style={{ fontSize: '2.25rem', fontWeight: 800, lineHeight: 1.25, marginBottom: '1.25rem' }}>
              Organising India's Grocery Supply Chain
            </h2>
            <p className="text-sub" style={{ marginBottom: '2rem', lineHeight: 1.8 }}>
              To bring transparency, reliability and technology to every B2B grocery transaction — from the farm gate to your store shelf. We eliminate middlemen and pass the savings directly to our partners.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {[
                { icon: <ShieldCheck size={20} />, text: '100% Quality Assurance on every batch', color: '#dcfce7', tc: '#166534' },
                { icon: <Percent size={20} />, text: 'Transparent bulk pricing — no hidden charges', color: '#dbeafe', tc: '#1e40af' },
                { icon: <Truck size={20} />, text: 'On-time delivery with real-time tracking', color: '#fef9c3', tc: '#854d0e' },
                { icon: <TrendingUp size={20} />, text: 'GST-compliant digital invoicing', color: '#fce7f3', tc: '#9d174d' },
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.75rem 1rem', borderRadius: '12px', backgroundColor: item.color }}>
                  <div style={{ color: item.tc, flexShrink: 0 }}>{item.icon}</div>
                  <span style={{ fontWeight: '500', color: item.tc, fontSize: '0.9375rem' }}>{item.text}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div variants={fadeRight} initial="hidden" whileInView="visible" viewport={{ once: true }} style={{ position: 'relative' }}>
            <img
              src="https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=700"
              alt="Spices and Staples Display"
              style={{ width: '100%', borderRadius: '20px', boxShadow: '0 24px 64px rgba(27,94,32,0.18)', height: '400px', objectFit: 'cover' }}
            />
            {/* Floating badge */}
            <div style={{ position: 'absolute', bottom: '-20px', left: '-20px', backgroundColor: 'white', padding: '1rem 1.5rem', borderRadius: '16px', boxShadow: '0 8px 32px rgba(0,0,0,0.12)', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{ backgroundColor: '#dcfce7', width: '44px', height: '44px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-primary)' }}>
                <Star size={22} fill="currentColor" />
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: '1.125rem', lineHeight: 1 }}>4.9 / 5</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--color-text-light)' }}>from 2,000+ B2B partners</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── JOURNEY TIMELINE ─────────────────────────────────────── */}
      <section className="section" style={{ background: 'linear-gradient(to bottom, #f0fdf4, #ffffff)' }}>
        <div className="container">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <div style={{ display: 'inline-block', backgroundColor: '#dcfce7', color: 'var(--color-primary)', padding: '0.3rem 0.9rem', borderRadius: '20px', fontSize: '0.8rem', fontWeight: '600', marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Our Journey</div>
            <h2 style={{ fontSize: '2.25rem', fontWeight: 800, margin: 0 }}>From Humble Beginnings<br/>to City-Wide Impact</h2>
          </motion.div>

          <div style={{ position: 'relative', maxWidth: '900px', margin: '0 auto' }}>
            {/* vertical line */}
            <div style={{ position: 'absolute', left: '50%', top: 0, bottom: 0, width: '2px', background: 'linear-gradient(to bottom, var(--color-primary), #86efac)', transform: 'translateX(-50%)' }} />

            {[
              { year: '2016', title: 'The Beginning', desc: 'Started as a small wholesale outlet in Chennai serving local kirana stores and hotels.', side: 'left' },
              { year: '2018', title: 'Growing Network', desc: 'Expanded to 3 warehouses and partnered with 500+ B2B businesses across Chennai.', side: 'right' },
              { year: '2021', title: 'Going Digital', desc: 'Launched the DND Wholesale digital platform, streamlining bulk ordering and GST invoicing.', side: 'left' },
              { year: '2024', title: 'City-Wide Leader', desc: 'Now serving 10,000+ businesses across Chennai with same-day delivery and premium quality.', side: 'right' },
            ].map((m, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: m.side === 'left' ? -50 : 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                style={{ display: 'flex', justifyContent: m.side === 'left' ? 'flex-start' : 'flex-end', marginBottom: '2.5rem', position: 'relative' }}>
                {/* center dot */}
                <div style={{ position: 'absolute', left: '50%', top: '1.5rem', width: '16px', height: '16px', borderRadius: '50%', background: 'var(--color-primary)', border: '3px solid white', boxShadow: '0 0 0 3px var(--color-primary)', transform: 'translateX(-50%)' }} />
                <div style={{ width: '45%', backgroundColor: 'white', borderRadius: '16px', padding: '1.5rem', boxShadow: '0 4px 24px rgba(0,0,0,0.08)', border: '1px solid #e8f5e9' }}>
                  <div style={{ backgroundColor: 'var(--color-primary)', color: 'white', display: 'inline-block', padding: '0.2rem 0.75rem', borderRadius: '20px', fontSize: '0.8rem', fontWeight: '700', marginBottom: '0.75rem' }}>{m.year}</div>
                  <h3 style={{ margin: '0 0 0.5rem', fontSize: '1.125rem' }}>{m.title}</h3>
                  <p style={{ margin: 0, color: 'var(--color-text-light)', fontSize: '0.9rem', lineHeight: 1.6 }}>{m.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CORE VALUES ──────────────────────────────────────────── */}
      <section className="section" style={{ backgroundColor: 'white' }}>
        <div className="container">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <div style={{ display: 'inline-block', backgroundColor: '#dcfce7', color: 'var(--color-primary)', padding: '0.3rem 0.9rem', borderRadius: '20px', fontSize: '0.8rem', fontWeight: '600', marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Why Choose Us</div>
            <h2 style={{ fontSize: '2.25rem', fontWeight: 800, margin: 0 }}>Our Core Values</h2>
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
            {[
              { icon: <Award size={28} />, title: 'Excellence', desc: 'We source only the finest quality products directly from trusted farms and certified brands.', color: '#dcfce7', tc: '#166534', hc: 'var(--color-primary)' },
              { icon: <Users size={28} />, title: 'Partnership', desc: 'We grow together with our B2B clients by offering the best margins and dedicated account managers.', color: '#dbeafe', tc: '#1e40af', hc: '#2563eb' },
              { icon: <Clock size={28} />, title: 'Reliability', desc: 'Our supply chain guarantees you never face a stock-out — with same-day delivery across Chennai.', color: '#fef9c3', tc: '#854d0e', hc: '#d97706' },
              { icon: <ShieldCheck size={28} />, title: 'Trust', desc: 'GST-compliant invoices, transparent pricing, and no hidden fees — ever.', color: '#fce7f3', tc: '#9d174d', hc: '#ec4899' },
              { icon: <Leaf size={28} />, title: 'Freshness', desc: 'Farm-to-business sourcing ensures your customers get the freshest products every time.', color: '#ecfdf5', tc: '#065f46', hc: '#10b981' },
              { icon: <TrendingUp size={28} />, title: 'Growth', desc: 'Our B2B platform helps you scale your procurement as your business grows — effortlessly.', color: '#ede9fe', tc: '#4c1d95', hc: '#7c3aed' },
            ].map((v, i) => (
              <motion.div key={i} className="card" style={{ padding: '2rem', textAlign: 'left', cursor: 'default', transition: 'transform 0.3s, box-shadow 0.3s' }}
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                whileHover={{ y: -6 }}>
                <div style={{ width: '56px', height: '56px', borderRadius: '14px', backgroundColor: v.color, display: 'flex', alignItems: 'center', justifyContent: 'center', color: v.hc, marginBottom: '1.25rem' }}>
                  {v.icon}
                </div>
                <h3 style={{ margin: '0 0 0.5rem', fontSize: '1.125rem' }}>{v.title}</h3>
                <p style={{ margin: 0, color: 'var(--color-text-light)', fontSize: '0.9rem', lineHeight: 1.7 }}>{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TEAM SECTION ─────────────────────────────────────────── */}
      <section className="section" style={{ background: 'linear-gradient(to bottom, #f0fdf4, #ffffff)' }}>
        <div className="container">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <div style={{ display: 'inline-block', backgroundColor: '#dcfce7', color: 'var(--color-primary)', padding: '0.3rem 0.9rem', borderRadius: '20px', fontSize: '0.8rem', fontWeight: '600', marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Our People</div>
            <h2 style={{ fontSize: '2.25rem', fontWeight: 800, margin: 0 }}>The Team Behind DND</h2>
          </motion.div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem' }}>
            {[
              { name: 'Dinesh Kumar', role: 'Founder & CEO', img: 'https://i.pravatar.cc/150?img=33', desc: 'Visionary behind DND with 15+ years in wholesale trade across Tamil Nadu.' },
              { name: 'Nandhini Raj', role: 'Head of Operations', img: 'https://i.pravatar.cc/150?img=47', desc: 'Ensures seamless logistics and warehouse management across all 3 hubs.' },
              { name: 'David Raj', role: 'B2B Sales Director', img: 'https://i.pravatar.cc/150?img=12', desc: 'Manages key accounts and partnerships with 1,000+ retail businesses.' },
            ].map((member, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                style={{ backgroundColor: 'white', borderRadius: '20px', overflow: 'hidden', boxShadow: '0 4px 24px rgba(0,0,0,0.07)', border: '1px solid #e8f5e9', textAlign: 'center' }}>
                <div style={{ height: '200px', overflow: 'hidden', background: 'linear-gradient(135deg, #1B5E20, #4CAF50)' }}>
                  <img src={member.img} alt={member.name} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.9, mixBlendMode: 'luminosity' }} />
                </div>
                <div style={{ padding: '1.5rem' }}>
                  <h3 style={{ margin: '0 0 0.25rem', fontSize: '1.125rem' }}>{member.name}</h3>
                  <p style={{ margin: '0 0 0.75rem', color: 'var(--color-primary)', fontWeight: 600, fontSize: '0.875rem' }}>{member.role}</p>
                  <p style={{ margin: 0, color: 'var(--color-text-light)', fontSize: '0.875rem', lineHeight: 1.6 }}>{member.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA BANNER ───────────────────────────────────────────── */}
      <section style={{ background: 'linear-gradient(135deg, #1B5E20, #2E7D32)', padding: '5rem 0' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', color: '#86efac', marginBottom: '1rem' }}>
              {[1,2,3,4,5].map(s => <Star key={s} size={20} fill="currentColor" />)}
            </div>
            <h2 style={{ color: 'white', fontSize: '2.25rem', fontWeight: 800, marginBottom: '1rem' }}>
              Ready to Transform Your Procurement?
            </h2>
            <p style={{ color: '#bbf7d0', maxWidth: '540px', margin: '0 auto 2.5rem', fontSize: '1.0625rem', lineHeight: 1.7 }}>
              Join thousands of businesses in Chennai who trust DND Wholesale for consistent quality, competitive pricing, and on-time delivery.
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to="/shop" className="btn" style={{ backgroundColor: 'white', color: 'var(--color-primary)', padding: '0.875rem 2rem', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none', borderRadius: '12px', fontSize: '1rem' }}>
                Browse Products <ArrowRight size={18} />
              </Link>
              <Link to="/contact" className="btn" style={{ backgroundColor: 'transparent', color: 'white', border: '2px solid rgba(255,255,255,0.4)', padding: '0.875rem 2rem', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none', borderRadius: '12px', fontSize: '1rem' }}>
                <MapPin size={18} /> Contact Us
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
