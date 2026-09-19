import React, { useState, useRef, useEffect, useCallback } from 'react';
import { ArrowUpRight, ShieldCheck, MapPin, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { clinicDoctors, type DoctorProfile } from '../data/doctors';
import { fetchDoctorAvailability, type DoctorRecord } from '../services/doctorService';

interface DoctorsSectionProps {
  onBookDoctor: (doctorName: string) => void;
}

export const DoctorsSection: React.FC<DoctorsSectionProps> = ({ onBookDoctor }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [activeDotIndex, setActiveDotIndex] = useState(0);
  const [doctorPresenceMap, setDoctorPresenceMap] = useState<Record<string, boolean>>({});

  useEffect(() => {
    let isMounted = true;
    fetchDoctorAvailability()
      .then((records: DoctorRecord[]) => {
        if (!isMounted) return;
        const map: Record<string, boolean> = {};
        records.forEach((r) => {
          map[r.name.toLowerCase()] = r.is_present;
        });
        setDoctorPresenceMap(map);
      })
      .catch((err) => {
        console.error('Failed to load doctor presence:', err);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const isDocPresent = (docName: string): boolean => {
    const key = docName.toLowerCase();
    return doctorPresenceMap[key] !== undefined ? doctorPresenceMap[key] : true;
  };

  const updateScrollState = useCallback(() => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setCanScrollLeft(scrollLeft > 20);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 20);

    // Calculate approximate active index for dots
    const firstChild = scrollRef.current.firstElementChild as HTMLElement;
    if (firstChild && clientWidth > 0) {
      const cardWidth = firstChild.offsetWidth + 24; // card width + gap
      const index = Math.round(scrollLeft / cardWidth);
      setActiveDotIndex(Math.min(Math.max(index, 0), clinicDoctors.length - 1));
    }
  }, []);

  useEffect(() => {
    updateScrollState();
    window.addEventListener('resize', updateScrollState);
    return () => window.removeEventListener('resize', updateScrollState);
  }, [updateScrollState]);

  const scrollByAmount = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const firstChild = scrollRef.current.firstElementChild as HTMLElement;
    const scrollStep = firstChild ? firstChild.offsetWidth + 24 : 380;
    scrollRef.current.scrollBy({
      left: direction === 'left' ? -scrollStep : scrollStep,
      behavior: 'smooth'
    });
  };

  const scrollToIndex = (index: number) => {
    if (!scrollRef.current) return;
    const firstChild = scrollRef.current.firstElementChild as HTMLElement;
    if (!firstChild) return;
    const cardWidth = firstChild.offsetWidth + 24;
    scrollRef.current.scrollTo({
      left: index * cardWidth,
      behavior: 'smooth'
    });
  };

  return (
    <section id="doctors" className="relative w-full px-3 sm:px-6 md:px-8 lg:px-10 py-12 sm:py-20">
      <div className="max-w-[1520px] mx-auto">
        
        {/* SECTION HEADER WITH NAV ARROWS */}
        <div className="px-4 mb-8 sm:mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl">
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

          {/* DESKTOP & TABLET CAROUSEL NAVIGATION CONTROLS */}
          <div className="flex items-center gap-3 self-start md:self-end">
            <div className="hidden sm:flex items-center gap-1.5 text-xs text-slate-500 font-semibold mr-2">
              <Sparkles size={14} className="text-[#3B82F6]" />
              <span>Scroll to view specialists</span>
            </div>

            <button
              type="button"
              onClick={() => scrollByAmount('left')}
              disabled={!canScrollLeft}
              aria-label="Scroll left"
              className={`w-11 h-11 rounded-full flex items-center justify-center transition-all duration-200 border cursor-pointer ${
                canScrollLeft
                  ? 'bg-white text-slate-900 hover:bg-[#E5FE40] hover:border-[#E5FE40] shadow-md hover:scale-105 active:scale-95 border-slate-200'
                  : 'bg-slate-100 text-slate-400 border-slate-200/60 cursor-not-allowed opacity-50'
              }`}
            >
              <ChevronLeft size={20} strokeWidth={2.5} />
            </button>

            <button
              type="button"
              onClick={() => scrollByAmount('right')}
              disabled={!canScrollRight}
              aria-label="Scroll right"
              className={`w-11 h-11 rounded-full flex items-center justify-center transition-all duration-200 border cursor-pointer ${
                canScrollRight
                  ? 'bg-white text-slate-900 hover:bg-[#E5FE40] hover:border-[#E5FE40] shadow-md hover:scale-105 active:scale-95 border-slate-200'
                  : 'bg-slate-100 text-slate-400 border-slate-200/60 cursor-not-allowed opacity-50'
              }`}
            >
              <ChevronRight size={20} strokeWidth={2.5} />
            </button>
          </div>
        </div>

        {/* HORIZONTAL SCROLLABLE DOCTOR GRIDS (~3 GRIDS VISIBLE ON DESKTOP) */}
        <div className="relative">
          <div
            ref={scrollRef}
            onScroll={updateScrollState}
            className="flex items-stretch gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth scrollbar-none py-4 px-1 -mx-1"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {clinicDoctors.map((doc: DoctorProfile) => (
              <div
                key={doc.id}
                className="w-[85vw] sm:w-[calc((100%-24px)/2)] lg:w-[calc((100%-48px)/3)] min-w-[290px] sm:min-w-[320px] lg:min-w-[350px] flex-shrink-0 snap-start flex flex-col"
              >
                <div className="relative rounded-[34px] sm:rounded-[42px] overflow-hidden flex flex-col justify-between transition-all duration-300 shadow-xl group hover:shadow-2xl hover:-translate-y-1.5 bg-white text-slate-800 border border-slate-200/80 shadow-slate-900/5 h-full flex-grow">
                  
                  {/* DOCTOR IMAGE HEADER */}
                  <div className="relative w-full h-80 sm:h-88 overflow-hidden bg-slate-100 flex-shrink-0">
                    <img
                      src={doc.image}
                      alt={`${doc.name} - ${doc.role}`}
                      width={1024}
                      height={1024}
                      loading="lazy"
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    />
                    
                    {/* Floating Rating Pill */}
                    <div className="absolute top-4 right-4 px-3.5 py-1.5 rounded-full bg-white/95 backdrop-blur-md shadow-md flex items-center gap-1.5 text-xs font-bold text-slate-800">
                      <span className="text-amber-400">★</span>
                      <span>{doc.rating}</span>
                      <span className="text-slate-400 font-normal">({doc.reviewCount})</span>
                    </div>

                    {/* Branch Pill */}
                    <div className="absolute bottom-4 left-4 px-3.5 py-1 rounded-full bg-slate-900/75 backdrop-blur-md text-white text-[11px] font-medium flex items-center gap-1.5 shadow-sm">
                      <MapPin size={12} className="text-[#E5FE40]" />
                      <span>{doc.branch}</span>
                    </div>
                  </div>

                  {/* DOCTOR DETAILS */}
                  <div className="p-6 sm:p-8 flex flex-col justify-between flex-grow">
                    <div className="flex flex-col flex-grow">
                      <div className="flex items-center justify-between gap-2 mb-2 min-h-[1.5rem]">
                        <span className="text-xs font-bold uppercase tracking-wider text-sky-600 line-clamp-1">
                          {doc.specialization}
                        </span>
                        <span
                          className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold flex-shrink-0 ${
                            isDocPresent(doc.name)
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200/80'
                              : 'bg-rose-50 text-rose-700 border border-rose-200/80'
                          }`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              isDocPresent(doc.name) ? 'bg-emerald-500' : 'bg-rose-500'
                            }`}
                          />
                          <span>{isDocPresent(doc.name) ? 'Present' : 'Absent'}</span>
                        </span>
                      </div>

                      <h3 className="text-2xl font-light tracking-tight mb-1 text-slate-900 leading-snug">
                        {doc.name}
                      </h3>

                      <p className="text-xs font-semibold mb-3 text-slate-500 line-clamp-1">
                        {doc.degrees && doc.experience ? `${doc.degrees} • ${doc.experience}` : (doc.degrees || doc.experience)}
                      </p>

                      <p className="text-xs sm:text-sm leading-relaxed mb-6 text-slate-600 flex-grow line-clamp-4 min-h-[4.5rem]">
                        {doc.bio}
                      </p>
                    </div>

                    {/* ACTION CTA */}
                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between mt-auto flex-shrink-0">
                      <div className="flex items-center gap-1.5 text-xs font-medium">
                        <ShieldCheck size={16} className="text-blue-500" />
                        <span className="text-slate-600">Verified Specialist</span>
                      </div>

                      <button
                        type="button"
                        onClick={() => onBookDoctor(isDocPresent(doc.name) ? doc.name : 'Any Available Specialist')}
                        className="px-5 py-2.5 rounded-full text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-sm bg-[#5B9DE6] text-white hover:bg-blue-600 hover:shadow-md active:scale-95"
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
        </div>

        {/* DOTS & MOBILE HELPER */}
        <div className="flex flex-col items-center justify-center gap-3 mt-8">
          <div className="flex items-center gap-2">
            {clinicDoctors.map((doc: DoctorProfile, idx: number) => (
              <button
                key={`dot-${doc.id}`}
                type="button"
                onClick={() => scrollToIndex(idx)}
                aria-label={`Scroll to ${doc.name}`}
                className={`transition-all duration-300 rounded-full cursor-pointer ${
                  activeDotIndex === idx
                    ? 'w-8 h-2.5 bg-[#3B82F6]'
                    : 'w-2.5 h-2.5 bg-slate-300 hover:bg-slate-400'
                }`}
              />
            ))}
          </div>
          <span className="text-xs font-semibold text-slate-500">
            Showing all {clinicDoctors.length} specialist faculty • Swipe or use arrows to explore
          </span>
        </div>

      </div>
    </section>
  );
};

