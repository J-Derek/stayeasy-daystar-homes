import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { accommodations } from '../data/accommodations';
import toast from 'react-hot-toast';

export default function LandlordDashboard() {
  const [tab, setTab] = useState('overview');
  const { user, bookings, updateBookingStatus } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    return (
      <div style={{ paddingTop: 140, paddingBottom: 100, textAlign: 'center', minHeight: '80vh' }}>
        <div className="container">
          <span className="material-symbols-outlined" style={{ fontSize: 48, color: 'var(--gold)', marginBottom: 16 }}>login</span>
          <h2 className="font-display" style={{ fontSize: '2rem', marginBottom: 12 }}>Access Restricted</h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: 24 }}>Please log in to view your dashboard settings.</p>
          <button onClick={() => navigate('/login')} className="btn-gold">Login Now</button>
        </div>
      </div>
    );
  }

  // Landlord owns first 3 accommodations for demo simulation
  const myListings = accommodations.slice(0, 3);
  const totalRooms = myListings.reduce((a, c) => a + c.rooms.length, 0);
  const freeRooms = myListings.reduce((a, c) => a + c.rooms.filter(r => r.status === 'free').length, 0);
  const pendingRequests = bookings.filter(b => b.status === 'pending');

  return (
    <div style={{ paddingTop: 80, minHeight: '100vh', paddingBottom: 80 }}>
      {/* Dashboard Top Header */}
      <div style={{ background: 'var(--bg-midnight)', borderBottom: '1px solid var(--border)', padding: '40px 0' }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', gap: 20, flexWrap: 'wrap' }}>
          <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'var(--gold-secondary)', color: 'var(--bg-midnight)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '1.4rem', fontFamily: 'var(--font-display)' }}>
            {user.name.charAt(0)}
          </div>
          <div>
            <h1 className="font-display" style={{ fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', fontWeight: 700, marginBottom: 4 }}>
              Host Manager Suite
            </h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
              Host Account · <span style={{ color: 'var(--gold)', fontWeight: 600 }}>{user.email}</span>
            </p>
          </div>
        </div>
      </div>

      <div className="container" style={{ marginTop: 40 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 240px) 1fr', gap: 40, alignItems: 'start' }}>
          
          {/* Dashboard Navigation Sidebar */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, background: 'var(--bg-elevated)', border: '1px solid var(--border)', borderRadius: 12, padding: 12 }}>
            {[
              { id: 'overview', label: 'Suite Overview', icon: 'grid_view' },
              { id: 'listings', label: 'My Properties', icon: 'location_city' },
              { id: 'requests', label: 'Booking Applications', icon: 'receipt_long', badge: pendingRequests.length },
              { id: 'profile', label: 'Host Profile', icon: 'person' },
            ].map(t => (
              <button key={t.id} onClick={() => setTab(t.id)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px', borderRadius: 8, border: 'none',
                  background: tab === t.id ? 'var(--gold-secondary)' : 'transparent',
                  color: tab === t.id ? 'var(--bg-midnight)' : 'var(--text-secondary)',
                  fontWeight: 600, fontSize: '0.875rem', cursor: 'pointer', transition: 'all var(--t-fast)', textAlign: 'left',
                  position: 'relative'
                }}>
                <span className="material-symbols-outlined" style={{ fontSize: 20 }}>{t.icon}</span>
                {t.label}
                {t.badge ? (
                  <span style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'var(--gold)', color: 'var(--bg-midnight)', borderRadius: 10, padding: '2px 8px', fontSize: '0.72rem', fontWeight: 700 }}>
                    {t.badge}
                  </span>
                ) : null}
              </button>
            ))}
          </div>

          {/* Active Area Panels */}
          <div style={{ minHeight: 400 }}>
            <AnimatePresence mode="wait">
              {tab === 'overview' && (
                <motion.div key="overview" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
                  <h2 className="font-display" style={{ fontSize: '1.4rem', fontWeight: 600, marginBottom: 24, color: 'var(--gold)' }}>System Overview</h2>
                  
                  {/* Stats Grid */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 16, marginBottom: 32 }}>
                    {[
                      { value: myListings.length, label: 'Listed Properties', color: 'var(--text-primary)' },
                      { value: totalRooms, label: 'Suites Leasable', color: 'var(--text-primary)' },
                      { value: freeRooms, label: 'Available Suites', color: '#4ade80' },
                      { value: pendingRequests.length, label: 'Pending Requests', color: 'var(--gold)' },
                    ].map((stat, idx) => (
                      <div key={idx} style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-subtle)', borderRadius: 12, padding: 24, textAlign: 'center' }}>
                        <div style={{ fontSize: '2rem', fontWeight: 700, fontFamily: 'var(--font-display)', color: stat.color, marginBottom: 4 }}>{stat.value}</div>
                        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>{stat.label}</div>
                      </div>
                    ))}
                  </div>

                  {/* Revenue Performance bar charts */}
                  <div className="property-card" style={{ padding: 28, background: 'var(--bg-elevated)', border: '1px solid var(--border)', borderRadius: 16 }}>
                    <h3 style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 16 }}>Monthly Revenue Yield</h3>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 20 }}>
                      <span style={{ fontSize: '1.8rem', fontWeight: 700, color: 'white', fontFamily: 'var(--font-display)' }}>KSh 156,000</span>
                      <span style={{ fontSize: '0.82rem', color: '#4ade80', fontWeight: 600 }}>+12% vs last month</span>
                    </div>
                    
                    {/* Simulated elegant chart bars */}
                    <div style={{ height: 140, display: 'flex', alignItems: 'flex-end', gap: 10, paddingBottom: 10, borderBottom: '1px solid var(--border-subtle)' }}>
                      {[40, 52, 45, 62, 80, 72, 90, 75, 85, 95, 88, 100].map((h, i) => (
                        <div key={i} style={{ flex: 1, height: `${h}%`, background: 'var(--gold-secondary)', borderRadius: '4px 4px 0 0', position: 'relative' }} />
                      ))}
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: 8 }}>
                      {['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'].map(m => <span key={m}>{m}</span>)}
                    </div>
                  </div>
                </motion.div>
              )}

              {tab === 'listings' && (
                <motion.div key="listings" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                    <h2 className="font-display" style={{ fontSize: '1.4rem', fontWeight: 600, color: 'var(--gold)' }}>My Managed Properties</h2>
                    <button onClick={() => toast.success('New property listing configuration is coming soon!')} className="btn-gold" style={{ padding: '8px 16px', fontSize: '0.8rem' }}>+ Add Property</button>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                    {myListings.map(acc => (
                      <div key={acc.id} style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-subtle)', borderRadius: 12, padding: 20 }}>
                        <div style={{ display: 'flex', gap: 20, alignItems: 'center', flexWrap: 'wrap' }}>
                          <div style={{ width: 100, height: 70, borderRadius: 8, overflow: 'hidden' }}>
                            <img src={acc.coverImage} alt={acc.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                          </div>
                          <div style={{ flex: 1 }}>
                            <h4 className="font-display" style={{ fontSize: '1.1rem', fontWeight: 600, color: 'white' }}>{acc.name}</h4>
                            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: 2 }}>{acc.address} · {acc.rooms.length} suites · {acc.rooms.filter(r => r.status === 'free').length} available</p>
                            <div style={{ display: 'flex', gap: 8, marginTop: 6 }}>
                              <span style={{ background: 'rgba(224,181,96,0.12)', color: 'var(--gold)', padding: '2px 8px', borderRadius: 4, fontSize: '0.68rem', fontWeight: 600 }}>Verified</span>
                              <span style={{ color: '#fbbf24', fontSize: '0.78rem' }}>★ {acc.avgRating} ({acc.reviewCount})</span>
                            </div>
                          </div>
                          <div style={{ display: 'flex', gap: 8 }}>
                            <button onClick={() => navigate(`/accommodation/${acc.id}`)} style={{ padding: '8px 16px', border: '1px solid var(--border)', background: 'transparent', color: 'white', borderRadius: 6, fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer' }}>View Details</button>
                            <button onClick={() => toast.success('Property content editor is loading...')} style={{ padding: '8px 16px', border: '1px solid var(--border-subtle)', background: 'var(--bg-elevated)', color: 'var(--text-muted)', borderRadius: 6, fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer' }}>Edit</button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {tab === 'requests' && (
                <motion.div key="requests" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
                  <h2 className="font-display" style={{ fontSize: '1.4rem', fontWeight: 600, marginBottom: 24, color: 'var(--gold)' }}>Booking Requests</h2>
                  
                  {bookings.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '48px 0', background: 'var(--bg-elevated)', border: '1px solid var(--border)', borderRadius: 16 }}>
                      <span className="material-symbols-outlined" style={{ fontSize: 36, color: 'var(--text-muted)', marginBottom: 12 }}>receipt_long</span>
                      <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>No tenant application requests at this time.</p>
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
                                <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Received {b.requestedAt}</span>
                              </div>
                              <h4 className="font-display" style={{ fontSize: '1.15rem', fontWeight: 600, color: 'white' }}>{b.accommodationName}</h4>
                              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: 4 }}>
                                Tenant Application: <span style={{ color: 'white', fontWeight: 600 }}>Alex Mwangi</span> · Suite {b.roomNo} ({b.roomType}) · KSh {b.price.toLocaleString()}/mo
                              </p>
                            </div>
                            
                            {b.status === 'pending' && (
                              <div style={{ display: 'flex', gap: 10 }}>
                                <button onClick={() => { updateBookingStatus(b.id, 'active'); toast.success('Lease booking confirmed!'); }}
                                  style={{ padding: '8px 16px', background: 'var(--gold)', border: 'none', color: 'var(--bg-midnight)', borderRadius: 6, fontSize: '0.8rem', fontWeight: 700, cursor: 'pointer' }}>
                                  Accept &amp; Lease
                                </button>
                                <button onClick={() => { updateBookingStatus(b.id, 'cancelled'); toast.error('Application declined'); }}
                                  style={{ padding: '8px 16px', background: 'rgba(239,68,68,0.12)', border: '1px solid rgba(239,68,68,0.3)', color: '#f87171', borderRadius: 6, fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer' }}>
                                  Decline
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </motion.div>
              )}

              {tab === 'profile' && (
                <motion.div key="profile" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
                  <h2 className="font-display" style={{ fontSize: '1.4rem', fontWeight: 600, marginBottom: 24, color: 'var(--gold)' }}>My Host Profile</h2>
                  
                  <div style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border)', borderRadius: 16, padding: 32, maxWidth: 540 }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.78rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 700, marginBottom: 8 }}>Host Manager Name</label>
                        <input className="se-input" defaultValue={user.name} />
                      </div>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.78rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 700, marginBottom: 8 }}>Email Address</label>
                        <input className="se-input" defaultValue={user.email} disabled style={{ opacity: 0.6 }} />
                      </div>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.78rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 700, marginBottom: 8 }}>Authorized Phone Number</label>
                        <input className="se-input" defaultValue={user.phone} />
                      </div>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.78rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 700, marginBottom: 8 }}>National KRA PIN / ID</label>
                        <input className="se-input" placeholder="e.g. A012345678Z" defaultValue="12883491" />
                      </div>
                      <button onClick={() => toast.success('Host profile changes updated!')} className="btn-gold" style={{ width: 'fit-content', paddingLeft: 28, paddingRight: 28, paddingTop: 10, paddingBottom: 10, alignSelf: 'flex-start', marginTop: 8 }}>
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
