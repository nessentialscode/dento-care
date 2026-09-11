import React from 'react';
import { ArrowUpRight, Sparkles, UserCheck, Cpu, Heart, ShieldCheck } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { InView } from './core/in-view';

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
  const shouldReduceMotion = useReducedMotion();

  const cardVariants = {
    hidden: {
      opacity: shouldReduceMotion ? 1 : 0,
      y: shouldReduceMotion ? 0 : 50,
      scale: shouldReduceMotion ? 1 : 0.94,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: shouldReduceMotion ? 0 : 1.0,
        ease: [0.25, 0.1, 0.25, 1] as const,
      },
    },
  };

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
          
          {/* 1. LEFT CARD: WHY PATIENTS TRUST DENTO CARE (Spans 5 cols, 2 rows) */}
          <div className="lg:col-span-5 lg:row-span-2 relative w-full h-full min-h-[580px] sm:min-h-[640px] bg-[#5B9DE6] rounded-[34px] sm:rounded-[44px] p-6 sm:p-8 lg:p-10 flex flex-col justify-between overflow-hidden shadow-xl shadow-sky-950/15 group">
            
            {/* Background ambient lighting */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#68A7ED] via-[#5B9DE6] to-[#488FD8]" />

            {/* Subtle decorative glow orb */}
            <div className="absolute top-1/4 -right-16 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none" />

            {/* TOP HEADER / EYEBROW */}
            <div className="relative z-20 flex items-center justify-between w-full">
              <span className="px-3.5 py-1.5 rounded-full bg-white/20 text-white text-[11px] sm:text-xs font-bold tracking-wider uppercase backdrop-blur-md border border-white/20 shadow-sm flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#E5FE40]" />
                WHY PATIENTS TRUST DENTO CARE
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

            {/* MAIN EDITORIAL HEADLINE & SUPPORTING TEXT */}
            <div className="relative z-20 my-auto py-3 sm:py-4 flex flex-col justify-between flex-grow">
              <div>
                <h3 className="text-white text-2xl sm:text-3xl lg:text-[32px] xl:text-[36px] font-light tracking-[-0.03em] leading-[1.12]">
                  Exceptional dentistry,<br />
                  <span className="font-normal text-white">with care you can trust.</span>
                </h3>
                <p className="text-white/90 text-xs sm:text-[13px] font-normal mt-2.5 max-w-md leading-relaxed">
                  From preventive care to advanced dental procedures, our team combines modern technology, experienced specialists, and a patient-first approach to deliver comfortable, precise treatment.
                </p>
              </div>

              {/* FOUR BENEFIT CARDS: 2x2 ON DESKTOP / TABLET, CLEAN BALANCED STACK ON SMALL MOBILE */}
              <InView
                as="div"
                className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-3.5 my-4 sm:my-5 relative z-20"
                viewOptions={{ once: true }}
                once={true}
                variants={{
                  hidden: {},
                  visible: {
                    transition: {
                      staggerChildren: shouldReduceMotion ? 0 : 0.25,
                    },
                  },
                }}
              >
                {/* CARD 1: Experienced Specialists */}
                <motion.div
                  variants={cardVariants}
                  className="bg-white rounded-2xl p-3.5 sm:p-4 border border-white/95 shadow-md shadow-sky-950/10 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 flex flex-col justify-start text-left"
                >
                  <div className="w-8 h-8 rounded-xl bg-sky-50 text-[#2563EB] flex items-center justify-center mb-2.5 flex-shrink-0">
                    <UserCheck size={18} strokeWidth={2.2} />
                  </div>
                  <h4 className="text-[13.5px] sm:text-[14.5px] font-bold text-slate-900 leading-snug tracking-tight mb-1">
                    Experienced Specialists
                  </h4>
                  <p className="text-[11px] sm:text-[11.5px] text-slate-600 font-normal leading-relaxed">
                    Skilled dental professionals focused on precise, personalized treatment.
                  </p>
                </motion.div>

                {/* CARD 2: Advanced Technology */}
                <motion.div
                  variants={cardVariants}
                  className="bg-white rounded-2xl p-3.5 sm:p-4 border border-white/95 shadow-md shadow-sky-950/10 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 flex flex-col justify-start text-left"
                >
                  <div className="w-8 h-8 rounded-xl bg-sky-50 text-[#2563EB] flex items-center justify-center mb-2.5 flex-shrink-0">
                    <Cpu size={18} strokeWidth={2.2} />
                  </div>
                  <h4 className="text-[13.5px] sm:text-[14.5px] font-bold text-slate-900 leading-snug tracking-tight mb-1">
                    Advanced Technology
                  </h4>
                  <p className="text-[11px] sm:text-[11.5px] text-slate-600 font-normal leading-relaxed">
                    Modern digital diagnostics and treatment techniques for better accuracy.
                  </p>
                </motion.div>

                {/* CARD 3: Comfort-First Care */}
                <motion.div
                  variants={cardVariants}
                  className="bg-white rounded-2xl p-3.5 sm:p-4 border border-white/95 shadow-md shadow-sky-950/10 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 flex flex-col justify-start text-left"
                >
                  <div className="w-8 h-8 rounded-xl bg-sky-50 text-[#2563EB] flex items-center justify-center mb-2.5 flex-shrink-0">
                    <Heart size={18} strokeWidth={2.2} />
                  </div>
                  <h4 className="text-[13.5px] sm:text-[14.5px] font-bold text-slate-900 leading-snug tracking-tight mb-1">
                    Comfort-First Care
                  </h4>
                  <p className="text-[11px] sm:text-[11.5px] text-slate-600 font-normal leading-relaxed">
                    A calm, gentle approach designed around your comfort at every visit.
                  </p>
                </motion.div>

                {/* CARD 4: Safety & Sterilization */}
                <motion.div
                  variants={cardVariants}
                  className="bg-white rounded-2xl p-3.5 sm:p-4 border border-white/95 shadow-md shadow-sky-950/10 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 flex flex-col justify-start text-left"
                >
                  <div className="w-8 h-8 rounded-xl bg-sky-50 text-[#2563EB] flex items-center justify-center mb-2.5 flex-shrink-0">
                    <ShieldCheck size={18} strokeWidth={2.2} />
                  </div>
                  <h4 className="text-[13.5px] sm:text-[14.5px] font-bold text-slate-900 leading-snug tracking-tight mb-1">
                    Safety & Sterilization
                  </h4>
                  <p className="text-[11px] sm:text-[11.5px] text-slate-600 font-normal leading-relaxed">
                    Rigorous clinical hygiene and sterilization protocols for your safety.
                  </p>
                </motion.div>

              </InView>
            </div>

            {/* HORIZONTAL TRUST STRIP */}
            <div className="relative z-20 flex flex-wrap items-center justify-between gap-y-2 gap-x-2 pt-3 border-t border-white/20 text-white/95 text-[10.5px] sm:text-[11.5px] font-medium tracking-tight">
              <span className="whitespace-nowrap">Modern Technology</span>
              <span className="w-1 h-1 rounded-full bg-white/40 hidden sm:inline-block" />
              <span className="whitespace-nowrap">Experienced Care</span>
              <span className="w-1 h-1 rounded-full bg-white/40 hidden sm:inline-block" />
              <span className="whitespace-nowrap">Patient-Centred Approach</span>
              <span className="w-1 h-1 rounded-full bg-white/40 hidden sm:inline-block" />
              <span className="whitespace-nowrap">Strict Sterilization</span>
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
            className="lg:col-span-7 lg:row-span-1 relative w-full h-full bg-[#5B9DE6] rounded-[34px] sm:rounded-[44px] overflow-hidden shadow-xl shadow-sky-950/15 cursor-pointer group transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 flex flex-col justify-between min-h-[350px] sm:min-h-[370px] lg:min-h-[380px]"
          >
            {/* Card Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-tr from-[#4B90DE] via-[#5B9DE6] to-[#6FAAED]" />

            {/* Subtle ambient lighting accent */}
            <div className="absolute top-0 left-1/4 w-60 h-60 bg-white/10 rounded-full blur-3xl pointer-events-none" />

            {/* TOP HEADER / EYEBROW & ACTION (Matches Dental Implants card above) */}
            <div className="relative z-20 w-full p-6 sm:p-7 lg:p-8 flex items-start justify-between pointer-events-none">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/20 text-white text-[11px] sm:text-xs font-bold tracking-wider uppercase backdrop-blur-md border border-white/25 shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-[#E5FE40]" />
                Senior Clinical Faculty
              </span>
              <div className="w-9 h-9 rounded-full bg-white text-slate-900 flex items-center justify-center group-hover:bg-[#E5FE40] group-hover:rotate-45 transition-all duration-300 shadow-md pointer-events-auto">
                <ArrowUpRight size={18} strokeWidth={2.4} />
              </div>
            </div>

            {/* DOCTOR PHOTOGRAPHS (Desktop: height-fitted so heads are never cut off; Mobile: original width scaling preserved) */}
            <div className="absolute left-0 sm:left-1 lg:left-6 xl:left-8 bottom-0 w-[64%] min-[400px]:w-[66%] sm:w-[62%] md:w-[60%] lg:w-auto lg:h-[86%] xl:h-[90%] pointer-events-none z-10 flex items-end">
              <img
                src="/images/doctors-duo.png"
                alt="Dr. Lijeesh & Dr. Abdullah Mufeed - Senior Dental Faculty"
                className="w-full lg:w-auto h-auto lg:h-full object-contain object-bottom drop-shadow-[0_16px_30px_rgba(0,0,0,0.25)] transform group-hover:scale-[1.02] transition-transform duration-500"
              />
            </div>

            {/* FLOATING PILL-SHAPED CARD & RATING */}
            <div className="absolute right-3 sm:right-4 lg:right-6 xl:right-8 bottom-3 sm:bottom-4 lg:bottom-6 z-20 flex flex-col items-end w-fit max-w-[185px] min-[400px]:max-w-[195px] sm:max-w-[215px] lg:max-w-[230px]">
              
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
