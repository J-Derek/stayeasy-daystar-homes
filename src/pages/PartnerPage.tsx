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

const BENEFITS = [
  { icon: 'people', title: 'Access to 2,400+ Students', desc: 'Tap directly into our verified, pre-screened student base actively searching for housing. Zero cold leads.' },
  { icon: 'assignment_turned_in', title: 'Digital Contract Management', desc: 'No paperwork. Our system handles tenancy agreements, digital signatures, and renewal reminders automatically.' },
  { icon: 'payments', title: 'Secure Rent Collection', desc: 'Integrated M-PESA and bank transfer rails with automated reminders and instant payment confirmations.' },
  { icon: 'support_agent', title: 'Dedicated Success Manager', desc: 'Every partner gets a dedicated point of contact for property listing support, tenant disputes, and strategy.' },
];

const STEPS = [
  { step: '01', title: 'Apply', desc: 'Fill in your property details using our simple landlord application form.' },
  { step: '02', title: 'Inspection', desc: 'Our property team schedules a visit to verify and professionally photograph your property.' },
  { step: '03', title: 'Go Live', desc: 'Your listing goes live within 48 hours, visible to our full student community.' },
  { step: '04', title: 'Earn', desc: 'Receive consistent, on-time rent payments with full digital audit trails.' },
];

export default function PartnerPage() {
  return (
    <>
      <section style={{ paddingTop: 140, paddingBottom: 80, background: 'var(--bg)', borderBottom: '1px solid var(--border-subtle)' }}>
        <div className="container">
          <div style={{ maxWidth: 720 }}>
            <FadeUp>
              <div className="text-overline text-gold" style={{ marginBottom: 20 }}>For Landlords</div>
              <h1 className="text-display font-display" style={{ marginBottom: 24 }}>Your property.<br /><em style={{ color: 'var(--gold)', fontStyle: 'italic' }}>Fully occupied.</em></h1>
              <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: 1.85, maxWidth: 580, marginBottom: 36 }}>
                Join 200+ landlords who trust StayEasy to connect their properties with verified, responsible student tenants — with zero vacancy stress.
              </p>
              <Link to="/signup"><motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="btn-gold">List Your Property</motion.button></Link>
            </FadeUp>
          </div>
        </div>
      </section>

      <section className="section" style={{ background: 'var(--bg-surface)' }}>
        <div className="container">
          <FadeUp><div style={{ textAlign: 'center', marginBottom: 64 }}><h2 className="text-display font-display">Why Partner With Us</h2></div></FadeUp>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 24 }}>
            {BENEFITS.map((b, i) => (
              <FadeUp key={b.title} delay={i * 0.1}>
                <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 16, padding: '28px 24px' }}>
                  <span className="material-symbols-outlined text-gold" style={{ fontSize: 36, marginBottom: 16, display: 'block' }}>{b.icon}</span>
                  <h3 style={{ fontWeight: 700, marginBottom: 8 }}>{b.title}</h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', lineHeight: 1.7 }}>{b.desc}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container" style={{ maxWidth: 860 }}>
          <FadeUp><h2 className="text-display font-display" style={{ textAlign: 'center', marginBottom: 64 }}>How it works</h2></FadeUp>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 40 }}>
            {STEPS.map((s, i) => (
              <FadeUp key={s.step} delay={i * 0.1}>
                <div style={{ textAlign: 'center' }}>
                  <div className="font-display" style={{ fontSize: '3rem', fontWeight: 700, color: 'var(--border)', lineHeight: 1, marginBottom: 16 }}>{s.step}</div>
                  <h3 style={{ fontWeight: 700, marginBottom: 8 }}>{s.title}</h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', lineHeight: 1.7 }}>{s.desc}</p>
                </div>
              </FadeUp>
            ))}
          </div>
          <FadeUp delay={0.3}>
            <div style={{ textAlign: 'center', marginTop: 64 }}>
              <Link to="/contact"><motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="btn-gold">Get in Touch</motion.button></Link>
            </div>
          </FadeUp>
        </div>
      </section>
    </>
  );
}