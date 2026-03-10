/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Calendar, 
  Clock, 
  FileText, 
  MessageSquare, 
  Send, 
  User, 
  Activity, 
  ChevronRight,
  Bell,
  Settings,
  Baby,
  Sparkles,
  X,
  Edit2,
  Phone,
  Mail,
  Fingerprint
} from 'lucide-react';
import { chatWithAssistant } from '../services/geminiService';
import { DOCTORS } from '../constants';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const { user, profile, loading, updateProfile } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editForm, setEditForm] = useState({
    displayName: '',
    phone: '',
    dob: '',
    gender: 'Female'
  });
  const [isSaving, setIsSaving] = useState(false);

  const [messages, setMessages] = useState([
    { role: 'assistant', text: "Hello! I'm your Nova IVF fertility companion. How can I help you today?" }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!loading && !user) {
      navigate('/login');
    }
    if (profile) {
      setEditForm({
        displayName: profile.displayName || '',
        phone: profile.phone || '',
        dob: profile.dob || '',
        gender: 'Female'
      });
    }
  }, [user, loading, navigate, profile]);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await updateProfile(editForm);
      setIsEditModalOpen(false);
    } catch (error) {
      console.error('Error updating profile:', error);
    } finally {
      setIsSaving(false);
    }
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim()) return;
    
    const userMessage = { role: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    const response = await chatWithAssistant(input, messages);
    setMessages(prev => [...prev, { role: 'assistant', text: response || "I'm sorry, I couldn't process that." }]);
    setIsTyping(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="w-12 h-12 border-4 border-emerald-600/30 border-t-emerald-600 rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) return null;

  const journeySteps = [
    { title: 'Initial Consultation', status: 'completed', date: 'Oct 12, 2025' },
    { title: 'Fertility Assessment', status: 'completed', date: 'Oct 25, 2025' },
    { title: 'Treatment Planning', status: 'active', date: 'In Progress' },
    { title: 'Cycle Start', status: 'upcoming', date: 'TBD' },
    { title: 'Procedure', status: 'upcoming', date: 'TBD' },
  ];

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8 bg-slate-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Welcome back, {profile?.displayName?.split(' ')[0] || 'Sarah'}</h1>
            <p className="text-slate-500">Your fertility journey is our priority.</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="p-2 rounded-xl bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 transition-all relative">
              <Bell className="w-5 h-5" />
              <div className="absolute top-2 right-2 w-2 h-2 bg-emerald-500 rounded-full border-2 border-white" />
            </button>
            <button className="p-2 rounded-xl bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 transition-all">
              <Settings className="w-5 h-5" />
            </button>
            {profile?.photoURL ? (
              <img src={profile.photoURL} alt="Profile" className="w-10 h-10 rounded-full border-2 border-emerald-100" />
            ) : (
              <div className="w-10 h-10 rounded-full bg-emerald-600 flex items-center justify-center text-white font-bold">
                {profile?.displayName?.charAt(0) || user.email?.charAt(0).toUpperCase()}
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Journey Tracker */}
            <section className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-xl font-bold text-slate-900">Your Journey</h2>
                <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full uppercase tracking-wider">
                  Phase 2: Planning
                </span>
              </div>
              
              <div className="relative flex justify-between">
                <div className="absolute top-5 left-0 w-full h-0.5 bg-slate-100 -z-0" />
                {journeySteps.map((step, i) => (
                  <div key={i} className="relative z-10 flex flex-col items-center text-center max-w-[100px]">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-3 transition-all ${
                      step.status === 'completed' ? 'bg-emerald-600 text-white' :
                      step.status === 'active' ? 'bg-white border-4 border-emerald-600 text-emerald-600 scale-110' :
                      'bg-white border-2 border-slate-200 text-slate-300'
                    }`}>
                      {step.status === 'completed' ? <Activity className="w-5 h-5" /> : (i + 1)}
                    </div>
                    <div className={`text-[10px] font-bold uppercase mb-1 ${
                      step.status === 'upcoming' ? 'text-slate-400' : 'text-slate-900'
                    }`}>
                      {step.title}
                    </div>
                    <div className="text-[10px] text-slate-400">{step.date}</div>
                  </div>
                ))}
              </div>
            </section>

            {/* Basic Information Section */}
            <section className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600">
                    <User className="w-5 h-5" />
                  </div>
                  <h2 className="text-xl font-bold text-slate-900">Basic Information</h2>
                </div>
                <button 
                  onClick={() => setIsEditModalOpen(true)}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-50 text-slate-600 hover:bg-emerald-50 hover:text-emerald-600 transition-all text-sm font-bold"
                >
                  <Edit2 className="w-4 h-4" />
                  Edit Profile
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50/50 border border-slate-100">
                    <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-slate-400 shadow-sm">
                      <Fingerprint className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Login ID</div>
                      <div className="text-sm font-mono text-slate-700">{user.uid.substring(0, 12)}...</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50/50 border border-slate-100">
                    <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-slate-400 shadow-sm">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Email Address</div>
                      <div className="text-sm font-bold text-slate-700">{user.email}</div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-2xl bg-slate-50/50 border border-slate-100">
                      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Gender</div>
                      <div className="text-sm font-bold text-emerald-600 flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-emerald-500" />
                        {profile?.gender || 'Female'}
                      </div>
                    </div>
                    <div className="p-4 rounded-2xl bg-slate-50/50 border border-slate-100">
                      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Date of Birth</div>
                      <div className="text-sm font-bold text-slate-700">{profile?.dob || 'Not set'}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50/50 border border-slate-100">
                    <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-slate-400 shadow-sm">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Phone Number</div>
                      <div className="text-sm font-bold text-slate-700">{profile?.phone || 'Not set'}</div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Upcoming Appointments */}
              <section className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-lg font-bold text-slate-900">Appointments</h2>
                  <button className="text-emerald-600 text-xs font-bold hover:underline">View All</button>
                </div>
                <div className="space-y-4">
                  {(() => {
                    const doc = DOCTORS.find(d => d.name === 'Dr. Anjali Sharma');
                    const appointmentData = {
                      name: profile?.displayName || 'Sarah Johnson',
                      email: user.email || '',
                      phone: profile?.phone || '',
                      treatment: 'ivf',
                      doctor: doc?.id || '',
                      clinic: 'mumbai-central',
                      date: '2026-03-15',
                      time: '10:30 AM'
                    };
                    return (
                      <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-center gap-4 group relative">
                        <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0 border border-emerald-100">
                          <img 
                            src={doc?.image} 
                            alt={doc?.name} 
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                        <div className="flex-1">
                          <div className="text-sm font-bold text-slate-900">Consultation</div>
                          <div className="text-xs text-slate-500">{doc?.name} • 10:30 AM</div>
                        </div>
                        <button 
                          onClick={() => navigate('/booking', { state: { rescheduleData: appointmentData } })}
                          className="opacity-0 group-hover:opacity-100 transition-opacity bg-white text-emerald-600 text-[10px] font-bold px-3 py-1.5 rounded-lg border border-emerald-100 hover:bg-emerald-50"
                        >
                          Reschedule
                        </button>
                        <ChevronRight className="w-4 h-4 text-slate-300 group-hover:hidden" />
                      </div>
                    );
                  })()}
                  <div 
                    onClick={() => navigate('/booking')}
                    className="p-4 rounded-2xl border border-dashed border-slate-200 flex items-center justify-center text-slate-400 hover:bg-slate-50 transition-all cursor-pointer"
                  >
                    <span className="text-xs font-bold">+ Schedule New</span>
                  </div>
                </div>
              </section>

              {/* Medical Records */}
              <section className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-lg font-bold text-slate-900">Medical Records</h2>
                  <button className="text-emerald-600 text-xs font-bold hover:underline">Upload</button>
                </div>
                <div className="space-y-3">
                  {[
                    { name: 'Blood_Report_Oct.pdf', size: '1.2 MB' },
                    { name: 'Ultrasound_Scan.jpg', size: '4.5 MB' },
                  ].map((file, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 transition-all cursor-pointer group">
                      <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center text-slate-500 group-hover:bg-emerald-100 group-hover:text-emerald-600 transition-all">
                        <FileText className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <div className="text-xs font-bold text-slate-900">{file.name}</div>
                        <div className="text-[10px] text-slate-400">{file.size}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* AI Insights Card */}
            <section className="bg-emerald-900 p-8 rounded-[2.5rem] text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16" />
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-4">
                  <Sparkles className="w-5 h-5 text-emerald-400" />
                  <span className="text-xs font-bold uppercase tracking-widest">AI Insights</span>
                </div>
                <h3 className="text-xl font-bold mb-4">Optimizing Your Cycle</h3>
                <p className="text-emerald-100/80 text-sm leading-relaxed mb-6">
                  Based on your recent reports, we recommend increasing your folic acid intake and scheduling a follow-up scan by next Tuesday.
                </p>
                <button className="w-full py-3 bg-emerald-400 text-emerald-950 rounded-xl font-bold text-sm hover:bg-emerald-300 transition-all">
                  View Full Report
                </button>
              </div>
            </section>

            {/* Quick Actions */}
            <section className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100">
              <h2 className="text-lg font-bold text-slate-900 mb-6">Quick Actions</h2>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: <Calendar className="w-5 h-5" />, label: 'Reschedule', color: 'bg-blue-50 text-blue-600', onClick: () => navigate('/booking', { state: { rescheduleData: {
                    name: profile?.displayName || 'Sarah Johnson',
                    email: user.email || '',
                    phone: profile?.phone || '',
                    treatment: 'ivf',
                    doctor: DOCTORS[0].id,
                    clinic: 'mumbai-central',
                    date: '2026-03-15',
                    time: '10:30 AM'
                  } } }) },
                  { icon: <MessageSquare className="w-5 h-5" />, label: 'Chat Support', color: 'bg-purple-50 text-purple-600', onClick: () => setIsChatOpen(true) },
                  { icon: <Activity className="w-5 h-5" />, label: 'Health Log', color: 'bg-rose-50 text-rose-600', onClick: () => {} },
                  { icon: <Baby className="w-5 h-5" />, label: 'Resources', color: 'bg-amber-50 text-amber-600', onClick: () => {} },
                ].map((action, i) => (
                  <button 
                    key={i} 
                    onClick={action.onClick}
                    className="flex flex-col items-center gap-2 p-4 rounded-2xl hover:bg-slate-50 transition-all"
                  >
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${action.color}`}>
                      {action.icon}
                    </div>
                    <span className="text-[10px] font-bold text-slate-600 uppercase tracking-wider">{action.label}</span>
                  </button>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>

      {/* Floating Chat Widget */}
      <div className="fixed bottom-8 right-8 z-[100]">
        <AnimatePresence>
          {isChatOpen && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              className="absolute bottom-20 right-0 w-[350px] h-[500px] bg-white rounded-[2rem] shadow-2xl border border-slate-100 flex flex-col overflow-hidden"
            >
              <div className="bg-emerald-600 p-6 text-white flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-md">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-bold">Nova IVF AI</div>
                    <div className="text-[10px] text-emerald-100">Online • Fertility Companion</div>
                  </div>
                </div>
                <button onClick={() => setIsChatOpen(false)} className="p-1 hover:bg-white/10 rounded-lg">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {messages.map((msg, i) => (
                  <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[80%] p-4 rounded-2xl text-sm ${
                      msg.role === 'user' 
                        ? 'bg-emerald-600 text-white rounded-tr-none' 
                        : 'bg-slate-100 text-slate-700 rounded-tl-none'
                    }`}>
                      {msg.text}
                    </div>
                  </div>
                ))}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-slate-100 p-4 rounded-2xl rounded-tl-none flex gap-1">
                      <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" />
                      <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                      <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:0.4s]" />
                    </div>
                  </div>
                )}
                <div ref={chatEndRef} />
              </div>

              <div className="p-4 border-t border-slate-100 flex gap-2">
                <input 
                  type="text" 
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Ask Nova anything..."
                  className="flex-1 px-4 py-2 rounded-xl bg-slate-50 border border-slate-200 outline-none focus:border-emerald-500 text-sm"
                />
                <button 
                  onClick={handleSendMessage}
                  className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center hover:bg-emerald-700 transition-all"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <button 
          onClick={() => setIsChatOpen(!isChatOpen)}
          className="w-16 h-16 rounded-full bg-emerald-600 text-white shadow-2xl flex items-center justify-center hover:scale-110 transition-all active:scale-95"
        >
          {isChatOpen ? <X className="w-8 h-8" /> : <MessageSquare className="w-8 h-8" />}
        </button>
      </div>

      {/* Edit Profile Modal */}
      <AnimatePresence>
        {isEditModalOpen && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsEditModalOpen(false)}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-lg bg-white rounded-[2.5rem] shadow-2xl overflow-hidden"
            >
              <div className="p-8 border-b border-slate-100 flex justify-between items-center">
                <h3 className="text-xl font-bold text-slate-900">Edit Basic Information</h3>
                <button 
                  onClick={() => setIsEditModalOpen(false)}
                  className="p-2 hover:bg-slate-100 rounded-xl transition-colors"
                >
                  <X className="w-5 h-5 text-slate-400" />
                </button>
              </div>

              <form onSubmit={handleUpdateProfile} className="p-8 space-y-6">
                <div className="grid grid-cols-1 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Full Name</label>
                    <input 
                      type="text"
                      required
                      value={editForm.displayName}
                      onChange={(e) => setEditForm(prev => ({ ...prev, displayName: e.target.value }))}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-emerald-500 outline-none transition-all"
                      placeholder="Your full name"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">Gender</label>
                      <select 
                        disabled
                        value={editForm.gender}
                        className="w-full px-4 py-3 rounded-xl bg-slate-100 border border-slate-200 text-slate-500 cursor-not-allowed"
                      >
                        <option value="Female">Female</option>
                      </select>
                      <p className="text-[10px] text-slate-400 mt-1 italic">* Restricted to Female for fertility tracking</p>
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">Date of Birth</label>
                      <input 
                        type="date"
                        value={editForm.dob}
                        onChange={(e) => setEditForm(prev => ({ ...prev, dob: e.target.value }))}
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-emerald-500 outline-none transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Phone Number</label>
                    <input 
                      type="tel"
                      value={editForm.phone}
                      onChange={(e) => setEditForm(prev => ({ ...prev, phone: e.target.value }))}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-emerald-500 outline-none transition-all"
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>
                </div>

                <div className="pt-4 flex gap-3">
                  <button 
                    type="button"
                    onClick={() => setIsEditModalOpen(false)}
                    className="flex-1 py-4 rounded-2xl font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-all"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    disabled={isSaving}
                    className="flex-1 py-4 rounded-2xl font-bold text-white bg-emerald-600 hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-200 disabled:opacity-70 flex items-center justify-center gap-2"
                  >
                    {isSaving ? (
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      'Save Changes'
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
