import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { getAccommodation } from '../data/accommodations';
import toast from 'react-hot-toast';

export default function StudentDashboard() {
  const [tab, setTab] = useState('overview');
  const { user, bookings, savedIds, toggleSaved, updateBookingStatus } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    return (
      <div style={{ paddingTop: 140, paddingBottom: 100, textAlign: 'center', minHeight: '80vh' }}>
        <div className="container">
          <span className="material-symbols-outlined" style={{ fontSize: 48, color: 'var(--gold)', marginBottom: 16 }}>login</span>
          <h2 className="font-display" style={{ fontSize: '2rem', marginBottom: 12 }}>Access Restricted</h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: 24 }}>Please log in to view your dashboard settings.</p>
          <Link to="/login" className="btn-gold" style={{ textDecoration: 'none', display: 'inline-block' }}>Login Now</Link>
        </div>
      </div>
    );
  }

  const activeBooking = bookings.find(b => b.status === 'active');
  const pendingCount = bookings.filter(b => b.status === 'pending').length;

  return (
    <div style={{ paddingTop: 80, minHeight: '100vh', paddingBottom: 80 }}>
      {/* Overview Header Banner */}
      <div style={{ background: 'var(--bg-midnight)', borderBottom: '1px solid var(--border)', padding: '40px 0' }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', gap: 20, flexWrap: 'wrap' }}>
          <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'var(--gold-secondary)', color: 'var(--bg-midnight)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '1.4rem', fontFamily: 'var(--font-display)' }}>
            {user.name.charAt(0)}
          </div>
          <div>
            <h1 className="font-display" style={{ fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', fontWeight: 700, marginBottom: 4 }}>
              Welcome back, {user.name.split(' ')[0]}
            </h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
              Student Account · <span style={{ color: 'var(--gold)', fontWeight: 600 }}>{user.email}</span>
            </p>
          </div>
        </div>
      </div>

      <div className="container" style={{ marginTop: 40 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 240px) 1fr', gap: 40, alignItems: 'start' }}>
          
          {/* Left Navigation Sidebar */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, background: 'var(--bg-elevated)', border: '1px solid var(--border)', borderRadius: 12, padding: 12 }}>
            {[
              { id: 'overview', label: 'Overview', icon: 'grid_view' },
              { id: 'bookings', label: 'My Bookings', icon: 'book_online' },
              { id: 'saved', label: 'Saved Homes', icon: 'favorite' },
              { id: 'profile', label: 'My Profile', icon: 'person' },
            ].map(t => (
              <button key={t.id} onClick={() => setTab(t.id)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px', borderRadius: 8, border: 'none',
                  background: tab === t.id ? 'var(--gold-secondary)' : 'transparent',
                  color: tab === t.id ? 'var(--bg-midnight)' : 'var(--text-secondary)',
                  fontWeight: 600, fontSize: '0.875rem', cursor: 'pointer', transition: 'all var(--t-fast)', textAlign: 'left'
                }}>
                <span className="material-symbols-outlined" style={{ fontSize: 20 }}>{t.icon}</span>
                {t.label}
              </button>
            ))}
          </div>

          {/* Right Dashboard Area */}
          <div style={{ minHeight: 400 }}>
            <AnimatePresence mode="wait">
              {tab === 'overview' && (
                <motion.div key="overview" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
                  <h2 className="font-display" style={{ fontSize: '1.4rem', fontWeight: 600, marginBottom: 24, color: 'var(--gold)' }}>Account Summary</h2>
                  
                  {/* Status metrics grid */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 16, marginBottom: 32 }}>
                    {[
                      { value: bookings.length, label: 'Total Bookings', color: 'var(--text-primary)' },
                      { value: pendingCount, label: 'Pending Requests', color: 'var(--gold)' },
                      { value: activeBooking ? 1 : 0, label: 'Active Leases', color: '#4ade80' },
                      { value: savedIds.length, label: 'Saved Wishlist', color: '#f87171' },
                    ].map((stat, idx) => (
                      <div key={idx} style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-subtle)', borderRadius: 12, padding: 24, textAlign: 'center' }}>
                        <div style={{ fontSize: '2rem', fontWeight: 700, fontFamily: 'var(--font-display)', color: stat.color, marginBottom: 4 }}>{stat.value}</div>
                        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>{stat.label}</div>
                      </div>
                    ))}
                  </div>

                  {/* Active Booking Segment */}
                  {activeBooking ? (
                    <div className="property-card" style={{ padding: 28, background: 'var(--bg-elevated)', border: '1px solid var(--border)', borderRadius: 16 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', flexWrap: 'wrap', gap: 16 }}>
                        <div>
                          <span style={{ background: 'rgba(34,197,94,0.12)', border: '1px solid rgba(34,197,94,0.3)', color: '#4ade80', padding: '4px 12px', borderRadius: 4, fontSize: '0.72rem', fontWeight: 700, display: 'inline-block', marginBottom: 12 }}>
                            Active Leased Suite
                          </span>
                          <h3 className="font-display" style={{ fontSize: '1.3rem', fontWeight: 600, marginBottom: 6 }}>{activeBooking.accommodationName}</h3>
                          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Suite {activeBooking.roomNo} · {activeBooking.roomType}</p>
                          <div style={{ color: 'var(--gold)', fontWeight: 700, fontSize: '1.2rem', marginTop: 10, fontFamily: 'var(--font-display)' }}>KSh {activeBooking.price.toLocaleString()}/mo</div>
                        </div>
                        <Link to={`/accommodation/${activeBooking.accommodationId}`} className="btn-gold" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 6, padding: '8px 16px', fontSize: '0.8rem' }}>
                          View Suite Details →
                        </Link>
                      </div>
                    </div>
                  ) : (
                    <div style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-subtle)', borderRadius: 16, padding: 32, textAlign: 'center' }}>
                      <span className="material-symbols-outlined" style={{ fontSize: 32, color: 'var(--text-muted)', marginBottom: 12 }}>house</span>
                      <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: 16 }}>You do not have any active luxury lease records.</p>
                      <Link to="/find-house" className="btn-gold" style={{ textDecoration: 'none', display: 'inline-block', padding: '8px 18px', fontSize: '0.82rem' }}>Browse Verified Listings</Link>
                    </div>
                  )}
                </motion.div>
              )}

              {tab === 'bookings' && (
                <motion.div key="bookings" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
                  <h2 className="font-display" style={{ fontSize: '1.4rem', fontWeight: 600, marginBottom: 24, color: 'var(--gold)' }}>My Lease Bookings</h2>
                  
                  {bookings.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '48px 0', background: 'var(--bg-elevated)', border: '1px solid var(--border)', borderRadius: 16 }}>
                      <span className="material-symbols-outlined" style={{ fontSize: 36, color: 'var(--text-muted)', marginBottom: 12 }}>calendar_today</span>
                      <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: 16 }}>No booking records found.</p>
                      <Link to="/find-house" className="btn-gold" style={{ textDecoration: 'none', display: 'inline-block', padding: '8px 18px', fontSize: '0.82rem' }}>Browse Homes</Link>
                    </div>
                  ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                      {bookings.map(b => (
                        <div key={b.id} style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-subtle)', borderRadius: 12, padding: 24 }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
                            <div>
                              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                                <span style={{
                                  padding: '3px 8px', borderRadius: 4, fontSize: '0.7rem', fontWeight: 700,
                                  background: b.status === 'active' ? 'rgba(34,197,94,0.12)' : b.status === 'pending' ? 'rgba(234,179,8,0.12)' : 'rgba(239,68,68,0.12)',
                                  color: b.status === 'active' ? '#4ade80' : b.status === 'pending' ? '#facc15' : '#f87171'
                                }}>{b.status.toUpperCase()}</span>
                                <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Requested {b.requestedAt}</span>
                              </div>
                              <h4 className="font-display" style={{ fontSize: '1.1rem', fontWeight: 600, color: 'white' }}>{b.accommodationName}</h4>
                              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: 4 }}>Suite {b.roomNo} · {b.roomType} · <span style={{ color: 'var(--gold)', fontWeight: 600 }}>KSh {b.price.toLocaleString()}/mo</span></p>
                            </div>
                            <div style={{ display: 'flex', gap: 10 }}>
                              <Link to={`/accommodation/${b.accommodationId}`} style={{ padding: '8px 16px', border: '1px solid var(--border)', background: 'transparent', color: 'white', borderRadius: 6, textDecoration: 'none', fontSize: '0.8rem', fontWeight: 600 }}>View</Link>
                              {b.status === 'pending' && (
                                <button onClick={() => { updateBookingStatus(b.id, 'cancelled'); toast.success('Booking application cancelled'); }}
                                  style={{ padding: '8px 16px', background: 'rgba(239,68,68,0.12)', border: '1px solid rgba(239,68,68,0.3)', color: '#f87171', borderRadius: 6, fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer' }}>Cancel Application</button>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </motion.div>
              )}

              {tab === 'saved' && (
                <motion.div key="saved" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
                  <h2 className="font-display" style={{ fontSize: '1.4rem', fontWeight: 600, marginBottom: 24, color: 'var(--gold)' }}>My Saved Wishlist</h2>
                  
                  {savedIds.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '48px 0', background: 'var(--bg-elevated)', border: '1px solid var(--border)', borderRadius: 16 }}>
                      <span className="material-symbols-outlined" style={{ fontSize: 36, color: 'var(--text-muted)', marginBottom: 12 }}>favorite_border</span>
                      <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Wishlist is currently empty.</p>
                    </div>
                  ) : (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 20 }}>
                      {savedIds.map(id => {
                        const acc = getAccommodation(id);
                        if (!acc) return null;
                        return (
                          <div key={id} className="property-card" style={{ display: 'block', overflow: 'hidden' }}>
                            <div style={{ height: 160, position: 'relative' }}>
                              <img src={acc.coverImage} alt={acc.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                              <button onClick={() => { toggleSaved(id); toast.success('Removed from wishlist'); }}
                                style={{ position: 'absolute', top: 10, right: 10, width: 30, height: 30, borderRadius: '50%', background: 'rgba(0,0,0,0.5)', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#f87171', cursor: 'pointer' }}>
                                <span className="material-symbols-outlined" style={{ fontSize: 16, fontVariationSettings: "'FILL' 1" }}>favorite</span>
                              </button>
                            </div>
                            <div style={{ padding: 18 }}>
                              <h4 className="font-display" style={{ fontSize: '0.95rem', fontWeight: 600, marginBottom: 4, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{acc.name}</h4>
                              <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: 2, marginBottom: 12 }}><span className="material-symbols-outlined" style={{ fontSize: 12 }}>location_on</span> {acc.neighborhood}</p>
                              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <span style={{ color: 'var(--gold)', fontWeight: 600, fontSize: '0.9rem' }}>KSh {acc.priceRange[0].toLocaleString()}/mo</span>
                                <Link to={`/accommodation/${id}`} style={{ fontSize: '0.8rem', fontWeight: 700, color: 'white', textDecoration: 'none' }}>View →</Link>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </motion.div>
              )}

              {tab === 'profile' && (
                <motion.div key="profile" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
                  <h2 className="font-display" style={{ fontSize: '1.4rem', fontWeight: 600, marginBottom: 24, color: 'var(--gold)' }}>My Student Profile</h2>
                  
                  <div style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border)', borderRadius: 16, padding: 32, maxWidth: 540 }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.78rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 700, marginBottom: 8 }}>Full Name</label>
                        <input className="se-input" defaultValue={user.name} />
                      </div>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.78rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 700, marginBottom: 8 }}>Email Address</label>
                        <input className="se-input" defaultValue={user.email} disabled style={{ opacity: 0.6 }} />
                      </div>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.78rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 700, marginBottom: 8 }}>Phone Number</label>
                        <input className="se-input" defaultValue={user.phone} />
                      </div>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                        <div>
                          <label style={{ display: 'block', fontSize: '0.78rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 700, marginBottom: 8 }}>Student ID</label>
                          <input className="se-input" placeholder="DAY/BIT/2024/001" defaultValue="DAY/BCO/2025/1109" />
                        </div>
                        <div>
                          <label style={{ display: 'block', fontSize: '0.78rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 700, marginBottom: 8 }}>Course Programme</label>
                          <input className="se-input" placeholder="BSc IT" defaultValue="BCom Finance" />
                        </div>
                      </div>
                      <button onClick={() => toast.success('Profile changes successfully updated!')} className="btn-gold" style={{ width: 'fit-content', paddingLeft: 28, paddingRight: 28, paddingTop: 10, paddingBottom: 10, alignSelf: 'flex-start', marginTop: 8 }}>
                        Save Changes
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </div>
    </div>
  );
}
