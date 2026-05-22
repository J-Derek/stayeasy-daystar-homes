import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
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

const FAQS = [
  { q: 'How do I report a problem with my accommodation?', a: 'You can report issues directly from your Student Dashboard under "My Bookings". Select the relevant booking and click "Report an Issue". Our team responds within 24 hours on business days.' },
  { q: 'How long does it take to verify a new listing?', a: 'New listings typically take 48-72 business hours to verify. Our property team will schedule an inspection and contact the landlord directly.' },
  { q: 'Can I get a refund if I cancel my booking?', a: 'Refund eligibility depends on the landlord\'s cancellation policy listed on each property page. StayEasy enforces a minimum 7-day notice period for eligible refunds.' },
  { q: 'Is my personal data safe?', a: 'Absolutely. All data is encrypted in transit and at rest. We never sell your personal information to third parties. See our Privacy Policy for full details.' },
  { q: 'How do I contact a landlord directly?', a: 'Once your booking is confirmed, the landlord\'s contact details are unlocked in your dashboard. Before booking, you can send a message through our secure in-app messaging.' },
];

export default function SupportPage() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <>
      <section style={{ paddingTop: 140, paddingBottom: 80, background: 'var(--bg)', borderBottom: '1px solid var(--border-subtle)' }}>
        <div className="container">
          <FadeUp>
            <div className="text-overline text-gold" style={{ marginBottom: 20 }}>Support</div>
            <h1 className="text-display font-display" style={{ marginBottom: 24 }}>How can we help?</h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: 1.85, maxWidth: 540 }}>
              Our student support team is available Monday to Friday, 8am – 6pm EAT. We typically respond within 4 hours.
            </p>
          </FadeUp>
        </div>
      </section>

      <section style={{ background: 'var(--bg-surface)', padding: '64px 0', borderBottom: '1px solid var(--border-subtle)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 24 }}>
            {[
              { icon: 'chat_bubble', title: 'Live Chat', desc: 'Start a real-time chat with our support agents.', cta: 'Start Chat', to: '/contact' },
              { icon: 'mail', title: 'Email Us', desc: 'Write to support@stayeasy.co.ke for non-urgent matters.', cta: 'Send Email', to: '/contact' },
              { icon: 'article', title: 'Help Centre', desc: 'Browse our comprehensive FAQs and how-to guides below.', cta: 'Browse FAQs', to: '#faqs' },
            ].map((c, i) => (
              <FadeUp key={c.title} delay={i * 0.1}>
                <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 16, padding: '28px 24px', textAlign: 'center' }}>
                  <span className="material-symbols-outlined text-gold" style={{ fontSize: 36, marginBottom: 16, display: 'block' }}>{c.icon}</span>
                  <h3 style={{ fontWeight: 700, marginBottom: 8 }}>{c.title}</h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', lineHeight: 1.7, marginBottom: 20 }}>{c.desc}</p>
                  <Link to={c.to}><motion.button whileHover={{ scale: 1.03 }} className="btn-outline" style={{ width: '100%' }}>{c.cta}</motion.button></Link>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      <section id="faqs" className="section">
        <div className="container" style={{ maxWidth: 760 }}>
          <FadeUp><h2 className="text-display font-display" style={{ marginBottom: 48, textAlign: 'center' }}>Frequently Asked Questions</h2></FadeUp>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {FAQS.map((faq, i) => (
              <FadeUp key={faq.q} delay={i * 0.06}>
                <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 14, overflow: 'hidden', transition: 'border-color var(--t-fast)', borderColor: openIdx === i ? 'var(--border-gold)' : 'var(--border)' }}>
                  <button
                    onClick={() => setOpenIdx(openIdx === i ? null : i)}
                    style={{ width: '100%', padding: '20px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', textAlign: 'left', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-primary)', fontWeight: 600 }}
                  >
                    <span>{faq.q}</span>
                    <motion.span animate={{ rotate: openIdx === i ? 45 : 0 }} className="material-symbols-outlined" style={{ fontSize: 20, color: 'var(--gold)', flexShrink: 0, marginLeft: 12 }}>add</motion.span>
                  </button>
                  <AnimatePresence>
                    {openIdx === i && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }} style={{ overflow: 'hidden' }}>
                        <p style={{ padding: '0 24px 20px', color: 'var(--text-secondary)', lineHeight: 1.75 }}>{faq.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}