/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  ShieldCheck, 
  Activity, 
  Users, 
  Sparkles,
  CheckCircle2,
  ChevronRight
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell
} from 'recharts';
import { TREATMENTS, ASSETS } from '../constants';

const successData = [
  { name: 'IVF', rate: 72, color: '#059669' },
  { name: 'ICSI', rate: 78, color: '#10b981' },
  { name: 'IUI', rate: 22, color: '#34d399' },
  { name: 'Egg Freezing', rate: 95, color: '#6ee7b7' },
];

export default function Home() {
  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center pt-20 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-emerald-50 via-white to-slate-50">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 -right-20 w-96 h-96 bg-emerald-200/30 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-emerald-100/40 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold uppercase tracking-wider mb-6">
              <Sparkles className="w-3 h-3" />
              AI-Powered Fertility Care
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-slate-900 leading-[1.1] tracking-tight mb-6">
              Your Journey to <br />
              <span className="text-emerald-600 italic font-light">Parenthood</span>, <br />
              Guided by Intelligence.
            </h1>
            <p className="text-lg text-slate-600 mb-10 max-w-lg leading-relaxed">
              Experience India's most advanced fertility platform. Combining world-class clinical expertise with AI-driven personalized treatment plans.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/assessment"
                className="inline-flex items-center justify-center gap-2 bg-emerald-600 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-200 hover:-translate-y-1 active:translate-y-0"
              >
                Start AI Assessment
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/booking"
                className="inline-flex items-center justify-center gap-2 bg-white text-emerald-900 border-2 border-emerald-100 px-8 py-4 rounded-2xl font-bold text-lg hover:bg-emerald-50 transition-all"
              >
                Book Consultation
              </Link>
            </div>
            
            <div className="mt-12 flex items-center gap-8 border-t border-emerald-100 pt-8">
              <div>
                <div className="text-3xl font-bold text-slate-900">99k+</div>
                <div className="text-xs text-slate-500 uppercase tracking-widest font-semibold">Successful Pregnancies</div>
              </div>
              <div className="w-px h-10 bg-emerald-100" />
              <div>
                <div className="text-3xl font-bold text-slate-900">99</div>
                <div className="text-xs text-slate-500 uppercase tracking-widest font-semibold">Centers Nationwide</div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative"
          >
            <div className="relative rounded-[2rem] overflow-hidden shadow-2xl border-8 border-white">
              <img 
                src={ASSETS.BABY_HERO} 
                alt="Fertility Care" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/40 to-transparent" />
            </div>
            
            {/* Floating Card */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl border border-emerald-50 max-w-[240px]"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center">
                  <Activity className="text-emerald-600 w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-900">Success Rate</div>
                  <div className="text-xs text-emerald-600 font-semibold">78% (Self-Cycle)</div>
                </div>
              </div>
              <p className="text-[10px] text-slate-500 leading-tight">
                Our AI-optimized protocols have increased success rates by 15% compared to national averages.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-white px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4 tracking-tight">Why Nova IVF Fertility?</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">We combine the warmth of human care with the precision of artificial intelligence.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <ShieldCheck className="w-8 h-8 text-emerald-600" />,
                title: "International Protocols",
                desc: "India's first fertility provider to strictly adhere to international clinical standards."
              },
              {
                icon: <Activity className="w-8 h-8 text-emerald-600" />,
                title: "AI-Driven Insights",
                desc: "Personalized treatment plans optimized by our proprietary fertility AI engine."
              },
              {
                icon: <Users className="w-8 h-8 text-emerald-600" />,
                title: "Expert Specialists",
                desc: "A network of 200+ world-renowned embryologists and fertility experts."
              }
            ].map((item, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -5 }}
                className="p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:border-emerald-200 hover:bg-emerald-50/30 transition-all"
              >
                <div className="mb-6">{item.icon}</div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{item.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Rates Chart */}
      <section className="py-24 bg-slate-50 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight">Transparency in <br />Success Rates</h2>
            <p className="text-slate-600 mb-8 leading-relaxed">
              We believe in complete transparency. Our success rates are independently audited and reflect our commitment to excellence in every cycle.
            </p>
            <ul className="space-y-4">
              {['Self-Cycle Encouraged', 'Transparent Pricing', 'Ethical Practices'].map((text, i) => (
                <li key={i} className="flex items-center gap-3 text-slate-700 font-medium">
                  <CheckCircle2 className="text-emerald-600 w-5 h-5" />
                  {text}
                </li>
              ))}
            </ul>
            <Link to="/treatments" className="inline-flex items-center gap-2 text-emerald-600 font-bold mt-10 group">
              Explore all treatments <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          
          <div className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-slate-100 h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={successData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#64748b', fontSize: 12 }}
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#64748b', fontSize: 12 }}
                  unit="%"
                />
                <Tooltip 
                  cursor={{ fill: '#f8fafc' }}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
                <Bar dataKey="rate" radius={[8, 8, 0, 0]} barSize={40}>
                  {successData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
            <div className="text-center text-[10px] text-slate-400 mt-4 uppercase tracking-widest font-bold">
              Success Rate Comparison (%)
            </div>
          </div>
        </div>
      </section>

      {/* Featured Treatments */}
      <section className="py-24 bg-white px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-2">Our Treatments</h2>
              <p className="text-slate-500">Comprehensive solutions for every fertility need.</p>
            </div>
            <Link to="/treatments" className="hidden sm:flex items-center gap-2 text-emerald-600 font-bold">
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {TREATMENTS.map((t) => (
              <Link 
                key={t.id} 
                to="/treatments"
                className="group p-6 rounded-3xl border border-slate-100 bg-slate-50 hover:bg-white hover:shadow-xl hover:border-emerald-100 transition-all"
              >
                <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform">
                  <Sparkles className="text-emerald-600 w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{t.title}</h3>
                <p className="text-slate-500 text-xs leading-relaxed mb-4">{t.description}</p>
                <div className="text-emerald-600 text-xs font-bold flex items-center gap-1">
                  Success: {t.successRate} <ChevronRight className="w-3 h-3" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto bg-emerald-900 rounded-[3rem] overflow-hidden shadow-2xl relative min-h-[500px] flex items-center">
          {/* Background Image with Overlay */}
          <div className="absolute inset-0">
            <img 
              src={ASSETS.BABY_CTA} 
              alt="Heartwarming Baby" 
              className="w-full h-full object-cover opacity-60"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-950 via-emerald-950/60 to-transparent" />
          </div>

          <div className="p-12 md:p-20 text-left relative z-10 max-w-2xl">
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-8 leading-tight tracking-tight">
              Ready to start your <br />
              <span className="text-emerald-400 italic font-light">parenthood journey?</span>
            </h2>
            <p className="text-emerald-50 text-lg mb-12 max-w-lg leading-relaxed font-medium">
              Join thousands of happy families who found their way with Nova IVF. Our specialists are ready to guide you every step of the way.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/booking"
                className="bg-white text-emerald-900 px-10 py-5 rounded-2xl font-bold text-xl hover:bg-emerald-50 transition-all shadow-2xl hover:-translate-y-1 active:translate-y-0"
              >
                Book an Appointment
              </Link>
              <Link
                to="/assessment"
                className="bg-emerald-800/80 backdrop-blur-md text-white border border-emerald-700 px-10 py-5 rounded-2xl font-bold text-xl hover:bg-emerald-700 transition-all"
              >
                Take AI Assessment
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
