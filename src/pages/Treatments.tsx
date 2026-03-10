/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { TREATMENTS } from '../constants';
import { Baby, Microscope, Snowflake, Syringe, ChevronRight, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const iconMap: Record<string, any> = {
  Baby: <Baby className="w-8 h-8" />,
  Microscope: <Microscope className="w-8 h-8" />,
  Snowflake: <Snowflake className="w-8 h-8" />,
  Syringe: <Syringe className="w-8 h-8" />
};

export default function Treatments() {
  return (
    <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8 bg-slate-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-4 tracking-tight">Our Treatments</h1>
          <p className="text-slate-600 max-w-2xl mx-auto">World-class fertility solutions tailored to your unique biological profile.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {TREATMENTS.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white p-10 rounded-[3rem] shadow-sm border border-slate-100 hover:shadow-xl hover:border-emerald-100 transition-all group"
            >
              <div className="flex flex-col md:flex-row gap-8">
                <div className="w-20 h-20 rounded-3xl bg-emerald-50 flex items-center justify-center text-emerald-600 shrink-0 group-hover:scale-110 transition-transform">
                  {iconMap[t.icon]}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-4">
                    <h2 className="text-2xl font-bold text-slate-900">{t.title}</h2>
                    <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full uppercase tracking-wider">
                      Success: {t.successRate}
                    </span>
                  </div>
                  <p className="text-slate-600 mb-8 leading-relaxed">
                    {t.description} Our advanced protocols ensure the highest standards of care and clinical excellence for every patient.
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <Link
                      to="/booking"
                      className="bg-emerald-600 text-white px-6 py-3 rounded-2xl font-bold text-sm hover:bg-emerald-700 transition-all flex items-center gap-2"
                    >
                      Book Consultation <ArrowRight className="w-4 h-4" />
                    </Link>
                    <button className="text-slate-600 font-bold text-sm px-6 py-3 rounded-2xl border border-slate-200 hover:bg-slate-50 transition-all">
                      Learn More
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Services */}
        <div className="mt-24 bg-emerald-900 rounded-[3rem] p-12 md:p-20 text-white">
          <div className="max-w-3xl">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">Advanced Diagnostics</h2>
            <p className="text-emerald-100/80 mb-8 leading-relaxed">
              We offer a full suite of diagnostic tests including Genetic Testing (PGT), Male Infertility Assessment, and Endoscopy to ensure we have the complete picture before starting treatment.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {['Genetic Testing (PGT)', 'Laparoscopy', 'Hysteroscopy', 'Semen Analysis'].map((item) => (
                <div key={item} className="flex items-center gap-3 text-emerald-400 font-bold">
                  <ChevronRight className="w-4 h-4" />
                  <span className="text-white">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
