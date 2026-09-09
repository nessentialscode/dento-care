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
              Reference Layout Model • Asymmetric Grid
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

              {/* ASYMMETRIC COMPOSITION: PROMINENT DENTAL VISUAL + 4 FLOATING TRUST POINTS */}
              <div className="relative w-full my-4 sm:my-5">
                
                {/* AMBIENT GLOW BACKDROP */}
                <div className="absolute inset-0 bg-gradient-to-tr from-sky-300/25 via-transparent to-[#E5FE40]/20 rounded-full blur-2xl pointer-events-none" />

                {/* CENTRAL PROMINENT DENTAL VISUAL */}
                <div className="relative w-full flex items-center justify-center py-1 sm:py-2">
                  <div className="relative w-36 sm:w-44 md:w-48 aspect-square flex items-center justify-center">
                    {/* Concentric rings & subtle ambient halos */}
                    <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-sky-300/25 to-[#E5FE40]/20 blur-xl group-hover:scale-110 transition-transform duration-700" />
                    <div className="absolute -inset-2.5 rounded-full border border-white/20 border-dashed pointer-events-none opacity-50" />
                    <div className="absolute inset-1 rounded-full border border-white/25 pointer-events-none" />
                    
                    {/* High-res 3D Tooth Scanned Model */}
                    <img
                      src="/images/why-choose-tooth.jpg"
                      alt="Precision 3D Dental Scan & Tooth Structure"
                      className="relative z-10 w-full h-full object-contain rounded-3xl drop-shadow-2xl group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </div>

                {/* 4 COMPACT FLOATING TRUST POINTS WITH VARIED SIZING & STRONG HIERARCHY */}
                <div className="grid grid-cols-2 gap-2.5 sm:gap-3.5 relative z-20 mt-3 sm:mt-4">
                  
                  {/* 1. 98% Patient Loyalty (Organic White Card with Bold Blue Stat) */}
                  <div className="bg-white rounded-[22px_22px_10px_22px] p-3 sm:p-3.5 shadow-xl shadow-sky-950/20 border border-white/90 transform hover:-translate-y-1 transition-all flex flex-col justify-between">
                    <div>
                      <div className="text-2xl sm:text-3xl font-extrabold text-[#3B82F6] tracking-tight leading-none">
                        98%
                      </div>
                      <div className="text-xs sm:text-[13px] font-bold text-slate-800 leading-tight mt-1">
                        Patient Loyalty
                      </div>
                    </div>
                    <div className="text-[10px] sm:text-[10.5px] font-medium text-slate-500 mt-1">
                      Retention & Referrals
                    </div>
                  </div>

                  {/* 2. 4.9 ★ Google Rating (Organic White Card with Gold Stars) */}
                  <div className="bg-white rounded-[22px_22px_22px_10px] p-3 sm:p-3.5 shadow-xl shadow-sky-950/20 border border-white/90 transform hover:-translate-y-1 transition-all flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-0.5 text-amber-400 text-xs sm:text-sm">
                        <span>★★★★★</span>
                      </div>
                      <div className="text-base sm:text-lg font-extrabold text-slate-900 tracking-tight leading-tight mt-1">
                        4.9 ★ Google Rating
                      </div>
                    </div>
                    <div className="text-[10px] sm:text-[10.5px] font-semibold text-slate-500 mt-1">
                      Verified Patient Reviews
                    </div>
                  </div>

                  {/* 3. 3+ Years Experience (Frosted Glass Badge) */}
                  <div className="bg-white/15 backdrop-blur-md rounded-2xl p-3 sm:p-3.5 border border-white/25 hover:bg-white/25 transition-all shadow-sm flex flex-col justify-between">
                    <div>
                      <div className="text-xl sm:text-2xl font-light text-white tracking-tight leading-none">
                        3+ <span className="text-xs sm:text-sm font-semibold">Years</span>
                      </div>
                      <div className="text-xs sm:text-[12.5px] font-bold text-white mt-1 leading-snug">
                        Experience
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-[10px] sm:text-[10.5px] text-white/80 mt-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#E5FE40]" />
                      <span>Specialist Faculty</span>
                    </div>
                  </div>

                  {/* 4. Advanced Digital Dentistry (Dark Modern Pill with Lime Accent) */}
                  <div className="bg-slate-900/80 backdrop-blur-md rounded-2xl p-3 sm:p-3.5 border border-white/20 text-white shadow-xl hover:bg-slate-900/90 transition-all flex flex-col justify-between">
                    <div>
                      <div className="w-6 h-6 rounded-full bg-[#E5FE40] text-slate-900 flex items-center justify-center font-bold text-xs shadow-sm mb-1.5">
                        <Sparkles size={12} strokeWidth={2.5} />
                      </div>
                      <div className="text-xs sm:text-[12.5px] font-bold text-white leading-tight">
                        Advanced Digital Dentistry
                      </div>
                    </div>
                    <div className="text-[10px] sm:text-[10.5px] text-[#E5FE40] font-medium mt-1">
                      3D Scans & Painless Tech
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

          {/* 2. RIGHT TOP CARD: DENTAL IMPLANTS (Spans 7 cols, 1 row) */}
          <div
            onClick={() => onServiceClick('dental-implants')}
            className="lg:col-span-7 lg:row-span-1 relative w-full h-full bg-[#5B9DE6] rounded-[34px] sm:rounded-[44px] p-8 sm:p-10 lg:p-12 overflow-hidden shadow-xl shadow-sky-950/15 cursor-pointer group transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 flex flex-col justify-between min-h-[340px]"
          >
            {/* Radial gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#68A7ED] via-[#5B9DE6] to-[#4F94E0]" />

            {/* CARD HEADER / CORNER BADGE */}
            <div className="relative z-20 flex items-center justify-between">
              <span className="px-3.5 py-1 rounded-full bg-white/20 text-white text-xs font-semibold backdrop-blur-md border border-white/20">
                Featured Treatment
              </span>
              <div className="w-9 h-9 rounded-full bg-white text-slate-800 flex items-center justify-center group-hover:bg-[#E5FE40] group-hover:rotate-45 transition-all duration-300 shadow-md">
                <ArrowUpRight size={18} strokeWidth={2.4} />
              </div>
            </div>

            {/* CENTER COMPOSITION: HUGE EDITORIAL TEXT + OVERLAPPING 3D DENTAL IMPLANT */}
            <div className="relative z-20 my-auto flex items-center justify-between">
              
              {/* Editorial Typography: "Dental Implants" */}
              <div className="z-10 select-none">
                <h3 className="text-white text-5xl sm:text-6xl md:text-7xl font-light tracking-[-0.035em] leading-[0.92]">
                  Dental<br />
                  Implants
                </h3>
                <p className="text-white/80 text-xs sm:text-sm font-medium mt-3 max-w-xs">
                  Permanent titanium tooth replacement with lifelike porcelain crown & bone-level integration.
                </p>
              </div>

              {/* 3D Rendered Dental Implant with wireframe mesh (Reference 2) */}
              <div className="relative -mr-4 sm:mr-4 w-40 sm:w-52 md:w-60 flex-shrink-0">
                <div className="relative aspect-square group-hover:scale-105 transition-transform duration-500">
                  <img
                    src="/images/dental-implant-3d.jpg"
                    alt="Precision 3D Dental Implant with wireframe mesh"
                    className="w-full h-full object-contain drop-shadow-2xl rounded-3xl"
                  />
                </div>
              </div>

            </div>

            {/* Bottom pill tag */}
            <div className="relative z-20 flex items-center gap-3 pt-2 text-white/90 text-xs font-medium">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#E5FE40]" />
                Computer-Guided Surgery
              </span>
              <span>•</span>
              <span>Lifetime Warranty</span>
            </div>
          </div>

          {/* 3. RIGHT BOTTOM CARD: DOCTOR PROFILES — DR. LIJEESH & DR. ABDULLAH MUFEED (Spans 7 cols, 1 row) */}
          <div
            onClick={onDoctorClick}
            className="lg:col-span-7 lg:row-span-1 relative w-full h-full bg-[#5B9DE6] rounded-[34px] sm:rounded-[44px] overflow-hidden shadow-xl shadow-sky-950/15 cursor-pointer group transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 flex items-end min-h-[340px]"
          >
            {/* Card Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-tr from-[#4B90DE] via-[#5B9DE6] to-[#6FAAED]" />

            {/* CARD CONTENT ROW */}
            <div className="relative w-full h-full flex items-end justify-between p-5 sm:p-8 lg:p-10 z-10">
              
              {/* DOCTOR PHOTOGRAPHS (DUO WITHOUT ANY BOX BEHIND) */}
              <div className="absolute left-2 sm:left-6 md:left-8 bottom-0 w-64 sm:w-80 md:w-96 lg:w-[420px] max-w-[58%] h-auto pointer-events-none z-10 flex items-end">
                <img
                  src="/images/doctors-duo.png"
                  alt="Dr. Lijeesh & Dr. Abdullah Mufeed - Senior Dental Faculty"
                  className="w-full h-auto object-contain object-bottom drop-shadow-[0_12px_24px_rgba(0,0,0,0.22)] transform group-hover:scale-[1.02] transition-transform duration-500"
                />
              </div>

              {/* FLOATING PILL-SHAPED CARD: DR. LIJEESH & DR. ABDULLAH MUFEED */}
              <div className="ml-auto z-20 w-full max-w-[210px] sm:max-w-[245px] md:max-w-[265px] text-left">
                
                {/* Pill-shaped card with soft rounded corners */}
                <div className="bg-white rounded-[26px_26px_26px_14px] p-4 sm:p-5 shadow-2xl shadow-sky-950/20 border border-white/90 transform group-hover:-translate-y-1 transition-transform space-y-3">
                  {/* Doctor 1 */}
                  <div>
                    <h4 className="text-xl sm:text-2xl font-light tracking-tight text-[#3B82F6] leading-tight">
                      Dr. Lijeesh
                    </h4>
                    <p className="text-xs sm:text-[13px] font-semibold text-slate-700 leading-snug">
                      Senior Dentist
                    </p>
                  </div>

                  {/* Subtle divider */}
                  <div className="w-full h-px bg-slate-100" />

                  {/* Doctor 2 */}
                  <div>
                    <h4 className="text-xl sm:text-2xl font-light tracking-tight text-[#3B82F6] leading-tight">
                      Dr. Abdullah Mufeed
                    </h4>
                    <p className="text-xs sm:text-[12px] font-semibold text-slate-600 leading-snug">
                      Prof. MES Dental, Perinthalmanna
                    </p>
                  </div>
                </div>

                {/* 5 Yellow Stars + 311 reviews */}
                <div className="mt-3 mr-2 flex flex-col items-end">
                  <div className="flex items-center gap-1 text-amber-300 text-base sm:text-lg drop-shadow">
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

      </div>
    </section>
  );
};
