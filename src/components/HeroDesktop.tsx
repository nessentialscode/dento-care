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
        <section className="relative w-full px-3 sm:px-6 lg:px-8 xl:px-10 pt-2 sm:pt-2.5 pb-20 sm:pb-24 flex flex-col justify-between">
          {/* MAIN ROUNDED BLUE CANVAS CONTAINER (Fitted to viewport so half of CTA button is visible in first view) */}
          <div className="relative w-full max-w-[1600px] 2xl:max-w-[1720px] mx-auto bg-[#5B9DE6] rounded-[32px] sm:rounded-[40px] lg:rounded-[48px] shadow-2xl shadow-sky-900/20 overflow-hidden flex flex-col justify-between h-[calc(100vh-1.25rem)] min-h-[580px] max-h-[900px]">
            
            {/* Subtle radial lighting on sky blue canvas */}
            <div className="absolute inset-0 bg-gradient-to-tr from-[#4B91E0]/60 via-[#5B9DE6] to-[#72AEF1]/80 pointer-events-none" />

            {/* INTEGRATED NAVBAR */}
            <Navbar onBookClick={onBookClick} />

            {/* HERO CONTENT AREA */}
            <div className="relative z-10 px-6 sm:px-10 lg:px-12 xl:px-14 pt-2 sm:pt-2.5 lg:pt-3 pb-0 flex-grow flex flex-col justify-between min-h-0">
              
              {/* TOP/LEFT: EDITORIAL HEADLINE & SUPPORTING COPY (Tuned to exactly match 90% zoom reference at 100% zoom) */}
              <div className="relative z-20 max-w-xl lg:max-w-2xl xl:max-w-[740px] space-y-2 lg:space-y-2.5">
                <h1 className="text-white text-[2.75rem] sm:text-[3.4rem] lg:text-[3.9rem] xl:text-[4.7rem] 2xl:text-[5.35rem] font-light tracking-[-0.035em] leading-[0.92] select-none">
                  Restore<br />
                  Your True<br />
                  <span className="inline-flex items-center gap-2.5 sm:gap-3.5 whitespace-nowrap">
                    <span>Smile</span>
                    {/* OVERLAPPING AVATAR SOCIAL PROOF */}
                    <span className="inline-flex items-center align-middle my-1">
                      <span className="inline-flex -space-x-2 overflow-hidden p-0.5">
                        <img
                          className="inline-block h-7 w-7 sm:h-8 sm:w-8 lg:h-9 lg:w-9 xl:h-10 xl:w-10 rounded-full ring-2 ring-white object-cover shadow-md"
                          src="/images/hero-patient.jpg"
                          alt="Patient review"
                        />
                        <img
                          className="inline-block h-7 w-7 sm:h-8 sm:w-8 lg:h-9 lg:w-9 xl:h-10 xl:w-10 rounded-full ring-2 ring-white object-cover shadow-md"
                          src="/images/doctor-lijeesh.jpg"
                          alt="Doctor profile"
                        />
                      </span>
                      <span className="ml-1 inline-flex items-center justify-center px-2.5 py-0.5 rounded-full bg-white/20 backdrop-blur-md text-white text-xs sm:text-[12px] font-semibold tracking-normal border border-white/30">
                        +2k
                      </span>
                    </span>
                  </span>
                </h1>

                {/* SUPPORTING TEXT */}
                <p className="text-white/90 text-[13.5px] sm:text-[14px] lg:text-[15px] xl:text-[15.5px] font-normal max-w-md lg:max-w-lg leading-relaxed pt-1">
                  Using advanced technology, we deliver comprehensive treatments for a healthy, confident smile.
                </p>
              </div>

              {/* LOWER-LEFT COMPOSITION: INTEGRATED CELEBRATING PATIENT CUTOUT (Flushed to bottom edge of canvas, zero gap) */}
              <div className="relative z-20 mt-auto flex items-end pb-0">
                <div className="relative w-48 sm:w-56 md:w-64 lg:w-[280px] xl:w-[325px] 2xl:w-[355px] pointer-events-none select-none z-20 mb-0 ml-4 sm:ml-8 lg:ml-12 xl:ml-16">
                  <img
                    src="/images/hero-patient.png"
                    alt="Happy confident dental patient celebrating"
                    className="w-full h-auto object-contain object-bottom drop-shadow-xl block -mb-px"
                  />
                </div>
              </div>

              {/* CENTER / RIGHT REGION: DOMINANT HERO DENTAL ARTWORK (Flushed to bottom edge of canvas, zero gap) */}
              <div className="mt-8 lg:mt-0 lg:absolute lg:right-1 xl:right-3 2xl:right-6 lg:top-14 xl:top-16 2xl:top-16 lg:bottom-0 xl:bottom-0 2xl:bottom-0 lg:w-[58%] xl:w-[61%] 2xl:w-[64%] flex items-end justify-center lg:justify-end pointer-events-none z-10">
                <img
                  src="/images/hero-tooth-specialists.png"
                  alt="Precision dental implant crown crafted by specialist technicians"
                  className="w-full h-full object-contain object-bottom drop-shadow-2xl block -mb-px"
                />
              </div>
            </div>

            {/* WHATSAPP CONSULTATION CTA (Positioned cleanly above bottom border) */}
            <div className="absolute bottom-5 sm:bottom-6 lg:bottom-7 right-5 sm:right-6 lg:right-8 z-40">
              <a
                href={`https://wa.me/${clinicInfo.whatsapp}?text=Hello%20Dento%20Care,%20I%20would%20like%20to%20schedule%20an%20appointment.`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Direct WhatsApp consultation"
                className="flex items-center gap-2.5 px-4.5 py-2.5 sm:px-5 sm:py-3 rounded-full bg-[#25D366] text-white text-xs sm:text-[14.5px] font-bold shadow-xl shadow-emerald-900/30 hover:bg-emerald-600 transition-all hover:scale-105 cursor-pointer"
              >
                <MessageCircle size={18} />
                <span className="hidden sm:inline">WhatsApp Us</span>
              </a>
            </div>

          </div>

          {/* SIGNATURE CIRCULAR LIME BOOKING CTA (50% on blue canvas, 50% extending into mint section) */}
          <div className="absolute left-1/2 -translate-x-1/2 bottom-20 sm:bottom-24 translate-y-1/2 z-40">
            <CircularBookingCTA onClick={onBookClick} size="lg" />
          </div>
        </section>
      </div>
</>
  );
};
