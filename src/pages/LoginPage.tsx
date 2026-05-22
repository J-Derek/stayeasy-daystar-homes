import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth, UserRole } from '../context/AuthContext';
import toast from 'react-hot-toast';

export default function LoginPage() {
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const [role, setRole] = useState<UserRole>('student');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    signIn(role);
    toast.success(`Signed in as ${role === 'student' ? 'Student' : 'Landlord'}`);
    navigate(role === 'landlord' ? '/landlord' : '/dashboard');
  };

  return (
    <div style={{ paddingTop: 100, minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-midnight)', paddingBottom: 60 }}>
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
        style={{ width: '100%', maxWidth: 460, background: 'var(--bg-elevated)', border: '1px solid var(--border)', borderRadius: 16, padding: '40px 32px', margin: '0 20px', boxShadow: '0 24px 48px -12px rgba(0,0,0,0.5)' }}>
        
        {/* Brand Header */}
        <div style={{ textAlign: 'center', marginBottom: 28 }}>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', fontWeight: 700, color: 'white', marginBottom: 8 }}>
            <span style={{ color: 'var(--gold)', fontStyle: 'italic' }}>Stay</span>Easy
          </div>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, color: 'white' }}>Welcome Back</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: 4 }}>Sign in to access Nairobi's premium student housing</p>
        </div>

        {/* Role Switcher */}
        <div style={{ marginBottom: 24 }}>
          <label style={{ display: 'block', fontSize: '0.78rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 700, marginBottom: 10 }}>Select Identity</label>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <div onClick={() => setRole('student')}
              style={{
                cursor: 'pointer', padding: 14, borderRadius: 10, border: '1px solid',
                borderColor: role === 'student' ? 'var(--gold)' : 'var(--border)',
                background: role === 'student' ? 'rgba(224,181,96,0.06)' : 'transparent',
                textAlign: 'center', transition: 'all var(--t-fast)'
              }}>
              <span className="material-symbols-outlined" style={{ fontSize: 24, color: role === 'student' ? 'var(--gold)' : 'var(--text-muted)', marginBottom: 4 }}>school</span>
              <div style={{ fontWeight: 600, fontSize: '0.85rem', color: 'white' }}>Student</div>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: 2 }}>Find &amp; Rent</div>
            </div>

            <div onClick={() => setRole('landlord')}
              style={{
                cursor: 'pointer', padding: 14, borderRadius: 10, border: '1px solid',
                borderColor: role === 'landlord' ? 'var(--gold)' : 'var(--border)',
                background: role === 'landlord' ? 'rgba(224,181,96,0.06)' : 'transparent',
                textAlign: 'center', transition: 'all var(--t-fast)'
              }}>
              <span className="material-symbols-outlined" style={{ fontSize: 24, color: role === 'landlord' ? 'var(--gold)' : 'var(--text-muted)', marginBottom: 4 }}>domain</span>
              <div style={{ fontWeight: 600, fontSize: '0.85rem', color: 'white' }}>Landlord</div>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: 2 }}>Manage Estates</div>
            </div>
          </div>
        </div>

        {/* Input Form */}
        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.78rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 700, marginBottom: 8 }}>Email Address</label>
            <input className="se-input" type="email" placeholder={role === 'student' ? 'alex@daystar.ac.ke' : 'james@email.com'}
              defaultValue={role === 'student' ? 'alex@daystar.ac.ke' : 'james@email.com'} required />
          </div>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
              <label style={{ fontSize: '0.78rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 700 }}>Password</label>
              <Link to="#" style={{ fontSize: '0.78rem', color: 'var(--gold)', textDecoration: 'none', fontWeight: 600 }}>Forgot?</Link>
            </div>
            <input className="se-input" type="password" placeholder="••••••••" defaultValue="demo1234" required />
          </div>

          <motion.button type="submit" whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }} className="btn-gold"
            style={{ width: '100%', paddingTop: 12, paddingBottom: 12, fontSize: '0.9rem', fontWeight: 700, marginTop: 8 }}>
            Continue as {role === 'student' ? 'Student' : 'Landlord'}
          </motion.button>
        </form>

        {/* Demo notification banner */}
        <div style={{ marginTop: 24, background: 'rgba(224,181,96,0.06)', border: '1px solid rgba(224,181,96,0.15)', padding: '10px 14px', borderRadius: 8, textAlign: 'center', fontSize: '0.78rem', color: 'var(--gold)', fontWeight: 600 }}>
          ⚡ Demo Access: Tap "Continue" to explore fully working screens
        </div>

        {/* Signup redirection */}
        <div style={{ textAlign: 'center', marginTop: 24, fontSize: '0.85rem', color: 'var(--text-muted)' }}>
          New to StayEasy? <Link to="/signup" style={{ color: 'var(--gold)', fontWeight: 600, textDecoration: 'none', marginLeft: 4 }}>Create an account</Link>
        </div>

      </motion.div>
    </div>
  );
}
