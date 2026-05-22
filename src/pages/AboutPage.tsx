import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

function FadeUp({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 32 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay, ease: [0.4, 0, 0.2, 1] }}>
      {children}
    </motion.div>
  );
}

const STATS = [
  { value: '2,400+', label: 'Students Housed', icon: 'school' },
  { value: '120+', label: 'Verified Listings', icon: 'apartment' },
  { value: '4.9★', label: 'Average Rating', icon: 'star' },
  { value: '2', label: 'Cities Covered', icon: 'location_city' },
];

const VALUES = [
  { icon: 'verified_user', title: 'Trust First', desc: 'Every listing is personally verified by our team. No surprises, no catfishes — just honest, accurate property information.' },
  { icon: 'diversity_3', title: 'Community Driven', desc: 'We exist because of students, for students. Every feature we build is shaped by real feedback from our growing community.' },
  { icon: 'bolt', title: 'Effortless Speed', desc: 'From search to signed contract in under 72 hours. We remove friction so you can focus on what actually matters — your studies.' },
  { icon: 'workspace_premium', title: 'Quality Uncompromised', desc: 'We curate, not aggregate. Every property in our portfolio meets a strict standard of safety, cleanliness, and modern amenities.' },
];

const TEAM = [
  { name: 'Derrick Macharia', role: 'Founder & CEO', img: 'https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?auto=format&fit=crop&q=80&w=300&h=300' },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section style={{ paddingTop: 140, paddingBottom: 80, background: 'var(--bg)', borderBottom: '1px solid var(--border-subtle)' }}>
        <div className="container">
          <div style={{ maxWidth: 760 }}>
            <FadeUp>
              <div className="text-overline text-gold" style={{ marginBottom: 20 }}>Our Story</div>
              <h1 className="text-display font-display" style={{ marginBottom: 24 }}>
                Built by students,<br />
                <em style={{ color: 'var(--gold)', fontStyle: 'italic' }}>for students.</em>
              </h1>
              <p style={{ color: 'var(--text-secondary)', fontSize: '1.15rem', lineHeight: 1.85, maxWidth: 620 }}>
                StayEasy was born out of a frustrating reality — finding decent, safe, affordable student housing in Nairobi shouldn't feel like a full-time job. We built the platform we wished existed when we were students.
              </p>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section style={{ background: 'var(--bg-surface)', padding: '64px 0', borderBottom: '1px solid var(--border-subtle)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 32 }}>
            {STATS.map((s, i) => (
              <FadeUp key={s.label} delay={i * 0.1}>
                <div style={{ textAlign: 'center' }}>
                  <span className="material-symbols-outlined text-gold" style={{ fontSize: 32, marginBottom: 12, display: 'block' }}>{s.icon}</span>
                  <div className="font-display" style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1 }}>{s.value}</div>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: 8 }}>{s.label}</div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="section">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 80, alignItems: 'center' }}>
            <FadeUp>
              <div>
                <div className="text-overline text-gold" style={{ marginBottom: 20 }}>Our Mission</div>
                <h2 className="text-display font-display" style={{ marginBottom: 24 }}>Removing the housing anxiety from student life</h2>
                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.85, marginBottom: 20 }}>
                  We partner with vetted, responsible landlords and property managers who share our commitment to student welfare. Every property in our portfolio is personally inspected, photographed honestly, and reviewed by real students.
                </p>
                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.85 }}>
                  We are not a classifieds site. We are a full-stack housing partner — from search to contract, we are with you at every step.
                </p>
              </div>
            </FadeUp>
            <FadeUp delay={0.2}>
              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=700"
                alt="Students collaborating"
                style={{ width: '100%', borderRadius: 20, border: '1px solid var(--border)', boxShadow: 'var(--shadow-lg)' }}
              />
            </FadeUp>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section" style={{ background: 'var(--bg-surface)' }}>
        <div className="container">
          <FadeUp>
            <div style={{ textAlign: 'center', marginBottom: 64 }}>
              <h2 className="text-display font-display" style={{ marginBottom: 16 }}>What We Stand For</h2>
              <p style={{ color: 'var(--text-secondary)', maxWidth: 480, margin: '0 auto' }}>The principles that guide every decision we make.</p>
            </div>
          </FadeUp>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 24 }}>
            {VALUES.map((v, i) => (
              <FadeUp key={v.title} delay={i * 0.1}>
                <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 16, padding: '32px 28px' }}>
                  <span className="material-symbols-outlined text-gold" style={{ fontSize: 36, marginBottom: 20, display: 'block' }}>{v.icon}</span>
                  <h3 className="text-title" style={{ marginBottom: 12 }}>{v.title}</h3>
                  <p style={{ color: 'var(--text-secondary)', lineHeight: 1.75, fontSize: '0.95rem' }}>{v.desc}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section">
        <div className="container">
          <FadeUp>
            <div style={{ textAlign: 'center', marginBottom: 64 }}>
              <h2 className="text-display font-display" style={{ marginBottom: 16 }}>The People Behind StayEasy</h2>
            </div>
          </FadeUp>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 32, maxWidth: 780, margin: '0 auto' }}>
            {TEAM.map((t, i) => (
              <FadeUp key={t.name} delay={i * 0.12}>
                <div style={{ textAlign: 'center' }}>
                  <img src={t.img} alt={t.name} style={{ width: 100, height: 100, borderRadius: '50%', objectFit: 'cover', border: '3px solid var(--border-gold)', margin: '0 auto 16px' }} />
                  <div style={{ fontWeight: 700, fontSize: '1rem', marginBottom: 4 }}>{t.name}</div>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>{t.role}</div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}