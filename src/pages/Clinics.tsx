/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { CLINICS } from '../constants';
import { MapPin, Phone, Clock, Search, Navigation } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Clinics() {
  return (
    <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8 bg-slate-50">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div>
            <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-4 tracking-tight">Clinic Locations</h1>
            <p className="text-slate-600 max-w-2xl">Find a Nova IVF Fertility center near you. We have 99+ centers across 70 cities in India.</p>
          </div>
          <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input 
              type="text" 
              placeholder="Search by city or area..." 
              className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white border border-slate-200 outline-none focus:border-emerald-500 shadow-sm"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {CLINICS.map((clinic, i) => (
            <motion.div
              key={clinic.id}
              initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden flex flex-col md:flex-row hover:shadow-xl hover:border-emerald-100 transition-all group"
            >
              <div className="md:w-2/5 relative overflow-hidden">
                <img 
                  src={clinic.image} 
                  alt={clinic.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 left-4 bg-emerald-600 text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">
                  {clinic.city}
                </div>
              </div>
              
              <div className="md:w-3/5 p-8 flex flex-col justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 mb-6">{clinic.name}</h2>
                  
                  <div className="space-y-4 mb-8">
                    <div className="flex items-start gap-3 text-slate-500 text-sm">
                      <MapPin className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{clinic.address}</span>
                    </div>
                    <div className="flex items-center gap-3 text-slate-500 text-sm">
                      <Phone className="w-5 h-5 text-emerald-600 shrink-0" />
                      <span>{clinic.phone}</span>
                    </div>
                    <div className="flex items-center gap-3 text-slate-500 text-sm">
                      <Clock className="w-5 h-5 text-emerald-600 shrink-0" />
                      <span>Mon - Sat: 9:00 AM - 7:00 PM</span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Link
                    to="/booking"
                    className="flex-1 bg-emerald-600 text-white text-center py-3 rounded-xl font-bold text-sm hover:bg-emerald-700 transition-all"
                  >
                    Book Appointment
                  </Link>
                  <button className="p-3 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 transition-all flex items-center gap-2 font-bold text-sm">
                    <Navigation className="w-4 h-4" /> Directions
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Map Placeholder */}
        <div className="mt-24 bg-slate-200 h-[500px] rounded-[3rem] relative overflow-hidden flex items-center justify-center border-8 border-white shadow-2xl">
          <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />
          <div className="relative z-10 text-center">
            <div className="w-20 h-20 bg-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl shadow-emerald-200">
              <MapPin className="text-white w-10 h-10" />
            </div>
            <h2 className="text-3xl font-bold text-slate-900 mb-2">Interactive Map View</h2>
            <p className="text-slate-500">Explore our 99+ centers across India.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
