import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const faqs = [
  { q: 'How does StayEasy work?', a: 'StayEasy connects Daystar University students with verified landlords in Nairobi & Athi River. Browse premium listings, compare monthly rates and features, then send a booking inquiry directly to the landlord. Once accepted, you arrange rent payments directly with the host.', category: 'General' },
  { q: 'Is StayEasy free for students?', a: 'Yes! Browsing, saving, and sending booking applications to property landlords is completely free of charge. There are no hidden broker commissions or setup costs.', category: 'General' },
  { q: 'How are luxury listings verified?', a: 'Our dedicated Quality Assurance team physically visits every listed apartment to inspect safety protocols, amenities, and water/power stability. Verified properties display a Verified Badge.', category: 'Safety' },
  { q: 'Can I visit an apartment before committing?', a: 'Absolutely. We encourage in-person viewings. You can contact the landlord directly via the Phone or WhatsApp hotlinks listed on their property page to schedule a site tour.', category: 'Booking' },
  { q: 'What layout configurations are available?', a: 'Our listings feature highly requested configurations: classic Single Rooms, modern Bedsitters, spacious 1-Bedrooms, and luxury 2-Bedroom student flats. Pricing ranges from KSh 8,500 to KSh 60,000.', category: 'Rooms' },
  { q: 'How far are these estates from campus?', a: 'Most properties are located strategically within 500m to 1.8km of campus, facilitating a 5-15 minute walk or simple shuttle access to class.', category: 'Location' },
  { q: 'How are rent payments structured?', a: 'Payments are handled outside the portal directly between the student and host (typically via Lipa na M-Pesa or bank transfer). A lease agreement is signed prior to move-in.', category: 'Booking' },
  { q: 'How can a landlord list a student property?', a: 'Select "Landlord" at registration, fill in the comprehensive room detail forms, list your amenities, upload authentic photos, and submit. The property goes live once vetted.', category: 'General' },
];

const categories = ['All', 'General', 'Rooms', 'Booking', 'Safety', 'Location'];

export default function FAQPage() {
  const [openId, setOpenId] = useState<number | null>(0);
  const [search, setSearch] = useState('');
  const [selectedCat, setSelectedCat] = useState('All');

  const filteredFaqs = useMemo(() => {
    return faqs.filter(faq => {
      const matchSearch = faq.q.toLowerCase().includes(search.toLowerCase()) || faq.a.toLowerCase().includes(search.toLowerCase());
      const matchCat = selectedCat === 'All' || faq.category === selectedCat;
      return matchSearch && matchCat;
    });
  }, [search, selectedCat]);

  return (
    <div style={{ paddingTop: 80, minHeight: '100vh', paddingBottom: 80 }}>
      {/* Header and banner */}
      <div style={{ background: 'var(--bg-midnight)', borderBottom: '1px solid var(--border)', padding: '48px 0 32px' }}>
        <div className="container" style={{ maxWidth: 760 }}>
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} style={{ textAlign: 'center' }}>
            <div className="text-overline text-gold" style={{ marginBottom: 8 }}>Knowledge Hub</div>
            <h1 className="font-display" style={{ fontSize: 'clamp(2rem,4vw,2.8rem)', fontWeight: 700, marginBottom: 8 }}>Common Queries</h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
              Everything you need to know about Nairobi &amp; Athi River luxury student housing.
            </p>
          </motion.div>

          {/* FAQ Search Bar */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
            style={{ marginTop: 28, position: 'relative' }}>
            <span className="material-symbols-outlined" style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', fontSize: 20, color: 'var(--text-muted)' }}>search</span>
            <input
              className="se-input"
              style={{ paddingLeft: 46 }}
              placeholder="Search frequently asked questions..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </motion.div>

          {/* Category Filter Pills */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.25 }}
            style={{ marginTop: 16, display: 'flex', gap: 8, justifyContent: 'center', flexWrap: 'wrap' }}>
            {categories.map(c => (
              <button key={c} onClick={() => setSelectedCat(c)}
                className={`filter-pill ${selectedCat === c ? 'active' : ''}`}>
                {c}
              </button>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Accordions */}
      <div className="container" style={{ maxWidth: 760, marginTop: 40 }}>
        <AnimatePresence mode="popLayout">
          {filteredFaqs.length === 0 ? (
            <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              style={{ textAlign: 'center', padding: '60px 0' }}>
              <span className="material-symbols-outlined" style={{ fontSize: 44, color: 'var(--text-muted)', marginBottom: 12 }}>info</span>
              <p style={{ color: 'var(--text-muted)' }}>No questions match your filter options.</p>
            </motion.div>
          ) : (
            <motion.div key="list" style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {filteredFaqs.map((faq, i) => {
                const isOpen = openId === i;
                return (
                  <motion.div key={i}
                    layout
                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                    style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-subtle)', borderRadius: 12, overflow: 'hidden' }}>
                    <button onClick={() => setOpenId(isOpen ? null : i)}
                      style={{
                        width: '100%', padding: '20px 24px', background: 'transparent', border: 'none',
                        display: 'flex', justifyContent: 'space-between', alignItems: 'center', textAlign: 'left',
                        cursor: 'pointer', color: 'white', fontWeight: 600, fontSize: '0.95rem', transition: 'all var(--t-fast)'
                      }}
                      onMouseEnter={e => e.currentTarget.style.color = 'var(--gold)'}
                      onMouseLeave={e => { if(!isOpen) e.currentTarget.style.color = 'white'; }}>
                      <span>{faq.q}</span>
                      <span className="material-symbols-outlined" style={{ transition: 'transform var(--t-fast)', transform: isOpen ? 'rotate(180deg)' : 'rotate(0)', color: 'var(--gold)' }}>
                        expand_more
                      </span>
                    </button>
                    
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25 }}
                          style={{ overflow: 'hidden' }}>
                          <div style={{ padding: '0 24px 24px', color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.7, borderTop: '1px solid var(--border-subtle)' }}>
                            {faq.a}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
