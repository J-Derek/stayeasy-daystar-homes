import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const SECTIONS = [
  { title: '1. Information We Collect', body: 'We collect information you provide directly to us, such as when you create an account, list a property, or contact us for support. This includes your name, email address, phone number, university affiliation, and payment information. We also automatically collect certain technical data when you use our services, including IP addresses, browser type, and usage data to help improve our platform.' },
  { title: '2. How We Use Your Information', body: 'We use the information we collect to provide, maintain, and improve our services; process transactions and send you related information; send you technical notices, updates, and support messages; respond to your comments and questions; and monitor and analyze trends, usage, and activities in connection with our services.' },
  { title: '3. Sharing of Information', body: 'We do not sell your personal information to third parties. We may share your information with landlords when you make a booking inquiry, with service providers who assist us in our operations, and when required by law or to protect our rights and the safety of our users and the public.' },
  { title: '4. Data Retention', body: 'We retain your personal information for as long as necessary to provide you with our services and as described in this privacy policy. We may also retain and use your information as necessary to comply with our legal obligations, resolve disputes, and enforce our agreements.' },
  { title: '5. Security', body: 'We take reasonable measures to help protect information about you from loss, theft, misuse, unauthorized access, disclosure, alteration, and destruction. All data is encrypted in transit using TLS and at rest using AES-256 encryption.' },
  { title: '6. Your Rights', body: 'You have the right to access, update, or delete your personal information at any time through your account settings. You may also request a copy of all data we hold about you by contacting privacy@stayeasy.co.ke. Residents of the EU have additional rights under GDPR.' },
  { title: '7. Contact Us', body: 'If you have any questions about this Privacy Policy, please contact us at privacy@stayeasy.co.ke or write to us at StayEasy Ltd, Westlands Business Park, Nairobi, Kenya.' },
];

export default function PrivacyPage() {
  return (
    <div style={{ paddingTop: 120, paddingBottom: 80 }}>
      <div className="container" style={{ maxWidth: 760 }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div className="text-overline text-gold" style={{ marginBottom: 16 }}>Legal</div>
          <h1 className="text-display font-display" style={{ marginBottom: 12 }}>Privacy Policy</h1>
          <p style={{ color: 'var(--text-muted)', marginBottom: 48, fontSize: '0.9rem' }}>Last updated: 22 May 2026</p>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.85, marginBottom: 48 }}>
            At StayEasy, your privacy is a core value, not an afterthought. This policy explains how we collect, use, and protect your personal data when you use our platform.
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
            <Link to="/terms" style={{ color: 'var(--gold)', fontSize: '0.875rem' }}>Terms of Service →</Link>
            <Link to="/contact" style={{ color: 'var(--gold)', fontSize: '0.875rem' }}>Contact Us →</Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}