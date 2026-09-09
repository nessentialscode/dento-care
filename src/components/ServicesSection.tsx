import React, { useState } from 'react';
import { ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { clinicServices, type ClinicService } from '../data/services';

interface ServicesSectionProps {
  onBookService: (serviceName: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onBookService }) => {
  const [activeTab, setActiveTab] = useState<string>('all');

  const categories = ['all', 'Restorative Surgery', 'Endodontics', 'Orthodontics', 'Cosmetic Dentistry', 'General Dentistry'];

  const filteredServices = activeTab === 'all'
    ? clinicServices
    : clinicServices.filter(s => s.category === activeTab);

  return (
    <section id="treatments" className="relative w-full px-3 sm:px-6 md:px-8 lg:px-10 py-12 sm:py-20">
      <div className="max-w-[1520px] mx-auto">
        
        {/* SECTION HEADER */}
        <div className="px-4 mb-8 sm:mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="w-2.5 h-2.5 rounded-full bg-[#3B82F6]" />
              <span className="text-xs sm:text-sm font-bold tracking-widest text-slate-600 uppercase">
                Clinical Excellence
              </span>
            </div>
            <h2 className="text-4xl sm:text-6xl font-light tracking-tight text-slate-900">
              Treatments & Care
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-2 max-w-xl">
              Precision dentistry delivered with microscopic accuracy, digital diagnostics, and uncompromising patient comfort.
            </p>
          </div>

          {/* CATEGORY PILL FILTER */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveTab(cat)}
                className={`px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                  activeTab === cat
                    ? 'bg-[#5B9DE6] text-white shadow-md'
                    : 'bg-white text-slate-700 hover:bg-sky-50 border border-slate-200'
                }`}
              >
                {cat === 'all' ? 'All Treatments' : cat}
              </button>
            ))}
          </div>
        </div>

        {/* SERVICES CARDS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredServices.map((service: ClinicService) => (
            <div
              key={service.id}
              className="relative bg-[#5B9DE6] rounded-[32px] sm:rounded-[40px] p-8 sm:p-10 flex flex-col justify-between text-white shadow-xl shadow-sky-900/15 overflow-hidden group hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 min-h-[420px]"
            >
              {/* Background gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#6AA7EE] via-[#5B9DE6] to-[#4B8FE0]" />

              {/* CARD TOP BAR */}
              <div className="relative z-10 flex items-center justify-between mb-4">
                <span className="text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-white/20 text-white backdrop-blur-md">
                  {service.category}
                </span>

                <div className="w-8 h-8 rounded-full bg-white text-slate-900 flex items-center justify-center group-hover:bg-[#E5FE40] group-hover:rotate-45 transition-all shadow-md">
                  <ArrowUpRight size={16} strokeWidth={2.4} />
                </div>
              </div>

              {/* MAIN CONTENT */}
              <div className="relative z-10 my-auto">
                <h3 className="text-3xl sm:text-4xl font-light tracking-tight text-white mb-3">
                  {service.title}
                </h3>
                <p className="text-white/85 text-xs sm:text-sm leading-relaxed mb-6">
                  {service.shortDesc}
                </p>

                {/* FEATURE HIGHLIGHTS */}
                <div className="space-y-2 mb-6">
                  {service.features.map((feat, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-white/90">
                      <CheckCircle2 size={14} className="text-[#E5FE40] flex-shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* CARD BOTTOM ACTION */}
              <div className="relative z-10 pt-4 border-t border-white/20 flex items-center justify-between">
                <span className="text-xs text-white/80 font-medium">
                  State-of-the-art procedure
                </span>
                <button
                  type="button"
                  onClick={() => onBookService(service.title)}
                  className="px-4 py-2 rounded-full bg-white text-slate-900 text-xs font-bold hover:bg-[#E5FE40] transition-colors cursor-pointer shadow-sm"
                >
                  Book Treatment
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
