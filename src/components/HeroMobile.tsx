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
    <section className="relative w-full bg-[#5B9DE6] bg-gradient-to-b from-[#64A5ED] via-[#5B9DE6] to-[#4B92DE] text-white flex flex-col justify-between overflow-hidden min-h-[100svh]">
      
      {/* Ambient lighting matching grid cards */}
      <div className="absolute inset-0 bg-gradient-to-tr from-[#4B91E0]/50 via-[#5B9DE6]/20 to-[#72AEF1]/70 pointer-events-none" />

      {/* TOP BLOCK: Header + Thin Divider + Headline & Supporting Text */}
      <div className="relative z-20 w-full flex flex-col flex-shrink-0">
        
        {/* 1. TOP HEADER (BRAND + 3 THIN SHORT HORIZONTAL LINES DECORATIVE DIVIDER) */}
        <header className="relative z-30 w-full pt-4 min-[390px]:pt-5 px-5 sm:px-6">
          <div className="flex items-center justify-between pb-3 min-[390px]:pb-3.5">
            {/* LEFT: Clean Brand Logo + Exact Logo Typography & Favicon Icon */}
            <a href="#" className="flex items-center gap-2.5 group select-none">
              <div className="relative w-8 h-8 min-[390px]:w-9 min-[390px]:h-9 rounded-xl bg-white shadow-sm flex items-center justify-center p-1 group-hover:scale-105 transition-transform duration-300 flex-shrink-0">
                <img
                  src="/images/dento-care-icon.png"
                  alt="Dento Care Icon"
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex flex-col justify-center">
                <img
                  src="/images/dento-care-text-white.png"
                  alt="DENTO CARE"
                  className="h-[16px] min-[390px]:h-[18px] w-auto object-contain select-none"
                />
                <span className="text-[8px] min-[390px]:text-[8.5px] uppercase tracking-[0.24em] text-sky-100 font-bold leading-none mt-1 opacity-90 select-none">
                  DENTAL CLINIC
                </span>
              </div>
            </a>

            {/* RIGHT: Three very thin short horizontal lines as a minimal decorative divider & menu toggle */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 text-white/90 hover:text-white transition-colors cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? (
                <X size={22} strokeWidth={2} className="text-white" />
              ) : (
                <div className="flex flex-col gap-[3.5px] items-end py-1">
                  <span className="w-5 h-[1.5px] bg-white/90 rounded-full"></span>
                  <span className="w-3 h-[1.5px] bg-white/75 rounded-full"></span>
                  <span className="w-4.5 h-[1.5px] bg-white/90 rounded-full"></span>
                </div>
              )}
            </button>
          </div>

          {/* Under logo/header: one very thin horizontal divider line */}
          <div className="w-full h-[1px] bg-white/20" />
        </header>

        {/* MOBILE NAVIGATION DRAWER */}
        {mobileMenuOpen && (
          <div className="relative z-40 mx-5 mt-2 bg-white/95 backdrop-blur-xl rounded-2xl p-5 shadow-2xl border border-sky-100 flex flex-col gap-3 animate-in fade-in slide-in-from-top-3 duration-200">
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

        {/* 2. GRAND EDITORIAL HEADLINE (Preserving line breaks, clean thin font style, significantly increased) */}
        <div className="px-5 sm:px-6 pt-3 min-[390px]:pt-4">
          <h1 className="text-white text-[clamp(4.6rem,20.5vw,6.5rem)] font-light tracking-[-0.04em] leading-[0.82] select-none">
            <span className="block whitespace-nowrap">Restore</span>
            <span className="block whitespace-nowrap">Your True</span>
            
            {/* LINE 3: Smile + Overlapping Avatars & +2k Badge */}
            <div className="inline-flex items-center gap-2.5 sm:gap-3.5 whitespace-nowrap pt-1">
              <span className="tracking-[-0.03em]">Smile</span>
              
              {/* Overlapping Avatars + Solid White Circular +2k Badge */}
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
                <span className="ml-1.5 inline-flex items-center justify-center w-8 h-8 min-[390px]:w-9 min-[390px]:w-9 sm:w-10 sm:h-10 rounded-full bg-white shadow-md ring-2 ring-white">
                  <span className="text-slate-900 font-extrabold text-[12px] min-[390px]:text-[13px] leading-none tracking-tight">
                    +2k
                  </span>
                </span>
              </span>
            </div>
          </h1>

          {/* SUPPORTING TEXT (Clean 3-line wrap left-aligned with headline) */}
          <p className="text-white/90 text-[13.5px] min-[375px]:text-[14.5px] font-normal leading-[1.38] pt-3.5 max-w-[290px] sm:max-w-[320px]">
            Using <strong className="font-semibold text-white">advanced technology</strong>, we deliver comprehensive treatments for a healthy, <strong className="font-semibold text-white">confident smile</strong>.
          </p>
        </div>

      </div>

      {/* 3. HERO VISUAL (CLEAN 3-SPECIALISTS TOOTH) & CENTERED CIRCULAR CTA */}
      <div className="relative z-10 w-full flex-grow flex flex-col items-center justify-end mt-2 min-[390px]:mt-3">
        
        <div className="relative w-full max-w-[440px] sm:max-w-[480px] flex justify-center items-end px-2">
          {/* Pristine 3D Tooth with 3 specialists */}
          <img
            src="/images/hero-tooth-specialists-mobile.png"
            alt="Dental specialists precision treating tooth with advanced technology"
            className="w-full h-auto object-contain select-none pointer-events-none drop-shadow-2xl scale-[1.08] min-[390px]:scale-[1.12] transform origin-bottom"
          />

          {/* Signature Circular Lime Booking CTA Centered RIGHT IN THE MIDDLE OF THE TEETH IMAGE */}
          <div className="absolute left-1/2 -translate-x-1/2 bottom-[24%] min-[390px]:bottom-[25%] sm:bottom-[26%] z-30">
            <CircularBookingCTA
              onClick={onBookClick}
              size="md"
              text="• BOOK YOUR APPOINTMENT INSTANTLY "
            />
          </div>
        </div>

      </div>

      {/* 4. SUBTLE WHATSAPP QUICK BUTTON */}
      <div className="absolute bottom-12 right-4 z-40 sm:bottom-14 sm:right-6">
        <a
          href={`https://wa.me/${clinicInfo.whatsapp}?text=Hello%20Dento%20Care,%20I%20would%20like%20to%20schedule%20an%20appointment.`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Direct WhatsApp consultation"
          className="w-10 h-10 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-lg shadow-emerald-950/30 hover:bg-emerald-600 transition-all hover:scale-110 cursor-pointer"
        >
          <MessageCircle size={20} />
        </a>
      </div>

      {/* 5. SMOOTH ROUNDED SEPARATOR (Faithful to Reference Image) */}
      <div className="relative w-full leading-none z-20 pointer-events-none overflow-hidden -mb-px">
        <div className="w-full h-8 sm:h-11 bg-[#D8EEE1] rounded-t-[36px] min-[400px]:rounded-t-[44px] sm:rounded-t-[48px]" />
      </div>

    </section>
  );
};
