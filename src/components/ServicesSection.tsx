import React, { useState, useRef } from 'react';
import { ArrowUpRight, ChevronDown, ChevronUp, Sparkles } from 'lucide-react';
import { clinicServices, type ClinicService } from '../data/services';

interface ServicesSectionProps {
  onBookService: (serviceName: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onBookService }) => {
  const [activeTab, setActiveTab] = useState<string>('all');
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const isCollapsingRef = useRef(false);

  // Dynamic unique categories from all services
  const categories = ['all', ...Array.from(new Set(clinicServices.map(s => s.category)))];

  const filteredServices = activeTab === 'all'
    ? clinicServices
    : clinicServices.filter(s => s.category === activeTab);

  // When 'all' is active, show only first 6 treatments by default unless expanded
  const displayedServices = (activeTab === 'all' && !isExpanded)
    ? filteredServices.slice(0, 6)
    : filteredServices;

  const handleToggleExpand = () => {
    if (isExpanded) {
      if (isCollapsingRef.current) return;
      isCollapsingRef.current = true;

      const sixthCard = document.getElementById('treatment-card-6');
      if (sixthCard) {
        sixthCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
        setTimeout(() => {
          setIsExpanded(false);
          isCollapsingRef.current = false;
        }, 500);
      } else {
        setIsExpanded(false);
        isCollapsingRef.current = false;
      }
    } else {
      setIsExpanded(true);
    }
  };

  return (
    <section id="treatments" className="relative w-full px-3 sm:px-6 md:px-8 lg:px-10 pt-12 sm:pt-20 pb-6 sm:pb-8">
      <div className="max-w-[1520px] mx-auto">
        
        {/* SECTION HEADER */}
        <div className="px-4 mb-8 sm:mb-12 flex flex-col lg:flex-row lg:items-end justify-between gap-6">
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
          <div className="flex flex-wrap items-center gap-2 max-w-2xl">
            {categories.map((cat) => {
              const isSelected = activeTab === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => {
                    setActiveTab(cat);
                  }}
                  className={`px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#5B9DE6] text-white shadow-md'
                      : 'bg-white text-slate-700 hover:bg-sky-50 border border-slate-200'
                  }`}
                >
                  {cat === 'all' ? 'All Treatments' : cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* SERVICES CARDS GRID — PRIMARY IMAGE CARD VIEW */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {displayedServices.map((service: ClinicService, index: number) => (
            <div
              key={service.id}
              id={index === 5 ? 'treatment-card-6' : undefined}
              className="relative rounded-[32px] sm:rounded-[40px] overflow-hidden text-white shadow-xl shadow-slate-950/20 flex flex-col justify-between p-7 sm:p-9 bg-slate-950 ring-1 ring-white/20 hover:ring-[#E5FE40]/50 hover:shadow-2xl transition-all duration-300 group h-[490px] sm:h-[510px]"
            >
              {/* FULL BLEED PROCEDURE IMAGE */}
              <img
                src={service.image}
                alt={`${service.title} clinical procedure`}
                className="absolute inset-0 w-full h-full object-cover object-center transform transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />

              {/* GRADIENT OVERLAY */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/65 to-slate-900/40" />

              {/* CARD TOP BAR */}
              <div className="relative z-10 flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full bg-slate-900/80 text-[#E5FE40] border border-[#E5FE40]/30 backdrop-blur-md flex items-center gap-1.5 shadow-md">
                  <Sparkles size={12} />
                  <span>PROCEDURE PHOTO</span>
                </span>

                <span className="text-[11px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full bg-white/20 text-white backdrop-blur-md border border-white/20">
                  {service.category}
                </span>
              </div>

              {/* CARD BOTTOM CONTENT & ACTIONS */}
              <div className="relative z-10 space-y-3">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#E5FE40] block mb-1">
                    {service.category}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-light tracking-tight text-white leading-tight">
                    {service.title}
                  </h3>
                </div>

                <p className="text-white/80 text-xs sm:text-sm leading-relaxed line-clamp-3">
                  {service.fullDesc}
                </p>

                {/* BOTTOM ACTION ROW */}
                <div className="pt-2 flex items-center justify-between gap-3">
                  <span className="text-xs text-white/75 font-medium flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#E5FE40]" />
                    State-of-the-art care
                  </span>

                  <button
                    type="button"
                    onClick={() => onBookService(service.title)}
                    className="px-5 py-2.5 rounded-full bg-[#E5FE40] text-slate-950 text-xs font-bold hover:bg-white hover:shadow-lg active:scale-95 transition-all cursor-pointer shadow-md flex items-center gap-1.5 flex-shrink-0"
                  >
                    <span>Book Treatment</span>
                    <ArrowUpRight size={14} />
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* SEE ALL / SHOW LESS TOGGLE OPTION */}
        {activeTab === 'all' && clinicServices.length > 6 && (
          <div className="mt-8 sm:mt-10 flex flex-col items-center justify-center text-center">
            {/* Visual counter and divider */}
            <div className="flex items-center gap-3 mb-4 text-xs font-semibold tracking-wider text-slate-500 uppercase">
              <span className="w-8 sm:w-16 h-px bg-slate-300" />
              <span>
                {isExpanded
                  ? `Showing all ${clinicServices.length} clinical treatments`
                  : `Showing 6 of ${clinicServices.length} treatments`}
              </span>
              <span className="w-8 sm:w-16 h-px bg-slate-300" />
            </div>

            {/* Primary Action Button */}
            <button
              type="button"
              onClick={handleToggleExpand}
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[#5B9DE6] text-white font-bold text-sm sm:text-base shadow-xl shadow-sky-900/15 hover:bg-[#4B8FE0] hover:shadow-2xl hover:shadow-sky-900/25 active:scale-95 transition-all cursor-pointer group ring-4 ring-sky-100"
              aria-expanded={isExpanded}
            >
              <span>
                {isExpanded ? 'Show Less Treatments' : 'See All Treatments'}
              </span>
              <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-[#E5FE40] group-hover:text-slate-900 transition-colors">
                {isExpanded ? (
                  <ChevronUp size={16} strokeWidth={2.5} className="transition-transform group-hover:-translate-y-0.5" />
                ) : (
                  <ChevronDown size={16} strokeWidth={2.5} className="transition-transform group-hover:translate-y-0.5" />
                )}
              </div>
            </button>

            <p className="text-xs text-slate-500 mt-3 max-w-md">
              {isExpanded
                ? 'Click to collapse back to featured treatments.'
                : 'Explore our complete suite of surgical, restorative, pediatric, and diagnostic dental treatments.'}
            </p>
          </div>
        )}

      </div>
    </section>
  );
};


