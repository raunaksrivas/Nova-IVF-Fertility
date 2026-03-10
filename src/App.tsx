/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Heart, 
  Calendar, 
  MapPin, 
  User, 
  Menu, 
  X, 
  Phone, 
  MessageSquare,
  ChevronRight,
  Activity,
  ShieldCheck,
  Stethoscope,
  Baby
} from 'lucide-react';
import { useState, useEffect } from 'react';

// Pages (to be implemented)
import Home from './pages/Home';
import Treatments from './pages/Treatments';
import Doctors from './pages/Doctors';
import Clinics from './pages/Clinics';
import Assessment from './pages/Assessment';
import Dashboard from './pages/Dashboard';
import Booking from './pages/Booking';
import Login from './pages/Login';
import { AuthProvider, useAuth } from './context/AuthContext';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { user, profile, logout } = useAuth();

  const navLinks = [
    { name: 'Treatments', path: '/treatments' },
    { name: 'Doctors', path: '/doctors' },
    { name: 'Clinics', path: '/clinics' },
    { name: 'AI Assessment', path: '/assessment' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-emerald-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center group-hover:rotate-12 transition-transform">
              <Baby className="text-white w-5 h-5" />
            </div>
            <span className="text-xl font-bold text-emerald-900 tracking-tight">Nova IVF <span className="text-emerald-600 font-light italic">Fertility</span></span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`text-sm font-medium transition-colors hover:text-emerald-600 ${
                  location.pathname === link.path ? 'text-emerald-600' : 'text-slate-600'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <Link
              to="/booking"
              className="bg-emerald-600 text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-emerald-700 transition-all shadow-md hover:shadow-lg active:scale-95"
            >
              Book Appointment
            </Link>
            
            {user ? (
              <div className="flex items-center gap-4 border-l border-slate-200 pl-8 ml-2">
                <Link to="/dashboard" className="flex items-center gap-2 group">
                  {profile?.photoURL ? (
                    <img src={profile.photoURL} alt="Profile" className="w-8 h-8 rounded-full border border-emerald-100" />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 font-bold text-xs">
                      {profile?.displayName?.charAt(0) || user.email?.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <span className="text-sm font-bold text-slate-700 group-hover:text-emerald-600 transition-colors">
                    {profile?.displayName?.split(' ')[0] || 'Patient'}
                  </span>
                </Link>
                <button 
                  onClick={() => logout()}
                  className="text-xs font-bold text-slate-400 hover:text-rose-500 transition-colors uppercase tracking-wider"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="text-slate-600 hover:text-emerald-600 text-sm font-bold transition-colors border-l border-slate-200 pl-8 ml-2"
              >
                Login
              </Link>
            )}
          </nav>

          {/* Mobile Menu Toggle */}
          <button className="md:hidden p-2 text-slate-600" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-emerald-100 overflow-hidden"
          >
            <div className="px-4 py-6 space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className="block text-lg font-medium text-slate-700"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <Link
                to="/booking"
                className="block w-full bg-emerald-600 text-white text-center py-3 rounded-xl font-semibold"
                onClick={() => setIsMenuOpen(false)}
              >
                Book Appointment
              </Link>
              
              {user ? (
                <div className="space-y-4 pt-4 border-t border-slate-100">
                  <Link
                    to="/dashboard"
                    className="flex items-center gap-3 text-lg font-medium text-slate-700"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {profile?.photoURL ? (
                      <img src={profile.photoURL} alt="Profile" className="w-8 h-8 rounded-full" />
                    ) : (
                      <User className="w-6 h-6 text-emerald-600" />
                    )}
                    <span>{profile?.displayName || 'Patient Dashboard'}</span>
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      setIsMenuOpen(false);
                    }}
                    className="block w-full text-left text-lg font-medium text-rose-500"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <Link
                  to="/login"
                  className="block w-full border border-emerald-100 text-emerald-900 text-center py-3 rounded-xl font-bold hover:bg-emerald-50 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

const Footer = () => (
  <footer className="bg-slate-900 text-slate-300 py-16">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-12">
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Baby className="text-emerald-500 w-6 h-6" />
          <span className="text-xl font-bold text-white">Nova IVF Fertility</span>
        </div>
        <p className="text-sm leading-relaxed">
          Pioneering the future of fertility care with AI-driven insights and compassionate clinical excellence.
        </p>
        <div className="flex gap-4">
          <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-emerald-600 transition-colors cursor-pointer">
            <Phone className="w-4 h-4" />
          </div>
          <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-emerald-600 transition-colors cursor-pointer">
            <MessageSquare className="w-4 h-4" />
          </div>
        </div>
      </div>
      
      <div>
        <h4 className="text-white font-semibold mb-6">Treatments</h4>
        <ul className="space-y-3 text-sm">
          <li><Link to="/treatments" className="hover:text-emerald-400">IVF (In-Vitro Fertilisation)</Link></li>
          <li><Link to="/treatments" className="hover:text-emerald-400">ICSI Treatment</Link></li>
          <li><Link to="/treatments" className="hover:text-emerald-400">IUI Treatment</Link></li>
          <li><Link to="/treatments" className="hover:text-emerald-400">Egg Freezing</Link></li>
        </ul>
      </div>

      <div>
        <h4 className="text-white font-semibold mb-6">Quick Links</h4>
        <ul className="space-y-3 text-sm">
          <li><Link to="/doctors" className="hover:text-emerald-400">Our Specialists</Link></li>
          <li><Link to="/clinics" className="hover:text-emerald-400">Clinic Locations</Link></li>
          <li><Link to="/assessment" className="hover:text-emerald-400">AI Assessment</Link></li>
          <li><Link to="/login" className="hover:text-emerald-400">Patient Login</Link></li>
          <li><Link to="/dashboard" className="hover:text-emerald-400">Patient Portal</Link></li>
        </ul>
      </div>

      <div>
        <h4 className="text-white font-semibold mb-6">Contact Us</h4>
        <ul className="space-y-3 text-sm">
          <li className="flex items-start gap-2">
            <MapPin className="w-4 h-4 text-emerald-500 mt-1" />
            <span>99 Centers across 70 cities in India</span>
          </li>
          <li className="flex items-center gap-2">
            <Phone className="w-4 h-4 text-emerald-500" />
            <span>1800-123-4567 (Toll Free)</span>
          </li>
        </ul>
      </div>
    </div>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 pt-8 border-t border-slate-800 text-xs text-center">
      © 2026 Nova IVF Fertility. All rights reserved. | Privacy Policy | Terms of Service
    </div>
  </footer>
);

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-emerald-100 selection:text-emerald-900">
          <Header />
          <main className="pt-16">
            <AnimatePresence mode="wait">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/treatments" element={<Treatments />} />
                <Route path="/doctors" element={<Doctors />} />
                <Route path="/clinics" element={<Clinics />} />
                <Route path="/assessment" element={<Assessment />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/booking" element={<Booking />} />
                <Route path="/login" element={<Login />} />
              </Routes>
            </AnimatePresence>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}
