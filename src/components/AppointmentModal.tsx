import React, { useState, useEffect } from 'react';
import { X, MessageCircle, CheckCircle2 } from 'lucide-react';
import { clinicInfo } from '../data/clinicInfo';
import { clinicLocations } from '../data/locations';
import { clinicServices } from '../data/services';
import { clinicDoctors } from '../data/doctors';

interface AppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialService?: string;
  initialDoctor?: string;
  initialBranch?: string;
}

export const AppointmentModal: React.FC<AppointmentModalProps> = ({
  isOpen,
  onClose,
  initialService,
  initialDoctor,
  initialBranch
}) => {
  const [branch, setBranch] = useState(initialBranch || 'Dento Care — Ponnani Clinic');
  const [service, setService] = useState(initialService || 'Dental Implants');
  const [doctor, setDoctor] = useState(initialDoctor || 'Any Available Specialist');
  const [preferredDate, setPreferredDate] = useState('');
  const [preferredTime, setPreferredTime] = useState('Morning (10:00 AM - 1:00 PM)');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (initialService) setService(initialService);
    if (initialDoctor) setDoctor(initialDoctor);
    if (initialBranch) setBranch(initialBranch);
  }, [initialService, initialDoctor, initialBranch]);

  // Lock body scroll and handle Escape key when modal is open
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleWhatsAppBooking = () => {
    const text = encodeURIComponent(
      `Hello Dento Care,\nI would like to schedule a dental appointment:\n\n` +
      `• Patient Name: ${fullName || 'Guest'}\n` +
      `• Phone: ${phone || 'Not provided'}\n` +
      `• Branch: ${branch}\n` +
      `• Treatment: ${service}\n` +
      `• Preferred Date: ${preferredDate || 'Earliest Available'}\n` +
      `• Preferred Time: ${preferredTime}\n` +
      `${message ? `• Note: ${message}` : ''}`
    );
    window.open(`https://wa.me/${clinicInfo.whatsapp}?text=${text}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      {/* BACKDROP */}
      <div
        className="fixed inset-0 bg-slate-950/60 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* MODAL CARD */}
      <div className="relative w-full max-w-2xl bg-white rounded-[36px] sm:rounded-[44px] shadow-2xl overflow-hidden z-10 animate-in fade-in zoom-in-95 duration-200 border border-sky-100">
        
        {/* TOP HEADER */}
        <div className="bg-[#5B9DE6] p-6 sm:p-8 text-white relative">
          <button
            type="button"
            onClick={onClose}
            className="absolute top-6 right-6 p-2 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X size={20} />
          </button>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-xs font-semibold mb-2">
            <span className="w-2 h-2 rounded-full bg-[#E5FE40]" />
            <span>Schedule Consultation</span>
          </div>

          <h3 className="text-2xl sm:text-4xl font-light tracking-tight text-white">
            Book Your Dental Visit
          </h3>
          <p className="text-white/85 text-xs sm:text-sm mt-1 max-w-md">
            Ponnani Flagship Clinic • KK Junction near ISS School
          </p>
        </div>

        {/* MODAL CONTENT */}
        <div className="p-6 sm:p-8 max-h-[80vh] overflow-y-auto">
          {submitted ? (
            <div className="py-8 text-center space-y-4">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 size={36} />
              </div>
              <h4 className="text-2xl font-light text-slate-900">
                Appointment Requested!
              </h4>
              <p className="text-sm text-slate-600 max-w-md mx-auto">
                Thank you, <span className="font-semibold">{fullName || 'Patient'}</span>. Our clinic front desk will contact you at <span className="font-semibold">{phone}</span> shortly to confirm your scheduled slot.
              </p>

              <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  type="button"
                  onClick={handleWhatsAppBooking}
                  className="px-6 py-3 rounded-full bg-[#25D366] text-white font-bold text-sm flex items-center justify-center gap-2 hover:opacity-95 shadow-md"
                >
                  <MessageCircle size={18} />
                  <span>Send via WhatsApp Now</span>
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-3 rounded-full bg-slate-100 text-slate-800 font-semibold text-sm hover:bg-slate-200"
                >
                  Done
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* BRANCH SELECTION */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                  Clinic Branch
                </label>
                <select
                  value={branch}
                  onChange={(e) => setBranch(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#5B9DE6]"
                >
                  {clinicLocations.map((loc) => (
                    <option key={loc.id} value={loc.name} disabled={loc.status === 'upcoming'}>
                      {loc.name} {loc.status === 'upcoming' ? '(Coming Soon)' : '— Active'}
                    </option>
                  ))}
                </select>
              </div>

              {/* TREATMENT SELECTION */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                  Desired Treatment / Consultation
                </label>
                <select
                  value={service}
                  onChange={(e) => setService(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#5B9DE6]"
                >
                  {clinicServices.map((srv) => (
                    <option key={srv.id} value={srv.title}>
                      {srv.title} ({srv.category})
                    </option>
                  ))}
                  <option value="General Consultation & Checkup">General Consultation & Checkup</option>
                  <option value="Emergency Tooth Pain">Emergency Tooth Pain Relief</option>
                </select>
              </div>

              {/* DOCTOR SELECTION */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                  Preferred Doctor / Specialist
                </label>
                <select
                  value={doctor}
                  onChange={(e) => setDoctor(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#5B9DE6]"
                >
                  <option value="Any Available Specialist">Any Available Specialist</option>
                  {clinicDoctors.map((doc) => (
                    <option key={doc.id} value={doc.name}>
                      {doc.name} — {doc.role}
                    </option>
                  ))}
                </select>
              </div>

              {/* DATE & TIME PREFERENCE */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                    Preferred Date
                  </label>
                  <input
                    type="date"
                    value={preferredDate}
                    onChange={(e) => setPreferredDate(e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#5B9DE6]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                    Preferred Time Slot
                  </label>
                  <select
                    value={preferredTime}
                    onChange={(e) => setPreferredTime(e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#5B9DE6]"
                  >
                    <option value="Morning (9:00 AM - 1:00 PM)">Morning (9:00 AM - 1:00 PM)</option>
                    <option value="Afternoon (2:00 PM - 5:00 PM)">Afternoon (2:00 PM - 5:00 PM)</option>
                    <option value="Evening (5:00 PM - 8:00 PM)">Evening (5:00 PM - 8:00 PM)</option>
                  </select>
                </div>
              </div>

              {/* PATIENT NAME & PHONE */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rahul Nair"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#5B9DE6]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                    Contact Phone / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98470 XXXXX"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#5B9DE6]"
                  />
                </div>
              </div>

              {/* OPTIONAL NOTE */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                  Symptoms or Treatment Notes (Optional)
                </label>
                <textarea
                  rows={2}
                  placeholder="Describe any symptoms, previous treatments, or specific requests..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#5B9DE6]"
                />
              </div>

              {/* ACTION BUTTONS */}
              <div className="pt-3 space-y-2">
                <button
                  type="submit"
                  className="w-full py-3.5 px-6 rounded-full bg-[#5B9DE6] hover:bg-blue-600 text-white font-bold text-sm shadow-lg shadow-sky-900/15 transition-all cursor-pointer"
                >
                  Confirm Appointment Request
                </button>

                <button
                  type="button"
                  onClick={handleWhatsAppBooking}
                  className="w-full py-3 px-6 rounded-full bg-[#25D366] hover:bg-emerald-600 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <MessageCircle size={18} />
                  <span>Instant Booking via WhatsApp</span>
                </button>
              </div>

            </form>
          )}
        </div>

      </div>
    </div>
  );
};
