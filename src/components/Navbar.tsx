import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';

const NAV_LINKS = [
  { label: 'Properties', to: '/find-house' },
  { label: 'How it Works', to: '/how-it-works' },
  { label: 'FAQ', to: '/faq' },
  { label: 'Contact', to: '/contact' },
];

export default function Navbar() {
  const { pathname } = useLocation();
  const { toggleTheme, isDark } = useTheme();
  const { user, signOut: logout } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // close menu on route change
  useEffect(() => setMenuOpen(false), [pathname]);

  const isActive = (to: string) => pathname === to;

  return (
    <>
      <motion.nav
        className={`navbar glass ${scrolled ? 'scrolled' : ''}`}
        style={{ paddingTop: scrolled ? 8 : 16, paddingBottom: scrolled ? 8 : 16 }}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
      >
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

          {/* Logo */}
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <img src="/favicon.svg" alt="StayEasy Logo" style={{ height: 28, width: 28 }} />
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <span className="font-display text-title text-gold" style={{ fontStyle: 'italic', lineHeight: 1 }}>
                Stay
              </span>
              <span className="font-display text-title" style={{ lineHeight: 1 }}>
                Easy
              </span>
            </div>
          </Link>

          {/* Desktop Links */}
          <div className="hidden-mobile" style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
            {NAV_LINKS.map(link => (
              <Link
                key={link.to}
                to={link.to}
                className="text-label"
                style={{
                  color: isActive(link.to) ? 'var(--gold)' : 'var(--text-secondary)',
                  borderBottom: isActive(link.to) ? '2px solid var(--gold)' : '2px solid transparent',
                  paddingBottom: 4,
                  transition: 'color var(--t-fast)',
                }}
                onMouseEnter={e => { if (!isActive(link.to)) (e.currentTarget as HTMLElement).style.color = 'var(--gold)'; }}
                onMouseLeave={e => { if (!isActive(link.to)) (e.currentTarget as HTMLElement).style.color = 'var(--text-secondary)'; }}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            {/* Theme toggle */}
            <motion.button
              onClick={toggleTheme}
              whileHover={{ scale: 1.1, rotate: 15 }}
              whileTap={{ scale: 0.9 }}
              style={{
                width: 40, height: 40, borderRadius: '50%',
                background: 'transparent', border: '1px solid var(--border)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'var(--text-secondary)', transition: 'all var(--t-fast)',
              }}
              aria-label="Toggle theme"
            >
              <span className="material-symbols-outlined" style={{ fontSize: 20 }}>
                {isDark ? 'light_mode' : 'dark_mode'}
              </span>
            </motion.button>

            {user ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <Link to={user.role === 'landlord' ? '/landlord' : '/dashboard'}>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    style={{
                      width: 36, height: 36, borderRadius: '50%',
                      background: 'rgba(224,181,96,0.15)', border: '2px solid var(--gold)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: 'var(--gold)', fontWeight: 700, fontSize: '0.85rem',
                    }}
                  >
                    {user.name?.[0]?.toUpperCase() || 'U'}
                  </motion.div>
                </Link>
                <button
                  onClick={logout}
                  className="text-sm text-muted"
                  style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}
                >
                  Log Out
                </button>
              </div>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-label hidden-mobile"
                  style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = 'var(--gold)'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'var(--text-secondary)'; }}
                >
                  Log In
                </Link>
                <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                  <Link to="/find-house" className="btn-gold" style={{ padding: '10px 22px', fontSize: '0.8rem' }}>
                    Find a Home
                  </Link>
                </motion.div>
              </>
            )}

            {/* Hamburger */}
            <button
              className="show-mobile"
              onClick={() => setMenuOpen(o => !o)}
              style={{
                display: 'none',
                width: 40, height: 40, borderRadius: 8,
                border: '1px solid var(--border)',
                alignItems: 'center', justifyContent: 'center',
                color: 'var(--text-primary)',
              }}
              aria-label="Toggle menu"
            >
              <span className="material-symbols-outlined" style={{ fontSize: 22 }}>
                {menuOpen ? 'close' : 'menu'}
              </span>
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.25 }}
            style={{
              position: 'fixed', top: 64, left: 0, right: 0, bottom: 0,
              zIndex: 98, background: 'var(--bg)', padding: 24,
              display: 'flex', flexDirection: 'column', gap: 8,
            }}
          >
            {NAV_LINKS.map((link, i) => (
              <motion.div
                key={link.to}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.06 }}
              >
                <Link
                  to={link.to}
                  style={{
                    display: 'block', padding: '14px 16px',
                    borderRadius: 8, fontSize: '1rem', fontWeight: 600,
                    color: isActive(link.to) ? 'var(--gold)' : 'var(--text-primary)',
                    background: isActive(link.to) ? 'rgba(224,181,96,0.08)' : 'transparent',
                  }}
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
            <div style={{ marginTop: 16, display: 'flex', flexDirection: 'column', gap: 12 }}>
              {user ? (
                <button onClick={logout} className="btn-outline" style={{ textAlign: 'center' }}>Log Out</button>
              ) : (
                <>
                  <Link to="/login" className="btn-outline" style={{ textAlign: 'center' }}>Log In</Link>
                  <Link to="/signup" className="btn-gold" style={{ textAlign: 'center' }}>Sign Up</Link>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) {
          .hidden-mobile { display: none !important; }
          .show-mobile { display: flex !important; }
        }
        @media (min-width: 769px) {
          .show-mobile { display: none !important; }
        }
      `}</style>
    </>
  );
}
