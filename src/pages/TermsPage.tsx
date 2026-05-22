import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const SECTIONS = [
  { title: '1. Acceptance of Terms', body: 'By accessing or using the StayEasy platform, you agree to be bound by these Terms of Service. If you do not agree to these terms, you may not access or use our services. These terms apply to all visitors, users, students, and landlords who access or use our platform.' },
  { title: '2. User Accounts', body: 'You must create an account to access certain features. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You must notify us immediately of any unauthorized use of your account. You must be at least 18 years old or have parental consent to create an account.' },
  { title: '3. Listings and Bookings', body: 'Landlords are solely responsible for the accuracy of their listings. StayEasy acts as an intermediary and does not own, control, or manage any of the listed properties. We do not guarantee the accuracy of listing information, though we take reasonable steps to verify all properties before publication.' },
  { title: '4. Payments and Fees', body: 'StayEasy charges a service fee on completed bookings. All fees are displayed transparently before you confirm a booking. Payment processing is handled by our PCI-compliant payment partners. Rent payments are made directly to landlords after successful booking confirmation.' },
  { title: '5. Cancellations and Refunds', body: 'Cancellation policies are set by individual landlords and are clearly displayed on each listing. StayEasy enforces a minimum 7-day notice period for eligible refunds. The StayEasy service fee is non-refundable once a booking is confirmed. Disputes are handled through our mediation process.' },
  { title: '6. Prohibited Activities', body: 'Users may not use our platform to post false or misleading listings, engage in any form of discrimination, harass other users, violate any applicable laws, or attempt to circumvent our payment systems. Violations may result in immediate account termination.' },
  { title: '7. Limitation of Liability', body: 'To the fullest extent permitted by applicable law, StayEasy shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of your use of or inability to use the service. Our total liability in any matter arising from these terms is limited to the service fees paid by you in the 12 months preceding the claim.' },
  { title: '8. Governing Law', body: 'These Terms shall be governed by and construed in accordance with the laws of Kenya, without regard to its conflict of law provisions. Any disputes shall be resolved in the courts of Nairobi, Kenya.' },
];

export default function TermsPage() {
  return (
    <div style={{ paddingTop: 120, paddingBottom: 80 }}>
      <div className="container" style={{ maxWidth: 760 }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div className="text-overline text-gold" style={{ marginBottom: 16 }}>Legal</div>
          <h1 className="text-display font-display" style={{ marginBottom: 12 }}>Terms of Service</h1>
          <p style={{ color: 'var(--text-muted)', marginBottom: 48, fontSize: '0.9rem' }}>Last updated: 22 May 2026</p>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.85, marginBottom: 48 }}>
            Please read these Terms of Service carefully before using the StayEasy platform operated by StayEasy Ltd. These terms govern your access to and use of our website, apps, and services.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
            {SECTIONS.map((s, i) => (
              <motion.div key={s.title} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
                <h2 style={{ fontWeight: 700, fontSize: '1.1rem', marginBottom: 12, color: 'var(--text-primary)' }}>{s.title}</h2>
                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.85 }}>{s.body}</p>
              </motion.div>
            ))}
          </div>

          <div style={{ marginTop: 64, paddingTop: 32, borderTop: '1px solid var(--border-subtle)', display: 'flex', gap: 24, flexWrap: 'wrap' }}>
            <Link to="/privacy" style={{ color: 'var(--gold)', fontSize: '0.875rem' }}>Privacy Policy →</Link>
            <Link to="/contact" style={{ color: 'var(--gold)', fontSize: '0.875rem' }}>Contact Us →</Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}