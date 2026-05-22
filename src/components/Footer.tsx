import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container" style={{ paddingTop: 80, paddingBottom: 80 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px,1fr))', gap: 40 }}>
          {/* Brand */}
          <div style={{ gridColumn: 'span 1' }}>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 700, marginBottom: 16 }}>
              <span style={{ color: 'var(--gold)', fontStyle: 'italic' }}>Stay</span>Easy
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', lineHeight: 1.7, maxWidth: 260, marginBottom: 24 }}>
              Redefining student living through curated architectural properties and seamless digital experiences.
            </p>
            <div style={{ display: 'flex', gap: 12 }}>
              {['share', 'public'].map(icon => (
                <motion.a
                  key={icon} href="#"
                  whileHover={{ borderColor: 'var(--gold)', color: 'var(--gold)' }}
                  style={{
                    width: 40, height: 40, borderRadius: '50%', border: '1px solid var(--border)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: 'var(--text-muted)', transition: 'all var(--t-fast)',
                  }}
                >
                  <span className="material-symbols-outlined" style={{ fontSize: 18 }}>{icon}</span>
                </motion.a>
              ))}
            </div>
          </div>

          {/* Company */}
          <div>
            <h4 style={{ color: 'var(--gold)', fontWeight: 700, fontSize: '0.875rem', marginBottom: 20 }}>Company</h4>
            {[['About Us', '/about'], ['Careers', '/careers'], ['Partner with Us', '/partner'], ['Press', '/press']].map(([l, to]) => (
              <Link key={l} to={to} style={{ display: 'block', color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: 12, transition: 'color var(--t-fast)' }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--gold)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-muted)')}
              >{l}</Link>
            ))}
          </div>

          {/* Support */}
          <div>
            <h4 style={{ color: 'var(--gold)', fontWeight: 700, fontSize: '0.875rem', marginBottom: 20 }}>Support</h4>
            {[['Student Support', '/support'], ['FAQ', '/faq'], ['Privacy Policy', '/privacy'], ['Terms of Service', '/terms']].map(([l, to]) => (
              <Link key={l} to={to} style={{ display: 'block', color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: 12, transition: 'color var(--t-fast)' }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--gold)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-muted)')}
              >{l}</Link>
            ))}
          </div>

          {/* Newsletter */}
          <div>
            <h4 style={{ color: 'var(--gold)', fontWeight: 700, fontSize: '0.875rem', marginBottom: 20 }}>Newsletter</h4>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: 16, lineHeight: 1.6 }}>
              Get the latest property alerts directly in your inbox.
            </p>
            <div style={{ display: 'flex', background: 'rgba(255,255,255,0.05)', padding: 4, borderRadius: 10, border: '1px solid var(--border)' }}>
              <input className="footer-input" placeholder="Email address" type="email" />
              <motion.button
                whileHover={{ backgroundColor: 'var(--gold)' }}
                style={{ background: 'var(--gold-secondary)', color: 'var(--bg-midnight)', padding: '8px 16px', borderRadius: 8, fontWeight: 700, fontSize: '0.8rem', flexShrink: 0, border: 'none', cursor: 'pointer', transition: 'background var(--t-fast)' }}
              >
                Join
              </motion.button>
            </div>
          </div>
        </div>

        <div style={{ borderTop: '1px solid var(--border-subtle)', marginTop: 64, paddingTop: 28, textAlign: 'center' }}>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>
            © {new Date().getFullYear()} StayEasy. Curated Student Living in Nairobi & Athi River.
          </p>
        </div>
      </div>
    </footer>
  );
}
