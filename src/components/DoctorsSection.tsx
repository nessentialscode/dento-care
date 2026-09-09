import React from 'react';
import { ArrowUpRight, ShieldCheck, MapPin } from 'lucide-react';
import { clinicDoctors, type DoctorProfile } from '../data/doctors';

interface DoctorsSectionProps {
  onBookDoctor: (doctorName: string) => void;
}

export const DoctorsSection: React.FC<DoctorsSectionProps> = ({ onBookDoctor }) => {
  return (
    <section id="doctors" className="relative w-full px-3 sm:px-6 md:px-8 lg:px-10 py-12 sm:py-20">
      <div className="max-w-[1520px] mx-auto">
        
        {/* SECTION HEADER */}
        <div className="px-4 mb-10 sm:mb-14">
          <div className="flex items-center gap-3 mb-3">
            <span className="w-2.5 h-2.5 rounded-full bg-[#3B82F6]" />
            <span className="text-xs sm:text-sm font-bold tracking-widest text-slate-600 uppercase">
              Specialist Faculty
            </span>
          </div>
          <h2 className="text-4xl sm:text-6xl font-light tracking-tight text-slate-900">
            Meet Our Doctors
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-2 max-w-xl">
            Experienced dental surgeons and specialists dedicated to gentle, personalized care backed by clinical precision and modern technology.
          </p>
        </div>

        {/* DOCTORS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {clinicDoctors.map((doc: DoctorProfile) => {
            const isChief = doc.id === 'dr-reed';

            return (
              <div
                key={doc.id}
                className={`relative rounded-[34px] sm:rounded-[44px] overflow-hidden flex flex-col justify-between transition-all duration-300 shadow-xl group hover:shadow-2xl hover:-translate-y-1 ${
                  isChief
                    ? 'bg-[#5B9DE6] text-white shadow-sky-900/20 ring-2 ring-white/60'
                    : 'bg-white text-slate-800 border border-slate-200 shadow-slate-900/5'
                }`}
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
                    <div className="flex items-center gap-2 mb-1 text-xs font-bold uppercase tracking-wider text-sky-400">
                      <span>{doc.specialization}</span>
                    </div>

                    <h3 className={`text-2xl sm:text-3xl font-light tracking-tight mb-2 ${isChief ? 'text-white' : 'text-slate-900'}`}>
                      {doc.name}
                    </h3>

                    <p className={`text-xs font-semibold mb-3 ${isChief ? 'text-white/80' : 'text-slate-500'}`}>
                      {doc.degrees} • {doc.experience}
                    </p>

                    <p className={`text-xs sm:text-sm leading-relaxed mb-6 ${isChief ? 'text-white/85' : 'text-slate-600'}`}>
                      {doc.bio}
                    </p>
                  </div>

                  {/* ACTION CTA */}
                  <div className={`pt-4 border-t ${isChief ? 'border-white/20' : 'border-slate-100'} flex items-center justify-between`}>
                    <div className="flex items-center gap-1.5 text-xs font-medium">
                      <ShieldCheck size={16} className={isChief ? 'text-[#E5FE40]' : 'text-blue-500'} />
                      <span className={isChief ? 'text-white/90' : 'text-slate-600'}>Verified Specialist</span>
                    </div>

                    <button
                      type="button"
                      onClick={() => onBookDoctor(doc.name)}
                      className={`px-4 py-2 rounded-full text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-sm ${
                        isChief
                          ? 'bg-white text-slate-900 hover:bg-[#E5FE40]'
                          : 'bg-[#5B9DE6] text-white hover:bg-blue-600'
                      }`}
                    >
                      <span>Consult</span>
                      <ArrowUpRight size={14} />
                    </button>
                  </div>

                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
