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

const ROLES = [
  { title: 'Growth Marketing Lead', dept: 'Marketing', type: 'Full-time · Hybrid', desc: 'Drive our student acquisition strategy across campus channels, social media, and strategic partnerships with universities.' },
];

const PERKS = [
  { icon: 'health_and_safety', title: 'Full Health Cover', desc: 'Comprehensive medical, dental, and optical cover for you and your family.' },
  { icon: 'school', title: 'Learning Budget', desc: 'KES 50,000/year for courses, books, conferences, and professional development.' },
  { icon: 'laptop_mac', title: 'Premium Setup', desc: 'A MacBook Pro and a generous home-office equipment budget on your first day.' },
  { icon: 'beach_access', title: '30 Days PTO', desc: 'Plus public holidays. We take rest seriously because great work requires it.' },
];

export default function CareersPage() {
  return (
    <>
      {/* Hero */}
      <section style={{ paddingTop: 140, paddingBottom: 80, background: 'var(--bg)', borderBottom: '1px solid var(--border-subtle)' }}>
        <div className="container">
          <div style={{ maxWidth: 700 }}>
            <FadeUp>
              <div className="text-overline text-gold" style={{ marginBottom: 20 }}>Careers</div>
              <h1 className="text-display font-display" style={{ marginBottom: 24 }}>
                Help us redefine<br />
                <em style={{ color: 'var(--gold)', fontStyle: 'italic' }}>student living.</em>
              </h1>
              <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: 1.85 }}>
                We are a small, ambitious team solving a real problem for hundreds of thousands of students across Kenya. If that excites you, we want to talk.
              </p>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* Perks */}
      <section className="section" style={{ background: 'var(--bg-surface)' }}>
        <div className="container">
          <FadeUp>
            <h2 className="text-display font-display" style={{ marginBottom: 48, textAlign: 'center' }}>Why StayEasy</h2>
          </FadeUp>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 24 }}>
            {PERKS.map((p, i) => (
              <FadeUp key={p.title} delay={i * 0.1}>
                <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 16, padding: '28px 24px', textAlign: 'center' }}>
                  <span className="material-symbols-outlined text-gold" style={{ fontSize: 36, marginBottom: 16, display: 'block' }}>{p.icon}</span>
                  <h3 style={{ fontWeight: 700, marginBottom: 8 }}>{p.title}</h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', lineHeight: 1.7 }}>{p.desc}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* Open Roles */}
      <section className="section">
        <div className="container" style={{ maxWidth: 860 }}>
          <FadeUp>
            <h2 className="text-display font-display" style={{ marginBottom: 48 }}>Open Roles</h2>
          </FadeUp>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {ROLES.map((r, i) => (
              <FadeUp key={r.title} delay={i * 0.08}>
                <motion.div
                  whileHover={{ borderColor: 'var(--border-gold)', y: -2 }}
                  style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 16, padding: '28px 32px', display: 'grid', gridTemplateColumns: '1fr auto', gap: 16, alignItems: 'center', cursor: 'pointer', transition: 'border-color var(--t-fast)' }}
                >
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
                      <h3 style={{ fontWeight: 700, fontSize: '1.05rem' }}>{r.title}</h3>
                      <span className="chip">{r.dept}</span>
                    </div>
                    <div style={{ color: 'var(--text-muted)', fontSize: '0.82rem', marginBottom: 10 }}>{r.type}</div>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.65 }}>{r.desc}</p>
                  </div>
                  <Link to="/contact">
                    <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="btn-gold" style={{ whiteSpace: 'nowrap' }}>
                      Apply Now
                    </motion.button>
                  </Link>
                </motion.div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}