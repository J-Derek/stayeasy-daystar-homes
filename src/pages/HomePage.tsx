import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import InteractiveParticles from '../components/InteractiveParticles';

const HERO_IMG = 'https://lh3.googleusercontent.com/aida-public/AB6AXuCruLNNUHfBkJQVbi2N2bfLbb4uh41K9gMaP0FAPNXhunBOsBqglbDA_2cuJmQ_vjrQzr_FVz9yabpns76Qx8iSLZLQ_yIa7P9pgu3aLhQ1L1H1TA-HE5fXmTXythD1EXfu6XJPpA1GnB_0r0Cf_c54gSaLVNIvPfyI5NKoOTwjgCPVykkm9BbFEolgQ4QfI9aYOq_m1leD_WtIg_QcbX9mjs-Zfd2Q1kiDChCESMPNaapE3vvVk2zOUlwMohW3ZKMbUd4KpNlGgBlL';


const PROPERTIES = [
  {
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD06G19k_IkacMucfrpG36htGZ7NMhkU_n9aps6Mh0-DEJPIlCdQi-ECumvKNqr_iVn5QUJHLxk6hofpLXacTyfbnGGzSlVfDkvgMfuxqEiRSankiPzZlYrsxqfnFp1ZxI2BtZV5JNH1aUPce4n1LejYJU8dRibtnehc09RTXpqMq4WnQHK7kK_nWlZTIwd1h0Xa3F1TVW8TtRmIAqMjRtzKLKUAM6SsSN-lBKRBKbIitXbzUvBIadRp-OBt9_4t7cbmXwby0kL7COX',
    location: 'Nairobi West', name: 'The Atrium Studios', price: 'KSh 45k', beds: '1 Bed', feature: 'High-speed WiFi',
    tags: ['Gym', '24/7 Security', 'Rooftop'], height: 450, id: 'the-atrium',
  },
  {
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBXQn1nm2eRZJxO6vqz0Xl4RmJFXPx9QqEocfIK5PuNd8ts6QZPwpK46Lm_QIwN1H2Q14xf1hD1KQa37ro_qC7B8AFFHKXD5-e6g9A2-45LRcau6mBULw3xr5nYcKZDNKmfPMvmMRaLF4ufPRX7ouz5XnF4duxPJOZ_EcZ8SL99a-HDZFsuNamWI-rKLJJW4Ztt47ObwTgolAWVHJXCMBz3d9IoiDyVWS1uSjFS6mdO4VBIjrWE5KDoVHHq-_heUiyxKTtxV2TU2bnM',
    location: 'Athi River', name: 'Skyline Residency', price: 'KSh 32k', beds: '2 Bed', feature: 'En-suite',
    tags: ['Backup Gen', 'Borehole', 'Parking'], height: 550, id: 'skyline-residency',
  },
  {
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAww_cUkUTevHokVw76AX9ADfSx_uC3D23jz_7O9vqab1_A3pfG9tyR6_ZER_M7Bz_KfZ9aeZcpiBonzvDbwSoLEVilYoYgDA2lk4D7IZchbDPhzGr6btkB6pYuWX6fgLf9iwO4jo9Hdg5QhaH-vhnUQ4L3ciEAbSN-iAAfDIXhtLQig2VY-AJnz-baBaR6Bd_N0cXl5Q59sr4GA7HhXu2JTwyQkx6LR6DuNWHywgShqdALRcpuMWoR_BkjlsNv7j0uDDu7xSKpQpFh',
    location: 'Kilimani', name: 'The Maven Suites', price: 'KSh 55k', beds: '1 Bed', feature: 'Parking',
    tags: ['Elevator', 'Cafe Onsite', 'Concierge'], height: 480, id: 'maven-suites',
  },
];

const MAP_IMG = 'https://lh3.googleusercontent.com/aida-public/AB6AXuA11dcVdBsGQzlEJDQKmdcmoFulFj5q0Yu1tur6A8_gYw-PCK9fRaZ9RlEg6d-ywRtFmtXkjM-LHI4QxN9PBiDQw8b2ZIlndVkXQkjHGXeQjrgzC9oz0BBKnGgfRghDuCjDdtTgmIUfgJgooO4A-YRfRBZgvkmyfyPSyEnMi3xAmOpQ8DiFXsvX3rGqKZzBfOppk656E2lWuVDQvIOcozYm0xOyAWlRNYEfgPxpHhNmNVNDtYsi559j4y-ru-gzTER91ytkwZIoM6Cd';

const TESTIMONIALS = [
  { quote: 'StayEasy made my move from Mombasa to Nairobi incredibly smooth. I found a verified studio in Westlands in just two days. The security is top-notch.', name: 'Amina J.', school: 'University of Nairobi', avatar: 'https://images.unsplash.com/photo-1531123897727-8f129e1bf98c?auto=format&fit=crop&q=80&w=150&h=150' },
  { quote: 'The quality of the properties is exactly as seen in the photos. No surprises. The concierge team was very helpful with the digital contract signing.', name: 'Kevin O.', school: 'Daystar University', avatar: 'https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?auto=format&fit=crop&q=80&w=150&h=150' },
  { quote: 'Finally a platform that understands what students actually need: fast wifi, proximity to transport, and fair prices. Highly recommended!', name: 'Sarah W.', school: 'USIU-Africa', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150&h=150' },
];

const STEPS = [
  { icon: 'search', title: 'Search & Filter', desc: 'Filter by distance to university, price, and essential student amenities.' },
  { icon: 'calendar_month', title: 'Book a Viewing', desc: 'Schedule a physical or virtual tour with our verified property managers.' },
  { icon: 'key', title: 'Move In', desc: 'Sign your digital contract, make payments securely, and collect your keys.' },
];

function FadeUp({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.4, 0, 0.2, 1] }}
    >
      {children}
    </motion.div>
  );
}

function PropertyCard({ p, index }: { p: typeof PROPERTIES[0]; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <motion.div
      ref={ref}
      className="property-card"
      style={{ marginTop: index === 1 ? 40 : 0 }}
      initial={{ opacity: 0, y: 48 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.12, ease: [0.4, 0, 0.2, 1] }}
      whileHover={{ y: -6 }}
    >
      <div className="card-img-wrapper" style={{ height: p.height, position: 'relative' }}>
        <img
          src={p.img}
          alt={p.name}
          className="card-img-inner"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <div className="location-badge" style={{ position: 'absolute', top: 16, left: 16 }}>
          {p.location}
        </div>
      </div>
      <div style={{ padding: '32px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
          <h3 className="text-title">{p.name}</h3>
          <span style={{ color: 'var(--gold)', fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 600 }}>
            {p.price}<span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'var(--font-body)', fontWeight: 400 }}>/mo</span>
          </span>
        </div>
        <div style={{ display: 'flex', gap: 16, marginBottom: 20, color: 'var(--text-muted)' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: '0.8rem' }}>
            <span className="material-symbols-outlined" style={{ fontSize: 16 }}>bed</span>{p.beds}
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: '0.8rem' }}>
            <span className="material-symbols-outlined" style={{ fontSize: 16 }}>wifi</span>{p.feature}
          </span>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 28 }}>
          {p.tags.map(t => <span key={t} className="chip">{t}</span>)}
        </div>
        <Link to={`/accommodation/${p.id}`}>
          <motion.button
            whileHover={{ backgroundColor: 'var(--gold)', color: 'var(--bg-midnight)' }}
            style={{
              width: '100%', padding: '14px', borderRadius: 8,
              border: '1px solid var(--border)', background: 'transparent',
              color: 'var(--text-primary)', fontWeight: 700, fontSize: '0.875rem',
              transition: 'all var(--t-base)', cursor: 'pointer',
            }}
          >
            View Details
          </motion.button>
        </Link>
      </div>
    </motion.div>
  );
}

export default function HomePage() {
  return (
    <>
      {/* ── HERO ── */}
      <section style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', paddingTop: 80, overflow: 'hidden' }}>
        {/* Background */}
        <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
          <div className="hero-bg-mesh" />
          <InteractiveParticles />
          <div className="hero-overlay" style={{ position: 'absolute', inset: 0 }} />
        </div>

        {/* Content */}
        <div className="container" style={{ position: 'relative', zIndex: 10 }}>
          <div style={{ maxWidth: 720 }}>
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '6px 16px', borderRadius: 99,
                background: 'rgba(224,181,96,0.12)', border: '1px solid rgba(224,181,96,0.25)',
                color: 'var(--gold)', fontSize: '0.8rem', fontWeight: 600,
                marginBottom: 24, letterSpacing: '0.05em',
              }}
            >
              <span className="material-symbols-outlined" style={{ fontSize: 16 }}>verified</span>
              Curated Student Housing · Nairobi & Athi River
            </motion.div>

            <motion.h1
              className="text-hero font-display"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.45, ease: [0.4, 0, 0.2, 1] }}
              style={{ marginBottom: 32 }}
            >
              Your Perfect Home,<br />
              <em style={{ color: 'var(--gold)', fontStyle: 'italic' }}>Near Campus.</em>
            </motion.h1>

            {/* Search Bar */}
            <motion.div
              className="search-glass"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.7 }}
              style={{ padding: 8, display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 8 }}
            >
              <div style={{ flex: 1, minWidth: 180, padding: '12px 20px' }}>
                <div className="text-overline text-gold" style={{ marginBottom: 4, fontSize: '0.65rem' }}>Location</div>
                <input className="search-input" placeholder="Nairobi, Athi River..." />
              </div>
              <div className="search-divider" style={{ display: 'none' }} />
              <div style={{ flex: 1, minWidth: 180, padding: '12px 20px' }}>
                <div className="text-overline text-gold" style={{ marginBottom: 4, fontSize: '0.65rem' }}>Monthly Budget</div>
                <input className="search-input" placeholder="KES 25,000 – 50,000" />
              </div>
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <Link to="/find-house" className="btn-gold" style={{ display: 'flex', alignItems: 'center', gap: 8, whiteSpace: 'nowrap' }}>
                  <span className="material-symbols-outlined" style={{ fontSize: 18 }}>explore</span>
                  Explore Listings
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── FEATURED LISTINGS ── */}
      <section className="section">
        <div className="container">
          <FadeUp>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 64 }}>
              <div style={{ maxWidth: 560 }}>
                <h2 className="text-display font-display" style={{ marginBottom: 16 }}>Curated Residences</h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: 1.6 }}>
                  Hand-picked student accommodations prioritising beauty, safety, and campus proximity.
                </p>
              </div>
              <Link
                to="/find-house"
                style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--gold)', fontSize: '0.875rem', fontWeight: 600 }}
              >
                Browse All <span>→</span>
              </Link>
            </div>
          </FadeUp>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px,1fr))', gap: 24 }}>
            {PROPERTIES.map((p, i) => <PropertyCard key={p.id} p={p} index={i} />)}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="section" id="how-it-works" style={{ background: 'var(--bg-midnight)', overflow: 'hidden' }}>
        <div className="container">
          <FadeUp>
            <div style={{ textAlign: 'center', marginBottom: 80 }}>
              <h2 className="text-display font-display" style={{ marginBottom: 16 }}>Seamless Transitions</h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', maxWidth: 560, margin: '0 auto' }}>
                From campus admission to moving in — we handle the complexity so you focus on your studies.
              </p>
            </div>
          </FadeUp>

          <div style={{ position: 'relative' }}>
            {/* Animated connecting line */}
            <div className="line-animate" style={{ position: 'absolute', top: '40px', left: '15%', width: '70%', display: 'none' }} />
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: 48, position: 'relative', zIndex: 1 }}>
              {STEPS.map((s, i) => (
                <FadeUp key={s.title} delay={i * 0.15}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                    <motion.div
                      className="step-icon"
                      whileHover={{ backgroundColor: 'var(--gold-secondary)', borderColor: 'var(--gold-secondary)', color: 'var(--bg-midnight)' }}
                      style={{ marginBottom: 28 }}
                    >
                      <span className="material-symbols-outlined" style={{ fontSize: 32 }}>{s.icon}</span>
                    </motion.div>
                    <h3 className="text-title" style={{ marginBottom: 12 }}>{s.title}</h3>
                    <p style={{ color: 'var(--text-muted)', maxWidth: 240, lineHeight: 1.6 }}>{s.desc}</p>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── NEIGHBORHOOD ── */}
      <section className="section">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: 80, alignItems: 'center' }}>
            <FadeUp>
              <div>
                <div className="text-overline text-gold" style={{ marginBottom: 20 }}>Premium Locations</div>
                <h2 className="text-display font-display" style={{ marginBottom: 24 }}>Live Near<br />Daystar University</h2>
                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: 32 }}>
                  Our Athi River portfolio is curated specifically for Daystar students, offering a serene environment and modern living within a 5-minute shuttle range.
                </p>
                <ul style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 36 }}>
                  {['Gated communities with strict 24/7 security', 'Dedicated shuttle routes to main campus', 'High-speed fiber connectivity for research'].map(f => (
                    <li key={f} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <span className="material-symbols-outlined text-gold" style={{ fontSize: 20 }}>verified</span>
                      <span style={{ color: 'var(--text-primary)', fontSize: '0.95rem' }}>{f}</span>
                    </li>
                  ))}
                </ul>
                <Link to="/find-house?location=Athi+River">
                  <motion.button whileHover={{ borderColor: 'var(--gold)', color: 'var(--gold)' }} className="btn-outline">
                    Explore Athi River Area
                  </motion.button>
                </Link>
              </div>
            </FadeUp>

            <FadeUp delay={0.2}>
              <div style={{ position: 'relative' }}>
                <div style={{ borderRadius: 24, overflow: 'hidden', border: '1px solid var(--border)', boxShadow: 'var(--shadow-lg)', aspectRatio: '1/1', position: 'relative' }}>
                  <img src={MAP_IMG} alt="Athi River map" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.6 }} />
                  <div className="map-overlay-card" style={{ position: 'absolute', bottom: 24, left: 24, right: 24, padding: 20, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div>
                      <div className="text-title" style={{ color: 'white', marginBottom: 4 }}>Valley View Park</div>
                      <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>1.2km from Main Campus</div>
                    </div>
                    <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'var(--gold)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <span className="material-symbols-outlined" style={{ fontSize: 20, color: 'var(--bg-midnight)' }}>directions_bus</span>
                    </div>
                  </div>
                </div>
                {/* Decorative corner */}
                <div style={{ position: 'absolute', top: -20, right: -20, width: 80, height: 80, borderTop: '1px solid rgba(224,181,96,0.25)', borderRight: '1px solid rgba(224,181,96,0.25)', borderRadius: '0 12px 0 0', zIndex: -1 }} />
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="section" style={{ background: 'var(--bg-surface)' }}>
        <div className="container">
          <FadeUp>
            <div style={{ textAlign: 'center', marginBottom: 64 }}>
              <h2 className="text-display font-display">Voice of Our Community</h2>
            </div>
          </FadeUp>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: 24 }}>
            {TESTIMONIALS.map((t, i) => (
              <FadeUp key={t.name} delay={i * 0.1}>
                <motion.div className="testimonial-card" whileHover={{ borderColor: 'var(--border-gold)' }}>
                  <span className="material-symbols-outlined" style={{ fontSize: 48, color: 'rgba(224,181,96,0.2)', position: 'absolute', top: 24, left: 24 }}>format_quote</span>
                  <p style={{ fontStyle: 'italic', lineHeight: 1.8, color: 'var(--text-primary)', marginBottom: 32, fontSize: '1rem', position: 'relative', zIndex: 1 }}>"{t.quote}"</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <img src={t.avatar} alt={t.name} style={{ width: 44, height: 44, borderRadius: '50%', objectFit: 'cover', background: 'var(--bg-elevated)' }} />
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>{t.name}</div>
                      <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>{t.school}</div>
                    </div>
                  </div>
                </motion.div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
