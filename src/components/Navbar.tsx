import React, { useState } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';

interface NavbarProps {
  onBookClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onBookClick }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Treatments', href: '#treatments' },
    { label: 'Locations', href: '#locations' },
    { label: 'Doctors', href: '#doctors' },
    { label: 'Reviews', href: '#reviews' },
    { label: 'Gallery', href: '#gallery' },
  ];

  return (
    <header className="w-full pt-4 sm:pt-5 lg:pt-6 px-6 sm:px-10 lg:px-12 relative z-30">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* LEFT: Dento Care Logo + Brand (Exact logo icon & distinctive typography) */}
        <a href="#" className="flex items-center gap-2.5 sm:gap-3 group select-none">
          <div className="relative w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 rounded-xl bg-white shadow-sm flex items-center justify-center p-1 group-hover:scale-105 transition-transform duration-300 flex-shrink-0">
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
              className="h-[17px] sm:h-[19px] lg:h-[21px] w-auto object-contain select-none"
            />
            <span className="text-[8.5px] sm:text-[9.5px] uppercase tracking-[0.24em] text-sky-100 font-bold leading-none mt-1 opacity-90 select-none">
              DENTAL CLINIC
            </span>
          </div>
        </a>

        {/* CENTER: Minimal Navigation Links (Desktop) */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-white/90 hover:text-white text-[14px] font-medium transition-all duration-200 hover:-translate-y-0.5"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* RIGHT: White Pill-Shaped CTA with Lime Arrow Accent */}
        <div className="hidden sm:flex items-center gap-4">
          <button
            type="button"
            onClick={onBookClick}
            className="group inline-flex items-center gap-2 pl-5 pr-1.5 py-1.5 rounded-full bg-white text-slate-800 text-[13px] font-semibold shadow-md shadow-sky-950/15 hover:shadow-lg hover:bg-white/95 transition-all duration-300 hover:scale-[1.02] cursor-pointer"
          >
            <span>Book Appointment</span>
            <div className="w-7 h-7 rounded-full bg-[#E5FE40] flex items-center justify-center text-slate-900 group-hover:rotate-45 transition-transform duration-300">
              <ArrowUpRight size={15} strokeWidth={2.6} />
            </div>
          </button>
        </div>

        {/* MOBILE MENU TOGGLE (Reference Image 2 hamburger) */}
        <div className="flex sm:hidden items-center gap-2">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2.5 rounded-full bg-white/15 text-white backdrop-blur-md hover:bg-white/25 transition-colors cursor-pointer"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* MOBILE DROPDOWN MENU */}
      {mobileMenuOpen && (
        <div className="sm:hidden absolute top-full left-6 right-6 mt-3 bg-white/95 backdrop-blur-xl rounded-3xl p-6 shadow-2xl border border-sky-100 flex flex-col gap-4 animate-in fade-in slide-in-from-top-4 duration-200 z-50">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="text-slate-800 font-medium text-base hover:text-blue-600 transition-colors py-1"
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
            className="w-full mt-2 py-3 rounded-full bg-[#E5FE40] text-slate-900 font-bold text-center flex items-center justify-center gap-2 shadow-md"
          >
            <span>Book Appointment</span>
            <ArrowUpRight size={18} />
          </button>
        </div>
      )}
    </header>
  );
};
