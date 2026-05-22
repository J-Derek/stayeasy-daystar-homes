const fs = require('fs');
const pages = ['AboutPage', 'CareersPage', 'PartnerPage', 'PressPage', 'SupportPage', 'PrivacyPage', 'TermsPage'];

pages.forEach(p => {
  const content = `import { motion } from 'framer-motion';

export default function ${p}() {
  return (
    <div className="container" style={{ minHeight: '70vh', paddingTop: 120, paddingBottom: 60 }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{ maxWidth: 640, margin: '0 auto', textAlign: 'center' }}
      >
        <span className="material-symbols-outlined" style={{ fontSize: 64, color: 'var(--gold)', marginBottom: 24 }}>construction</span>
        <h1 className="text-display font-display" style={{ marginBottom: 16 }}>${p.replace('Page', '')}</h1>
        <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8 }}>
          This page is currently under construction for the StayEasy prototype. Check back soon!
        </p>
      </motion.div>
    </div>
  );
}`;
  fs.writeFileSync('./src/pages/' + p + '.tsx', content);
});
console.log('Pages created!');
