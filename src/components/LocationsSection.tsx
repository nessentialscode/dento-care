import React from 'react';
import { MapPin, Phone, MessageCircle, Clock, ArrowUpRight, Navigation, Globe, Star, Quote, Building2, ExternalLink, Image as ImageIcon } from 'lucide-react';
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
          <p className="text-slate-600 text-sm sm:text-base mt-2 max-w-2xl">
            Experience world-class dental care across our modern clinics in Ponnani & Veliyancode, equipped with digital diagnostics, expert specialists, and comfortable treatment suites.
          </p>
        </div>

        {/* LOCATIONS GRID (2 COLUMNS) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {clinicLocations.map((location) => {
            return (
              <div
                key={location.id}
                className="relative rounded-[32px] sm:rounded-[40px] p-7 sm:p-10 flex flex-col justify-between transition-all duration-300 shadow-xl bg-[#5B9DE6] text-white shadow-sky-900/15 ring-2 ring-white/60 overflow-hidden group"
              >
                {/* Background ambient lighting */}
                <div className="absolute -right-20 -top-20 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-sky-400/20 rounded-full blur-3xl pointer-events-none" />

                {/* TOP TAG, RATING & BADGE */}
                <div className="relative z-10">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-5">
                    <span className="text-xs font-bold tracking-widest px-3.5 py-1.5 rounded-full bg-[#E5FE40] text-slate-900 shadow-sm">
                      [ {location.tag} ]
                    </span>

                    <div className="flex items-center gap-2">
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-semibold border border-white/20">
                        <Star size={13} className="fill-amber-300 text-amber-300" />
                        <span>{location.rating}</span>
                        <span className="text-white/70">({location.reviewsCount})</span>
                      </div>

                      <span className="text-xs font-semibold px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white border border-white/20">
                        {location.badge}
                      </span>
                    </div>
                  </div>

                  {/* BRANCH TITLE */}
                  <h3 className="text-2xl sm:text-3xl font-light tracking-tight text-white mb-2 leading-tight">
                    {location.name}
                  </h3>

                  {/* LOCATED IN CHIP (IF APPLICABLE) */}
                  {location.locatedIn && (
                    <div className="mb-4">
                      {location.locatedInUrl ? (
                        <a
                          href={location.locatedInUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs text-sky-100 hover:text-white bg-white/15 hover:bg-white/25 px-3 py-1 rounded-full backdrop-blur-sm transition-colors border border-white/15"
                        >
                          <Building2 size={13} className="text-[#E5FE40]" />
                          <span>Located in: <strong className="font-semibold text-white">{location.locatedIn}</strong></span>
                          <ExternalLink size={11} className="opacity-80" />
                        </a>
                      ) : (
                        <div className="inline-flex items-center gap-1.5 text-xs text-sky-100 bg-white/15 px-3 py-1 rounded-full backdrop-blur-sm border border-white/15">
                          <Building2 size={13} className="text-[#E5FE40]" />
                          <span>Located at: <strong className="font-semibold text-white">{location.locatedIn}</strong></span>
                        </div>
                      )}
                    </div>
                  )}

                  {/* GOOGLE ACTION PILLS: WEBSITE, DIRECTIONS, PHOTOS */}
                  <div className="flex flex-wrap items-center gap-2 mb-6">
                    {location.websiteUrl && (
                      <a
                        href={location.websiteUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 hover:bg-white/25 text-white text-xs font-semibold border border-white/20 backdrop-blur-sm transition-colors"
                      >
                        <Globe size={12} className="text-[#E5FE40]" />
                        <span>Website</span>
                      </a>
                    )}

                    {location.directionsUrl && (
                      <a
                        href={location.directionsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 hover:bg-white/25 text-white text-xs font-semibold border border-white/20 backdrop-blur-sm transition-colors"
                      >
                        <Navigation size={12} className="text-[#E5FE40]" />
                        <span>Directions</span>
                      </a>
                    )}

                    {location.photoCount && (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/10 text-white/90 text-xs font-medium border border-white/15">
                        <ImageIcon size={12} className="text-white/70" />
                        <span>+{location.photoCount} Photos</span>
                      </span>
                    )}
                  </div>

                  {/* ADDRESS & HOURS */}
                  <div className="space-y-3 mb-6 text-sm">
                    <div className="flex items-start gap-3">
                      <MapPin size={18} className="mt-0.5 flex-shrink-0 text-[#E5FE40]" />
                      <div className="text-white/90">
                        <p className="font-semibold text-white">{location.addressLine1}</p>
                        {location.addressLine2 && <p>{location.addressLine2}</p>}
                        <p className="font-medium text-white/80">{location.cityState}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <Clock size={18} className="flex-shrink-0 text-[#E5FE40]" />
                      <div className="flex items-center gap-2 text-white/90 text-xs sm:text-sm">
                        <span className="inline-block w-2 h-2 rounded-full bg-emerald-300 animate-pulse" />
                        <span className="font-medium">{location.hours}</span>
                      </div>
                    </div>
                  </div>

                  {/* CLINIC FACILITIES */}
                  <div className="pt-4 border-t border-white/20 mb-5">
                    <span className="text-[11px] font-bold uppercase tracking-wider block mb-2 text-white/75">
                      Clinic Facilities & Services
                    </span>
                    <ul className="space-y-1.5">
                      {location.features.map((feat, idx) => (
                        <li key={idx} className="text-xs flex items-center gap-2 text-white/95">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#E5FE40]" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* PATIENT FEEDBACK QUOTE */}
                  {location.reviewQuotes && location.reviewQuotes.length > 0 && (
                    <div className="mb-6 p-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 text-xs text-white/90 flex items-start gap-2.5">
                      <Quote size={13} className="text-[#E5FE40] flex-shrink-0 mt-0.5" />
                      <p className="italic">"{location.reviewQuotes[0]}"</p>
                    </div>
                  )}
                </div>

                {/* BOTTOM ACTION BUTTONS */}
                <div className="relative z-10 space-y-2.5 pt-2">
                  <button
                    type="button"
                    onClick={() => onBookClick(location.name)}
                    className="w-full py-3.5 px-6 rounded-full bg-white text-slate-900 font-bold text-sm shadow-md hover:bg-[#E5FE40] hover:text-slate-950 transition-all flex items-center justify-center gap-2 group cursor-pointer"
                  >
                    <span>Book {location.shortName} Appointment</span>
                    <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </button>

                  <div className="grid grid-cols-2 gap-2">
                    <a
                      href={`tel:${location.phone}`}
                      className="py-2.5 px-3 rounded-full bg-white/15 hover:bg-white/25 text-white text-xs font-semibold text-center flex items-center justify-center gap-1.5 transition-colors border border-white/10"
                    >
                      <Phone size={13} />
                      <span className="truncate">Call {location.displayPhone}</span>
                    </a>
                    <a
                      href={`https://wa.me/${location.whatsapp}?text=${encodeURIComponent(`Hello Dento Care ${location.shortName}, I would like to inquire about a dental consultation.`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-2.5 px-3 rounded-full bg-[#25D366] text-white text-xs font-semibold text-center flex items-center justify-center gap-1.5 transition-opacity hover:opacity-90 shadow-sm"
                    >
                      <MessageCircle size={13} />
                      <span>WhatsApp</span>
                    </a>
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
