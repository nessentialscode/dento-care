import React from 'react';
import { ArrowUpRight, Sparkles, UserCheck, Cpu, Heart, ShieldCheck, Smile } from 'lucide-react';

interface EditorialGridSectionProps {
  onBookClick: () => void;
  onServiceClick: (serviceId: string) => void;
  onDoctorClick: () => void;
}

const ToothIcon: React.FC<{ className?: string }> = ({ className = 'w-3.5 h-3.5' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M7 3C4.24 3 2 5.24 2 8c0 3.32 1.5 6.5 3 9.5 1 2 2.5 3.5 3.5 3.5s1.5-1 2-3c.5-2 1-3 1.5-3s1 1 1.5 3c.5 2 1 3 2 3s2.5-1.5 3.5-3.5c1.5-3 3-6.18 3-9.5 0-2.76-2.24-5-5-5-2 0-3.5 1-4.5 2-1-1-2.5-2-4.5-2z" />
  </svg>
);

export const EditorialGridSection: React.FC<EditorialGridSectionProps> = ({
  onBookClick: _onBookClick,
  onServiceClick,
  onDoctorClick,
}) => {
  return (
    <section className="relative w-full px-3 sm:px-6 md:px-8 lg:px-10 py-14 sm:py-24">
      <div className="max-w-[1720px] 2xl:max-w-[1840px] mx-auto">
        
        {/* SECTION HEADER TAG */}
        <div className="flex items-center justify-between mb-8 sm:mb-12 px-4">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-[#3B82F6]" />
            <h2 className="text-xs sm:text-sm font-bold tracking-widest text-slate-600 uppercase">
              Advanced dentistry, designed around you
            </h2>
          </div>
          <div className="hidden sm:flex items-center gap-2 text-xs font-semibold text-slate-500">
            <Sparkles size={14} className="text-[#3B82F6]" />
            <span>Digital Precision & Clinical Mastery</span>
          </div>
        </div>

        {/* 3-CARD BLUE GRID - SCALED MUCH BIGGER FOR COMMANDING EDITORIAL PRESENCE */}
        <div className="grid grid-cols-1 lg:grid-cols-12 lg:grid-rows-2 gap-7 sm:gap-9 lg:gap-10">
          
          {/* 1. LEFT CARD: EXCEPTIONAL DENTISTRY (Spans 5 cols, 2 rows) */}
          <div className="lg:col-span-5 lg:row-span-2 relative w-full h-full min-h-[740px] sm:min-h-[820px] lg:min-h-[890px] xl:min-h-[940px] bg-[#5B9DE6] rounded-[36px] sm:rounded-[48px] p-7 sm:p-9 lg:p-11 xl:p-12 flex flex-col justify-between overflow-hidden shadow-2xl shadow-sky-950/15 group">
            
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#68A7ED] via-[#5B9DE6] to-[#488FD8]" />

            {/* TOP COMPOSITION: HEADLINE (LEFT ~50%) + MUCH BIGGER 3D TOOTH (RIGHT ~50%) */}
            <div className="relative z-20 mb-6 sm:mb-8 flex items-start justify-between min-h-[260px] sm:min-h-[300px] lg:min-h-[330px]">
              
              {/* HEADLINE & COPY (Left side, does not touch tooth image) */}
              <div className="w-[52%] sm:w-[54%] pr-2 z-10 flex flex-col justify-start">
                <h3 className="text-white text-2xl sm:text-3xl lg:text-[36px] xl:text-[42px] font-semibold tracking-[-0.03em] leading-[1.1]">
                  Exceptional dentistry,<br />
                  <span className="text-[#8BE4F8]">with care you can trust.</span>
                </h3>
                <p className="text-white/90 text-xs sm:text-[14px] lg:text-[15px] font-normal mt-3.5 sm:mt-4 leading-relaxed">
                  From preventive care to advanced dental procedures, our team combines modern technology, experienced specialists, and a patient-first approach to deliver comfortable, precise treatment.
                </p>
              </div>

              {/* MUCH BIGGER 3D TOOTH WITH DENTAL MIRROR (Right side, fills area with glowing ring) */}
              <div className="absolute right-[-15px] sm:right-[-10px] lg:right-[-5px] top-[-25px] sm:top-[-35px] lg:top-[-45px] w-[54%] sm:w-[52%] lg:w-[50%] max-w-[390px] lg:max-w-[430px] xl:max-w-[460px] h-[115%] pointer-events-none select-none z-10 flex items-center justify-center">
                <img
                  src="/images/tooth-mirror-3d.webp"
                  alt="Precision 3D Dental Care"
                  width={512}
                  height={512}
                  loading="lazy"
                  className="w-full h-full object-contain object-right-bottom drop-shadow-2xl"
                />
              </div>

            </div>

            {/* FOUR BENEFIT CARDS: 2x2 GRID (NO SQUARE BOXES - SEAMLESS SHADING OVERLAPPED BY TEXT) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 relative z-20 mt-auto">
              
              {/* CARD 1: Experienced Specialists */}
              <div className="relative bg-white rounded-[26px] sm:rounded-[28px] p-5 sm:p-6 shadow-lg border border-white/90 overflow-hidden flex flex-col justify-between min-h-[160px] sm:min-h-[175px] lg:min-h-[185px]">
                {/* Seamless Background Image on Right with No Boundaries */}
                <div className="absolute right-0 top-0 bottom-0 w-[55%] pointer-events-none select-none overflow-hidden">
                  <img
                    src="/images/feature-specialists.webp"
                    alt="Experienced Specialists"
                    className="w-full h-full object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-white via-white/30 to-transparent" />
                </div>
                {/* Content on Left partially overlapping */}
                <div className="relative z-10 max-w-[65%] flex flex-col justify-between h-full">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-sky-50 text-[#2563EB] flex items-center justify-center mb-2.5 flex-shrink-0 shadow-sm">
                    <UserCheck size={20} strokeWidth={2.2} />
                  </div>
                  <div>
                    <h4 className="text-[14.5px] sm:text-[15.5px] lg:text-[16px] font-bold text-slate-900 leading-snug tracking-tight mb-1">
                      Experienced Specialists
                    </h4>
                    <p className="text-[11px] sm:text-[11.5px] lg:text-[12px] text-slate-600 font-normal leading-relaxed">
                      Skilled dental professionals focused on precise, personalized treatment.
                    </p>
                  </div>
                </div>
              </div>

              {/* CARD 2: Advanced Technology */}
              <div className="relative bg-white rounded-[26px] sm:rounded-[28px] p-5 sm:p-6 shadow-lg border border-white/90 overflow-hidden flex flex-col justify-between min-h-[160px] sm:min-h-[175px] lg:min-h-[185px]">
                {/* Seamless Background Image on Right with No Boundaries */}
                <div className="absolute right-0 top-0 bottom-0 w-[55%] pointer-events-none select-none overflow-hidden">
                  <img
                    src="/images/feature-tech.webp"
                    alt="Advanced Technology"
                    className="w-full h-full object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-white via-white/30 to-transparent" />
                </div>
                {/* Content on Left partially overlapping */}
                <div className="relative z-10 max-w-[65%] flex flex-col justify-between h-full">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-sky-50 text-[#2563EB] flex items-center justify-center mb-2.5 flex-shrink-0 shadow-sm">
                    <Cpu size={20} strokeWidth={2.2} />
                  </div>
                  <div>
                    <h4 className="text-[14.5px] sm:text-[15.5px] lg:text-[16px] font-bold text-slate-900 leading-snug tracking-tight mb-1">
                      Advanced Technology
                    </h4>
                    <p className="text-[11px] sm:text-[11.5px] lg:text-[12px] text-slate-600 font-normal leading-relaxed">
                      Modern digital diagnostics and treatment techniques for better accuracy.
                    </p>
                  </div>
                </div>
              </div>

              {/* CARD 3: Comfort-First Care */}
              <div className="relative bg-white rounded-[26px] sm:rounded-[28px] p-5 sm:p-6 shadow-lg border border-white/90 overflow-hidden flex flex-col justify-between min-h-[160px] sm:min-h-[175px] lg:min-h-[185px]">
                {/* Seamless Background Image on Right with No Boundaries */}
                <div className="absolute right-0 top-0 bottom-0 w-[55%] pointer-events-none select-none overflow-hidden">
                  <img
                    src="/images/feature-comfort.webp"
                    alt="Comfort-First Care"
                    className="w-full h-full object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-white via-white/30 to-transparent" />
                </div>
                {/* Content on Left partially overlapping */}
                <div className="relative z-10 max-w-[65%] flex flex-col justify-between h-full">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-sky-50 text-[#2563EB] flex items-center justify-center mb-2.5 flex-shrink-0 shadow-sm">
                    <Heart size={20} strokeWidth={2.2} />
                  </div>
                  <div>
                    <h4 className="text-[14.5px] sm:text-[15.5px] lg:text-[16px] font-bold text-slate-900 leading-snug tracking-tight mb-1">
                      Comfort-First Care
                    </h4>
                    <p className="text-[11px] sm:text-[11.5px] lg:text-[12px] text-slate-600 font-normal leading-relaxed">
                      A calm, gentle approach designed around your comfort at every visit.
                    </p>
                  </div>
                </div>
              </div>

              {/* CARD 4: Safety & Sterilization */}
              <div className="relative bg-white rounded-[26px] sm:rounded-[28px] p-5 sm:p-6 shadow-lg border border-white/90 overflow-hidden flex flex-col justify-between min-h-[160px] sm:min-h-[175px] lg:min-h-[185px]">
                {/* Seamless Background Image on Right with No Boundaries */}
                <div className="absolute right-0 top-0 bottom-0 w-[55%] pointer-events-none select-none overflow-hidden">
                  <img
                    src="/images/feature-sterilization.webp"
                    alt="Safety & Sterilization"
                    className="w-full h-full object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-white via-white/30 to-transparent" />
                </div>
                {/* Content on Left partially overlapping */}
                <div className="relative z-10 max-w-[65%] flex flex-col justify-between h-full">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-sky-50 text-[#2563EB] flex items-center justify-center mb-2.5 flex-shrink-0 shadow-sm">
                    <ShieldCheck size={20} strokeWidth={2.2} />
                  </div>
                  <div>
                    <h4 className="text-[14.5px] sm:text-[15.5px] lg:text-[16px] font-bold text-slate-900 leading-snug tracking-tight mb-1">
                      Safety & Sterilization
                    </h4>
                    <p className="text-[11px] sm:text-[11.5px] lg:text-[12px] text-slate-600 font-normal leading-relaxed">
                      Rigorous clinical hygiene and sterilization protocols for your safety.
                    </p>
                  </div>
                </div>
              </div>

            </div>

          </div>

          {/* 2. RIGHT TOP CARD: DENTAL IMPLANTS (Spans 7 cols, 1 row) */}
          <div
            onClick={() => onServiceClick('dental-implants')}
            className="lg:col-span-7 lg:row-span-1 relative w-full h-full bg-[#5B9DE6] rounded-[36px] sm:rounded-[48px] p-8 sm:p-10 lg:p-12 overflow-hidden shadow-2xl shadow-sky-950/15 cursor-pointer group transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 flex flex-col justify-between min-h-[380px] sm:min-h-[410px] lg:min-h-[435px] xl:min-h-[460px]"
          >
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#68A7ED] via-[#5B9DE6] to-[#4F94E0]" />

            {/* TOP HEADER / CORNER BADGE: ADVANCED SOLUTIONS */}
            <div className="relative z-20 flex items-center justify-start">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/20 text-white text-[11px] sm:text-xs font-bold tracking-wider uppercase backdrop-blur-md border border-white/25 shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-[#E5FE40]" />
                <span>ADVANCED SOLUTIONS</span>
              </span>
            </div>

            {/* CENTER COMPOSITION: TYPOGRAPHY + 3D IMPLANT WITH HOLOGRAPHIC JAW */}
            <div className="relative z-20 my-auto py-3">
              <div className="max-w-[60%] sm:max-w-[65%]">
                <h3 className="text-white text-4xl min-[400px]:text-5xl sm:text-6xl lg:text-[72px] xl:text-[80px] font-normal tracking-[-0.035em] leading-[0.92]">
                  Dental<br />
                  Implants
                </h3>
                <p className="text-white/90 text-xs sm:text-[14px] lg:text-[15px] font-medium mt-3.5 max-w-sm sm:max-w-md leading-relaxed">
                  Permanent titanium tooth replacement with lifelike porcelain crown & bone-level integration.
                </p>

                {/* 3 BENEFIT PILLS WITH ICONS */}
                <div className="flex flex-wrap items-center gap-2.5 pt-5">
                  <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-white text-xs sm:text-[13px] font-medium">
                    <ToothIcon className="w-3.5 h-3.5" />
                    <span>Looks Natural</span>
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-white text-xs sm:text-[13px] font-medium">
                    <ShieldCheck size={14} />
                    <span>Long-Lasting</span>
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-white text-xs sm:text-[13px] font-medium">
                    <Smile size={14} />
                    <span>Restores Confidence</span>
                  </span>
                </div>

                {/* 2 FEATURE TAGS WITH YELLOW DOTS */}
                <div className="flex flex-wrap items-center gap-2.5 pt-3 text-white/95 text-xs sm:text-[13px] font-medium">
                  <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/20">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#E5FE40]" />
                    <span>Computer-Guided Surgery</span>
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/20">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#E5FE40]" />
                    <span>Lifetime Warranty</span>
                  </span>
                </div>
              </div>
            </div>

            {/* 3D DENTAL IMPLANT WITH HOLOGRAPHIC JAW ARTWORK (Seamlessly fading on left) */}
            <div className="absolute right-0 top-0 bottom-0 w-[46%] max-w-[360px] lg:max-w-[420px] xl:max-w-[450px] pointer-events-none select-none z-10 flex items-center justify-end overflow-hidden [mask-image:linear-gradient(to_left,black_75%,transparent_100%)]">
              <img
                src="/images/dental-implant-jaw-3d.webp"
                alt="Dental Implant with 3D Holographic Jaw"
                width={512}
                height={512}
                loading="lazy"
                className="w-full h-full object-contain object-right drop-shadow-2xl"
              />
            </div>

          </div>

          {/* 3. RIGHT BOTTOM CARD: SENIOR CLINICAL FACULTY (Spans 7 cols, 1 row) */}
          <div
            onClick={onDoctorClick}
            className="lg:col-span-7 lg:row-span-1 relative w-full h-full bg-[#5B9DE6] rounded-[36px] sm:rounded-[48px] overflow-hidden shadow-2xl shadow-sky-950/15 cursor-pointer group transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 flex flex-col justify-between min-h-[390px] sm:min-h-[420px] lg:min-h-[445px] xl:min-h-[470px]"
          >
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-tr from-[#4B90DE] via-[#5B9DE6] to-[#6FAAED]" />

            {/* Glowing circular concentric rings behind doctors */}
            <div className="absolute left-[20%] sm:left-[26%] bottom-[-10%] w-[340px] sm:w-[420px] h-[340px] sm:h-[420px] rounded-full border border-white/20 pointer-events-none" />
            <div className="absolute left-[15%] sm:left-[21%] bottom-[-20%] w-[440px] sm:w-[520px] h-[440px] sm:h-[520px] rounded-full border border-white/10 pointer-events-none" />

            {/* TOP HEADER / EYEBROW & ARROW ACTION */}
            <div className="relative z-20 w-full p-7 sm:p-8 lg:p-10 flex items-start justify-between pointer-events-none">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/20 text-white text-[11px] sm:text-xs font-bold tracking-wider uppercase backdrop-blur-md border border-white/25 shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-[#E5FE40]" />
                <span>SENIOR CLINICAL FACULTY</span>
              </span>
              <div className="w-10 h-10 rounded-full bg-white text-slate-900 flex items-center justify-center group-hover:bg-[#E5FE40] group-hover:rotate-45 transition-all duration-300 shadow-md pointer-events-auto">
                <ArrowUpRight size={20} strokeWidth={2.4} />
              </div>
            </div>

            {/* DOCTOR PHOTOGRAPHS (Dr. Mufeed in the front!) */}
            <div className="absolute -left-1 sm:left-1 lg:left-6 xl:left-8 bottom-0 w-[60%] min-[380px]:w-[62%] min-[430px]:w-[64%] sm:w-[62%] md:w-[60%] lg:w-auto lg:h-[90%] xl:h-[94%] pointer-events-none z-10 flex items-end">
              <img
                src="/images/doctors-duo.webp"
                alt="Prof. Dr. Abdul Mufeed & Dr. Lijeesh Kadambil - Senior Dental Faculty"
                width={894}
                height={959}
                loading="lazy"
                className="w-full lg:w-auto h-auto lg:h-full object-contain object-bottom drop-shadow-[0_16px_30px_rgba(0,0,0,0.25)] transform group-hover:scale-[1.02] transition-transform duration-500"
              />
            </div>

            {/* FLOATING PILL-SHAPED CARD (NAME LOG) */}
            <div className="absolute right-4 sm:right-6 lg:right-9 bottom-4 sm:bottom-6 lg:bottom-7 z-20">
              <div className="bg-white rounded-[24px] sm:rounded-[28px] p-5 sm:p-6 shadow-2xl border border-white/90 transform group-hover:-translate-y-1 transition-transform text-left min-w-[230px] sm:min-w-[270px] lg:min-w-[310px] max-w-[330px]">
                {/* 1st: Prof. Dr. Abdul Mufeed */}
                <div>
                  <h4 className="text-[16px] sm:text-[18px] lg:text-[19.5px] font-semibold text-[#2563EB] leading-tight mb-1">
                    Prof. Dr. Abdul Mufeed
                  </h4>
                  <p className="text-[11.5px] sm:text-[12.5px] lg:text-[13px] text-slate-600 font-medium leading-snug">
                    Prof. & HoD of MES Perinthalmanna
                  </p>
                </div>

                {/* Subtle divider */}
                <div className="w-full h-px bg-slate-100 my-3" />

                {/* 2nd: Dr. Lijeesh Kadambil */}
                <div>
                  <h4 className="text-[16px] sm:text-[18px] lg:text-[19.5px] font-semibold text-[#2563EB] leading-tight mb-1">
                    Dr. Lijeesh Kadambil
                  </h4>
                  <p className="text-[11.5px] sm:text-[12.5px] lg:text-[13px] text-slate-600 font-medium leading-snug">
                    Consultant Oral & Maxillofacial Surgeon
                  </p>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
