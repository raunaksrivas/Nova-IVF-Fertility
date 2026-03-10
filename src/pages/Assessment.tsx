/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowRight, 
  ArrowLeft, 
  Sparkles, 
  Activity, 
  CheckCircle2, 
  Clock, 
  Stethoscope,
  ChevronRight,
  Calendar,
  Baby
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { getFertilityAssessment } from '../services/geminiService';

const steps = [
  { id: 'basic', title: 'Basic Info', icon: <Activity className="w-5 h-5" /> },
  { id: 'history', title: 'Medical History', icon: <Stethoscope className="w-5 h-5" /> },
  { id: 'lifestyle', title: 'Lifestyle', icon: <Sparkles className="w-5 h-5" /> },
  { id: 'goals', title: 'Your Goals', icon: <Baby className="w-5 h-5" /> },
];

export default function Assessment() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    age: '',
    gender: 'female',
    tryingFor: '',
    medicalHistory: [] as string[],
    previousTreatments: [] as string[],
    lifestyle: {
      smoking: 'no',
      alcohol: 'occasionally',
      exercise: 'regularly'
    },
    goals: 'conceive-naturally'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleSubmit();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    const assessment = await getFertilityAssessment(formData);
    setResult(assessment);
    setIsSubmitting(false);
  };

  const toggleHistory = (item: string) => {
    setFormData(prev => ({
      ...prev,
      medicalHistory: prev.medicalHistory.includes(item)
        ? prev.medicalHistory.filter(i => i !== item)
        : [...prev.medicalHistory, item]
    }));
  };

  if (result) {
    return (
      <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8 bg-slate-50">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mx-auto"
        >
          <div className="bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border border-emerald-100">
            <div className="bg-emerald-600 p-8 text-white text-center relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                <Sparkles className="w-96 h-96 absolute -top-24 -left-24" />
              </div>
              <div className="relative z-10">
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4 backdrop-blur-md">
                  <Sparkles className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-3xl font-bold mb-2">Your AI Assessment Report</h2>
                <p className="text-emerald-100">Personalized insights based on your profile.</p>
              </div>
            </div>

            <div className="p-8 md:p-12 space-y-10">
              <section>
                <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <Activity className="text-emerald-600 w-5 h-5" />
                  Assessment Summary
                </h3>
                <div className="p-6 bg-emerald-50 rounded-2xl border border-emerald-100 text-slate-700 leading-relaxed">
                  {result.assessment}
                </div>
              </section>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <section>
                  <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <CheckCircle2 className="text-emerald-600 w-5 h-5" />
                    Recommended Treatments
                  </h3>
                  <ul className="space-y-3">
                    {result.recommendations.map((rec: string, i: number) => (
                      <li key={i} className="flex items-start gap-3 text-slate-600 text-sm">
                        <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center shrink-0 mt-0.5">
                          <div className="w-2 h-2 rounded-full bg-emerald-600" />
                        </div>
                        {rec}
                      </li>
                    ))}
                  </ul>
                </section>

                <section>
                  <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <Clock className="text-emerald-600 w-5 h-5" />
                    Urgency & Next Steps
                  </h3>
                  <div className="mb-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                      result.urgency === 'High' ? 'bg-rose-100 text-rose-700' :
                      result.urgency === 'Medium' ? 'bg-amber-100 text-amber-700' :
                      'bg-emerald-100 text-emerald-700'
                    }`}>
                      Priority: {result.urgency}
                    </span>
                  </div>
                  <ul className="space-y-3">
                    {result.nextSteps.map((step: string, i: number) => (
                      <li key={i} className="flex items-start gap-3 text-slate-600 text-sm">
                        <ChevronRight className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        {step}
                      </li>
                    ))}
                  </ul>
                </section>
              </div>

              <div className="pt-8 border-t border-slate-100 flex flex-col sm:flex-row gap-4">
                <Link
                  to="/booking"
                  className="flex-1 bg-emerald-600 text-white text-center py-4 rounded-2xl font-bold text-lg hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-100"
                >
                  Book Priority Consultation
                </Link>
                <button
                  onClick={() => setResult(null)}
                  className="flex-1 bg-white text-emerald-900 border-2 border-emerald-100 text-center py-4 rounded-2xl font-bold text-lg hover:bg-emerald-50 transition-all"
                >
                  Retake Assessment
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8 bg-slate-50 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
        <div className="absolute top-1/4 -right-20 w-96 h-96 bg-emerald-400 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-emerald-600 rounded-full blur-3xl" />
      </div>

      <div className="max-w-3xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-900 mb-4 tracking-tight">AI Fertility Assessment</h1>
          <p className="text-slate-600">Answer a few questions to receive a personalized fertility report.</p>
        </div>

        {/* Progress Bar */}
        <div className="flex justify-between mb-12 relative">
          <div className="absolute top-1/2 left-0 w-full h-1 bg-slate-200 -translate-y-1/2 z-0" />
          <div 
            className="absolute top-1/2 left-0 h-1 bg-emerald-600 -translate-y-1/2 z-0 transition-all duration-500" 
            style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
          />
          {steps.map((step, i) => (
            <div key={step.id} className="relative z-10 flex flex-col items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 ${
                i <= currentStep ? 'bg-emerald-600 text-white scale-110' : 'bg-white text-slate-400 border-2 border-slate-200'
              }`}>
                {step.icon}
              </div>
              <span className={`text-[10px] font-bold uppercase tracking-widest mt-2 ${
                i <= currentStep ? 'text-emerald-700' : 'text-slate-400'
              }`}>
                {step.title}
              </span>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-[2.5rem] shadow-xl border border-slate-100 p-8 md:p-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="min-h-[300px]"
            >
              {currentStep === 0 && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-slate-900 mb-6">Tell us about yourself</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">Your Age</label>
                      <input 
                        type="number" 
                        value={formData.age}
                        onChange={(e) => setFormData({...formData, age: e.target.value})}
                        placeholder="e.g. 32"
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">Gender</label>
                      <select 
                        value={formData.gender}
                        onChange={(e) => setFormData({...formData, gender: e.target.value})}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                      >
                        <option value="female">Female</option>
                        <option value="male">Male</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">How long have you been trying to conceive?</label>
                    <select 
                      value={formData.tryingFor}
                      onChange={(e) => setFormData({...formData, tryingFor: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                    >
                      <option value="">Select duration</option>
                      <option value="not-started">Not started yet</option>
                      <option value="less-6-months">Less than 6 months</option>
                      <option value="6-12-months">6 - 12 months</option>
                      <option value="1-2-years">1 - 2 years</option>
                      <option value="more-2-years">More than 2 years</option>
                    </select>
                  </div>
                </div>
              )}

              {currentStep === 1 && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-slate-900 mb-6">Medical History</h2>
                  <p className="text-slate-500 text-sm mb-4">Select any conditions that apply to you:</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {['PCOS', 'Endometriosis', 'Irregular Periods', 'Thyroid Issues', 'Diabetes', 'Previous Surgery'].map((item) => (
                      <button
                        key={item}
                        onClick={() => toggleHistory(item)}
                        className={`p-4 rounded-2xl border-2 text-left transition-all ${
                          formData.medicalHistory.includes(item)
                            ? 'border-emerald-600 bg-emerald-50 text-emerald-900'
                            : 'border-slate-100 bg-slate-50 text-slate-600 hover:border-emerald-200'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-bold">{item}</span>
                          {formData.medicalHistory.includes(item) && <CheckCircle2 className="w-5 h-5 text-emerald-600" />}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {currentStep === 2 && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-slate-900 mb-6">Lifestyle Factors</h2>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-3">Smoking Habits</label>
                      <div className="flex gap-4">
                        {['no', 'occasionally', 'regularly'].map((opt) => (
                          <button
                            key={opt}
                            onClick={() => setFormData({...formData, lifestyle: {...formData.lifestyle, smoking: opt}})}
                            className={`flex-1 py-3 rounded-xl border-2 capitalize font-bold ${
                              formData.lifestyle.smoking === opt ? 'border-emerald-600 bg-emerald-50 text-emerald-900' : 'border-slate-100 bg-slate-50 text-slate-500'
                            }`}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-3">Exercise Frequency</label>
                      <div className="flex gap-4">
                        {['rarely', 'regularly', 'athlete'].map((opt) => (
                          <button
                            key={opt}
                            onClick={() => setFormData({...formData, lifestyle: {...formData.lifestyle, exercise: opt}})}
                            className={`flex-1 py-3 rounded-xl border-2 capitalize font-bold ${
                              formData.lifestyle.exercise === opt ? 'border-emerald-600 bg-emerald-50 text-emerald-900' : 'border-slate-100 bg-slate-50 text-slate-500'
                            }`}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 3 && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-slate-900 mb-6">Your Goals</h2>
                  <div className="space-y-4">
                    {[
                      { id: 'conceive-naturally', title: 'Conceive Naturally', desc: 'I want to optimize my health for natural conception.' },
                      { id: 'start-ivf', title: 'Start IVF/Treatment', desc: 'I am ready to explore assisted reproductive technologies.' },
                      { id: 'freeze-eggs', title: 'Freeze My Eggs', desc: 'I want to preserve my fertility for the future.' },
                      { id: 'donor-options', title: 'Explore Donor Options', desc: 'I am interested in egg or sperm donation programs.' }
                    ].map((goal) => (
                      <button
                        key={goal.id}
                        onClick={() => setFormData({...formData, goals: goal.id})}
                        className={`w-full p-6 rounded-2xl border-2 text-left transition-all ${
                          formData.goals === goal.id
                            ? 'border-emerald-600 bg-emerald-50'
                            : 'border-slate-100 bg-slate-50 hover:border-emerald-200'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-bold text-slate-900">{goal.title}</span>
                          {formData.goals === goal.id && <CheckCircle2 className="w-5 h-5 text-emerald-600" />}
                        </div>
                        <p className="text-sm text-slate-500">{goal.desc}</p>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          <div className="mt-12 flex justify-between items-center pt-8 border-t border-slate-100">
            <button
              onClick={handleBack}
              disabled={currentStep === 0}
              className={`flex items-center gap-2 font-bold ${
                currentStep === 0 ? 'text-slate-300 cursor-not-allowed' : 'text-slate-500 hover:text-emerald-600'
              }`}
            >
              <ArrowLeft className="w-5 h-5" />
              Back
            </button>
            <button
              onClick={handleNext}
              disabled={isSubmitting}
              className="bg-emerald-600 text-white px-10 py-4 rounded-2xl font-bold text-lg hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-100 disabled:opacity-50 flex items-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  {currentStep === steps.length - 1 ? 'Get AI Assessment' : 'Next Step'}
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
