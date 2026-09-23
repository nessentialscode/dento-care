import React, { useState, useRef, useEffect, useCallback } from 'react';
import { ArrowUpRight, ShieldCheck, MapPin, ChevronLeft, ChevronRight, Sparkles, X, Award, GraduationCap, CheckCircle2, Calendar, ArrowLeftRight } from 'lucide-react';
import { ponnaniDoctors, veliyancodeDoctors, type DoctorProfile } from '../data/doctors';
import { fetchDoctorAvailability, type DoctorRecord, normalizeDoctorName } from '../services/doctorService';

interface DoctorsSectionProps {
  onBookDoctor: (doctorName: string, branchName?: string) => void;
}

export const DoctorsSection: React.FC<DoctorsSectionProps> = ({ onBookDoctor }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [activeDotIndex, setActiveDotIndex] = useState(0);
  const [doctorPresenceMap, setDoctorPresenceMap] = useState<Record<string, boolean>>({});
  const [selectedDoctorForModal, setSelectedDoctorForModal] = useState<DoctorProfile | null>(null);
  const [selectedBranch, setSelectedBranch] = useState<'ponnani' | 'veliyancode'>('ponnani');
  const [isFlipped, setIsFlipped] = useState(false);

  const visibleDoctors = selectedBranch === 'veliyancode' ? veliyancodeDoctors : ponnaniDoctors;

  const handleToggleBranch = () => {
    setIsFlipped((prev) => {
      const nextFlipped = !prev;
      setSelectedBranch(nextFlipped ? 'veliyancode' : 'ponnani');
      return nextFlipped;
    });
    setActiveDotIndex(0);
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ left: 0, behavior: 'instant' });
    }
  };

  useEffect(() => {
    let isMounted = true;
    fetchDoctorAvailability()
      .then((records: DoctorRecord[]) => {
        if (!isMounted) return;
        const map: Record<string, boolean> = {};
        records.forEach((r) => {
          map[r.name.toLowerCase()] = r.is_present;
          map[normalizeDoctorName(r.name)] = r.is_present;
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
    if (doctorPresenceMap[key] !== undefined) return doctorPresenceMap[key];
    const norm = normalizeDoctorName(docName);
    if (doctorPresenceMap[norm] !== undefined) return doctorPresenceMap[norm];
    if (norm.includes('mufeed')) {
      for (const [k, v] of Object.entries(doctorPresenceMap)) {
        if (k.includes('mufeed')) return v;
      }
    }
    if (norm.includes('haris')) {
      for (const [k, v] of Object.entries(doctorPresenceMap)) {
        if (k.includes('haris')) return v;
      }
    }
    if (norm.includes('aslif')) {
      for (const [k, v] of Object.entries(doctorPresenceMap)) {
        if (k.includes('aslif')) return v;
      }
    }
    if (norm.includes('nidhash')) {
      for (const [k, v] of Object.entries(doctorPresenceMap)) {
        if (k.includes('nidhash')) return v;
      }
    }
    if (norm.includes('ratheesh')) {
      for (const [k, v] of Object.entries(doctorPresenceMap)) {
        if (k.includes('ratheesh')) return v;
      }
    }
    if (norm.includes('shoukath')) {
      for (const [k, v] of Object.entries(doctorPresenceMap)) {
        if (k.includes('shoukath')) return v;
      }
    }
    if (norm.includes('nasreen')) {
      for (const [k, v] of Object.entries(doctorPresenceMap)) {
        if (k.includes('nasreen')) return v;
      }
    }
    return true;
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
      setActiveDotIndex(Math.min(Math.max(index, 0), visibleDoctors.length - 1));
    }
  }, [visibleDoctors.length]);

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
              Experienced dental surgeons, academic professors, and specialists dedicated to gentle, personalized care backed by clinical precision and modern technology.
            </p>
          </div>

          {/* DESKTOP & TABLET CAROUSEL NAVIGATION CONTROLS & FLIP SWITCHER */}
          <div className="flex items-center gap-2.5 sm:gap-3 self-start md:self-end">
            
            {/* FLIP CARD SWITCHER */}
            <div
              onClick={handleToggleBranch}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleToggleBranch();
                }
              }}
              role="button"
              tabIndex={0}
              title="Click to flip clinic branch"
              className="order-last sm:order-first relative select-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#3B82F6] rounded-full group flex-shrink-0"
              style={{ perspective: '1000px' }}
              aria-label={`Switch branch location. Currently displaying ${isFlipped ? 'Veliyancode Clinic' : 'Ponnani Clinic'}`}
            >
              <div
                className="relative transition-transform duration-500 ease-out"
                style={{
                  transformStyle: 'preserve-3d',
                  transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
                  width: '100%',
                  minWidth: '190px',
                  height: '44px',
                }}
              >
                {/* FRONT FACE: PONNANI */}
                <div
                  className="absolute inset-0 flex items-center justify-between gap-2.5 pl-1.5 pr-2.5 sm:pl-2 sm:pr-3 bg-white/95 backdrop-blur-md rounded-full border border-slate-200/90 shadow-[0_2px_12px_-2px_rgba(37,99,235,0.12)] group-hover:shadow-[0_4px_18px_-2px_rgba(37,99,235,0.2)] group-hover:border-blue-300 transition-all"
                  style={{
                    backfaceVisibility: 'hidden',
                    WebkitBackfaceVisibility: 'hidden',
                  }}
                >
                  <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#2563EB] to-[#3B82F6] text-white flex items-center justify-center shadow-sm flex-shrink-0">
                      <MapPin size={15} strokeWidth={2.4} />
                    </div>
                    <div className="flex flex-col min-w-0 text-left">
                      <span className="text-xs sm:text-[13px] font-bold text-slate-800 tracking-tight leading-tight">
                        Ponnani
                      </span>
                      <span className="text-[10px] sm:text-[11px] text-slate-500 font-medium leading-none mt-0.5 truncate max-w-[95px] sm:max-w-[125px]">
                        KK Junction, Ponnani
                      </span>
                    </div>
                  </div>

                  <div className="w-7 h-7 rounded-full bg-blue-50 text-[#2563EB] flex items-center justify-center flex-shrink-0 border border-blue-200/60 group-hover:bg-blue-100 group-hover:rotate-180 transition-all duration-300">
                    <ArrowLeftRight size={13} strokeWidth={2.2} />
                  </div>
                </div>

                {/* BACK FACE: VELIYANCODE */}
                <div
                  className="absolute inset-0 flex items-center justify-between gap-2.5 pl-1.5 pr-2.5 sm:pl-2 sm:pr-3 bg-white/95 backdrop-blur-md rounded-full border border-slate-200/90 shadow-[0_2px_12px_-2px_rgba(37,99,235,0.12)] group-hover:shadow-[0_4px_18px_-2px_rgba(37,99,235,0.2)] group-hover:border-blue-300 transition-all"
                  style={{
                    backfaceVisibility: 'hidden',
                    WebkitBackfaceVisibility: 'hidden',
                    transform: 'rotateY(180deg)',
                  }}
                >
                  <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#2563EB] to-[#3B82F6] text-white flex items-center justify-center shadow-sm flex-shrink-0">
                      <MapPin size={15} strokeWidth={2.4} />
                    </div>
                    <div className="flex flex-col min-w-0 text-left">
                      <span className="text-xs sm:text-[13px] font-bold text-slate-800 tracking-tight leading-tight">
                        Veliyancode
                      </span>
                      <span className="text-[10px] sm:text-[11px] text-slate-500 font-medium leading-none mt-0.5 truncate max-w-[95px] sm:max-w-[125px]">
                        Medcity, Veliyancode
                      </span>
                    </div>
                  </div>

                  <div className="w-7 h-7 rounded-full bg-blue-50 text-[#2563EB] flex items-center justify-center flex-shrink-0 border border-blue-200/60 group-hover:bg-blue-100 group-hover:-rotate-180 transition-all duration-300">
                    <ArrowLeftRight size={13} strokeWidth={2.2} />
                  </div>
                </div>
              </div>
            </div>

            {/* Left Scroll Arrow */}
            <button
              type="button"
              onClick={() => scrollByAmount('left')}
              disabled={!canScrollLeft}
              aria-label="Scroll left"
              className={`order-1 sm:order-2 w-11 h-11 rounded-full flex items-center justify-center transition-all duration-200 border cursor-pointer flex-shrink-0 ${
                canScrollLeft
                  ? 'bg-white text-slate-900 hover:bg-[#E5FE40] hover:border-[#E5FE40] shadow-md hover:scale-105 active:scale-95 border-slate-200'
                  : 'bg-slate-100 text-slate-400 border-slate-200/60 cursor-not-allowed opacity-50'
              }`}
            >
              <ChevronLeft size={20} strokeWidth={2.5} />
            </button>

            {/* Right Scroll Arrow */}
            <button
              type="button"
              onClick={() => scrollByAmount('right')}
              disabled={!canScrollRight}
              aria-label="Scroll right"
              className={`order-2 sm:order-3 w-11 h-11 rounded-full flex items-center justify-center transition-all duration-200 border cursor-pointer flex-shrink-0 ${
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
            key={selectedBranch}
            ref={scrollRef}
            onScroll={updateScrollState}
            className="flex items-stretch gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth scrollbar-none py-4 px-1 -mx-1 animate-in fade-in duration-300"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {visibleDoctors.map((doc: DoctorProfile) => (
              <div
                key={doc.id}
                className="w-[85vw] sm:w-[calc((100%-24px)/2)] lg:w-[calc((100%-48px)/3)] min-w-[290px] sm:min-w-[320px] lg:min-w-[350px] flex-shrink-0 snap-start flex flex-col"
              >
                <div className="relative rounded-[34px] sm:rounded-[42px] overflow-hidden flex flex-col justify-between transition-all duration-300 shadow-xl group hover:shadow-2xl hover:-translate-y-1.5 bg-white text-slate-800 border border-slate-200/80 shadow-slate-900/5 h-full flex-grow">
                  
                  {/* DOCTOR IMAGE HEADER */}
                  <div
                    onClick={() => setSelectedDoctorForModal(doc)}
                    className="relative w-full h-80 sm:h-88 overflow-hidden bg-slate-100 flex-shrink-0 cursor-pointer"
                  >
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

                      <h3
                        onClick={() => setSelectedDoctorForModal(doc)}
                        className="text-2xl font-light tracking-tight mb-1 text-slate-900 leading-snug cursor-pointer hover:text-[#2563EB] transition-colors"
                      >
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
                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between mt-auto flex-shrink-0 gap-2">
                      <button
                        type="button"
                        onClick={() => setSelectedDoctorForModal(doc)}
                        className="text-xs font-semibold text-slate-600 hover:text-sky-600 transition-colors flex items-center gap-1 cursor-pointer py-1.5 px-2 rounded-lg hover:bg-slate-50"
                      >
                        <ShieldCheck size={15} className="text-blue-500" />
                        <span>View Profile</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          const branchName = selectedBranch === 'veliyancode' ? 'Dento Care — Veliyancode Clinic' : 'Dento Care — Ponnani Clinic';
                          onBookDoctor(isDocPresent(doc.name) ? doc.name : 'Any Available Specialist', branchName);
                        }}
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
            {visibleDoctors.map((doc: DoctorProfile, idx: number) => (
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
            Showing all {visibleDoctors.length} specialist faculty • {selectedBranch === 'veliyancode' ? 'Veliyancode Clinic' : 'Ponnani Flagship Clinic'} • Swipe or use arrows to explore
          </span>
        </div>

      </div>

      {/* DOCTOR FULL PROFILE MODAL */}
      {selectedDoctorForModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          <div
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-md transition-opacity"
            onClick={() => setSelectedDoctorForModal(null)}
          />

          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="doctor-profile-title"
            className="relative w-full max-w-2xl bg-white rounded-[32px] sm:rounded-[40px] shadow-2xl overflow-hidden z-10 animate-in fade-in zoom-in-95 duration-200 border border-sky-100 my-8 max-h-[90vh] flex flex-col"
          >
            {/* MODAL HEADER */}
            <div className="bg-[#5B9DE6] p-6 sm:p-8 text-white relative flex-shrink-0">
              <button
                type="button"
                onClick={() => setSelectedDoctorForModal(null)}
                className="absolute top-5 right-5 p-2 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors cursor-pointer"
                aria-label="Close profile"
              >
                <X size={20} />
              </button>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <img
                  src={selectedDoctorForModal.image}
                  alt={selectedDoctorForModal.name}
                  className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl sm:rounded-3xl object-cover object-top ring-4 ring-white/30 shadow-lg flex-shrink-0 bg-white/10"
                />

                <div className="space-y-1">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-xs font-semibold">
                    <span className="w-2 h-2 rounded-full bg-[#E5FE40]" />
                    <span>{selectedDoctorForModal.specialization}</span>
                  </div>

                  <h3 id="doctor-profile-title" className="text-2xl sm:text-3xl font-light text-white tracking-tight">
                    {selectedDoctorForModal.fullTitle || selectedDoctorForModal.name}
                  </h3>

                  <p className="text-white/90 text-xs sm:text-sm font-medium">
                    {selectedDoctorForModal.designation || selectedDoctorForModal.role}
                  </p>

                  <div className="flex flex-wrap items-center gap-3 pt-1 text-xs text-white/80">
                    <span className="flex items-center gap-1">
                      <span className="text-amber-300 font-bold">★</span> {selectedDoctorForModal.rating} ({selectedDoctorForModal.reviewCount} reviews)
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <MapPin size={12} className="text-[#E5FE40]" /> {selectedDoctorForModal.branch}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* MODAL BODY (SCROLLABLE) */}
            <div className="p-6 sm:p-8 overflow-y-auto space-y-6 text-slate-700">
              
              {/* ABOUT SECTION */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#3B82F6] mb-3 flex items-center gap-2">
                  <GraduationCap size={16} />
                  <span>About & Clinical Background</span>
                </h4>
                <div className="space-y-3 text-xs sm:text-sm leading-relaxed text-slate-600">
                  {selectedDoctorForModal.aboutParagraphs && selectedDoctorForModal.aboutParagraphs.length > 0 ? (
                    selectedDoctorForModal.aboutParagraphs.map((para, idx) => (
                      <p key={idx}>{para}</p>
                    ))
                  ) : (
                    <p>{selectedDoctorForModal.bio}</p>
                  )}
                </div>
              </div>

              {/* AREAS OF EXPERTISE */}
              {selectedDoctorForModal.expertise && selectedDoctorForModal.expertise.length > 0 && (
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#3B82F6] mb-3 flex items-center gap-2">
                    <Award size={16} />
                    <span>Areas of Clinical & Academic Expertise</span>
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {selectedDoctorForModal.expertise.map((exp, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-2 p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-xs sm:text-[13px] font-medium text-slate-800"
                      >
                        <CheckCircle2 size={15} className="text-emerald-500 flex-shrink-0 mt-0.5" />
                        <span>{exp}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* KEY HIGHLIGHTS & ACHIEVEMENTS */}
              {selectedDoctorForModal.achievements && selectedDoctorForModal.achievements.length > 0 && (
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#3B82F6] mb-3 flex items-center gap-2">
                    <Sparkles size={16} />
                    <span>Credentials & Milestones</span>
                  </h4>
                  <div className="space-y-2">
                    {selectedDoctorForModal.achievements.map((ach, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-2 text-xs sm:text-[13px] text-slate-600"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-[#3B82F6] flex-shrink-0" />
                        <span>{ach}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>

            {/* MODAL FOOTER */}
            <div className="p-4 sm:p-6 bg-slate-50 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 flex-shrink-0">
              <div className="text-xs text-slate-500 font-medium">
                Direct consultation appointment booking
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => setSelectedDoctorForModal(null)}
                  className="px-5 py-2.5 rounded-full text-xs font-bold text-slate-600 hover:bg-slate-200 transition-colors cursor-pointer w-full sm:w-auto text-center"
                >
                  Close
                </button>

                <button
                  type="button"
                  onClick={() => {
                    const docName = selectedDoctorForModal.name;
                    const branchName = selectedBranch === 'veliyancode' ? 'Dento Care — Veliyancode Clinic' : 'Dento Care — Ponnani Clinic';
                    setSelectedDoctorForModal(null);
                    onBookDoctor(isDocPresent(docName) ? docName : 'Any Available Specialist', branchName);
                  }}
                  className="px-6 py-2.5 rounded-full text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md bg-[#5B9DE6] text-white hover:bg-blue-600 hover:shadow-lg active:scale-95 w-full sm:w-auto"
                >
                  <Calendar size={14} />
                  <span>Book Consultation</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      )}
    </section>
  );
};


