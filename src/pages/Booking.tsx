/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useLocation } from 'react-router-dom';
import { 
  Calendar, 
  Clock, 
  User, 
  MapPin, 
  CheckCircle2, 
  ArrowRight, 
  ChevronRight,
  Baby,
  Sparkles
} from 'lucide-react';
import { DOCTORS, CLINICS, TREATMENTS } from '../constants';

export default function Booking() {
  const location = useLocation();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    treatment: '',
    doctor: '',
    clinic: '',
    date: '',
    time: ''
  });

  const [isRescheduling, setIsRescheduling] = useState(false);

  useEffect(() => {
    if (location.state?.rescheduleData) {
      setFormData(prev => ({
        ...prev,
        ...location.state.rescheduleData
      }));
      setIsRescheduling(true);
      // If we have enough data, we could skip to step 3
      if (location.state.rescheduleData.doctor && location.state.rescheduleData.clinic) {
        setStep(3);
      }
    }
  }, [location.state]);

  const timeSlots = ['09:00 AM', '10:30 AM', '12:00 PM', '02:30 PM', '04:00 PM', '05:30 PM'];

  // Get today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split('T')[0];

  const isTimeSlotValid = (timeStr: string) => {
    if (!formData.date) return true;
    if (formData.date > today) return true;
    
    // If today, check if time has passed
    const now = new Date();
    const [time, period] = timeStr.split(' ');
    let [hours, minutes] = time.split(':').map(Number);
    
    if (period === 'PM' && hours !== 12) hours += 12;
    if (period === 'AM' && hours === 12) hours = 0;
    
    const slotTime = new Date();
    slotTime.setHours(hours, minutes, 0, 0);
    
    return slotTime > now;
  };

  // Simulate some booked slots for demonstration
  const isSlotBooked = (time: string) => {
    // For demo: 12:00 PM is always "booked" on any date
    return time === '12:00 PM';
  };

  const handleNext = () => {
    if (step === 1 && (!formData.name || !formData.email || !formData.phone)) {
      alert('Please fill in all patient details');
      return;
    }
    if (step === 2 && (!formData.treatment || !formData.clinic || !formData.doctor)) {
      alert('Please select treatment, clinic, and doctor');
      return;
    }
    setStep(step + 1);
  };

  const handleBack = () => setStep(step - 1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.date || !formData.time) {
      alert('Please select a date and time');
      return;
    }
    setStep(4); // Success step
  };

  if (step === 4) {
    return (
      <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8 bg-slate-50 flex items-center justify-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full bg-white rounded-[3rem] shadow-2xl p-12 text-center border border-emerald-100"
        >
          <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl shadow-emerald-50">
            <CheckCircle2 className="text-emerald-600 w-10 h-10" />
          </div>
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Appointment Confirmed!</h2>
          <p className="text-slate-600 mb-8 leading-relaxed">
            Thank you, <span className="font-bold text-slate-900">{formData.name}</span>. Your consultation is scheduled for <span className="font-bold text-slate-900">{formData.date}</span> at <span className="font-bold text-slate-900">{formData.time}</span>.
          </p>
          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 text-left mb-8 space-y-4">
            {(() => {
              const doc = DOCTORS.find(d => d.id === formData.doctor);
              return (
                <div className="flex items-center gap-4 pb-4 border-b border-slate-200">
                  <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0 border border-emerald-100">
                    <img 
                      src={doc?.image} 
                      alt={doc?.name} 
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">Doctor</div>
                    <div className="text-sm font-bold text-slate-900">Dr. {doc?.name}</div>
                  </div>
                </div>
              );
            })()}
            <div className="flex items-center gap-3 text-sm">
              <MapPin className="w-4 h-4 text-emerald-600" />
              <span className="text-slate-700 font-medium">{CLINICS.find(c => c.id === formData.clinic)?.name}</span>
            </div>
          </div>
          <div className="space-y-4">
            <button 
              onClick={() => window.location.href = '/dashboard'}
              className="w-full bg-emerald-600 text-white py-4 rounded-2xl font-bold text-lg hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-100"
            >
              Go to Dashboard
            </button>
            <button 
              onClick={() => setStep(1)}
              className="w-full text-slate-500 font-bold text-sm hover:text-emerald-600 transition-colors"
            >
              Book Another Appointment
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8 bg-slate-50">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-900 mb-4 tracking-tight">
            {isRescheduling ? 'Reschedule Appointment' : 'Book a Consultation'}
          </h1>
          <p className="text-slate-600">
            {isRescheduling 
              ? 'Choose a new date and time for your appointment.' 
              : 'Take the first step towards your parenthood journey.'}
          </p>
        </div>

        <div className="bg-white rounded-[3rem] shadow-xl border border-slate-100 overflow-hidden flex flex-col md:flex-row">
          {/* Sidebar */}
          <div className="md:w-1/3 bg-emerald-900 p-10 text-white relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
              <Sparkles className="w-64 h-64 absolute -top-12 -left-12" />
            </div>
            <div className="relative z-10">
              <h2 className="text-2xl font-bold mb-8">Booking Process</h2>
              <div className="space-y-8">
                {[
                  { id: 1, title: 'Patient Info', icon: <User className="w-5 h-5" /> },
                  { id: 2, title: 'Treatment & Clinic', icon: <Baby className="w-5 h-5" /> },
                  { id: 3, title: 'Date & Time', icon: <Calendar className="w-5 h-5" /> },
                ].map((s) => (
                  <div key={s.id} className={`flex items-center gap-4 transition-opacity ${step >= s.id ? 'opacity-100' : 'opacity-40'}`}>
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${step === s.id ? 'bg-emerald-400 text-emerald-950' : 'bg-white/10 text-white'}`}>
                      {s.icon}
                    </div>
                    <span className="font-bold text-sm uppercase tracking-wider">{s.title}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="md:w-2/3 p-10 md:p-16">
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                {step === 1 && (
                  <div className="space-y-6">
                    <h3 className="text-2xl font-bold text-slate-900 mb-8">Patient Information</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Full Name</label>
                        <input 
                          type="text" 
                          value={formData.name}
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
                          placeholder="e.g. Sarah Johnson"
                          className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-200 outline-none focus:border-emerald-500 transition-all font-medium"
                        />
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Email Address</label>
                          <input 
                            type="email" 
                            value={formData.email}
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                            placeholder="sarah@example.com"
                            className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-200 outline-none focus:border-emerald-500 transition-all font-medium"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Phone Number</label>
                          <input 
                            type="tel" 
                            value={formData.phone}
                            onChange={(e) => setFormData({...formData, phone: e.target.value})}
                            placeholder="+91 98765 43210"
                            className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-200 outline-none focus:border-emerald-500 transition-all font-medium"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div className="space-y-6">
                    <h3 className="text-2xl font-bold text-slate-900 mb-8">Treatment & Clinic</h3>
                    <div className="space-y-6">
                      <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Select Treatment</label>
                        <select 
                          value={formData.treatment}
                          onChange={(e) => setFormData({...formData, treatment: e.target.value})}
                          className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-200 outline-none focus:border-emerald-500 transition-all font-medium"
                        >
                          <option value="">Select a treatment</option>
                          {TREATMENTS.map(t => <option key={t.id} value={t.id}>{t.title}</option>)}
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Select Clinic</label>
                        <select 
                          value={formData.clinic}
                          onChange={(e) => setFormData({...formData, clinic: e.target.value})}
                          className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-200 outline-none focus:border-emerald-500 transition-all font-medium"
                        >
                          <option value="">Select a clinic</option>
                          {CLINICS.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Preferred Doctor</label>
                        <select 
                          value={formData.doctor}
                          onChange={(e) => setFormData({...formData, doctor: e.target.value})}
                          className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-200 outline-none focus:border-emerald-500 transition-all font-medium"
                        >
                          <option value="">Select a doctor</option>
                          {DOCTORS.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
                        </select>
                      </div>
                    </div>
                  </div>
                )}

                {step === 3 && (
                  <div className="space-y-6">
                    <h3 className="text-2xl font-bold text-slate-900 mb-8">Date & Time</h3>
                    <div className="space-y-6">
                      <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Select Date</label>
                        <input 
                          type="date" 
                          min={today}
                          value={formData.date}
                          onChange={(e) => setFormData({...formData, date: e.target.value, time: ''})}
                          className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-200 outline-none focus:border-emerald-500 transition-all font-medium"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Select Time</label>
                        <div className="grid grid-cols-3 gap-3">
                          {timeSlots.map((t) => {
                            const isAvailable = isTimeSlotValid(t) && !isSlotBooked(t);
                            return (
                              <button
                                key={t}
                                type="button"
                                disabled={!isAvailable}
                                onClick={() => setFormData({...formData, time: t})}
                                className={`py-3 rounded-xl border-2 font-bold text-xs transition-all ${
                                  formData.time === t 
                                    ? 'border-emerald-600 bg-emerald-50 text-emerald-900' 
                                    : isAvailable 
                                      ? 'border-slate-100 bg-slate-50 text-slate-500 hover:border-emerald-200'
                                      : 'border-slate-50 bg-slate-100 text-slate-300 cursor-not-allowed opacity-50'
                                }`}
                              >
                                {t}
                                {!isAvailable && (
                                  <div className="text-[8px] mt-1 opacity-60">
                                    {isSlotBooked(t) ? 'Booked' : 'Passed'}
                                  </div>
                                )}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            <div className="mt-12 flex justify-between items-center pt-8 border-t border-slate-100">
              {step > 1 ? (
                <button onClick={handleBack} className="text-slate-500 font-bold hover:text-emerald-600 transition-colors">
                  Back
                </button>
              ) : <div />}
              
              <button
                onClick={step === 3 ? handleSubmit : handleNext}
                className="bg-emerald-600 text-white px-10 py-4 rounded-2xl font-bold text-lg hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-100 flex items-center gap-2"
              >
                {step === 3 ? (isRescheduling ? 'Confirm Reschedule' : 'Confirm Booking') : 'Continue'}
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
