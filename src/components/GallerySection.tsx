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

        {/* ASYMMETRIC GALLERY GRID */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 items-stretch">
          
          {/* LARGE MAIN IMAGE: TREATMENT SUITE (SPAN 7) */}
          <div className="md:col-span-7 relative bg-white rounded-[34px] sm:rounded-[44px] overflow-hidden shadow-xl shadow-slate-900/10 group min-h-[380px] sm:min-h-[460px]">
            <img
              src="/images/clinic-treatment-room.jpg"
              alt="Dento Care state-of-the-art treatment operatory and dental chair"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <span className="text-[11px] font-bold uppercase tracking-widest text-[#E5FE40] block mb-1">
                Operatory Suite 01
              </span>
              <h3 className="text-xl sm:text-2xl font-light">
                Ergonomic Patient Suite with Digital 3D Imaging
              </h3>
            </div>
          </div>

          {/* SECONDARY IMAGE: RECEPTION & LOUNGE (SPAN 5) */}
          <div className="md:col-span-5 relative bg-white rounded-[34px] sm:rounded-[44px] overflow-hidden shadow-xl shadow-slate-900/10 group min-h-[380px] sm:min-h-[460px]">
            <img
              src="/images/clinic-reception.jpg"
              alt="Warm welcoming contemporary clinic reception and waiting lounge"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <span className="text-[11px] font-bold uppercase tracking-widest text-[#E5FE40] block mb-1">
                Consultation Lounge
              </span>
              <h3 className="text-xl sm:text-2xl font-light">
                Comfortable, Calming Patient Welcome Area
              </h3>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
