import React from 'react';
import { Camera } from 'lucide-react';

export const GallerySection: React.FC = () => {
  return (
    <section id="gallery" className="relative w-full px-3 sm:px-6 md:px-8 lg:px-10 py-12 sm:py-20">
      <div className="max-w-[1520px] mx-auto">
        
        {/* SECTION HEADER */}
        <div className="px-4 mb-10 sm:mb-14 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="w-2.5 h-2.5 rounded-full bg-[#3B82F6]" />
              <span className="text-xs sm:text-sm font-bold tracking-widest text-slate-600 uppercase">
                Clinic Atmosphere
              </span>
            </div>
            <h2 className="text-4xl sm:text-6xl font-light tracking-tight text-slate-900">
              Inside Dento Care
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-2 max-w-xl">
              An architectural haven designed to banish clinical anxiety through soothing mint palettes, ergonomic comfort, and surgical-grade sterilization.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 bg-white px-4 py-2 rounded-full border border-slate-200 shadow-sm">
            <Camera size={16} className="text-[#3B82F6]" />
            <span>Ponnani Flagship Suite</span>
          </div>
        </div>

        {/* ASYMMETRIC EDITORIAL GALLERY GRID (~60% LOUNGE / ~40% OPERATORY ON DESKTOP) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-stretch">
          
          {/* CARD 1 (FIRST): CONSULTATION LOUNGE & RECEPTION (~60% WIDE ON DESKTOP) */}
          <div className="lg:col-span-7 relative bg-white rounded-[32px] sm:rounded-[40px] lg:rounded-[44px] overflow-hidden shadow-xl shadow-slate-900/10 border border-white/60 group h-[390px] min-[420px]:h-[440px] md:h-[500px] lg:h-[560px] xl:h-[600px]">
            <img
              src="/images/clinic-lounge-dento-care.jpg"
              alt="Dento Care reception desk with branded wooden wall logo and comfortable patient consultation lounge"
              className="w-full h-full object-cover object-[center_28%] group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent opacity-90 group-hover:opacity-95 transition-opacity" />
            <div className="absolute bottom-6 sm:bottom-8 left-6 sm:left-8 right-6 sm:right-8 text-white">
              <span className="text-[11px] sm:text-xs font-bold uppercase tracking-widest text-[#E5FE40] block mb-1.5 drop-shadow-sm">
                Consultation Lounge
              </span>
              <h3 className="text-xl sm:text-2xl lg:text-[1.7rem] font-light leading-snug text-white">
                Comfortable, Calming Patient Welcome Area
              </h3>
            </div>
          </div>

          {/* CARD 2 (SECOND): OPERATORY SUITE (~40% REMAINING DESKTOP SPACE) */}
          <div className="lg:col-span-5 relative bg-white rounded-[32px] sm:rounded-[40px] lg:rounded-[44px] overflow-hidden shadow-xl shadow-slate-900/10 border border-white/60 group h-[390px] min-[420px]:h-[440px] md:h-[500px] lg:h-[560px] xl:h-[600px]">
            <img
              src="/images/clinic-operatory-dento-care.jpg"
              alt="Dento Care state-of-the-art treatment operatory and ergonomic dental chair with panoramic palm tree view"
              className="w-full h-full object-cover object-[center_35%] group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent opacity-90 group-hover:opacity-95 transition-opacity" />
            <div className="absolute bottom-6 sm:bottom-8 left-6 sm:left-8 right-6 sm:right-8 text-white">
              <span className="text-[11px] sm:text-xs font-bold uppercase tracking-widest text-[#E5FE40] block mb-1.5 drop-shadow-sm">
                Operatory Suite 01
              </span>
              <h3 className="text-xl sm:text-2xl lg:text-[1.7rem] font-light leading-snug text-white">
                Ergonomic Patient Suite with Digital 3D Imaging
              </h3>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
