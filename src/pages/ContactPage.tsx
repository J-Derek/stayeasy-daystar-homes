import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

export default function ContactPage() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Your message has been sent to our customer care team!');
    (e.target as HTMLFormElement).reset();
  };

  return (
    <div style={{ paddingTop: 80, minHeight: '100vh', paddingBottom: 80 }}>
      {/* Page Header */}
      <div style={{ background: 'var(--bg-midnight)', borderBottom: '1px solid var(--border)', padding: '48px 0 32px' }}>
        <div className="container" style={{ maxWidth: 960 }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} style={{ textAlign: 'center' }}>
            <div className="text-overline text-gold" style={{ marginBottom: 8 }}>Conscious Support</div>
            <h1 className="font-display" style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: 700, marginBottom: 8 }}>Connect With Us</h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', maxWidth: 540, margin: '0 auto' }}>
              Have questions, feedback, or need premium listing assistance? Our support team is ready to guide you.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container" style={{ maxWidth: 960, marginTop: 48 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.3fr) minmax(300px, 1fr)', gap: 40, alignItems: 'start' }}>
          
          {/* Contact Form */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}
            style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border)', borderRadius: 16, padding: '36px 32px' }}>
            <h3 className="font-display" style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: 24, color: 'var(--gold)' }}>Send An Inquiry</h3>
            
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 700, marginBottom: 8 }}>Full Name</label>
                <input className="se-input" type="text" placeholder="John Doe" required />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 700, marginBottom: 8 }}>Email Address</label>
                <input className="se-input" type="email" placeholder="you@email.com" required />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 700, marginBottom: 8 }}>Inquiry Subject</label>
                <input className="se-input" type="text" placeholder="Support, Listing, or Verification" required />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 700, marginBottom: 8 }}>Detailed Message</label>
                <textarea className="se-input" rows={5} placeholder="Tell us how we can help you..." required style={{ resize: 'vertical', fontFamily: 'inherit' }} />
              </div>
              <button type="submit" className="btn-gold" style={{ width: 'fit-content', paddingLeft: 28, paddingRight: 28, paddingTop: 12, paddingBottom: 12, marginTop: 8 }}>
                Send Message
              </button>
            </form>
          </motion.div>

          {/* Contact Details */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}
            style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            
            {/* Info Box */}
            <div style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border)', borderRadius: 16, padding: 28 }}>
              <h3 className="font-display" style={{ fontSize: '1.15rem', fontWeight: 600, marginBottom: 20, color: 'var(--gold)' }}>Direct Contacts</h3>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                {[
                  { icon: 'mail', title: 'Email Address', desc: 'support@stayeasy.co.ke' },
                  { icon: 'phone', title: 'Phone Hotline', desc: '+254 700 123 456' },
                  { icon: 'location_on', title: 'Headquarters', desc: 'Daystar University, Athi River, Kenya' },
                ].map((item, idx) => (
                  <div key={idx} style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
                    <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'rgba(224,181,96,0.08)', border: '1px solid var(--border-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--gold)', flexShrink: 0 }}>
                      <span className="material-symbols-outlined" style={{ fontSize: 20 }}>{item.icon}</span>
                    </div>
                    <div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em' }}>{item.title}</div>
                      <div style={{ fontWeight: 600, fontSize: '0.9rem', color: 'white', marginTop: 2 }}>{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Support Hours Card */}
            <div style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border)', borderRadius: 16, padding: 28 }}>
              <h3 className="font-display" style={{ fontSize: '1.15rem', fontWeight: 600, marginBottom: 12, color: 'var(--gold)' }}>Operation Hours</h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.8 }}>
                Our representatives are available:<br />
                <span style={{ color: 'white', fontWeight: 600 }}>Monday – Friday:</span> 8:00 AM – 5:00 PM<br />
                <span style={{ color: 'white', fontWeight: 600 }}>Saturday:</span> 9:00 AM – 1:00 PM<br />
                <span style={{ color: 'white', fontWeight: 600 }}>Sunday:</span> Closed
              </p>
            </div>

            {/* Direct WhatsApp Widget */}
            <a href="https://wa.me/254700123456" target="_blank" rel="noopener noreferrer"
              style={{ display: 'flex', alignItems: 'center', gap: 14, background: 'rgba(34,197,94,0.12)', border: '1px solid rgba(34,197,94,0.3)', borderRadius: 12, padding: '16px 20px', textDecoration: 'none', transition: 'all var(--t-fast)' }}
              onMouseEnter={e => e.currentTarget.style.backgroundColor = 'rgba(34,197,94,0.18)'}
              onMouseLeave={e => e.currentTarget.style.backgroundColor = 'rgba(34,197,94,0.12)'}>
              <div style={{ width: 36, height: 36, borderRadius: '50%', background: '#22c55e', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', flexShrink: 0 }}>
                <svg style={{ width: 18, height: 18, fill: 'currentColor' }} viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.003 5.37 5.378 0 12.026 0c3.219.001 6.247 1.253 8.526 3.535 2.279 2.281 3.53 5.309 3.53 8.529-.002 6.657-5.378 12.028-12.025 12.028-1.999-.001-3.968-.5-5.716-1.45L0 24zm6.086-4.143c1.666.988 3.316 1.488 5.914 1.489 5.381 0 9.761-4.38 9.764-9.762.002-2.607-1.012-5.059-2.859-6.908C17.116 2.83 14.661 1.815 12.03 1.815c-5.385 0-9.765 4.382-9.768 9.763-.001 2.228.583 4.4 1.688 6.31l-1.1 4.023 4.207-1.104zM16.9 14.62c-.266-.134-1.583-.781-1.829-.871-.247-.09-.427-.134-.607.134-.18.267-.697.871-.853 1.05-.157.18-.314.202-.58.067-.266-.134-1.126-.415-2.146-1.325-.793-.707-1.328-1.58-1.484-1.848-.157-.267-.017-.411.117-.545.121-.12.266-.312.4-.467.133-.156.178-.267.266-.445.089-.178.044-.334-.022-.467-.066-.134-.607-1.464-.83-2.005-.218-.524-.458-.452-.607-.46l-.518-.008c-.18 0-.472.067-.719.334-.247.267-.943.913-.943 2.228 0 1.314.954 2.584 1.088 2.763.135.18 1.88 2.87 4.553 4.024.636.274 1.132.438 1.52.562.64.203 1.22.174 1.678.106.512-.076 1.583-.647 1.808-1.272.225-.625.225-1.16.157-1.272-.067-.112-.247-.18-.513-.314z"/></svg>
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: '0.85rem', color: '#4ade80' }}>24/7 Agent Desk</div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: 2 }}>Chat directly on WhatsApp</div>
              </div>
            </a>

          </motion.div>

        </div>
      </div>
    </div>
  );
}
