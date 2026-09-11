import React from 'react';
import { ArrowUpRight, MapPin, Phone, Mail, Clock, MessageCircle } from 'lucide-react';
import { clinicInfo } from '../data/clinicInfo';

interface FooterProps {
  onBookClick: () => void;
  onPrivacyClick?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onBookClick, onPrivacyClick }) => {
  return (
    <footer className="relative w-full px-3 sm:px-6 md:px-8 lg:px-10 pb-6 sm:pb-10 pt-10">
      <div className="max-w-[1520px] mx-auto bg-[#111724] rounded-[34px] sm:rounded-[48px] p-8 sm:p-14 lg:p-20 text-white shadow-2xl relative overflow-hidden">
        
        {/* Glow ambient background element */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#5B9DE6]/10 rounded-full blur-3xl pointer-events-none" />

        {/* TOP CTA CALLOUT */}
        <div className="pb-12 sm:pb-16 border-b border-slate-800 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <div className="max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-widest text-[#E5FE40] block mb-2">
              Ready for Your Consultation?
            </span>
            <h2 className="text-4xl sm:text-6xl font-light tracking-tight text-white leading-tight">
              Begin Your Journey to a Confident Smile Today.
            </h2>
          </div>

          <div className="flex flex-wrap gap-4">
            <button
              type="button"
              onClick={onBookClick}
              className="group px-8 py-4 rounded-full bg-[#E5FE40] text-slate-900 font-bold text-sm sm:text-base flex items-center gap-2 hover:bg-lime-300 transition-all shadow-lg shadow-lime-400/20 cursor-pointer"
            >
              <span>Book Appointment</span>
              <ArrowUpRight size={18} className="group-hover:rotate-45 transition-transform" />
            </button>

            <a
              href={`https://wa.me/${clinicInfo.whatsapp}?text=Hello%20Dento%20Care,%20I%20would%20like%20to%20consult%20with%20a%20dentist.`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-4 rounded-full bg-slate-800/80 hover:bg-slate-700 text-white font-semibold text-sm sm:text-base flex items-center gap-2 transition-colors border border-slate-700"
            >
              <MessageCircle size={18} className="text-[#25D366]" />
              <span>WhatsApp Consultation</span>
            </a>
          </div>
        </div>

        {/* MAIN FOOTER COLUMNS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 sm:gap-12 py-12 sm:py-16 border-b border-slate-800">
          
          {/* BRAND COLUMN (Span 4) */}
          <div className="lg:col-span-4 space-y-4">
            <a href="#" className="inline-flex items-center gap-2.5 sm:gap-3 group select-none">
              <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white shadow-sm flex items-center justify-center p-1 group-hover:scale-105 transition-transform duration-300 flex-shrink-0">
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
                  className="h-[18px] sm:h-[20px] w-auto object-contain select-none"
                />
                <span className="text-[9px] sm:text-[9.5px] uppercase tracking-[0.24em] text-sky-100 font-bold leading-none mt-1 opacity-90 select-none">
                  DENTAL CLINIC
                </span>
              </div>
            </a>

            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
              Premium multi-location dental clinic providing advanced oral implantology, microscopic root canal treatments, and cosmetic smile restorations.
            </p>

            <div className="pt-2 flex items-center gap-2">
              <span className="text-amber-400 text-sm">★★★★★</span>
              <span className="text-xs text-slate-300 font-semibold">4.9 Google Rating</span>
              <span className="text-xs text-slate-500">• 32+ Reviews</span>
            </div>
          </div>

          {/* QUICK LINKS (Span 2) */}
          <div className="lg:col-span-2 space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-slate-400 block mb-2">
              Navigation
            </span>
            <ul className="space-y-2 text-sm text-slate-300">
              <li><a href="#treatments" className="hover:text-white transition-colors">Treatments</a></li>
              <li><a href="#locations" className="hover:text-white transition-colors">Locations</a></li>
              <li><a href="#doctors" className="hover:text-white transition-colors">Specialist Doctors</a></li>
              <li><a href="#reviews" className="hover:text-white transition-colors">Patient Reviews</a></li>
              <li><a href="#gallery" className="hover:text-white transition-colors">Clinic Gallery</a></li>
            </ul>
          </div>

          {/* SERVICES (Span 3) */}
          <div className="lg:col-span-3 space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-slate-400 block mb-2">
              Key Treatments
            </span>
            <ul className="space-y-2 text-sm text-slate-300">
              <li><a href="#treatments" className="hover:text-white transition-colors">Dental Implants (Titanium)</a></li>
              <li><a href="#treatments" className="hover:text-white transition-colors">Single-Visit Root Canal</a></li>
              <li><a href="#treatments" className="hover:text-white transition-colors">Clear Invisible Aligners</a></li>
              <li><a href="#treatments" className="hover:text-white transition-colors">Laser Teeth Whitening</a></li>
              <li><a href="#treatments" className="hover:text-white transition-colors">Porcelain Veneers & Crowns</a></li>
              <li><a href="#treatments" className="hover:text-white transition-colors">Preventive Pediatric Care</a></li>
            </ul>
          </div>

          {/* CONTACT INFO (Span 3) */}
          <div className="lg:col-span-3 space-y-4 text-xs sm:text-sm">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#E5FE40] block mb-1">
                Ponnani Flagship Clinic
              </span>
              <div className="flex items-start gap-2 text-slate-300 text-xs mb-1">
                <MapPin size={13} className="mt-0.5 text-[#E5FE40] flex-shrink-0" />
                <span>KK Junction, near ISS School, Ponnani, Kerala 679577</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <Phone size={13} className="text-[#E5FE40]" />
                <a href={`tel:${clinicInfo.phone.replace(/\s+/g, '')}`} className="hover:text-white transition-colors">{clinicInfo.phone}</a>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-800">
              <span className="text-xs font-bold uppercase tracking-widest text-[#E5FE40] block mb-1">
                Veliyancode Clinic
              </span>
              <div className="flex items-start gap-2 text-slate-300 text-xs mb-1">
                <MapPin size={13} className="mt-0.5 text-[#E5FE40] flex-shrink-0" />
                <span>Medcity hospital, Veliyancode, Ponnani 679579</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <Phone size={13} className="text-[#E5FE40]" />
                <a href="tel:07025215151" className="hover:text-white transition-colors">070252 15151</a>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-800 space-y-1.5 text-xs text-slate-400">
              <div className="flex items-center gap-2 text-slate-300">
                <Mail size={13} className="text-[#E5FE40]" />
                <a href={`mailto:${clinicInfo.email}`} className="hover:text-white transition-colors">{clinicInfo.email}</a>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <Clock size={13} className="text-[#E5FE40]" />
                <span>Mon – Sat: 9AM – 8PM (Veliyancode: Closes 7PM)</span>
              </div>
            </div>
          </div>

        </div>

        {/* COPYRIGHT BOTTOM BAR */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© {new Date().getFullYear()} Dento Care Dental Clinic. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a
              href="/privacy-policy"
              onClick={(e) => {
                if (onPrivacyClick) {
                  e.preventDefault();
                  onPrivacyClick();
                }
              }}
              className="hover:text-white transition-colors"
            >
              Privacy Policy
            </a>
            <a href="#" className="hover:text-white transition-colors">Terms of Care</a>
            <a href="#treatments" className="hover:text-white transition-colors">Patient Guidance</a>
          </div>
        </div>

      </div>
    </footer>
  );
};
