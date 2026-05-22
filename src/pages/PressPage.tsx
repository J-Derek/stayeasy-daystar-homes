import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';

function FadeUp({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 32 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay, ease: [0.4, 0, 0.2, 1] }}>
      {children}
    </motion.div>
  );
}

const PRESS_ITEMS = [
  { outlet: 'The Standard', date: 'May 2026', headline: 'StayEasy Is Solving Kenya\'s Student Housing Crisis One Verified Listing at a Time', tag: 'Feature' },
  { outlet: 'Business Daily Africa', date: 'March 2026', headline: 'How StayEasy\'s Digital-First Approach Is Disrupting the Traditional Rental Market', tag: 'Interview' },
  { outlet: 'TechCabal', date: 'January 2026', headline: 'Meet the Kenyan Startup Making Student Housing as Easy as Booking a Hotel', tag: 'Startup Spotlight' },
];

const FACTS = [
  { value: '2,400+', label: 'Students Housed' },
  { value: 'KES 2B+', label: 'Rent Transacted' },
  { value: '4.9/5', label: 'Student Satisfaction' },
  { value: 'Jan 2024', label: 'Founded' },
];

export default function PressPage() {
  return (
    <>
      <section style={{ paddingTop: 140, paddingBottom: 80, background: 'var(--bg)', borderBottom: '1px solid var(--border-subtle)' }}>
        <div className="container">
          <FadeUp>
            <div className="text-overline text-gold" style={{ marginBottom: 20 }}>Press</div>
            <h1 className="text-display font-display" style={{ marginBottom: 24 }}>StayEasy in the News</h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: 1.85, maxWidth: 580 }}>
              For press enquiries and media kit requests, please contact <a href="mailto:press@stayeasy.co.ke" style={{ color: 'var(--gold)' }}>press@stayeasy.co.ke</a>.
            </p>
          </FadeUp>
        </div>
      </section>

      <section style={{ background: 'var(--bg-surface)', padding: '48px 0', borderBottom: '1px solid var(--border-subtle)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 32, textAlign: 'center' }}>
            {FACTS.map((f, i) => (
              <FadeUp key={f.label} delay={i * 0.1}>
                <div className="font-display" style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--text-primary)' }}>{f.value}</div>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: 6 }}>{f.label}</div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container" style={{ maxWidth: 820 }}>
          <FadeUp><h2 className="text-display font-display" style={{ marginBottom: 48 }}>Recent Coverage</h2></FadeUp>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {PRESS_ITEMS.map((p, i) => (
              <FadeUp key={p.headline} delay={i * 0.08}>
                <motion.div whileHover={{ borderColor: 'var(--border-gold)' }} style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 16, padding: '28px 32px', transition: 'border-color var(--t-fast)' }}>
                  <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 12 }}>
                    <span className="chip">{p.tag}</span>
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>{p.outlet} · {p.date}</span>
                  </div>
                  <h3 style={{ fontWeight: 700, lineHeight: 1.4, fontSize: '1rem' }}>{p.headline}</h3>
                </motion.div>
              </FadeUp>
            ))}
          </div>

          <FadeUp delay={0.3}>
            <div style={{ marginTop: 64, background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 20, padding: '48px', textAlign: 'center' }}>
              <h3 className="text-title font-display" style={{ marginBottom: 12 }}>Media Kit</h3>
              <p style={{ color: 'var(--text-secondary)', marginBottom: 24 }}>Download our brand assets, logos, and founder bios for editorial use.</p>
              <Link to="/contact"><motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="btn-gold">Request Media Kit</motion.button></Link>
            </div>
          </FadeUp>
        </div>
      </section>
    </>
  );
}