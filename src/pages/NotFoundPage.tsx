import React, { useEffect } from 'react';
import { ArrowLeft, Home, Calendar, Phone, MessageCircle } from 'lucide-react';
import { clinicInfo } from '../data/clinicInfo';

interface NotFoundPageProps {
  onNavigateHome: () => void;
  onBookClick: () => void;
}

export const NotFoundPage: React.FC<NotFoundPageProps> = ({
  onNavigateHome,
  onBookClick,
}) => {
  useEffect(() => {
    const prevTitle = document.title;
    document.title = 'Page Not Found — Dento Care Dental Clinic';
    window.scrollTo({ top: 0, behavior: 'instant' });
    return () => {
      document.title = prevTitle;
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#D8EEE1] text-slate-900 flex flex-col selection:bg-[#E5FE40] selection:text-slate-900">
      {/* HEADER */}
      <header className="w-full px-4 sm:px-8 py-4 flex items-center justify-between border-b border-slate-900/10 bg-[#D8EEE1]/90 backdrop-blur-md">
        <button
          type="button"
          onClick={onNavigateHome}
          className="inline-flex items-center gap-2.5 select-none text-left cursor-pointer group"
        >
          <div className="w-9 h-9 rounded-xl bg-white shadow-sm flex items-center justify-center p-1 group-hover:scale-105 transition-transform duration-200">
            <img
              src="/images/dento-care-icon.png"
              alt="Dento Care logo"
              width={36}
              height={36}
              className="w-full h-full object-contain"
            />
          </div>
          <div className="flex flex-col justify-center">
            <span className="font-bold text-base tracking-tight text-slate-900 leading-tight">
              Dento Care
            </span>
            <span className="text-[9px] uppercase tracking-widest text-[#2A72C8] font-bold leading-none">
              Dental Clinic
            </span>
          </div>
        </button>

        <button
          type="button"
          onClick={onNavigateHome}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 hover:bg-white text-xs sm:text-sm font-semibold text-slate-700 transition-colors shadow-sm cursor-pointer"
        >
          <ArrowLeft size={15} />
          <span>Back to Home</span>
        </button>
      </header>

      {/* MAIN 404 CONTENT */}
      <main className="flex-1 flex items-center justify-center p-4 sm:p-8">
        <div className="w-full max-w-xl bg-white rounded-[32px] sm:rounded-[44px] shadow-xl border border-sky-100 p-8 sm:p-12 text-center relative overflow-hidden">
          {/* Accent decoration */}
          <div className="w-20 h-20 rounded-full bg-[#E5FE40] text-slate-900 font-extrabold text-2xl flex items-center justify-center mx-auto mb-6 shadow-md shadow-lime-300/30">
            404
          </div>

          <span className="inline-block text-xs font-bold uppercase tracking-widest text-[#2A72C8] mb-2">
            Error 404 • Page Not Found
          </span>

          <h1 className="text-2xl sm:text-4xl font-light text-slate-900 tracking-tight mb-3">
            We Couldn't Find That Page
          </h1>

          <p className="text-slate-600 text-xs sm:text-sm leading-relaxed max-w-md mx-auto mb-8">
            The page you are looking for may have been moved, removed, or the link may be mistyped. Return to our homepage or schedule an appointment with our specialist dental surgeons.
          </p>

          {/* ACTION BUTTONS */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-8">
            <button
              type="button"
              onClick={onNavigateHome}
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#111724] hover:bg-slate-800 text-white text-xs sm:text-sm font-bold shadow-md transition-all cursor-pointer"
            >
              <Home size={16} />
              <span>Return to Homepage</span>
            </button>

            <button
              type="button"
              onClick={onBookClick}
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#5B9DE6] hover:bg-blue-600 text-white text-xs sm:text-sm font-bold shadow-md transition-all cursor-pointer"
            >
              <Calendar size={16} />
              <span>Schedule Consultation</span>
            </button>
          </div>

          {/* CLINIC CONTACT PILL */}
          <div className="pt-6 border-t border-slate-100 flex flex-wrap items-center justify-center gap-4 text-xs text-slate-500">
            <a
              href={`tel:${clinicInfo.phone}`}
              className="inline-flex items-center gap-1.5 hover:text-slate-900 transition-colors"
            >
              <Phone size={13} className="text-[#5B9DE6]" />
              <span>{clinicInfo.phone}</span>
            </a>
            <span>•</span>
            <a
              href={`https://wa.me/${clinicInfo.whatsapp}?text=Hello%20Dento%20Care,%20I%20need%20assistance.`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-emerald-600 hover:text-emerald-700 font-medium transition-colors"
            >
              <MessageCircle size={13} />
              <span>WhatsApp Us</span>
            </a>
          </div>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="py-4 text-center text-xs text-slate-500 border-t border-slate-900/10">
        <p>© {new Date().getFullYear()} Dento Care Dental Clinic. Ponnani, Kerala.</p>
      </footer>
    </div>
  );
};
