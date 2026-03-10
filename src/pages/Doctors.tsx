/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { DOCTORS } from '../constants';
import { Star, MapPin, Calendar, ChevronRight, Search } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Doctors() {
  return (
    <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8 bg-slate-50">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div>
            <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-4 tracking-tight">Our Specialists</h1>
            <p className="text-slate-600 max-w-2xl">A network of world-renowned embryologists and fertility experts dedicated to your success.</p>
          </div>
          <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input 
              type="text" 
              placeholder="Search by name or specialty..." 
              className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white border border-slate-200 outline-none focus:border-emerald-500 shadow-sm"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {DOCTORS.map((doc, i) => (
            <motion.div
              key={doc.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-[3rem] shadow-sm border border-slate-100 overflow-hidden hover:shadow-xl hover:border-emerald-100 transition-all group flex flex-col items-center text-center"
            >
              <div className="pt-12 pb-4 relative">
                <div className="relative w-48 h-48 rounded-full overflow-hidden border-8 border-emerald-50 shadow-inner group-hover:border-emerald-100 transition-all duration-500">
                  <img 
                    src={doc.image} 
                    alt={doc.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="absolute bottom-6 right-4 bg-white px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg border border-emerald-50">
                  <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                  <span className="text-xs font-bold text-slate-900">{doc.rating}</span>
                </div>
              </div>
              
              <div className="p-8 pt-2 w-full">
                <div className="mb-8">
                  <h2 className="text-3xl font-bold text-slate-900 mb-1.5 tracking-tight">{doc.name}</h2>
                  <div className="text-emerald-600 text-xs font-bold uppercase tracking-[0.2em]">{doc.specialty}</div>
                </div>
                
                <div className="space-y-3 mb-8">
                  <div className="flex items-center justify-center gap-2 text-slate-500 text-sm">
                    <Calendar className="w-4 h-4" />
                    <span>{doc.experience} Experience</span>
                  </div>
                  <div className="flex items-center justify-center gap-2 text-slate-500 text-sm">
                    <MapPin className="w-4 h-4" />
                    <span>{doc.location}</span>
                  </div>
                </div>

                <p className="text-slate-600 text-sm leading-relaxed mb-8 line-clamp-2">
                  {doc.bio}
                </p>

                <div className="flex gap-3">
                  <Link
                    to="/booking"
                    className="flex-1 bg-emerald-600 text-white text-center py-3 rounded-xl font-bold text-sm hover:bg-emerald-700 transition-all"
                  >
                    Book Appointment
                  </Link>
                  <button className="p-3 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 transition-all">
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
