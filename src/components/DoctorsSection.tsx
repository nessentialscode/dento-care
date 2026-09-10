import React, { useState, useRef } from 'react';
import { ArrowUpRight, ShieldCheck, MapPin, ChevronLeft, ChevronRight } from 'lucide-react';
import { clinicDoctors, type DoctorProfile } from '../data/doctors';

interface DoctorsSectionProps {
  onBookDoctor: (doctorName: string) => void;
}

export const DoctorsSection: React.FC<DoctorsSectionProps> = ({ onBookDoctor }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Exactly 2 doctor cards for the carousel
  const carouselDoctors: DoctorProfile[] = clinicDoctors.slice(0, 2);

  const scrollToIndex = (index: number) => {
    if (!scrollRef.current) return;
    const containerWidth = scrollRef.current.clientWidth;
    scrollRef.current.scrollTo({
      left: index * containerWidth,
      behavior: 'smooth',
    });
    setCurrentIndex(index);
  };

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, clientWidth } = scrollRef.current;
    if (clientWidth > 0) {
      const newIndex = Math.round(scrollLeft / clientWidth);
      if (newIndex >= 0 && newIndex < carouselDoctors.length && newIndex !== currentIndex) {
        setCurrentIndex(newIndex);
      }
    }
  };

  return (
    <section id="doctors" className="relative w-full px-3 sm:px-6 md:px-8 lg:px-10 py-12 sm:py-20">
      <div className="max-w-[1520px] mx-auto">
        
        {/* SECTION HEADER */}
        <div className="px-4 mb-10 sm:mb-14 text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-3 mb-3">
            <span className="w-2.5 h-2.5 rounded-full bg-[#3B82F6]" />
            <span className="text-xs sm:text-sm font-bold tracking-widest text-slate-600 uppercase">
              Specialist Faculty
            </span>
          </div>
          <h2 className="text-4xl sm:text-6xl font-light tracking-tight text-slate-900">
            Meet Our Doctors
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-2">
            Experienced dental surgeons and specialists dedicated to gentle, personalized care backed by clinical precision and modern technology.
          </p>
        </div>

        {/* MOBILE & TABLET: 2-CARD HORIZONTAL CAROUSEL (Untouched for mobile mode) */}
        <div className="block lg:hidden">
          <div className="relative max-w-[480px] sm:max-w-[500px] mx-auto px-2">
            
            {/* TABLET CHEVRON NAVIGATION (LEFT) */}
            <button
              type="button"
              onClick={() => scrollToIndex(0)}
              disabled={currentIndex === 0}
              aria-label="Previous doctor"
              className={`hidden sm:flex absolute -left-6 md:-left-16 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white text-slate-800 shadow-xl border border-slate-200 items-center justify-center transition-all duration-300 ${
                currentIndex === 0
                  ? 'opacity-30 cursor-not-allowed scale-95'
                  : 'opacity-95 hover:opacity-100 hover:bg-[#E5FE40] hover:scale-110 cursor-pointer'
              }`}
            >
              <ChevronLeft size={22} strokeWidth={2.4} />
            </button>

            {/* TABLET CHEVRON NAVIGATION (RIGHT) */}
            <button
              type="button"
              onClick={() => scrollToIndex(1)}
              disabled={currentIndex === 1}
              aria-label="Next doctor"
              className={`hidden sm:flex absolute -right-6 md:-right-16 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white text-slate-800 shadow-xl border border-slate-200 items-center justify-center transition-all duration-300 ${
                currentIndex === 1
                  ? 'opacity-30 cursor-not-allowed scale-95'
                  : 'opacity-95 hover:opacity-100 hover:bg-[#E5FE40] hover:scale-110 cursor-pointer'
              }`}
            >
              <ChevronRight size={22} strokeWidth={2.4} />
            </button>

            {/* HORIZONTAL SCROLL TRACK (CSS SCROLL SNAP, TOUCH SWIPE & SMOOTH SCROLL) */}
            <div
              ref={scrollRef}
              onScroll={handleScroll}
              className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth scrollbar-none w-full p-2 -m-2"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {carouselDoctors.map((doc: DoctorProfile) => (
                <div
                  key={doc.id}
                  className="w-full flex-shrink-0 snap-center px-1"
                >
                    <div
                      className="relative rounded-[34px] sm:rounded-[44px] overflow-hidden flex flex-col justify-between transition-all duration-300 shadow-xl group hover:shadow-2xl bg-white text-slate-800 border border-slate-200 shadow-slate-900/5"
                    >
                      {/* DOCTOR IMAGE HEADER */}
                      <div className="relative w-full h-72 sm:h-80 overflow-hidden bg-slate-100">
                        <img
                          src={doc.image}
                          alt={doc.name}
                          className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                        />
                        
                        {/* Floating Rating Pill */}
                        <div className="absolute top-4 right-4 px-3 py-1.5 rounded-full bg-white/95 backdrop-blur-md shadow-md flex items-center gap-1.5 text-xs font-bold text-slate-800">
                          <span className="text-amber-400">★</span>
                          <span>{doc.rating}</span>
                          <span className="text-slate-400 font-normal">({doc.reviewCount})</span>
                        </div>

                        {/* Branch Pill */}
                        <div className="absolute bottom-4 left-4 px-3 py-1 rounded-full bg-slate-900/70 backdrop-blur-md text-white text-[11px] font-medium flex items-center gap-1">
                          <MapPin size={12} className="text-[#E5FE40]" />
                          <span>{doc.branch}</span>
                        </div>
                      </div>

                      {/* DOCTOR DETAILS */}
                      <div className="p-6 sm:p-8 flex flex-col justify-between flex-grow">
                        <div>
                          <div className="flex items-center gap-2 mb-1 text-xs font-bold uppercase tracking-wider text-sky-600">
                            <span>{doc.specialization}</span>
                          </div>

                          <h3 className="text-2xl sm:text-3xl font-light tracking-tight mb-2 text-slate-900">
                            {doc.name}
                          </h3>

                          <p className="text-xs font-semibold mb-3 text-slate-500">
                            {doc.degrees && doc.experience ? `${doc.degrees} • ${doc.experience}` : (doc.degrees || doc.experience)}
                          </p>

                          <p className="text-xs sm:text-sm leading-relaxed mb-6 text-slate-600">
                            {doc.bio}
                          </p>
                        </div>

                        {/* ACTION CTA */}
                        <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                          <div className="flex items-center gap-1.5 text-xs font-medium">
                            <ShieldCheck size={16} className="text-blue-500" />
                            <span className="text-slate-600">Verified Specialist</span>
                          </div>

                          <button
                            type="button"
                            onClick={() => onBookDoctor(doc.name)}
                            className="px-4 py-2 rounded-full text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-sm bg-[#5B9DE6] text-white hover:bg-blue-600"
                          >
                            <span>Consult</span>
                            <ArrowUpRight size={14} />
                          </button>
                        </div>

                      </div>

                  </div>
                </div>
              ))}
            </div>

            {/* DOT INDICATORS & CONTROLS */}
            <div className="flex flex-col items-center justify-center gap-2.5 mt-6">
              <div className="flex items-center gap-2">
                {carouselDoctors.map((doc: DoctorProfile, idx: number) => (
                  <button
                    key={doc.id}
                    type="button"
                    onClick={() => scrollToIndex(idx)}
                    aria-label={`View ${doc.name}`}
                    className={`transition-all duration-300 rounded-full cursor-pointer ${
                      currentIndex === idx
                        ? 'w-8 h-2.5 bg-[#3B82F6]'
                        : 'w-2.5 h-2.5 bg-slate-300 hover:bg-slate-400'
                    }`}
                  />
                ))}
              </div>
              <div className="flex sm:hidden items-center justify-center gap-4 mt-2">
                <button
                  type="button"
                  onClick={() => scrollToIndex(0)}
                  disabled={currentIndex === 0}
                  className={`p-2 rounded-full bg-white shadow-md border border-slate-200 text-slate-700 ${currentIndex === 0 ? 'opacity-30' : 'opacity-100'}`}
                  aria-label="Previous"
                >
                  <ChevronLeft size={18} />
                </button>
                <span className="text-xs font-semibold text-slate-500">
                  {currentIndex + 1} / {carouselDoctors.length}
                </span>
                <button
                  type="button"
                  onClick={() => scrollToIndex(1)}
                  disabled={currentIndex === 1}
                  className={`p-2 rounded-full bg-white shadow-md border border-slate-200 text-slate-700 ${currentIndex === 1 ? 'opacity-30' : 'opacity-100'}`}
                  aria-label="Next"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
              <span className="hidden sm:inline-block text-xs font-semibold text-slate-500">
                {currentIndex + 1} of {carouselDoctors.length} • {carouselDoctors[currentIndex].name} (Swipe or click arrows to view)
              </span>
            </div>

          </div>
        </div>

        {/* DESKTOP: PROFESSIONAL 2-GRID LAYOUT (Side-by-side) */}
        <div className="hidden lg:grid lg:grid-cols-2 gap-8 xl:gap-10 max-w-[1060px] xl:max-w-[1140px] mx-auto">
          {carouselDoctors.map((doc: DoctorProfile) => (
            <div
              key={`desktop-${doc.id}`}
              className="relative rounded-[38px] xl:rounded-[44px] overflow-hidden flex flex-col justify-between transition-all duration-300 shadow-xl group hover:shadow-2xl hover:-translate-y-1.5 bg-white text-slate-800 border border-slate-200/80 shadow-slate-900/5 h-full"
            >
              {/* DOCTOR IMAGE HEADER */}
              <div className="relative w-full h-80 xl:h-88 overflow-hidden bg-slate-100">
                <img
                  src={doc.image}
                  alt={doc.name}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                />
                
                {/* Floating Rating Pill */}
                <div className="absolute top-4 right-4 px-3.5 py-1.5 rounded-full bg-white/95 backdrop-blur-md shadow-md flex items-center gap-1.5 text-xs font-bold text-slate-800">
                  <span className="text-amber-400">★</span>
                  <span>{doc.rating}</span>
                  <span className="text-slate-400 font-normal">({doc.reviewCount})</span>
                </div>

                {/* Branch Pill */}
                <div className="absolute bottom-4 left-4 px-3 py-1 rounded-full bg-slate-900/70 backdrop-blur-md text-white text-[11px] font-medium flex items-center gap-1">
                  <MapPin size={12} className="text-[#E5FE40]" />
                  <span>{doc.branch}</span>
                </div>
              </div>

              {/* DOCTOR DETAILS */}
              <div className="p-7 xl:p-8 flex flex-col justify-between flex-grow">
                <div>
                  <div className="flex items-center gap-2 mb-1.5 text-xs font-bold uppercase tracking-wider text-sky-600">
                    <span>{doc.specialization}</span>
                  </div>

                  <h3 className="text-2xl xl:text-3xl font-light tracking-tight mb-2 text-slate-900">
                    {doc.name}
                  </h3>

                  <p className="text-xs font-semibold mb-3 text-slate-500">
                    {doc.degrees && doc.experience ? `${doc.degrees} • ${doc.experience}` : (doc.degrees || doc.experience)}
                  </p>

                  <p className="text-xs sm:text-sm leading-relaxed mb-6 text-slate-600">
                    {doc.bio}
                  </p>
                </div>

                {/* ACTION CTA */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between mt-auto">
                  <div className="flex items-center gap-1.5 text-xs font-medium">
                    <ShieldCheck size={16} className="text-blue-500" />
                    <span className="text-slate-600">Verified Specialist</span>
                  </div>

                  <button
                    type="button"
                    onClick={() => onBookDoctor(doc.name)}
                    className="px-5 py-2.5 rounded-full text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-sm bg-[#5B9DE6] text-white hover:bg-blue-600 hover:shadow-md active:scale-95"
                  >
                    <span>Consult</span>
                    <ArrowUpRight size={14} />
                  </button>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
