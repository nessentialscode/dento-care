import React, { useState, useEffect } from 'react';
import { X, MessageCircle, CheckCircle2, AlertCircle, Phone } from 'lucide-react';
import { clinicInfo, APPOINTMENT_TIME_SLOTS } from '../data/clinicInfo';
import { clinicLocations } from '../data/locations';
import { clinicServices } from '../data/services';
import { clinicDoctors } from '../data/doctors';
import { submitAppointment } from '../services/appointmentService';
import { fetchActiveClinicBranches, type ClinicBranch } from '../services/clinicBranchService';
import { fetchDoctorAvailability, type DoctorRecord } from '../services/doctorService';

interface AppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialService?: string;
  initialDoctor?: string;
  initialBranch?: string;
  onPrivacyClick?: () => void;
}

export const AppointmentModal: React.FC<AppointmentModalProps> = ({
  isOpen,
  onClose,
  initialService,
  initialDoctor,
  initialBranch,
  onPrivacyClick
}) => {
  const [activeBranches, setActiveBranches] = useState<ClinicBranch[]>([]);
  const [branchesLoading, setBranchesLoading] = useState(true);
  const [branchesError, setBranchesError] = useState<string | null>(null);
  const [presentDoctorNames, setPresentDoctorNames] = useState<string[]>([]);

  const [branch, setBranch] = useState(initialBranch || 'Dento Care — Ponnani Clinic');
  const [service, setService] = useState(initialService || 'Dental Implants');
  const [doctor, setDoctor] = useState(initialDoctor || 'Any Available Specialist');
  const [preferredDate, setPreferredDate] = useState('');
  const [preferredTime, setPreferredTime] = useState<string>(APPOINTMENT_TIME_SLOTS[0]);
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [honeypot, setHoneypot] = useState('');
  const [consentGiven, setConsentGiven] = useState(false);
  const [consentError, setConsentError] = useState(false);

  const handleClose = React.useCallback(() => {
    setSubmitted(false);
    setIsSubmitting(false);
    setErrorMessage(null);
    setHoneypot('');
    setConsentGiven(false);
    setConsentError(false);
    onClose();
  }, [onClose]);

  const [prevProps, setPrevProps] = useState({ initialService, initialDoctor, initialBranch, isOpen });

  if (
    prevProps.isOpen !== isOpen ||
    prevProps.initialService !== initialService ||
    prevProps.initialDoctor !== initialDoctor ||
    prevProps.initialBranch !== initialBranch
  ) {
    setPrevProps({ initialService, initialDoctor, initialBranch, isOpen });
    if (isOpen && !prevProps.isOpen) {
      setSubmitted(false);
      setIsSubmitting(false);
      setErrorMessage(null);
      setHoneypot('');
      setConsentGiven(false);
      setConsentError(false);
    }
    if (initialService) setService(initialService);
    if (initialDoctor) setDoctor(initialDoctor);
    if (initialBranch) setBranch(initialBranch);
  }

  // Lock body scroll and handle Escape key when modal is open
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose();
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
  }, [isOpen, handleClose]);

  // Fetch currently active clinic branches and doctor availability whenever modal opens
  useEffect(() => {
    if (!isOpen) return;
    let active = true;

    async function loadModalData() {
      try {
        const [branchData, doctorData] = await Promise.all([
          fetchActiveClinicBranches(),
          fetchDoctorAvailability().catch(() => [] as DoctorRecord[]),
        ]);

        if (!active) return;

        setActiveBranches(branchData);
        setBranchesLoading(false);

        if (branchData.length > 0) {
          setBranch((prev) => {
            const exists = branchData.some((b) => b.name === prev);
            return exists ? prev : branchData[0].name;
          });
        }

        // Filter present doctors
        const presentNames = doctorData
          .filter((d) => d.is_present)
          .map((d) => d.name.toLowerCase());
        setPresentDoctorNames(presentNames);

        // If current doctor is absent, fallback to Any Available Specialist
        setDoctor((prevDoc) => {
          if (!prevDoc || prevDoc === 'Any Available Specialist') {
            return 'Any Available Specialist';
          }
          const isPresent = presentNames.includes(prevDoc.toLowerCase());
          return isPresent ? prevDoc : 'Any Available Specialist';
        });
      } catch (err) {
        if (!active) return;
        console.error('Failed to load clinic branches:', err);
        setBranchesError('Unable to verify clinic availability.');
        setActiveBranches([]);
        setBranchesLoading(false);
      }
    }

    loadModalData();

    return () => {
      active = false;
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const selectedLocation = clinicLocations.find(
    l => l.name === branch || l.shortName === branch || branch.toLowerCase().includes(l.shortName.toLowerCase())
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!consentGiven) {
      setConsentError(true);
      return;
    }

    setIsSubmitting(true);

    try {
      await submitAppointment({
        fullName,
        phone,
        branch,
        service,
        doctor,
        preferredDate,
        preferredTime,
        message,
        website: honeypot,
        botCheck: '',
        _hp: '',
      });
      setSubmitted(true);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Unable to submit appointment. Please try again.';
      setErrorMessage(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleWhatsAppBooking = () => {
    const targetWhatsapp = selectedLocation?.whatsapp || clinicInfo.whatsapp;
    const text = encodeURIComponent(
      `Hello Dento Care,\nI would like to schedule a dental appointment:\n\n` +
      `• Patient Name: ${fullName || 'Guest'}\n` +
      `• Clinic Branch: ${branch}\n` +
      `• Preferred Date: ${preferredDate || 'Flexible'}\n` +
      `• Preferred Time: ${preferredTime}\n` +
      `• Service: ${service}\n` +
      `• Specialist: ${doctor}\n` +
      (message ? `• Notes: ${message}\n` : '')
    );
    window.open(`https://wa.me/${targetWhatsapp}?text=${text}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      {/* BACKDROP */}
      <div
        className="fixed inset-0 bg-slate-950/60 backdrop-blur-md transition-opacity"
        onClick={handleClose}
      />

      {/* MODAL CARD */}
      <div className="relative w-full max-w-2xl bg-white rounded-[36px] sm:rounded-[44px] shadow-2xl overflow-hidden z-10 animate-in fade-in zoom-in-95 duration-200 border border-sky-100">
        
        {/* TOP HEADER */}
        <div className="bg-[#5B9DE6] p-6 sm:p-8 text-white relative">
          <button
            type="button"
            onClick={handleClose}
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
            {selectedLocation ? `${selectedLocation.name} • ${selectedLocation.addressLine1}` : 'Ponnani Flagship & Veliyancode Medcity Branches'}
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
                  className="px-6 py-3 rounded-full bg-[#25D366] text-white font-bold text-sm flex items-center justify-center gap-2 hover:opacity-95 shadow-md cursor-pointer"
                >
                  <MessageCircle size={18} />
                  <span>Send via WhatsApp Now</span>
                </button>
                <button
                  type="button"
                  onClick={handleClose}
                  className="px-6 py-3 rounded-full bg-slate-100 text-slate-800 font-semibold text-sm hover:bg-slate-200 cursor-pointer"
                >
                  Done
                </button>
              </div>
            </div>
          ) : !branchesLoading && (activeBranches.length === 0 || branchesError) ? (
            <div className="p-6 rounded-2xl bg-amber-50 border border-amber-200 text-center space-y-4 my-2">
              <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center mx-auto">
                <AlertCircle size={24} />
              </div>
              <div>
                <h3 className="text-sm font-bold text-amber-900">
                  Online appointment requests are currently unavailable.
                </h3>
                <p className="text-xs text-amber-700 mt-1">
                  Please contact Dento Care directly to schedule your appointment.
                </p>
              </div>
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-2.5">
                <a
                  href={`tel:${clinicInfo.phone}`}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-colors"
                >
                  <Phone size={14} />
                  <span>Call {clinicInfo.phone}</span>
                </a>
                <a
                  href={`https://wa.me/${clinicInfo.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-colors"
                >
                  <MessageCircle size={14} />
                  <span>WhatsApp Us</span>
                </a>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* BRANCH SELECTION */}
              <div>
                <label htmlFor="modal-branch" className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                  Clinic Branch
                </label>
                <select
                  id="modal-branch"
                  value={branch}
                  disabled={branchesLoading}
                  onChange={(e) => setBranch(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#5B9DE6]"
                >
                  {branchesLoading ? (
                    <option value="">Loading available clinics...</option>
                  ) : (
                    activeBranches.map((b) => (
                      <option key={b.id} value={b.name}>
                        {b.name} — Active
                      </option>
                    ))
                  )}
                </select>
              </div>

              {/* TREATMENT SELECTION */}
              <div>
                <label htmlFor="modal-service" className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                  Desired Treatment / Consultation
                </label>
                <select
                  id="modal-service"
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
                <label htmlFor="modal-doctor" className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                  Preferred Doctor / Specialist
                </label>
                <select
                  id="modal-doctor"
                  value={doctor}
                  onChange={(e) => setDoctor(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#5B9DE6]"
                >
                  <option value="Any Available Specialist">Any Available Specialist</option>
                  {clinicDoctors
                    .filter((doc) =>
                      presentDoctorNames.includes(doc.name.toLowerCase())
                    )
                    .map((doc) => (
                      <option key={doc.id} value={doc.name}>
                        {doc.name} — {doc.role}
                      </option>
                    ))}
                </select>
              </div>

              {/* DATE & TIME PREFERENCE */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label htmlFor="modal-date" className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                    Preferred Date *
                  </label>
                  <input
                    id="modal-date"
                    type="date"
                    required
                    min={new Date().toISOString().split('T')[0]}
                    value={preferredDate}
                    onChange={(e) => setPreferredDate(e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#5B9DE6]"
                  />
                </div>
                <div>
                  <label htmlFor="modal-time" className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                    Preferred Time Slot
                  </label>
                  <select
                    id="modal-time"
                    value={preferredTime}
                    onChange={(e) => setPreferredTime(e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#5B9DE6]"
                  >
                    {APPOINTMENT_TIME_SLOTS.map((slot) => (
                      <option key={slot} value={slot}>
                        {slot}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* PATIENT NAME & PHONE */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label htmlFor="modal-fullname" className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                    Full Name *
                  </label>
                  <input
                    id="modal-fullname"
                    type="text"
                    required
                    placeholder="e.g. Rahul Nair"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#5B9DE6]"
                  />
                </div>
                <div>
                  <label htmlFor="modal-phone" className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                    Contact Phone / WhatsApp *
                  </label>
                  <input
                    id="modal-phone"
                    type="tel"
                    required
                    placeholder="+91 75103 XXXXX"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#5B9DE6]"
                  />
                </div>
              </div>

              {/* OPTIONAL NOTE */}
              <div>
                <label htmlFor="modal-notes" className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                  Symptoms or Treatment Notes (Optional)
                </label>
                <textarea
                  id="modal-notes"
                  rows={2}
                  placeholder="Describe any symptoms, previous treatments, or specific requests..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#5B9DE6]"
                />
              </div>

              {/* ANTI-ABUSE HONEYPOT (HIDDEN) */}
              <div className="hidden" aria-hidden="true">
                <input
                  type="text"
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                />
              </div>

              {/* ERROR MESSAGE ALERT */}
              {errorMessage && (
                <div className="p-3 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium">
                  {errorMessage}
                </div>
              )}

              {/* CONSENT CHECKBOX */}
              <div className="pt-1">
                <div className="flex items-start gap-2.5">
                  <input
                    type="checkbox"
                    id="appointment-consent"
                    name="consent"
                    checked={consentGiven}
                    onChange={(e) => {
                      setConsentGiven(e.target.checked);
                      if (e.target.checked) {
                        setConsentError(false);
                      }
                    }}
                    className="mt-0.5 h-4 w-4 rounded border-slate-300 text-[#5B9DE6] focus:ring-2 focus:ring-[#5B9DE6] focus:ring-offset-1 cursor-pointer accent-[#5B9DE6]"
                    required
                    aria-describedby={consentError ? "consent-error" : undefined}
                  />
                  <label
                    htmlFor="appointment-consent"
                    className="text-xs text-slate-600 leading-relaxed cursor-pointer select-none"
                  >
                    I consent to Dento Care Dental Clinic processing the information I provide for the purpose of receiving, processing, and responding to my appointment request. I have read the{' '}
                    <a
                      href="/privacy-policy"
                      onClick={(e) => {
                        if (onPrivacyClick) {
                          e.preventDefault();
                          handleClose();
                          onPrivacyClick();
                        }
                      }}
                      className="text-[#5B9DE6] hover:underline font-semibold"
                    >
                      Privacy Policy
                    </a>.
                  </label>
                </div>

                {consentError && (
                  <p
                    id="consent-error"
                    role="alert"
                    className="text-xs font-medium text-rose-600 mt-1.5 pl-6.5"
                  >
                    Please provide consent to proceed with your appointment request.
                  </p>
                )}
              </div>

              {/* ACTION BUTTONS */}
              <div className="pt-3 space-y-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-3.5 px-6 rounded-full bg-[#5B9DE6] hover:bg-blue-600 text-white font-bold text-sm shadow-lg shadow-sky-900/15 transition-all cursor-pointer ${
                    isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                  }`}
                >
                  {isSubmitting ? 'Submitting Appointment...' : 'Confirm Appointment Request'}
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
