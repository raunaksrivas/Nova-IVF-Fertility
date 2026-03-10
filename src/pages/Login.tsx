/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Baby, 
  Mail, 
  Lock, 
  ArrowRight, 
  Github, 
  Chrome,
  AlertCircle
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { login, user } = useAuth();

  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  const handleGoogleLogin = async () => {
    setError(null);
    setIsLoading(true);
    try {
      await login();
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Failed to login with Google');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('Email login is currently disabled. Please use Google login.');
  };

  return (
    <div className="min-h-[90vh] flex items-center justify-center px-4 py-12 bg-gradient-to-br from-emerald-50 via-white to-slate-50 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-emerald-200/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-emerald-100/30 rounded-full blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full relative z-10"
      >
        <div className="text-center mb-10">
          <Link to="/" className="inline-flex items-center gap-2 mb-6 group">
            <div className="w-12 h-12 bg-emerald-600 rounded-2xl flex items-center justify-center group-hover:rotate-12 transition-transform shadow-lg shadow-emerald-200">
              <Baby className="text-white w-7 h-7" />
            </div>
          </Link>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Welcome Back</h1>
          <p className="text-slate-500 mt-2">Access your personalized fertility journey</p>
        </div>

        <div className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-emerald-50">
          {error && (
            <div className="mb-6 p-4 bg-rose-50 border border-rose-100 rounded-2xl flex items-center gap-3 text-rose-600 text-sm">
              <AlertCircle className="w-5 h-5 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2 ml-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-slate-900 placeholder:text-slate-400"
                  placeholder="name@example.com"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2 ml-1">
                <label className="text-sm font-semibold text-slate-700">Password</label>
                <button type="button" className="text-xs font-bold text-emerald-600 hover:text-emerald-700">Forgot Password?</button>
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-slate-900 placeholder:text-slate-400"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-emerald-600 text-white py-4 rounded-2xl font-bold text-lg hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-200 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed group"
            >
              Sign In
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          <div className="mt-8 relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-100"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase tracking-widest font-bold">
              <span className="bg-white px-4 text-slate-400">Or continue with</span>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-4">
            <button 
              onClick={handleGoogleLogin}
              disabled={isLoading}
              className="flex items-center justify-center gap-3 py-4 border border-slate-100 rounded-2xl hover:bg-slate-50 transition-all group active:scale-95"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-emerald-600/30 border-t-emerald-600 rounded-full animate-spin" />
              ) : (
                <>
                  <Chrome className="w-5 h-5 text-emerald-600 group-hover:scale-110 transition-transform" />
                  <span className="text-sm font-bold text-slate-700">Sign in with Google</span>
                </>
              )}
            </button>
          </div>
        </div>

        <p className="text-center mt-8 text-slate-500 text-sm">
          Don't have an account?{' '}
          <Link to="/assessment" className="font-bold text-emerald-600 hover:text-emerald-700">Start AI Assessment</Link>
        </p>

        <div className="mt-12 flex items-center gap-3 p-4 bg-emerald-50/50 rounded-2xl border border-emerald-100/50">
          <AlertCircle className="w-5 h-5 text-emerald-600 shrink-0" />
          <p className="text-xs text-emerald-800 leading-relaxed">
            Your data is encrypted and protected by HIPAA-compliant AI protocols.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
