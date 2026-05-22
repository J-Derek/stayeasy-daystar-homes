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

const STEPS = [
  { step: '01', title: 'Search & Filter', desc: 'Browse our curated list of verified properties in Nairobi and Athi River. Filter by budget, amenities, and proximity to your campus.' },
  { step: '02', title: 'Virtual Tour & Request', desc: 'View high-quality photos, honest reviews, and detailed amenity lists. Found the one? Send a booking request directly to the landlord.' },
  { step: '03', title: 'Secure Payment', desc: 'Once approved, pay your deposit securely through our integrated payment rails (M-PESA or Bank). Your money is protected.' },
  { step: '04', title: 'Move In', desc: 'Sign your digital lease, get your keys, and move into your new home. Our support team is here if you need anything.' },
];

export default function HowItWorksPage() {
  return (
    <>
      <section style={{ paddingTop: 140, paddingBottom: 80, background: 'var(--bg)', borderBottom: '1px solid var(--border-subtle)' }}>
        <div className="container">
          <div style={{ maxWidth: 720 }}>
            <FadeUp>
              <div className="text-overline text-gold" style={{ marginBottom: 20 }}>How It Works</div>
              <h1 className="text-display font-display" style={{ marginBottom: 24 }}>Your journey to <br /><em style={{ color: 'var(--gold)', fontStyle: 'italic' }}>better housing.</em></h1>
              <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: 1.85, maxWidth: 580, marginBottom: 36 }}>
                We've simplified the entire process of finding and booking student accommodation. No more endless searching, hidden fees, or shady landlords.
              </p>
              <Link to="/find-house"><motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="btn-gold">Start Searching</motion.button></Link>
            </FadeUp>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container" style={{ maxWidth: 860 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 64 }}>
            {STEPS.map((s, i) => (
              <FadeUp key={s.step} delay={i * 0.1}>
                <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: 32, alignItems: 'start' }}>
                  <div className="font-display" style={{ fontSize: '4rem', fontWeight: 700, color: 'var(--gold)', lineHeight: 1, opacity: 0.5 }}>{s.step}</div>
                  <div>
                    <h3 className="font-display" style={{ fontSize: '1.75rem', fontWeight: 600, marginBottom: 12 }}>{s.title}</h3>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: 1.75 }}>{s.desc}</p>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
          
          <FadeUp delay={0.3}>
            <div style={{ textAlign: 'center', marginTop: 80, padding: 48, background: 'var(--bg-surface)', borderRadius: 24, border: '1px solid var(--border-subtle)' }}>
               <h3 className="font-display" style={{ fontSize: '1.5rem', marginBottom: 16 }}>Ready to find your new place?</h3>
               <Link to="/signup"><motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="btn-outline">Create an Account</motion.button></Link>
            </div>
          </FadeUp>
        </div>
      </section>
    </>
  );
}
