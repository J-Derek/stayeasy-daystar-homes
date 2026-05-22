import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', textAlign: 'center', background: 'var(--bg-midnight)' }}>
      <div>
        <div style={{ fontSize: 'clamp(6rem, 15vw, 10rem)', fontWeight: 800, color: 'var(--gold)', lineHeight: 1, fontFamily: 'var(--font-display)' }}>404</div>
        <h1 className="font-display" style={{ fontSize: '1.8rem', fontWeight: 700, marginBottom: 12, color: 'white' }}>Page Not Found</h1>
        <p style={{ color: 'var(--text-muted)', marginBottom: 32, maxWidth: 400, margin: '0 auto 32px', fontSize: '0.95rem' }}>
          The luxury suite or custom panel you are looking for has been relocated or does not exist.
        </p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/" className="btn-gold" style={{ textDecoration: 'none', display: 'inline-block', padding: '10px 22px', fontSize: '0.85rem' }}>Return Home</Link>
          <Link to="/find-house" style={{ display: 'inline-block', padding: '10px 22px', border: '1px solid var(--border)', background: 'transparent', color: 'white', borderRadius: 8, textDecoration: 'none', fontSize: '0.85rem', fontWeight: 600, transition: 'all var(--t-fast)' }}
            onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--gold)'}
            onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}>
            Browse Listings
          </Link>
        </div>
      </div>
    </div>
  );
}
