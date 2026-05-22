import { useState, useMemo, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { accommodations, propertyTypes, roomTypes } from '../data/accommodations';
import { useAuth } from '../context/AuthContext';

const SORT_OPTIONS = ['Featured', 'Price: Low', 'Price: High', 'Rating', 'Nearest'];

export default function FindHousePage() {
  const { savedIds, toggleSaved } = useAuth();
  const [query, setQuery] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [selectedPropType, setSelectedPropType] = useState('');
  const [maxDistance, setMaxDistance] = useState(0);
  const [maxPrice, setMaxPrice] = useState(80000);
  const [sort, setSort] = useState('Featured');
  const inputRef = useRef<HTMLInputElement>(null);

  const filtered = useMemo(() => {
    let list = accommodations.filter(acc => {
      if (query && !acc.name.toLowerCase().includes(query.toLowerCase()) && !acc.address.toLowerCase().includes(query.toLowerCase()) && !acc.neighborhood.toLowerCase().includes(query.toLowerCase())) return false;
      if (selectedType && !acc.rooms.some(r => r.type === selectedType)) return false;
      if (selectedPropType && acc.type !== selectedPropType) return false;
      if (maxDistance > 0 && acc.distanceM > maxDistance) return false;
      if (acc.priceRange[0] > maxPrice) return false;
      return true;
    });
    if (sort === 'Price: Low') list = [...list].sort((a, b) => a.priceRange[0] - b.priceRange[0]);
    else if (sort === 'Price: High') list = [...list].sort((a, b) => b.priceRange[1] - a.priceRange[1]);
    else if (sort === 'Rating') list = [...list].sort((a, b) => b.avgRating - a.avgRating);
    else if (sort === 'Nearest') list = [...list].sort((a, b) => a.distanceM - b.distanceM);
    else list = [...list].sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    return list;
  }, [query, selectedType, selectedPropType, maxDistance, maxPrice, sort]);

  const clearAll = () => { setQuery(''); setSelectedType(''); setSelectedPropType(''); setMaxDistance(0); setMaxPrice(80000); setSort('Featured'); };
  const hasFilters = query || selectedType || selectedPropType || maxDistance > 0 || maxPrice < 80000;

  return (
    <div style={{ paddingTop: 80, minHeight: '100vh' }}>
      {/* Header */}
      <div style={{ background: 'var(--bg-midnight)', borderBottom: '1px solid var(--border)', padding: '48px 0 32px' }}>
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="text-overline text-gold" style={{ marginBottom: 8 }}>Browse Listings</div>
            <h1 className="font-display" style={{ fontSize: 'clamp(1.8rem,4vw,2.8rem)', fontWeight: 700, marginBottom: 8 }}>Find Your Home</h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1rem' }}>
              {accommodations.length} verified properties in Nairobi &amp; Athi River
            </p>
          </motion.div>

          {/* Search bar */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
            style={{ marginTop: 28, display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
            <div style={{ flex: '1 1 260px', position: 'relative' }}>
              <span className="material-symbols-outlined" style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', fontSize: 18, color: 'var(--text-muted)' }}>search</span>
              <input
                ref={inputRef}
                className="se-input"
                style={{ paddingLeft: 44 }}
                placeholder="Search by name, location or area..."
                value={query}
                onChange={e => setQuery(e.target.value)}
              />
            </div>
            <select className="se-input" style={{ flex: '0 1 160px' }} value={selectedPropType} onChange={e => setSelectedPropType(e.target.value)}>
              <option value="">All Types</option>
              {propertyTypes.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
            <select className="se-input" style={{ flex: '0 1 160px' }} value={selectedType} onChange={e => setSelectedType(e.target.value)}>
              <option value="">All Rooms</option>
              {roomTypes.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
            {hasFilters && (
              <button onClick={clearAll} style={{ padding: '10px 18px', borderRadius: 8, border: '1px solid var(--border)', background: 'transparent', color: 'var(--text-muted)', fontSize: '0.85rem', cursor: 'pointer', whiteSpace: 'nowrap' }}>
                Clear All ×
              </button>
            )}
          </motion.div>

          {/* Filter pills */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.25 }}
            style={{ marginTop: 16, display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
            {[['All', 0], ['< 500m', 500], ['< 1km', 1000], ['< 1.5km', 1500]].map(([label, val]) => (
              <button key={label} onClick={() => setMaxDistance(Number(val))}
                className={`filter-pill ${maxDistance === Number(val) ? 'active' : ''}`}>
                {label}
              </button>
            ))}
            <div style={{ width: 1, height: 20, background: 'var(--border)', margin: '0 4px' }} />
            {[20000, 35000, 50000, 80000].map(p => (
              <button key={p} onClick={() => setMaxPrice(p)}
                className={`filter-pill ${maxPrice === p ? 'active' : ''}`}>
                ≤ KSh {(p / 1000).toFixed(0)}k
              </button>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Results */}
      <div className="container" style={{ paddingTop: 32, paddingBottom: 80 }}>
        {/* Toolbar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24, flexWrap: 'wrap', gap: 12 }}>
          <span style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
            <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{filtered.length}</span> {filtered.length === 1 ? 'property' : 'properties'} found
          </span>
          <div style={{ display: 'flex', gap: 6 }}>
            {SORT_OPTIONS.map(s => (
              <button key={s} onClick={() => setSort(s)}
                style={{ padding: '6px 14px', borderRadius: 6, border: '1px solid var(--border)', background: sort === s ? 'rgba(224,181,96,0.12)' : 'transparent', color: sort === s ? 'var(--gold)' : 'var(--text-muted)', fontSize: '0.78rem', fontWeight: 600, cursor: 'pointer', transition: 'all var(--t-fast)', whiteSpace: 'nowrap' }}>
                {s}
              </button>
            ))}
          </div>
        </div>

        <AnimatePresence mode="popLayout">
          {filtered.length === 0 ? (
            <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              style={{ textAlign: 'center', padding: '80px 0' }}>
              <span className="material-symbols-outlined" style={{ fontSize: 56, color: 'var(--text-muted)', display: 'block', marginBottom: 16 }}>search_off</span>
              <h3 className="font-display" style={{ fontSize: '1.4rem', marginBottom: 8 }}>No properties found</h3>
              <p style={{ color: 'var(--text-muted)', marginBottom: 24 }}>Try adjusting your filters or search term</p>
              <button onClick={clearAll} className="btn-gold">Clear Filters</button>
            </motion.div>
          ) : (
            <motion.div key="grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 24 }}>
              {filtered.map((acc, i) => {
                const freeRooms = acc.rooms.filter(r => r.status === 'free').length;
                const saved = savedIds.includes(acc.id);
                return (
                  <motion.div key={acc.id}
                    layout
                    initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4, delay: i * 0.04 }}>
                    <div className="property-card" style={{ height: '100%' }}>
                      {/* Image */}
                      <div className="card-img-wrapper" style={{ position: 'relative', height: 220 }}>
                        <img src={acc.coverImage} alt={acc.name} className="card-img-inner"
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        {/* Badges */}
                        <div style={{ position: 'absolute', top: 12, left: 12, display: 'flex', gap: 6 }}>
                          {acc.isVerified && (
                            <span style={{ background: 'rgba(7,11,22,0.85)', backdropFilter: 'blur(8px)', color: 'var(--gold)', padding: '3px 10px', borderRadius: 4, fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.08em', display: 'flex', alignItems: 'center', gap: 4 }}>
                              <span className="material-symbols-outlined" style={{ fontSize: 12 }}>verified</span> Verified
                            </span>
                          )}
                          {freeRooms > 0 && (
                            <span style={{ background: 'rgba(34,197,94,0.2)', border: '1px solid rgba(34,197,94,0.4)', color: '#4ade80', padding: '3px 10px', borderRadius: 4, fontSize: '0.7rem', fontWeight: 700 }}>
                              {freeRooms} free
                            </span>
                          )}
                        </div>
                        {/* Save button */}
                        <button onClick={(e) => { e.preventDefault(); toggleSaved(acc.id); }}
                          style={{ position: 'absolute', top: 12, right: 12, width: 34, height: 34, borderRadius: '50%', background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(8px)', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: saved ? '#f87171' : 'white', transition: 'all var(--t-fast)' }}
                          aria-label={saved ? 'Remove from saved' : 'Save property'}>
                          <span className="material-symbols-outlined" style={{ fontSize: 18, fontVariationSettings: saved ? "'FILL' 1" : "'FILL' 0" }}>favorite</span>
                        </button>
                        {/* Type tag */}
                        <span className="location-badge" style={{ position: 'absolute', bottom: 12, left: 12 }}>{acc.neighborhood}</span>
                      </div>

                      {/* Body */}
                      <div style={{ padding: '20px 24px 24px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8, color: 'var(--text-muted)', fontSize: '0.8rem' }}>
                          <span style={{ color: '#fbbf24' }}>{'★'.repeat(Math.round(acc.avgRating))}</span>
                          <span>{acc.avgRating} ({acc.reviewCount})</span>
                          <span>·</span>
                          <span className="material-symbols-outlined" style={{ fontSize: 14 }}>near_me</span>
                          <span>{acc.distanceM < 1000 ? `${acc.distanceM}m` : `${(acc.distanceM / 1000).toFixed(1)}km`}</span>
                        </div>
                        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', fontWeight: 600, marginBottom: 4 }}>{acc.name}</h3>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem', marginBottom: 12 }}>{acc.address}</p>
                        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 16 }}>
                          {acc.amenities.slice(0, 3).map(a => <span key={a} className="chip">{a}</span>)}
                          {acc.amenities.length > 3 && <span className="chip">+{acc.amenities.length - 3}</span>}
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 14, borderTop: '1px solid var(--border-subtle)' }}>
                          <div>
                            <span style={{ color: 'var(--gold)', fontFamily: 'var(--font-display)', fontSize: '1.1rem', fontWeight: 600 }}>
                              KSh {acc.priceRange[0].toLocaleString()}
                            </span>
                            <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>/mo</span>
                          </div>
                          <Link to={`/accommodation/${acc.id}`}>
                            <motion.button whileHover={{ backgroundColor: 'var(--gold)', color: 'var(--bg-midnight)' }}
                              style={{ padding: '8px 18px', borderRadius: 8, border: '1px solid var(--border)', background: 'transparent', color: 'var(--text-primary)', fontSize: '0.8rem', fontWeight: 700, cursor: 'pointer', transition: 'all var(--t-fast)' }}>
                              View →
                            </motion.button>
                          </Link>
                        </div>
                      </div>
                    </div>
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
