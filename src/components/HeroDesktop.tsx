import React from 'react';
import { CircularBookingCTA } from './CircularBookingCTA';
import { Navbar } from './Navbar';
import { MessageCircle } from 'lucide-react';
import { clinicInfo } from '../data/clinicInfo';
import { HeroMobile } from './HeroMobile';

interface HeroDesktopProps {
  onBookClick: () => void;
}

export const HeroDesktop: React.FC<HeroDesktopProps> = ({ onBookClick }) => {
  return (
    <>
      {/* MOBILE HERO: Only rendered on screens under lg (<1024px) - Exactly replicates Image 3 */}
      <div className="block lg:hidden">
        <HeroMobile onBookClick={onBookClick} />
      </div>

      {/* DESKTOP HERO: only rendered on lg and above (>=1024px) */}
      <div className="hidden lg:block">
        <section className="relative w-full px-3 sm:px-6 lg:px-8 xl:px-10 pt-2.5 sm:pt-3 pb-16 sm:pb-18 lg:pb-20 lg:h-screen lg:max-h-[960px] lg:min-h-[640px] flex flex-col justify-between">
          {/* MAIN ROUNDED BLUE CANVAS CONTAINER */}
          <div className="relative w-full max-w-[1600px] 2xl:max-w-[1720px] mx-auto bg-[#5B9DE6] rounded-[32px] sm:rounded-[40px] lg:rounded-[48px] shadow-2xl shadow-sky-900/20 overflow-hidden flex flex-col justify-between flex-1">
            
            {/* Subtle radial lighting on sky blue canvas */}
            <div className="absolute inset-0 bg-gradient-to-tr from-[#4B91E0]/60 via-[#5B9DE6] to-[#72AEF1]/80 pointer-events-none" />

            {/* INTEGRATED NAVBAR */}
            <Navbar onBookClick={onBookClick} />

            {/* HERO CONTENT AREA */}
            <div className="relative z-10 px-6 sm:px-10 lg:px-12 xl:px-14 pt-3 sm:pt-4 lg:pt-4 xl:pt-6 pb-10 sm:pb-12 lg:pb-14 flex-grow flex flex-col justify-between">
              
              {/* TOP/LEFT: EDITORIAL HEADLINE & SUPPORTING COPY */}
              <div className="relative z-20 max-w-xl lg:max-w-2xl xl:max-w-3xl space-y-2.5 sm:space-y-3.5">
                <h1 className="text-white text-[3rem] sm:text-[4rem] lg:text-[4.75rem] xl:text-[5.75rem] 2xl:text-[6.5rem] font-light tracking-[-0.035em] leading-[0.93] select-none">
                  Restore<br />
                  Your True<br />
                  <span className="inline-flex items-center gap-2.5 sm:gap-3.5 whitespace-nowrap">
                    <span>Smile</span>
                    {/* OVERLAPPING AVATAR SOCIAL PROOF (Reference treatment) */}
                    <span className="inline-flex items-center align-middle my-1">
                      <span className="inline-flex -space-x-2 overflow-hidden p-0.5">
                        <img
                          className="inline-block h-7 w-7 sm:h-8 sm:w-8 lg:h-9 lg:w-9 rounded-full ring-2 ring-white object-cover shadow-md"
                          src="/images/hero-patient.jpg"
                          alt="Patient review"
                        />
                        <img
                          className="inline-block h-7 w-7 sm:h-8 sm:w-8 lg:h-9 lg:w-9 rounded-full ring-2 ring-white object-cover shadow-md"
                          src="/images/doctor-reed.jpg"
                          alt="Doctor profile"
                        />
                      </span>
                      <span className="ml-1 inline-flex items-center justify-center px-2 py-0.5 rounded-full bg-white/20 backdrop-blur-md text-white text-[11px] sm:text-xs font-semibold tracking-normal border border-white/30">
                        +2k
                      </span>
                    </span>
                  </span>
                </h1>

                {/* SUPPORTING TEXT */}
                <p className="text-white/90 text-xs sm:text-sm lg:text-[15px] font-normal max-w-md leading-relaxed pt-0.5">
                  Using advanced technology, we deliver comprehensive treatments for a healthy, confident smile.
                </p>
              </div>

              {/* LOWER-LEFT COMPOSITION: 98% BADGE & INTEGRATED CELEBRATING PATIENT CUTOUT */}
              <div className="relative z-20 pt-4 sm:pt-6 mt-auto flex items-end">
                
                {/* Organic 98% loyal dental patients badge (overlapping patient from the left) */}
                <div className="relative z-30 mb-4 sm:mb-6 -mr-6 sm:-mr-8 flex-shrink-0">
                  <div className="bg-white rounded-[22px_22px_22px_8px] p-3.5 sm:p-4 shadow-xl shadow-sky-950/20 max-w-[160px] sm:max-w-[175px] border border-white/90 transform hover:-translate-y-1 transition-transform">
                    <div className="text-2xl sm:text-3xl font-extrabold text-[#3B82F6] tracking-tight leading-none">
                      98%
                    </div>
                    <div className="text-[11px] sm:text-xs font-semibold text-slate-800 leading-snug mt-1">
                      loyal dental patients
                    </div>
                    <div className="flex items-center gap-1 mt-1.5 pt-1.5 border-t border-slate-100">
                      <span className="text-amber-400 text-[11px]">★★★★★</span>
                      <span className="text-[10px] sm:text-[11px] font-bold text-slate-600">4.9 Google</span>
                    </div>
                  </div>
                </div>

                {/* Emerging joyous woman in blue sweater (clean transparent cutout, no box/background) */}
                <div className="relative w-48 sm:w-56 md:w-64 lg:w-72 xl:w-80 -mb-10 sm:-mb-12 lg:-mb-14 pointer-events-none select-none z-20">
                  <img
                    src="/images/hero-patient.png"
                    alt="Happy confident dental patient celebrating"
                    className="w-full h-auto object-contain object-bottom drop-shadow-xl"
                  />
                </div>

              </div>

              {/* CENTER / RIGHT REGION: DOMINANT HERO DENTAL ARTWORK (Transparent isolated artwork with workers on top) */}
              <div className="mt-8 lg:mt-0 lg:absolute lg:right-3 xl:right-8 2xl:right-12 lg:bottom-0 lg:w-[54%] xl:w-[58%] 2xl:w-[60%] lg:h-[86%] xl:h-[90%] 2xl:h-[92%] flex items-end justify-center lg:justify-end pointer-events-none z-10">
                <img
                  src="/images/hero-tooth-specialists.png"
                  alt="Precision dental implant crown crafted by specialist technicians"
                  className="w-full h-full object-contain object-bottom drop-shadow-2xl"
                />
              </div>
            </div>

            {/* WHATSAPP CONSULTATION CTA (Fully inside dark-blue hero section, near bottom-right corner) */}
            <div className="absolute bottom-4 sm:bottom-5 lg:bottom-6 right-5 sm:right-6 lg:right-8 z-40">
              <a
                href={`https://wa.me/${clinicInfo.whatsapp}?text=Hello%20Dento%20Care,%20I%20would%20like%20to%20schedule%20an%20appointment.`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Direct WhatsApp consultation"
                className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#25D366] text-white text-xs sm:text-sm font-bold shadow-xl shadow-emerald-900/30 hover:bg-emerald-600 transition-all hover:scale-105 cursor-pointer"
              >
                <MessageCircle size={16} />
                <span className="hidden sm:inline">WhatsApp Us</span>
              </a>
            </div>

          </div>

          {/* SIGNATURE CIRCULAR LIME BOOKING CTA (50% inside blue hero, 50% extending into mint section) */}
          <div className="absolute left-1/2 -translate-x-1/2 bottom-16 sm:bottom-18 lg:bottom-20 translate-y-1/2 z-40">
            <CircularBookingCTA onClick={onBookClick} size="lg" />
          </div>
        </section>
      </div>
</>
  );
};
