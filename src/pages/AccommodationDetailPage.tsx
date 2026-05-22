import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getAccommodation } from '../data/accommodations';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import { useState } from 'react';

export default function AccommodationDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user, isAuthenticated, savedIds, toggleSaved, addBooking } = useAuth();
  const acc = getAccommodation(id || '');

  const [selectedRoomId, setSelectedRoomId] = useState<string | null>(null);

  if (!acc) {
    return (
      <div style={{ paddingTop: 140, paddingBottom: 100, textAlign: 'center', minHeight: '80vh' }}>
        <div className="container">
          <span className="material-symbols-outlined" style={{ fontSize: 48, color: 'var(--gold)', marginBottom: 16 }}>error</span>
          <h2 className="font-display" style={{ fontSize: '2rem', marginBottom: 12 }}>Property Not Found</h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: 24 }}>The property you are looking for does not exist or has been removed.</p>
          <Link to="/find-house" className="btn-gold" style={{ textDecoration: 'none', display: 'inline-block' }}>Browse Listings</Link>
        </div>
      </div>
    );
  }

  const saved = savedIds.includes(acc.id);
  const freeRooms = acc.rooms.filter(r => r.status === 'free');

  const handleBook = (room: typeof acc.rooms[0]) => {
    if (!isAuthenticated) {
      toast.error('Please log in as a student to book a room.');
      navigate('/login');
      return;
    }
    if (user?.role !== 'student') {
      toast.error('Only registered student profiles can submit room bookings.');
      return;
    }
    addBooking({
      accommodationId: acc.id,
      accommodationName: acc.name,
      roomNo: room.roomNo,
      roomType: room.type,
      price: room.price,
      status: 'pending',
    });
    toast.success(`Booking request for Room ${room.roomNo} sent to ${acc.landlordName}!`);
    navigate('/dashboard');
  };

  return (
    <div style={{ paddingTop: 80, minHeight: '100vh', paddingBottom: 80 }}>
      {/* Back button and title */}
      <div style={{ padding: '24px 0 16px', background: 'var(--bg-midnight)', borderBottom: '1px solid var(--border-subtle)' }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
          <Link to="/find-house" style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.875rem', fontWeight: 600, transition: 'color var(--t-fast)' }}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--gold)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-muted)')}>
            <span className="material-symbols-outlined" style={{ fontSize: 18 }}>arrow_back</span>
            Back to listings
          </Link>
          <button onClick={() => toggleSaved(acc.id)} style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'transparent', border: '1px solid var(--border)', borderRadius: 20, padding: '6px 16px', color: saved ? '#f87171' : 'var(--text-muted)', cursor: 'pointer', fontWeight: 600, fontSize: '0.85rem' }}>
            <span className="material-symbols-outlined" style={{ fontSize: 16, fontVariationSettings: saved ? "'FILL' 1" : "'FILL' 0" }}>favorite</span>
            {saved ? 'Saved in Wishlist' : 'Save to Wishlist'}
          </button>
        </div>
      </div>

      <div className="container" style={{ marginTop: 32 }}>
        {/* Luxury Gallery */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
          style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 16, height: 'clamp(300px, 45vw, 480px)', borderRadius: 16, overflow: 'hidden', marginBottom: 40 }}>
          <div style={{ position: 'relative', overflow: 'hidden', height: '100%' }}>
            <img src={acc.images[0] || acc.coverImage} alt={acc.name} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.8s ease' }}
              onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.03)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'scale(1.0)'} />
            <div style={{ position: 'absolute', bottom: 20, left: 20, background: 'rgba(7,11,22,0.7)', backdropFilter: 'blur(8px)', border: '1px solid var(--border)', padding: '6px 14px', borderRadius: 8, fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              <span style={{ color: 'white', fontWeight: 600 }}>1 / 3</span> Photos
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, height: '100%' }}>
            <div style={{ flex: 1, overflow: 'hidden' }}>
              <img src={acc.images[1] || acc.coverImage} alt={acc.name} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.8s ease' }}
                onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.03)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'scale(1.0)'} />
            </div>
            <div style={{ flex: 1, overflow: 'hidden' }}>
              <img src={acc.images[2] || acc.coverImage} alt={acc.name} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.8s ease' }}
                onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.03)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'scale(1.0)'} />
            </div>
          </div>
        </motion.div>

        {/* Info Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 2fr) minmax(300px, 1fr)', gap: 40, alignItems: 'start' }}>
          
          {/* Main Info */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
              {acc.isVerified && (
                <span style={{ background: 'rgba(224,181,96,0.12)', border: '1px solid rgba(224,181,96,0.3)', color: 'var(--gold)', padding: '4px 12px', borderRadius: 4, fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.08em', display: 'flex', alignItems: 'center', gap: 4 }}>
                  <span className="material-symbols-outlined" style={{ fontSize: 12 }}>verified</span> Verified Property
                </span>
              )}
              <span className="location-badge">{acc.type}</span>
            </div>

            <h1 className="font-display" style={{ fontSize: 'clamp(2rem, 3.5vw, 2.8rem)', fontWeight: 700, lineHeight: 1.2, marginBottom: 8 }}>{acc.name}</h1>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: 32, flexWrap: 'wrap' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><span className="material-symbols-outlined" style={{ fontSize: 16 }}>location_on</span> {acc.address}</span>
              <span>·</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><span className="material-symbols-outlined" style={{ fontSize: 16 }}>near_me</span> {acc.distanceM}m to campus</span>
              <span>·</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: 4, color: '#fbbf24' }}><span className="material-symbols-outlined" style={{ fontSize: 16, fontVariationSettings: "'FILL' 1" }}>star</span> {acc.avgRating} ({acc.reviewCount} Reviews)</span>
            </div>

            <hr style={{ border: 'none', borderTop: '1px solid var(--border-subtle)', margin: '0 0 32px' }} />

            {/* Description */}
            <div style={{ marginBottom: 40 }}>
              <h3 className="font-display" style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: 12, color: 'var(--gold)' }}>The Space</h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, fontSize: '0.95rem' }}>{acc.description}</p>
            </div>

            {/* Amenities */}
            <div style={{ marginBottom: 48 }}>
              <h3 className="font-display" style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: 16, color: 'var(--gold)' }}>Sophisticated Conveniences</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 12 }}>
                {acc.amenities.map(a => (
                  <div key={a} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '12px 16px', background: 'var(--bg-elevated)', border: '1px solid var(--border-subtle)', borderRadius: 10 }}>
                    <span className="material-symbols-outlined" style={{ color: 'var(--gold)', fontSize: 20 }}>done_all</span>
                    <span style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', fontWeight: 500 }}>{a}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Rooms Availability */}
            <div style={{ marginBottom: 48 }}>
              <h3 className="font-display" style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: 16, color: 'var(--gold)' }}>Suites &amp; Pricing</h3>
              <div style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border)', borderRadius: 12, overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid var(--border)', background: 'rgba(255,255,255,0.02)' }}>
                      <th style={{ padding: '16px 20px', color: 'var(--text-muted)', fontWeight: 600 }}>Suite / Room</th>
                      <th style={{ padding: '16px 20px', color: 'var(--text-muted)', fontWeight: 600 }}>Layout</th>
                      <th style={{ padding: '16px 20px', color: 'var(--text-muted)', fontWeight: 600 }}>Floor</th>
                      <th style={{ padding: '16px 20px', color: 'var(--text-muted)', fontWeight: 600 }}>Monthly Rate</th>
                      <th style={{ padding: '16px 20px', color: 'var(--text-muted)', fontWeight: 600 }}>Status</th>
                      <th style={{ padding: '16px 20px', textAlign: 'right' }}></th>
                    </tr>
                  </thead>
                  <tbody>
                    {acc.rooms.map(room => (
                      <tr key={room.id} style={{ borderBottom: '1px solid var(--border-subtle)', transition: 'background var(--t-fast)' }}
                        onMouseEnter={e => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.01)'}
                        onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}>
                        <td style={{ padding: '18px 20px', fontWeight: 700, fontFamily: 'var(--font-mono)' }}>Room {room.roomNo}</td>
                        <td style={{ padding: '18px 20px', color: 'var(--text-secondary)' }}>{room.type}</td>
                        <td style={{ padding: '18px 20px', color: 'var(--text-secondary)' }}>{room.floor === 0 ? 'Ground' : `Floor ${room.floor}`}</td>
                        <td style={{ padding: '18px 20px', fontWeight: 700, color: 'var(--gold)' }}>KSh {room.price.toLocaleString()}</td>
                        <td style={{ padding: '18px 20px' }}>
                          <span style={{ 
                            padding: '4px 10px', borderRadius: 4, fontSize: '0.72rem', fontWeight: 700,
                            background: room.status === 'free' ? 'rgba(34,197,94,0.12)' : room.status === 'pending' ? 'rgba(234,179,8,0.12)' : 'rgba(239,68,68,0.12)',
                            color: room.status === 'free' ? '#4ade80' : room.status === 'pending' ? '#facc15' : '#f87171'
                          }}>{room.status === 'free' ? 'Available' : room.status === 'pending' ? 'In Negotiation' : 'Leased'}</span>
                        </td>
                        <td style={{ padding: '18px 20px', textAlign: 'right' }}>
                          {room.status === 'free' && (
                            <button onClick={() => handleBook(room)} className="btn-gold" style={{ padding: '6px 12px', fontSize: '0.78rem', borderRadius: 6 }}>
                              Book
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Tenant Experiences */}
            <div>
              <h3 className="font-display" style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: 16, color: 'var(--gold)' }}>Tenant Reviews</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {acc.reviews.map(rev => (
                  <div key={rev.id} style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-subtle)', borderRadius: 12, padding: 24 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                      <div>
                        <div style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: '0.95rem' }}>{rev.studentName}</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--gold)', fontWeight: 600, marginTop: 2, display: 'flex', alignItems: 'center', gap: 4 }}>
                          <span className="material-symbols-outlined" style={{ fontSize: 12 }}>verified_user</span> Verified Resident
                        </div>
                      </div>
                      <div style={{ color: '#fbbf24', fontSize: '0.8rem' }}>
                        {'★'.repeat(rev.rating)}
                      </div>
                    </div>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.7, fontStyle: 'italic' }}>"{rev.body}"</p>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: 12 }}>Reviewed on {rev.date}</div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Sidebar Booking Widget */}
          <div style={{ position: 'sticky', top: 100, display: 'flex', flexDirection: 'column', gap: 24 }}>
            <div className="property-card" style={{ padding: 28, background: 'var(--bg-elevated)', border: '1px solid var(--border)', borderRadius: 16 }}>
              <div style={{ marginBottom: 20 }}>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Suites from</span>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginTop: 4 }}>
                  <span style={{ fontSize: '1.8rem', fontWeight: 700, fontFamily: 'var(--font-display)', color: 'var(--gold)' }}>
                    KSh {acc.priceRange[0].toLocaleString()}
                  </span>
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>/month</span>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
                <button onClick={() => freeRooms[0] && handleBook(freeRooms[0])} disabled={freeRooms.length === 0}
                  className="btn-gold" style={{ width: '100%', paddingTop: 12, paddingBottom: 12, fontSize: '0.9rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                  <span className="material-symbols-outlined" style={{ fontSize: 18 }}>meeting_room</span>
                  {freeRooms.length > 0 ? 'Book Preferred Suite' : 'Fully Leased'}
                </button>
                <button onClick={() => toggleSaved(acc.id)}
                  style={{ width: '100%', background: 'transparent', border: '1px solid var(--border)', color: 'var(--text-primary)', padding: '10px 16px', borderRadius: 8, fontWeight: 700, cursor: 'pointer', transition: 'all var(--t-fast)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                  <span className="material-symbols-outlined" style={{ fontSize: 18, fontVariationSettings: saved ? "'FILL' 1" : "'FILL' 0", color: saved ? '#f87171' : 'inherit' }}>favorite</span>
                  {saved ? 'In Wishlist' : 'Add to Wishlist'}
                </button>
              </div>

              {/* Landlord Contact Info */}
              <div style={{ paddingTop: 20, borderTop: '1px solid var(--border-subtle)' }}>
                <h4 style={{ fontSize: '0.78rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 700, marginBottom: 14 }}>Property Representative</h4>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                  <div style={{ width: 42, height: 42, borderRadius: '50%', background: 'var(--gold-secondary)', color: 'var(--bg-midnight)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '0.9rem' }}>
                    {acc.landlordInitial}
                  </div>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '0.95rem' }}>{acc.landlordName}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Authorized Host</div>
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <a href={`tel:${acc.contactPhone}`} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, background: 'var(--bg-elevated)', border: '1px solid var(--border)', borderRadius: 8, padding: '10px 16px', color: 'var(--text-primary)', textDecoration: 'none', fontSize: '0.85rem', fontWeight: 600, transition: 'all var(--t-fast)' }}
                    onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--gold)'}
                    onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}>
                    <span className="material-symbols-outlined" style={{ fontSize: 18, color: 'var(--gold)' }}>call</span>
                    {acc.contactPhone}
                  </a>
                  <a href={`https://wa.me/${acc.contactWhatsapp}`} target="_blank" rel="noopener noreferrer"
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, background: 'rgba(34,197,94,0.12)', border: '1px solid rgba(34,197,94,0.3)', borderRadius: 8, padding: '10px 16px', color: '#4ade80', textDecoration: 'none', fontSize: '0.85rem', fontWeight: 600, transition: 'all var(--t-fast)' }}
                    onMouseEnter={e => e.currentTarget.style.backgroundColor = 'rgba(34,197,94,0.2)'}
                    onMouseLeave={e => e.currentTarget.style.backgroundColor = 'rgba(34,197,94,0.12)'}>
                    <svg style={{ width: 16, height: 16, fill: 'currentColor' }} viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.003 5.37 5.378 0 12.026 0c3.219.001 6.247 1.253 8.526 3.535 2.279 2.281 3.53 5.309 3.53 8.529-.002 6.657-5.378 12.028-12.025 12.028-1.999-.001-3.968-.5-5.716-1.45L0 24zm6.086-4.143c1.666.988 3.316 1.488 5.914 1.489 5.381 0 9.761-4.38 9.764-9.762.002-2.607-1.012-5.059-2.859-6.908C17.116 2.83 14.661 1.815 12.03 1.815c-5.385 0-9.765 4.382-9.768 9.763-.001 2.228.583 4.4 1.688 6.31l-1.1 4.023 4.207-1.104zM16.9 14.62c-.266-.134-1.583-.781-1.829-.871-.247-.09-.427-.134-.607.134-.18.267-.697.871-.853 1.05-.157.18-.314.202-.58.067-.266-.134-1.126-.415-2.146-1.325-.793-.707-1.328-1.58-1.484-1.848-.157-.267-.017-.411.117-.545.121-.12.266-.312.4-.467.133-.156.178-.267.266-.445.089-.178.044-.334-.022-.467-.066-.134-.607-1.464-.83-2.005-.218-.524-.458-.452-.607-.46l-.518-.008c-.18 0-.472.067-.719.334-.247.267-.943.913-.943 2.228 0 1.314.954 2.584 1.088 2.763.135.18 1.88 2.87 4.553 4.024.636.274 1.132.438 1.52.562.64.203 1.22.174 1.678.106.512-.076 1.583-.647 1.808-1.272.225-.625.225-1.16.157-1.272-.067-.112-.247-.18-.513-.314z"/></svg>
                    Chat on WhatsApp
                  </a>
                </div>
              </div>
            </div>

            {/* Quick Map Widget */}
            <div style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border)', borderRadius: 16, padding: 20 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>Location Coordinates</span>
                <span className="material-symbols-outlined" style={{ fontSize: 16, color: 'var(--gold)' }}>map</span>
              </div>
              <div style={{ height: 120, borderRadius: 8, background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-subtle)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
                <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)' }}>GPS: {acc.lat}, {acc.lng}</span>
                <a href={`https://www.google.com/maps/search/?api=1&query=${acc.lat},${acc.lng}`} target="_blank" rel="noopener noreferrer" style={{ fontSize: '0.78rem', color: 'var(--gold)', fontWeight: 600, textDecoration: 'none' }}>
                  View on Google Maps ↗
                </a>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
