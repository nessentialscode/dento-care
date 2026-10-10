import React from 'react';
import { ArrowUpRight } from 'lucide-react';

interface DentalInsightsSectionProps {
  onNavigateBlog: () => void;
}

export const DentalInsightsSection: React.FC<DentalInsightsSectionProps> = ({ onNavigateBlog }) => {
  return (
    <section id="dental-insights" className="relative w-full px-3 sm:px-6 md:px-8 lg:px-10 py-4 sm:py-6">
      <div className="max-w-[1520px] mx-auto">
        {/* COMPACT SMALL CARD (BOTH DESKTOP & MOBILE) */}
        <div className="relative w-full bg-white rounded-[24px] sm:rounded-[32px] p-5 sm:p-7 md:p-8 border border-white/80 shadow-lg shadow-slate-900/5 overflow-hidden group">
          
          {/* Ambient soft glow */}
          <div className="absolute top-0 right-0 w-72 h-72 bg-[#5B9DE6]/10 rounded-full blur-2xl pointer-events-none -mr-10 -mt-10" />
          <div className="absolute bottom-0 left-0 w-60 h-60 bg-[#D8EEE1]/60 rounded-full blur-2xl pointer-events-none -ml-10 -mb-10" />

          <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-5 sm:gap-8">
            
            {/* LEFT: Eyebrow and Headline */}
            <div className="flex flex-col justify-center">
              <div className="inline-flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-[#3B82F6]" />
                <span className="text-[11px] sm:text-xs font-bold tracking-widest text-[#3B82F6] uppercase">
                  DENTAL INSIGHTS
                </span>
              </div>

              <h2 className="text-xl sm:text-2xl lg:text-[28px] font-light tracking-tight text-slate-900 leading-snug">
                Tips, Guides &amp; Expert Advice{' '}
                <span className="font-normal text-slate-900">for a Healthier Smile</span>
              </h2>
            </div>

            {/* RIGHT: CTA Button */}
            <div className="flex items-center flex-shrink-0">
              <a
                href="/blog"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigateBlog();
                }}
                className="group/cta inline-flex items-center gap-3 pl-5 pr-2 py-2 sm:pl-6 sm:pr-2 sm:py-2 rounded-full bg-[#0E1726] hover:bg-slate-800 text-white text-xs sm:text-sm font-semibold shadow-md shadow-slate-950/10 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 cursor-pointer"
              >
                <span>Read Our Dental Insights</span>
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#E5FE40] flex items-center justify-center text-slate-900 group-hover/cta:rotate-45 transition-transform duration-200">
                  <ArrowUpRight size={15} strokeWidth={2.6} />
                </div>
              </a>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
