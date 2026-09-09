import React, { useState } from 'react';
import { CircularBookingCTA } from './CircularBookingCTA';
import { ArrowUpRight, X, MessageCircle } from 'lucide-react';
import { clinicInfo } from '../data/clinicInfo';

interface HeroMobileProps {
  onBookClick: () => void;
}

export const HeroMobile: React.FC<HeroMobileProps> = ({ onBookClick }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Treatments', href: '#treatments' },
    { label: 'Locations', href: '#locations' },
    { label: 'Doctors', href: '#doctors' },
    { label: 'Reviews', href: '#reviews' },
    { label: 'Gallery', href: '#gallery' },
  ];

  return (
    <section className="relative w-full px-2.5 sm:px-4 pt-2.5 sm:pt-3 pb-3 sm:pb-4 min-h-[100svh] h-[100svh] max-h-[960px] flex flex-col">
      {/* MAIN ROUNDED BLUE CANVAS CONTAINER - Sized so the first view displays the end of the first grid */}
      <div className="relative w-full mx-auto bg-[#5B9DE6] rounded-[32px] sm:rounded-[40px] shadow-2xl shadow-sky-900/20 overflow-hidden flex flex-col justify-between flex-grow">
        
        {/* Subtle radial lighting on sky blue canvas */}
        <div className="absolute inset-0 bg-gradient-to-tr from-[#4B91E0]/70 via-[#5B9DE6] to-[#72AEF1]/90 pointer-events-none" />

        {/* TOP BLOCK: Header + Dominant Editorial Typography */}
        <div className="relative z-20 w-full flex flex-col flex-shrink-0">
          
          {/* 1. TOP HEADER (BRAND + MINIMAL HAMBURGER) */}
          <header className="relative z-30 w-full pt-4 sm:pt-5 px-5 sm:px-6 flex items-center justify-between">
            {/* LEFT: Clean Brand Logo + Lime Tooth outline */}
            <a href="#" className="flex items-center gap-2 group select-none">
              <div className="relative w-7 h-7 flex items-center justify-center">
                <svg
                  viewBox="0 0 24 24"
                  className="w-6 h-6 stroke-[#E5FE40] fill-none transition-transform duration-300 group-hover:scale-110"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 2C8.5 2 6 4.5 6 8.5c0 3.2 1.4 5.2 2 8.5.5 3 2 5 4 5s3.5-2 4-5c.6-3.3 2-5.3 2-8.5 0-4-2.5-6.5-6-6.5z" />
                  <path d="M10 9c.5.5 1.5.9 2 .9s1.5-.4 2-.9" />
                </svg>
              </div>
              <span className="text-[1.35rem] sm:text-[1.5rem] font-bold tracking-tight text-white leading-none">
                Dento Care
              </span>
            </a>

            {/* RIGHT: Minimal 3-line Hamburger matching Reference */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 text-white hover:text-[#E5FE40] transition-colors cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? (
                <X size={26} strokeWidth={2.2} />
              ) : (
                <div className="w-5 flex flex-col gap-1 items-end py-1">
                  <span className="w-5 h-[2px] bg-white rounded-full"></span>
                  <span className="w-4 h-[2px] bg-white rounded-full"></span>
                  <span className="w-5 h-[2px] bg-white rounded-full"></span>
                </div>
              )}
            </button>
          </header>

          {/* MOBILE NAVIGATION DRAWER */}
          {mobileMenuOpen && (
            <div className="relative z-40 mx-4 mt-2 bg-white/95 backdrop-blur-xl rounded-2xl p-5 shadow-2xl border border-sky-100 flex flex-col gap-3 animate-in fade-in slide-in-from-top-3 duration-200">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-slate-800 font-semibold text-[15px] hover:text-blue-600 transition-colors py-1"
                >
                  {link.label}
                </a>
              ))}
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onBookClick();
                }}
                className="w-full mt-2 py-3 rounded-full bg-[#E5FE40] text-slate-900 font-bold text-center flex items-center justify-center gap-2 shadow-md cursor-pointer hover:bg-lime-300 transition-colors"
              >
                <span>Book Appointment</span>
                <ArrowUpRight size={18} />
              </button>
            </div>
          )}

          {/* 2. GRAND EDITORIAL HEADLINE (Bigger & Bigger, aligned with Reference Image 2) */}
          <div className="px-4 min-[390px]:px-5 sm:px-6 pt-3 sm:pt-4">
            <h1 className="text-white text-[clamp(4.75rem,19.5vw,6.4rem)] font-light tracking-[-0.045em] leading-[0.81] select-none">
              <span className="block whitespace-nowrap tracking-[-0.025em]">Restore</span>
              <span className="block whitespace-nowrap tracking-[-0.055em]">Your True</span>
              
              {/* LINE 3: Smile + Overlapping Avatars & +2k Badge grouped naturally together */}
              <div className="inline-flex items-center gap-2.5 sm:gap-3.5 whitespace-nowrap pt-0.5">
                <span className="tracking-[-0.03em]">Smile</span>
                
                {/* OVERLAPPING AVATARS + SOLID WHITE CIRCULAR +2k BADGE (Exact match to Reference Image 2) */}
                <span className="inline-flex items-center align-middle my-0.5">
                  <span className="inline-flex -space-x-2 sm:-space-x-2.5 overflow-hidden p-0.5">
                    <img
                      className="inline-block h-8 w-8 min-[390px]:h-9 min-[390px]:w-9 sm:h-10 sm:w-10 rounded-full ring-2 ring-white object-cover shadow-md"
                      src="/images/hero-patient.jpg"
                      alt="Patient review"
                    />
                    <img
                      className="inline-block h-8 w-8 min-[390px]:h-9 min-[390px]:w-9 sm:h-10 sm:w-10 rounded-full ring-2 ring-white object-cover shadow-md"
                      src="/images/doctor-reed.jpg"
                      alt="Doctor profile"
                    />
                  </span>
                  <span className="ml-1.5 inline-flex items-center justify-center w-8 h-8 min-[390px]:w-9 min-[390px]:h-9 sm:w-10 sm:h-10 rounded-full bg-white text-slate-900 text-[11px] min-[390px]:text-xs font-extrabold shadow-md ring-2 ring-white">
                    +2k
                  </span>
                </span>
              </div>
            </h1>

            {/* SUPPORTING TEXT (Clean 3-line wrap left-aligned with headline) */}
            <p className="text-white/90 text-[13.5px] min-[375px]:text-[14.5px] font-normal leading-[1.35] pt-3 max-w-[285px] sm:max-w-[310px]">
              Using <strong className="font-semibold text-white">advanced technology</strong>, we deliver comprehensive treatments for a healthy, <strong className="font-semibold text-white">confident smile</strong>.
            </p>
          </div>

        </div>

        {/* 3. HERO VISUAL (CLEAN 3-SPECIALISTS TOOTH) & CENTERED CIRCULAR CTA */}
        {/* Placed distinctly with generous clearance so all specialists' heads are completely visible */}
        <div className="relative z-10 w-full flex-grow flex flex-col items-center justify-end mt-1 min-[390px]:mt-2">
          
          <div className="relative w-full max-w-[460px] sm:max-w-[500px] flex justify-center items-end px-1 translate-y-2 min-[390px]:translate-y-4 sm:translate-y-6">
            {/* Pristine 3D Tooth with 3 specialists */}
            <img
              src="/images/hero-tooth-specialists-mobile.png"
              alt="Dental specialists precision treating tooth with advanced technology"
              className="w-full h-auto object-contain select-none pointer-events-none drop-shadow-2xl scale-[1.12] min-[390px]:scale-[1.16] sm:scale-[1.2] transform origin-bottom"
            />

            {/* Signature Circular Lime Booking CTA Centered right in the center of the tooth crown */}
            <div className="absolute left-1/2 -translate-x-1/2 bottom-[28%] min-[390px]:bottom-[30%] sm:bottom-[32%] z-30">
              <CircularBookingCTA onClick={onBookClick} size="md" />
            </div>
          </div>

        </div>

        {/* 4. SUBTLE WHATSAPP QUICK BUTTON */}
        <div className="absolute bottom-3 right-3 z-40 sm:bottom-4 sm:right-4">
          <a
            href={`https://wa.me/${clinicInfo.whatsapp}?text=Hello%20Dento%20Care,%20I%20would%20like%20to%20schedule%20an%20appointment.`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Direct WhatsApp consultation"
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-lg shadow-emerald-950/30 hover:bg-emerald-600 transition-all hover:scale-110 cursor-pointer"
          >
            <MessageCircle size={18} />
          </a>
        </div>

      </div>
    </section>
  );
};
