import React from 'react';
import { ArrowUpRight, Sparkles } from 'lucide-react';

interface EditorialGridSectionProps {
  onBookClick: () => void;
  onServiceClick: (serviceId: string) => void;
  onDoctorClick: () => void;
}

export const EditorialGridSection: React.FC<EditorialGridSectionProps> = ({
  onBookClick,
  onServiceClick,
  onDoctorClick,
}) => {
  return (
    <section className="relative w-full px-3 sm:px-6 md:px-8 lg:px-10 py-12 sm:py-20">
      <div className="max-w-[1680px] 2xl:max-w-[1760px] mx-auto">
        
        {/* SECTION HEADER TAG */}
        <div className="flex items-center justify-between mb-8 sm:mb-12 px-4">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-[#3B82F6]" />
            <span className="text-xs sm:text-sm font-bold tracking-widest text-slate-600 uppercase">
              Advanced dentistry, designed around you
            </span>
          </div>
          <div className="hidden sm:flex items-center gap-2 text-xs font-semibold text-slate-500">
            <Sparkles size={14} className="text-[#3B82F6]" />
            <span>Digital Precision & Clinical Mastery</span>
          </div>
        </div>

        {/* UNIFIED ASYMMETRIC GRID MATCHING REFERENCE IMAGE 2 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 lg:grid-rows-2 gap-6 sm:gap-8">
          
          {/* 1. LEFT CARD: WHY CHOOSE DENTO CARE (Spans 5 cols, 2 rows) */}
          <div className="lg:col-span-5 lg:row-span-2 relative w-full h-full min-h-[580px] sm:min-h-[640px] bg-[#5B9DE6] rounded-[34px] sm:rounded-[44px] p-7 sm:p-9 lg:p-11 flex flex-col justify-between overflow-hidden shadow-xl shadow-sky-950/15 group">
            
            {/* Background ambient lighting */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#68A7ED] via-[#5B9DE6] to-[#488FD8]" />

            {/* Subtle decorative glow orb */}
            <div className="absolute top-1/3 -right-16 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none" />

            {/* TOP HEADER / PILL BADGE */}
            <div className="relative z-20 flex items-center justify-between w-full">
              <span className="px-3.5 py-1.5 rounded-full bg-white/20 text-white text-[11px] sm:text-xs font-bold tracking-wider uppercase backdrop-blur-md border border-white/20 shadow-sm flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#E5FE40]" />
                WHY CHOOSE DENTO CARE
              </span>
              <button
                type="button"
                onClick={onBookClick}
                aria-label="Book appointment"
                className="w-9 h-9 rounded-full bg-white/20 text-white flex items-center justify-center backdrop-blur-md border border-white/20 hover:bg-[#E5FE40] hover:text-slate-900 transition-all duration-300 shadow-sm cursor-pointer"
              >
                <Sparkles size={16} />
              </button>
            </div>

            {/* MAIN EDITORIAL HEADLINE & VISUAL COMPOSITION */}
            <div className="relative z-20 my-auto py-2 sm:py-3 flex flex-col justify-between flex-grow">
              <div>
                <h3 className="text-white text-3xl sm:text-4xl lg:text-[40px] xl:text-[44px] font-light tracking-[-0.035em] leading-[1.05]">
                  Why patients<br />
                  <span className="font-normal text-white">choose Dento Care</span>
                </h3>
                <p className="text-white/85 text-xs sm:text-sm font-medium mt-2 max-w-sm leading-relaxed">
                  Precision digital dentistry delivered with personalized care, painless techniques, and lasting clinical outcomes.
                </p>
              </div>

              {/* ASYMMETRIC COMPOSITION: PATIENT SHOWING TEETH + 4 COHESIVE TRUST STAT CARDS */}
              <div className="relative w-full my-3 sm:my-4">
                
                {/* CENTRAL PROMINENT DENTAL VISUAL: 3-PATIENT JOURNEY TRIO (NO square card container) */}
                <div className="relative w-full flex items-center justify-center py-1 sm:py-2">
                  <div className="relative w-full max-w-[480px] sm:max-w-[520px] md:max-w-[560px] flex items-center justify-center pointer-events-none">
                    <img
                      src="/images/patients-trio.png"
                      alt="Three patient stages: damaged teeth on right, dental pain in middle, restored perfect smile on left"
                      className="relative z-10 w-full h-auto object-contain drop-shadow-[0_16px_32px_rgba(0,0,0,0.25)] transform group-hover:scale-[1.02] transition-transform duration-500"
                    />
                  </div>
                </div>

                {/* 4 UNIFIED, NEAT & PROFESSIONAL TRUST CARDS */}
                <div className="grid grid-cols-2 gap-2.5 sm:gap-3.5 relative z-20 mt-2 sm:mt-3">
                  
                  {/* 1. 15k+ Happy Patients */}
                  <div className="bg-white rounded-2xl p-3 sm:p-3.5 shadow-lg shadow-sky-950/15 border border-white/95 hover:-translate-y-0.5 transition-all duration-300 flex flex-col justify-between">
                    <div>
                      <div className="text-2xl sm:text-3xl font-extrabold text-[#2563EB] tracking-tight leading-none">
                        15k+
                      </div>
                      <div className="text-xs sm:text-[13px] font-bold text-slate-900 leading-tight mt-1.5">
                        Happy Patients
                      </div>
                    </div>
                    <div className="text-[10px] sm:text-[10.5px] font-medium text-slate-500 mt-1">
                      Lifetime Smile Care
                    </div>
                  </div>

                  {/* 2. 4.9 ★ Google Rating */}
                  <div className="bg-white rounded-2xl p-3 sm:p-3.5 shadow-lg shadow-sky-950/15 border border-white/95 hover:-translate-y-0.5 transition-all duration-300 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-1">
                        <span className="text-2xl sm:text-3xl font-extrabold text-[#2563EB] tracking-tight leading-none">
                          4.9
                        </span>
                        <div className="flex text-amber-400 text-xs">
                          <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
                        </div>
                      </div>
                      <div className="text-xs sm:text-[13px] font-bold text-slate-900 leading-tight mt-1.5">
                        Google Rating
                      </div>
                    </div>
                    <div className="text-[10px] sm:text-[10.5px] font-medium text-slate-500 mt-1">
                      500+ Verified Reviews
                    </div>
                  </div>

                  {/* 3. 100% Painless Tech */}
                  <div className="bg-white rounded-2xl p-3 sm:p-3.5 shadow-lg shadow-sky-950/15 border border-white/95 hover:-translate-y-0.5 transition-all duration-300 flex flex-col justify-between">
                    <div>
                      <div className="text-2xl sm:text-3xl font-extrabold text-[#2563EB] tracking-tight leading-none">
                        100%
                      </div>
                      <div className="text-xs sm:text-[13px] font-bold text-slate-900 leading-tight mt-1.5">
                        Painless Care
                      </div>
                    </div>
                    <div className="text-[10px] sm:text-[10.5px] font-medium text-slate-500 mt-1">
                      Digital 3D Guided Scanning
                    </div>
                  </div>

                  {/* 4. Top Tier Senior Faculty */}
                  <div className="bg-white rounded-2xl p-3 sm:p-3.5 shadow-lg shadow-sky-950/15 border border-white/95 hover:-translate-y-0.5 transition-all duration-300 flex flex-col justify-between">
                    <div>
                      <div className="text-2xl sm:text-3xl font-extrabold text-[#2563EB] tracking-tight leading-none">
                        Top Tier
                      </div>
                      <div className="text-xs sm:text-[13px] font-bold text-slate-900 leading-tight mt-1.5">
                        Senior Specialists
                      </div>
                    </div>
                    <div className="text-[10px] sm:text-[10.5px] font-medium text-slate-500 mt-1">
                      MES Dental College Faculty
                    </div>
                  </div>

                </div>

              </div>

            </div>

            {/* BOTTOM TAGLINE / CLINICAL NOTE */}
            <div className="relative z-20 flex items-center gap-2.5 pt-2 text-white/90 text-xs font-medium border-t border-white/15">
              <span className="w-2 h-2 rounded-full bg-[#E5FE40]" />
              <span>Certified ISO 9001:2015 Clinical Sterilization Protocols</span>
            </div>

          </div>

          {/* 2. RIGHT TOP CARD: DENTAL IMPLANTS (Spans 7 cols, 1 row) — TOP-TIER SERVICE */}
          <div
            onClick={() => onServiceClick('dental-implants')}
            className="lg:col-span-7 lg:row-span-1 relative w-full h-full bg-[#5B9DE6] rounded-[34px] sm:rounded-[44px] p-7 sm:p-9 lg:p-10 overflow-hidden shadow-xl shadow-sky-950/15 cursor-pointer group transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 flex flex-col justify-between min-h-[340px]"
          >
            {/* Card Background Gradient — Identical blue combination to the other grid cards */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#68A7ED] via-[#5B9DE6] to-[#4F94E0]" />

            {/* CARD HEADER / CORNER BADGE */}
            <div className="relative z-20 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#E5FE40] text-slate-900 text-xs font-black tracking-wide shadow-md shadow-sky-950/20 uppercase">
                  <span className="text-amber-600 text-xs">★</span> Top Tier Service
                </span>
                <span className="hidden min-[420px]:inline-block px-3 py-1 rounded-full bg-white/20 text-white text-[11px] font-semibold backdrop-blur-md border border-white/25">
                  Flagship Procedure
                </span>
              </div>
              <div className="w-9 h-9 rounded-full bg-white text-slate-900 flex items-center justify-center group-hover:bg-[#E5FE40] group-hover:rotate-45 transition-all duration-300 shadow-md">
                <ArrowUpRight size={18} strokeWidth={2.4} />
              </div>
            </div>

            {/* CENTER COMPOSITION: HUGE EDITORIAL TEXT + SEAMLESS 3D DENTAL IMPLANT CUTOUT */}
            <div className="relative z-20 my-auto flex items-center justify-between py-2">
              
              {/* Editorial Typography: "Dental Implants" */}
              <div className="z-10 select-none pr-3">
                <h3 className="text-white text-4xl min-[400px]:text-5xl sm:text-6xl md:text-7xl font-light tracking-[-0.035em] leading-[0.92]">
                  Dental<br />
                  Implants
                </h3>
                <p className="text-white/90 text-xs sm:text-sm font-medium mt-3 max-w-xs leading-relaxed">
                  Permanent titanium tooth replacement with lifelike porcelain crown & bone-level integration.
                </p>
              </div>

              {/* Ultra-realistic 3D Dental Implant Cutout (NO square box / NO card container) */}
              <div className="relative -mr-1 sm:mr-4 w-28 min-[400px]:w-32 sm:w-36 md:w-40 flex-shrink-0 flex items-center justify-center pointer-events-none">
                <img
                  src="/images/dental-implant-isolated.png"
                  alt="Precision Medical Grade Titanium Dental Implant with Porcelain Crown"
                  className="w-full h-auto max-h-[220px] sm:max-h-[250px] md:max-h-[270px] object-contain drop-shadow-[0_20px_35px_rgba(0,0,0,0.35)] transform group-hover:scale-105 group-hover:-rotate-1 transition-transform duration-500"
                />
              </div>

            </div>

            {/* Bottom highlighted feature tags */}
            <div className="relative z-20 flex flex-wrap items-center gap-2 sm:gap-3 pt-2 text-white/95 text-xs font-medium">
              <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/15 backdrop-blur-sm border border-white/20">
                <span className="w-1.5 h-1.5 rounded-full bg-[#E5FE40]" />
                Computer-Guided Surgery
              </span>
              <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/15 backdrop-blur-sm border border-white/20">
                <span className="w-1.5 h-1.5 rounded-full bg-[#E5FE40]" />
                Lifetime Warranty
              </span>
            </div>
          </div>

          {/* 3. RIGHT BOTTOM CARD: DOCTOR PROFILES — DR. LIJEESH & DR. ABDULLAH MUFEED (Spans 7 cols, 1 row) */}
          <div
            onClick={onDoctorClick}
            className="lg:col-span-7 lg:row-span-1 relative w-full h-full bg-[#5B9DE6] rounded-[34px] sm:rounded-[44px] overflow-hidden shadow-xl shadow-sky-950/15 cursor-pointer group transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 flex items-end min-h-[350px] sm:min-h-[370px]"
          >
            {/* Card Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-tr from-[#4B90DE] via-[#5B9DE6] to-[#6FAAED]" />

            {/* DOCTOR PHOTOGRAPHS (BIGGER SIZE, GROUNDED ON LEFT) */}
            <div className="absolute left-0 sm:left-1 lg:left-2 bottom-0 w-[64%] min-[400px]:w-[66%] sm:w-[62%] md:w-[60%] lg:w-[58%] xl:w-[56%] max-w-[420px] sm:max-w-[460px] lg:max-w-[480px] h-auto pointer-events-none z-10 flex items-end">
              <img
                src="/images/doctors-duo.png"
                alt="Dr. Lijeesh & Dr. Abdullah Mufeed - Senior Dental Faculty"
                className="w-full h-auto object-contain object-bottom drop-shadow-[0_12px_24px_rgba(0,0,0,0.22)] transform group-hover:scale-[1.02] transition-transform duration-500"
              />
            </div>

            {/* FLOATING PILL-SHAPED CARD & RATING: PUSHED FURTHER TO THE VERY END */}
            <div className="absolute right-2 sm:right-3 lg:right-4 bottom-3 sm:bottom-4 z-20 flex flex-col items-end w-fit max-w-[185px] min-[400px]:max-w-[195px] sm:max-w-[215px] lg:max-w-[225px]">
              
              {/* Pill-shaped card with soft rounded corners */}
              <div className="bg-white rounded-[22px_22px_22px_12px] sm:rounded-[24px_24px_24px_14px] p-3 sm:p-3.5 lg:p-4 shadow-2xl shadow-sky-950/20 border border-white/90 transform group-hover:-translate-y-1 transition-transform text-left">
                {/* Doctor 1 */}
                <div>
                  <h4 className="text-[15px] sm:text-[17px] lg:text-lg font-light tracking-tight text-[#2563EB] leading-none mb-1">
                    Dr. Lijeesh
                  </h4>
                  <p className="text-[10.5px] sm:text-[11.5px] font-semibold text-slate-700 leading-snug">
                    Senior Dentist
                  </p>
                </div>

                {/* Subtle divider */}
                <div className="w-full h-px bg-slate-100 my-2" />

                {/* Doctor 2 */}
                <div>
                  <h4 className="text-[15px] sm:text-[17px] lg:text-lg font-light tracking-tight text-[#2563EB] leading-none mb-1">
                    Dr. Abdullah Mufeed
                  </h4>
                  <p className="text-[9.5px] sm:text-[10.5px] font-semibold text-slate-600 leading-snug">
                    Prof. MES Dental, Perinthalmanna
                  </p>
                </div>
              </div>

              {/* 5 Yellow Stars + 311 reviews */}
              <div className="mt-2.5 sm:mt-3 mr-1 flex flex-col items-end">
                <div className="flex items-center gap-1 text-amber-300 text-sm sm:text-base drop-shadow">
                  <span>★</span>
                  <span>★</span>
                  <span>★</span>
                  <span>★</span>
                  <span>★</span>
                </div>
                <span className="text-white font-semibold text-xs sm:text-sm tracking-tight mt-0.5 drop-shadow">
                  311 reviews
                </span>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
