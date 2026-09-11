import React, { useState, useEffect } from 'react';
import { CircularBookingCTA } from './CircularBookingCTA';
import { ArrowUpRight, X, MessageCircle, ChevronRight, Phone, MapPin } from 'lucide-react';
import { clinicInfo } from '../data/clinicInfo';

interface HeroMobileProps {
  onBookClick: () => void;
}

export const HeroMobile: React.FC<HeroMobileProps> = ({ onBookClick }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Lock body scroll and handle Escape key when mobile menu is open
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
      }
    };

    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { label: 'Treatments', href: '#treatments', note: 'Specialties' },
    { label: 'Locations', href: '#locations', note: 'Ponnani' },
    { label: 'Specialist Doctors', href: '#doctors', note: 'Team' },
    { label: 'Patient Reviews', href: '#reviews', note: '4.9 ★' },
    { label: 'Clinic Gallery', href: '#gallery', note: 'Inside View' },
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
              onClick={() => setMobileMenuOpen(true)}
              className="p-1.5 text-white/90 hover:text-white transition-colors cursor-pointer rounded-lg hover:bg-white/10"
              aria-label="Open navigation menu"
            >
              <div className="flex flex-col gap-[3.5px] items-end py-1">
                <span className="w-5 h-[1.5px] bg-white/90 rounded-full"></span>
                <span className="w-3 h-[1.5px] bg-white/75 rounded-full"></span>
                <span className="w-4.5 h-[1.5px] bg-white/90 rounded-full"></span>
              </div>
            </button>
          </div>

          {/* Under logo/header: one very thin horizontal divider line */}
          <div className="w-full h-[1px] bg-white/20" />
        </header>

        {/* PROFESSIONAL MOBILE NAVIGATION DRAWER (Slide-over with backdrop blur, zero layout shift) */}
        <div
          className={`fixed inset-0 z-50 transition-all duration-300 ${
            mobileMenuOpen ? 'opacity-100 pointer-events-auto visible' : 'opacity-0 pointer-events-none invisible'
          }`}
          aria-hidden={!mobileMenuOpen}
        >
          {/* Backdrop Overlay */}
          <div
            className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Slide-over White Drawer */}
          <div
            className={`absolute top-0 right-0 bottom-0 w-[86%] max-w-[340px] bg-white text-slate-900 shadow-2xl flex flex-col justify-between p-6 sm:p-7 overflow-y-auto transition-transform duration-300 ease-out ${
              mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
            }`}
          >
            {/* Top Drawer Header & Navigation */}
            <div>
              {/* Header row: Brand + Close button */}
              <div className="flex items-center justify-between pb-5 border-b border-slate-100">
                <div className="flex items-center gap-2.5 select-none">
                  <div className="w-9 h-9 rounded-xl bg-blue-50 border border-blue-100/80 flex items-center justify-center p-1.5 flex-shrink-0">
                    <img
                      src="/images/dento-care-icon.png"
                      alt="Dento Care Icon"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="flex flex-col justify-center">
                    <img
                      src="/images/dento-care-text-blue.png"
                      alt="DENTO CARE"
                      className="h-[17px] w-auto object-contain select-none"
                    />
                    <span className="text-[8.5px] uppercase tracking-[0.22em] text-blue-600 font-bold leading-none mt-1 select-none">
                      DENTAL CLINIC
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors cursor-pointer"
                  aria-label="Close navigation menu"
                >
                  <X size={18} strokeWidth={2.2} />
                </button>
              </div>

              {/* Navigation Links */}
              <nav className="py-5 flex flex-col gap-1">
                {navLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="group flex items-center justify-between px-3.5 py-3 rounded-xl text-slate-700 hover:text-blue-600 hover:bg-blue-50/70 font-semibold text-[15px] transition-all"
                  >
                    <span>{link.label}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-medium text-slate-400 group-hover:text-blue-500 transition-colors">
                        {link.note}
                      </span>
                      <ChevronRight size={16} className="text-slate-300 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all" />
                    </div>
                  </a>
                ))}
              </nav>
            </div>

            {/* Bottom Drawer Actions */}
            <div className="pt-4 border-t border-slate-100 space-y-3.5">
              {/* Quick Contact buttons */}
              <div className="grid grid-cols-2 gap-2">
                <a
                  href={`tel:${clinicInfo.phone}`}
                  className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-semibold border border-slate-200 transition-colors"
                >
                  <Phone size={13} className="text-blue-600" />
                  <span>Call Clinic</span>
                </a>
                <a
                  href={`https://wa.me/${clinicInfo.whatsapp}?text=Hello%20Dento%20Care,%20I%20would%20like%20to%20consult%20with%20a%20dentist.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-semibold border border-emerald-200 transition-colors"
                >
                  <MessageCircle size={13} className="text-emerald-600" />
                  <span>WhatsApp</span>
                </a>
              </div>

              {/* Primary Booking CTA */}
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onBookClick();
                }}
                className="w-full py-3.5 rounded-full bg-[#E5FE40] text-slate-900 font-bold text-sm text-center flex items-center justify-center gap-2 shadow-lg shadow-lime-400/20 cursor-pointer hover:bg-lime-300 transition-all active:scale-[0.98]"
              >
                <span>Book Appointment</span>
                <ArrowUpRight size={17} strokeWidth={2.2} />
              </button>

              <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-400 pt-0.5">
                <MapPin size={11} className="text-slate-400" />
                <span>Ponnani Flagship • Mon–Sat 9AM–8PM</span>
              </div>
            </div>
          </div>
        </div>

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
                    src="/images/doctor-lijeesh.jpg"
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
          <div className="absolute left-1/2 -translate-x-1/2 bottom-[17%] min-[390px]:bottom-[18%] sm:bottom-[19%] z-30">
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
