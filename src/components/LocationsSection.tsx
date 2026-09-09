import React from 'react';
import { MapPin, Phone, MessageCircle, Clock, ArrowUpRight } from 'lucide-react';
import { clinicLocations } from '../data/locations';

interface LocationsSectionProps {
  onBookClick: (branch?: string) => void;
}

export const LocationsSection: React.FC<LocationsSectionProps> = ({ onBookClick }) => {
  return (
    <section id="locations" className="relative w-full px-3 sm:px-6 md:px-8 lg:px-10 py-12 sm:py-20">
      <div className="max-w-[1520px] mx-auto">
        
        {/* SECTION HEADER */}
        <div className="px-4 mb-10 sm:mb-14">
          <div className="flex items-center gap-3 mb-3">
            <span className="w-2.5 h-2.5 rounded-full bg-[#3B82F6]" />
            <span className="text-xs sm:text-sm font-bold tracking-widest text-slate-600 uppercase">
              Clinic Network
            </span>
          </div>
          <h2 className="text-4xl sm:text-6xl font-light tracking-tight text-slate-900">
            Our Locations
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-2 max-w-xl">
            Experience world-class dental care across our modern clinics, equipped with digital imaging and comfortable treatment suites.
          </p>
        </div>

        {/* LOCATIONS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {clinicLocations.map((location) => {
            const isFlagship = location.isFlagship;

            return (
              <div
                key={location.id}
                className={`relative rounded-[32px] sm:rounded-[40px] p-8 sm:p-10 flex flex-col justify-between transition-all duration-300 shadow-xl ${
                  isFlagship
                    ? 'bg-[#5B9DE6] text-white shadow-sky-900/15 ring-2 ring-white/60'
                    : 'bg-white/80 backdrop-blur-md text-slate-800 border border-slate-200/80 shadow-slate-900/5 hover:border-sky-300'
                }`}
              >
                {/* TOP TAG & BADGE */}
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span
                      className={`text-xs font-bold tracking-widest px-3.5 py-1.5 rounded-full ${
                        isFlagship
                          ? 'bg-[#E5FE40] text-slate-900 shadow-sm'
                          : 'bg-slate-100 text-slate-600 border border-slate-200'
                      }`}
                    >
                      [ {location.tag} ]
                    </span>

                    {isFlagship ? (
                      <span className="text-xs font-semibold px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white border border-white/20">
                        Flagship Clinic
                      </span>
                    ) : (
                      <span className="text-xs font-semibold px-3 py-1 rounded-full bg-amber-50 text-amber-700 border border-amber-200">
                        Upcoming
                      </span>
                    )}
                  </div>

                  {/* BRANCH TITLE */}
                  <h3 className={`text-2xl sm:text-3xl font-light tracking-tight mb-4 ${isFlagship ? 'text-white' : 'text-slate-900'}`}>
                    {location.name}
                  </h3>

                  {/* ADDRESS */}
                  <div className="space-y-3 mb-6 text-sm">
                    <div className="flex items-start gap-3">
                      <MapPin size={18} className={`mt-0.5 flex-shrink-0 ${isFlagship ? 'text-[#E5FE40]' : 'text-blue-500'}`} />
                      <div className={isFlagship ? 'text-white/90' : 'text-slate-600'}>
                        <p className="font-semibold">{location.addressLine1}</p>
                        <p>{location.addressLine2}</p>
                        <p className="font-medium">{location.cityState}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <Clock size={18} className={`flex-shrink-0 ${isFlagship ? 'text-[#E5FE40]' : 'text-blue-500'}`} />
                      <span className={isFlagship ? 'text-white/85 text-xs' : 'text-slate-600 text-xs'}>
                        {location.hours}
                      </span>
                    </div>
                  </div>

                  {/* CLINIC HIGHLIGHTS */}
                  <div className="pt-4 border-t border-white/20 mb-8">
                    <span className={`text-[11px] font-bold uppercase tracking-wider block mb-2 ${isFlagship ? 'text-white/70' : 'text-slate-400'}`}>
                      Clinic Facilities
                    </span>
                    <ul className="space-y-1.5">
                      {location.features.map((feat, idx) => (
                        <li key={idx} className={`text-xs flex items-center gap-2 ${isFlagship ? 'text-white/90' : 'text-slate-600'}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${isFlagship ? 'bg-[#E5FE40]' : 'bg-blue-500'}`} />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* BOTTOM ACTION BUTTONS */}
                <div className="space-y-3 pt-2">
                  {isFlagship ? (
                    <>
                      <button
                        type="button"
                        onClick={() => onBookClick(location.name)}
                        className="w-full py-3.5 px-6 rounded-full bg-white text-slate-900 font-bold text-sm shadow-md hover:bg-slate-50 transition-all flex items-center justify-center gap-2 group cursor-pointer"
                      >
                        <span>Book Ponnani Appointment</span>
                        <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </button>

                      <div className="grid grid-cols-2 gap-2">
                        <a
                          href={`tel:${location.phone}`}
                          className="py-2.5 px-4 rounded-full bg-white/15 hover:bg-white/25 text-white text-xs font-semibold text-center flex items-center justify-center gap-1.5 transition-colors"
                        >
                          <Phone size={13} />
                          <span>Call Clinic</span>
                        </a>
                        <a
                          href={`https://wa.me/${location.whatsapp}?text=Hello%20Dento%20Care,%20I%20would%20like%20to%20inquire%20about%20a%20dental%20consultation.`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="py-2.5 px-4 rounded-full bg-[#25D366] text-white text-xs font-semibold text-center flex items-center justify-center gap-1.5 transition-opacity hover:opacity-90 shadow-sm"
                        >
                          <MessageCircle size={13} />
                          <span>WhatsApp</span>
                        </a>
                      </div>
                    </>
                  ) : (
                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 text-center text-xs text-slate-500">
                      <span>Expansion in progress • Opening soon</span>
                    </div>
                  )}
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
