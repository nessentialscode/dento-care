import React, { useState, useEffect, useMemo, useCallback } from 'react';
import {
  Calendar,
  Clock,
  MapPin,
  Phone,
  Search,
  RefreshCw,
  LogOut,
  ChevronRight,
  X,
  Check,
  MessageSquare,
  AlertCircle,
  Inbox,
  UserCheck,
  CheckCircle2,
  Clock4,
  XCircle,
  Stethoscope,
  ExternalLink,
  RotateCcw,
  Building2,
  Star,
} from 'lucide-react';
import {
  fetchAppointments,
  updateAppointmentStatus,
  calculateDashboardMetrics,
  filterAppointments,
  type Appointment,
  type AppointmentStatus,
  type AppointmentFilterOptions,
} from '../services/adminAppointmentService';
import {
  fetchAllClinicBranchesForAdmin,
  updateClinicBranchAvailability,
  type ClinicBranch,
} from '../services/clinicBranchService';
import {
  fetchAllDoctorsForAdmin,
  updateDoctorPresence,
  type DoctorRecord,
} from '../services/doctorService';
import {
  fetchAllFeedbackForAdmin,
  moderateFeedback,
  type FeedbackItem,
  type FeedbackStatus,
} from '../services/feedbackService';
import { clinicLocations } from '../data/locations';
import { clinicDoctors } from '../data/doctors';
import { clinicServices } from '../data/services';
import { clearInvalidSession } from '../services/authService';

const getTodayDateString = (): string => {
  const d = new Date();
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

interface AdminDashboardPageProps {
  adminEmail?: string;
  onLogout: () => void;
  onNavigateHome: () => void;
}

export const AdminDashboardPage: React.FC<AdminDashboardPageProps> = ({
  adminEmail,
  onLogout,
  onNavigateHome,
}) => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [statusUpdating, setStatusUpdating] = useState(false);
  const [updateMessage, setUpdateMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [confirmModal, setConfirmModal] = useState<{
    action: 'confirm' | 'cancel' | 'complete';
    appt: Appointment;
  } | null>(null);
  const [confirmedApptForWhatsApp, setConfirmedApptForWhatsApp] = useState<Appointment | null>(null);

  // Clinic Branch Management States
  const [branches, setBranches] = useState<ClinicBranch[]>([]);
  const [branchesLoading, setBranchesLoading] = useState(true);
  const [branchUpdatingId, setBranchUpdatingId] = useState<string | null>(null);
  const [branchConfirmModal, setBranchConfirmModal] = useState<{
    branch: ClinicBranch;
    targetActive: boolean;
  } | null>(null);

  // Doctor Presence Management States
  const [adminDoctors, setAdminDoctors] = useState<DoctorRecord[]>([]);
  const [doctorsLoading, setDoctorsLoading] = useState(true);
  const [doctorUpdatingId, setDoctorUpdatingId] = useState<string | null>(null);
  const [doctorConfirmModal, setDoctorConfirmModal] = useState<{
    doctor: DoctorRecord;
    targetPresent: boolean;
  } | null>(null);

  // Patient Feedback Moderation States
  const [adminFeedback, setAdminFeedback] = useState<FeedbackItem[]>([]);
  const [feedbackLoading, setFeedbackLoading] = useState(true);
  const [feedbackTab, setFeedbackTab] = useState<FeedbackStatus>('pending');
  const [feedbackModeratingId, setFeedbackModeratingId] = useState<string | null>(null);

  // Filter & Search states (Default date = today)
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<AppointmentStatus | 'all'>('all');
  const [branchFilter, setBranchFilter] = useState<string | 'all'>('all');
  const [doctorFilter, setDoctorFilter] = useState<string | 'all'>('all');
  const [serviceFilter, setServiceFilter] = useState<string | 'all'>('all');
  const [dateFilter, setDateFilter] = useState<string>(() => getTodayDateString());

  // Load clinic branches
  const loadBranches = useCallback(async () => {
    try {
      const data = await fetchAllClinicBranchesForAdmin();
      setBranches(data);
    } catch (err: unknown) {
      console.error('Failed to load clinic branches in admin:', err);
    } finally {
      setBranchesLoading(false);
    }
  }, []);

  // Load doctors
  const loadDoctors = useCallback(async () => {
    try {
      const data = await fetchAllDoctorsForAdmin();
      setAdminDoctors(data);
    } catch (err: unknown) {
      console.error('Failed to load doctors in admin:', err);
    } finally {
      setDoctorsLoading(false);
    }
  }, []);

  // Load feedback
  const loadFeedback = useCallback(async () => {
    try {
      const data = await fetchAllFeedbackForAdmin();
      setAdminFeedback(data);
    } catch (err: unknown) {
      console.error('Failed to load feedback in admin:', err);
    } finally {
      setFeedbackLoading(false);
    }
  }, []);

  // Load appointments and related admin datasets
  const loadData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [apptData, branchData, doctorData, feedbackData] = await Promise.all([
        fetchAppointments(),
        fetchAllClinicBranchesForAdmin().catch(() => [] as ClinicBranch[]),
        fetchAllDoctorsForAdmin().catch(() => [] as DoctorRecord[]),
        fetchAllFeedbackForAdmin().catch(() => [] as FeedbackItem[]),
      ]);
      setAppointments(apptData);
      if (branchData.length > 0) setBranches(branchData);
      if (doctorData.length > 0) setAdminDoctors(doctorData);
      setAdminFeedback(feedbackData);
    } catch (err: unknown) {
      setError(
        err instanceof Error ? err.message : 'Unable to load appointment requests from the database.'
      );
    } finally {
      setLoading(false);
      setBranchesLoading(false);
      setDoctorsLoading(false);
      setFeedbackLoading(false);
    }
  }, []);

  useEffect(() => {
    let active = true;
    Promise.all([
      fetchAppointments(),
      fetchAllClinicBranchesForAdmin().catch(() => [] as ClinicBranch[]),
      fetchAllDoctorsForAdmin().catch(() => [] as DoctorRecord[]),
      fetchAllFeedbackForAdmin().catch(() => [] as FeedbackItem[]),
    ])
      .then(([apptData, branchData, doctorData, feedbackData]) => {
        if (!active) return;
        setAppointments(apptData);
        if (branchData.length > 0) setBranches(branchData);
        if (doctorData.length > 0) setAdminDoctors(doctorData);
        setAdminFeedback(feedbackData);
        setLoading(false);
        setBranchesLoading(false);
        setDoctorsLoading(false);
        setFeedbackLoading(false);
      })
      .catch((err) => {
        if (!active) return;
        setError(err instanceof Error ? err.message : 'Unable to load appointment requests from the database.');
        setLoading(false);
        setBranchesLoading(false);
        setDoctorsLoading(false);
        setFeedbackLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  // Dashboard summary metrics
  const metrics = useMemo(() => calculateDashboardMetrics(appointments), [appointments]);

  // Filtered appointments
  const filteredAppointments = useMemo(() => {
    const options: AppointmentFilterOptions = {
      searchQuery,
      status: statusFilter,
      branch: branchFilter,
      doctor: doctorFilter,
      service: serviceFilter,
      preferredDate: dateFilter,
    };
    return filterAppointments(appointments, options);
  }, [appointments, searchQuery, statusFilter, branchFilter, doctorFilter, serviceFilter, dateFilter]);

  const todayStr = getTodayDateString();
  const hasActiveFilters =
    searchQuery.trim() !== '' ||
    statusFilter !== 'all' ||
    branchFilter !== 'all' ||
    doctorFilter !== 'all' ||
    serviceFilter !== 'all' ||
    dateFilter !== todayStr;

  const handleResetFilters = () => {
    setSearchQuery('');
    setStatusFilter('all');
    setBranchFilter('all');
    setDoctorFilter('all');
    setServiceFilter('all');
    setDateFilter(getTodayDateString());
  };

  // Status transition handler strictly enforcing state machine and concurrency
  const handleStatusTransition = async (appt: Appointment, newStatus: AppointmentStatus) => {
    setStatusUpdating(true);
    setUpdateMessage(null);
    try {
      const updated = await updateAppointmentStatus(appt.id, newStatus, appt.status);
      // Update local state
      setAppointments((prev) =>
        prev.map((a) => (a.id === appt.id ? { ...a, status: updated.status, updated_at: updated.updated_at } : a))
      );
      if (selectedAppointment && selectedAppointment.id === appt.id) {
        setSelectedAppointment((prev) =>
          prev ? { ...prev, status: updated.status, updated_at: updated.updated_at } : null
        );
      }
      setConfirmModal(null);
      setUpdateMessage({ type: 'success', text: `Status successfully updated to ${newStatus}.` });

      // If transition was genuinely PENDING -> CONFIRMED, open WhatsApp and prompt clear action
      if (appt.status === 'pending' && newStatus === 'confirmed') {
        const whatsappUrl = getConfirmedAppointmentWhatsAppUrl(updated);
        try {
          window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
        } catch (openErr) {
          console.warn('Could not launch WhatsApp window automatically:', openErr);
        }
        setConfirmedApptForWhatsApp(updated);
      }
    } catch (err: unknown) {
      setUpdateMessage({
        type: 'error',
        text: err instanceof Error ? err.message : 'This appointment status has already changed. Please refresh and try again.',
      });
      setConfirmModal(null);
      loadData();
    } finally {
      setStatusUpdating(false);
    }
  };

  // Branch availability toggle handler
  const handleBranchToggle = async (branchId: string, targetActive: boolean) => {
    setBranchUpdatingId(branchId);
    try {
      const updated = await updateClinicBranchAvailability(branchId, targetActive);
      setBranches((prev) =>
        prev.map((b) =>
          b.id === branchId
            ? { ...b, is_active: updated.is_active, updated_at: updated.updated_at }
            : b
        )
      );
      setBranchConfirmModal(null);
    } catch (err: unknown) {
      console.error('Failed to update branch availability:', err);
      alert(err instanceof Error ? err.message : 'Failed to update branch availability.');
      setBranchConfirmModal(null);
      loadBranches();
    } finally {
      setBranchUpdatingId(null);
    }
  };

  // Doctor presence toggle handler
  const handleDoctorToggle = async (doctor: DoctorRecord, targetPresent: boolean) => {
    setDoctorUpdatingId(doctor.id);
    try {
      const updated = await updateDoctorPresence(doctor.id, targetPresent);
      setAdminDoctors((prev) =>
        prev.map((d) => (d.id === doctor.id ? { ...d, is_present: updated.is_present } : d))
      );
      setDoctorConfirmModal(null);
    } catch (err: unknown) {
      console.error('Failed to update doctor presence:', err);
      alert(err instanceof Error ? err.message : 'Failed to update doctor presence.');
      setDoctorConfirmModal(null);
      loadDoctors();
    } finally {
      setDoctorUpdatingId(null);
    }
  };

  // Feedback moderation handler
  const handleModerateFeedback = async (id: string, targetStatus: 'approved' | 'rejected') => {
    setFeedbackModeratingId(id);
    try {
      const updated = await moderateFeedback(id, targetStatus);
      setAdminFeedback((prev) =>
        prev.map((f) => (f.id === id ? { ...f, status: updated.status, updated_at: updated.updated_at } : f))
      );
    } catch (err: unknown) {
      console.error('Failed to moderate feedback:', err);
      alert(err instanceof Error ? err.message : 'Failed to moderate feedback.');
      loadFeedback();
    } finally {
      setFeedbackModeratingId(null);
    }
  };

  // Helper for status badge styling
  const getStatusBadge = (status: AppointmentStatus) => {
    switch (status) {
      case 'pending':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-800 border border-amber-200">
            <Clock4 size={12} />
            Pending
          </span>
        );
      case 'confirmed':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-sky-100 text-sky-800 border border-sky-200">
            <CheckCircle2 size={12} />
            Confirmed
          </span>
        );
      case 'completed':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200">
            <UserCheck size={12} />
            Completed
          </span>
        );
      case 'cancelled':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200">
            <XCircle size={12} />
            Cancelled
          </span>
        );
    }
  };

  // WhatsApp quick url builder
  const getWhatsAppUrl = (phone: string, patientName: string) => {
    const cleaned = phone.replace(/\D/g, '');
    const fullNumber = cleaned.startsWith('91') ? cleaned : `91${cleaned}`;
    const text = encodeURIComponent(
      `Hello ${patientName}, this is Dento Care Dental Clinic regarding your appointment request.`
    );
    return `https://wa.me/${fullNumber}?text=${text}`;
  };

  // Professional confirmed appointment WhatsApp message URL builder
  const getConfirmedAppointmentWhatsAppUrl = (appt: Appointment) => {
    const cleaned = appt.phone.replace(/\D/g, '').replace(/^0+/, '');
    const fullNumber = cleaned.length === 10 ? `91${cleaned}` : (cleaned.startsWith('91') ? cleaned : `91${cleaned}`);

    const patientName = appt.full_name;
    const branchStr = appt.branch || 'Dento Care Dental Clinic';
    const dateStr = appt.preferred_date || 'Flexible Date';
    const timeStr = appt.preferred_time || 'Clinic Hours';
    const serviceStr = appt.service || 'General Consultation';
    const doctorStr = appt.doctor || 'Specialist On Duty';

    const message = [
      `Hello ${patientName} 👋`,
      ``,
      `Your appointment at Dento Care Dental Clinic has been confirmed. ✅`,
      ``,
      `📍 Branch: ${branchStr}`,
      `📅 Date: ${dateStr}`,
      `⏰ Time: ${timeStr}`,
      `🦷 Treatment: ${serviceStr}`,
      `👨‍⚕️ Specialist: ${doctorStr}`,
      ``,
      `For any questions or changes, please contact us at +91 7510355355.`,
      ``,
      `Thank you for choosing Dento Care. We look forward to welcoming you! 🦷`,
    ].join('\n');

    return `https://wa.me/${fullNumber}?text=${encodeURIComponent(message)}`;
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col selection:bg-[#E5FE40] selection:text-slate-900">
      
      {/* 1. TOP ADMIN HEADER */}
      <header className="sticky top-0 z-30 bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          
          {/* BRAND */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#5B9DE6] flex items-center justify-center p-1.5 flex-shrink-0 shadow-sm">
              <img
                src="/images/dento-care-icon.png"
                alt="Dento Care"
                className="w-full h-full object-contain filter brightness-0 invert"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm sm:text-base text-slate-900 tracking-tight leading-none">
                  Dento Care Dental Clinic
                </span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-sky-100 text-sky-800 border border-sky-200">
                  Staff Admin
                </span>
              </div>
              <span className="text-[11px] text-slate-500 hidden sm:block mt-0.5">
                Appointment Management System
              </span>
            </div>
          </div>

          {/* RIGHT ACTIONS */}
          <div className="flex items-center gap-2 sm:gap-3">
            {adminEmail && (
              <span className="text-xs font-medium text-slate-600 bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200 hidden md:inline-block">
                {adminEmail}
              </span>
            )}

            <button
              type="button"
              onClick={loadData}
              disabled={loading}
              title="Refresh appointment list"
              className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <RefreshCw size={18} className={loading ? 'animate-spin' : ''} />
            </button>

            <button
              type="button"
              onClick={onNavigateHome}
              title="Redirect to Public Website"
              aria-label="Redirect to Public Website"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700 hover:text-slate-950 bg-slate-100 hover:bg-slate-200 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-lg border border-slate-200 transition-colors cursor-pointer"
            >
              <ExternalLink size={14} className="text-blue-600" />
              <span className="hidden sm:inline">Public Website</span>
              <span className="sm:hidden text-[11px]">Site</span>
            </button>

            <button
              type="button"
              onClick={onLogout}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 px-3 py-2 rounded-lg border border-red-200 transition-colors"
            >
              <LogOut size={14} />
              <span className="hidden sm:inline">Sign Out</span>
            </button>
          </div>

        </div>
      </header>

      {/* 2. MAIN CONTAINER */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">

        {/* CLINIC AVAILABILITY SECTION */}
        <section aria-label="Clinic Availability" className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
            <div className="flex items-center gap-2">
              <Building2 size={18} className="text-slate-700" />
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                Clinic Availability
              </h2>
            </div>
            <span className="text-[11px] text-slate-500">
              Active clinics are available for public booking • Inactive clinics are removed from booking
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
            {branchesLoading && branches.length === 0 ? (
              <div className="col-span-full py-4 text-center text-xs text-slate-500 flex items-center justify-center gap-2">
                <RefreshCw size={14} className="animate-spin text-sky-600" />
                <span>Loading clinic availability...</span>
              </div>
            ) : (
              branches.map((b) => (
                <div
                  key={b.id}
                  className="relative p-4 rounded-xl border border-slate-200/90 bg-slate-50/60 flex items-center justify-between gap-4"
                >
                  {/* Compact Status Badge in corner */}
                  <div className="absolute top-3 right-3">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase border shadow-2xs ${
                        b.is_active
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-200/80'
                          : 'bg-slate-100 text-slate-500 border-slate-200'
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          b.is_active ? 'bg-emerald-500' : 'bg-slate-400'
                        }`}
                      />
                      {b.is_active ? 'ACTIVE' : 'INACTIVE'}
                    </span>
                  </div>

                  <div className="space-y-1 min-w-0 pr-2">
                    <h3 className="font-bold text-sm text-slate-900 truncate">
                      {b.name}
                    </h3>
                    <div className="flex items-center gap-1 text-xs text-slate-500">
                      <MapPin size={12} className="text-slate-400 flex-shrink-0" />
                      <span>{b.location}</span>
                    </div>
                  </div>

                  <div className="pt-5 flex-shrink-0">
                    <button
                      type="button"
                      disabled={branchUpdatingId === b.id}
                      onClick={() =>
                        setBranchConfirmModal({
                          branch: b,
                          targetActive: !b.is_active,
                        })
                      }
                      className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all shadow-sm cursor-pointer disabled:opacity-60 flex items-center gap-1.5 ${
                        b.is_active
                          ? 'bg-white hover:bg-rose-50 text-rose-700 border border-slate-200 hover:border-rose-200'
                          : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-600/20'
                      }`}
                    >
                      {branchUpdatingId === b.id && (
                        <RefreshCw size={12} className="animate-spin" />
                      )}
                      <span>{b.is_active ? 'Deactivate' : 'Activate'}</span>
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>

        {/* DOCTOR AVAILABILITY SECTION */}
        <section aria-label="Doctor Availability" className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
            <div className="flex items-center gap-2">
              <Stethoscope size={18} className="text-slate-700" />
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                Doctor Availability
              </h2>
            </div>
            <span className="text-[11px] text-slate-500">
              Present specialists are selectable in online booking • Absent specialists are shown as unavailable
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
            {doctorsLoading && adminDoctors.length === 0 ? (
              <div className="col-span-full py-4 text-center text-xs text-slate-500 flex items-center justify-center gap-2">
                <RefreshCw size={14} className="animate-spin text-sky-600" />
                <span>Loading doctor availability...</span>
              </div>
            ) : (
              adminDoctors.map((doc) => (
                <div
                  key={doc.id}
                  className="relative p-4 rounded-xl border border-slate-200/90 bg-slate-50/60 flex items-center justify-between gap-4"
                >
                  {/* Compact Status Badge in corner */}
                  <div className="absolute top-3 right-3">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase border shadow-2xs ${
                        doc.is_present
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-200/80'
                          : 'bg-amber-50 text-amber-700 border-amber-200/80'
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          doc.is_present ? 'bg-emerald-500' : 'bg-amber-500'
                        }`}
                      />
                      {doc.is_present ? 'PRESENT' : 'ABSENT'}
                    </span>
                  </div>

                  <div className="space-y-1 min-w-0 pr-2">
                    <h3 className="font-bold text-sm text-slate-900 truncate">
                      {doc.name}
                    </h3>
                    <div className="flex items-center gap-1 text-xs text-slate-500">
                      <span>{doc.specialty}</span>
                    </div>
                  </div>

                  <div className="pt-5 flex-shrink-0">
                    <button
                      type="button"
                      disabled={doctorUpdatingId === doc.id}
                      onClick={() =>
                        setDoctorConfirmModal({
                          doctor: doc,
                          targetPresent: !doc.is_present,
                        })
                      }
                      className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all shadow-sm cursor-pointer disabled:opacity-60 flex items-center gap-1.5 ${
                        doc.is_present
                          ? 'bg-white hover:bg-amber-50 text-amber-700 border border-slate-200 hover:border-amber-200'
                          : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-600/20'
                      }`}
                    >
                      {doctorUpdatingId === doc.id && (
                        <RefreshCw size={12} className="animate-spin" />
                      )}
                      <span>{doc.is_present ? 'Mark Absent' : 'Mark Present'}</span>
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>

        {/* METRICS SUMMARY CARDS */}
        <section aria-label="Appointment Metrics" className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          
          {/* TOTAL */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block mb-1">
              Total Inquiries
            </span>
            <span className="text-2xl sm:text-3xl font-bold text-slate-900">
              {metrics.total}
            </span>
          </div>

          {/* PENDING */}
          <div className="bg-white p-4 rounded-2xl border border-amber-200 bg-amber-50/30 shadow-sm">
            <span className="text-[11px] font-bold uppercase tracking-wider text-amber-700 block mb-1">
              Pending
            </span>
            <span className="text-2xl sm:text-3xl font-bold text-amber-800">
              {metrics.pending}
            </span>
          </div>

          {/* CONFIRMED */}
          <div className="bg-white p-4 rounded-2xl border border-sky-200 bg-sky-50/30 shadow-sm">
            <span className="text-[11px] font-bold uppercase tracking-wider text-sky-700 block mb-1">
              Confirmed
            </span>
            <span className="text-2xl sm:text-3xl font-bold text-sky-800">
              {metrics.confirmed}
            </span>
          </div>

          {/* TODAY'S BOOKINGS */}
          <div className="bg-white p-4 rounded-2xl border border-indigo-200 bg-indigo-50/30 shadow-sm">
            <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-700 block mb-1">
              Today's Date
            </span>
            <span className="text-2xl sm:text-3xl font-bold text-indigo-800">
              {metrics.todayCount}
            </span>
          </div>

          {/* COMPLETED */}
          <div className="bg-white p-4 rounded-2xl border border-emerald-200 bg-emerald-50/30 shadow-sm">
            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 block mb-1">
              Completed
            </span>
            <span className="text-2xl sm:text-3xl font-bold text-emerald-800">
              {metrics.completed}
            </span>
          </div>

          {/* CANCELLED */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block mb-1">
              Cancelled
            </span>
            <span className="text-2xl sm:text-3xl font-bold text-slate-600">
              {metrics.cancelled}
            </span>
          </div>

        </section>

        {/* SEARCH & FILTERS BAR */}
        <section aria-label="Filters and Search" className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3">
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
            
            {/* SEARCH INPUT */}
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Search size={16} />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by patient name or phone number..."
                className="w-full pl-10 pr-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5B9DE6] focus:bg-white transition-all text-slate-900 placeholder:text-slate-400"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600"
                >
                  <X size={16} />
                </button>
              )}
            </div>

            {/* RESET BUTTON */}
            {hasActiveFilters && (
              <button
                type="button"
                onClick={handleResetFilters}
                className="inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer"
              >
                <RotateCcw size={14} />
                <span>Reset Filters</span>
              </button>
            )}

          </div>

          {/* FILTER CONTROLS GRID */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 pt-2 border-t border-slate-100 text-xs">
            
            {/* STATUS FILTER */}
            <div>
              <label htmlFor="filter-status" className="block text-[10px] font-bold uppercase text-slate-500 mb-1">
                Status
              </label>
              <select
                id="filter-status"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as AppointmentStatus | 'all')}
                className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-[#5B9DE6]"
              >
                <option value="all">All Statuses</option>
                <option value="pending">Pending</option>
                <option value="confirmed">Confirmed</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>

            {/* BRANCH FILTER */}
            <div>
              <label htmlFor="filter-branch" className="block text-[10px] font-bold uppercase text-slate-500 mb-1">
                Branch
              </label>
              <select
                id="filter-branch"
                value={branchFilter}
                onChange={(e) => setBranchFilter(e.target.value)}
                className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-[#5B9DE6]"
              >
                <option value="all">All Branches</option>
                {clinicLocations.map((loc) => (
                  <option key={loc.id} value={loc.name}>
                    {loc.name}
                  </option>
                ))}
              </select>
            </div>

            {/* DOCTOR FILTER */}
            <div>
              <label htmlFor="filter-doctor" className="block text-[10px] font-bold uppercase text-slate-500 mb-1">
                Doctor
              </label>
              <select
                id="filter-doctor"
                value={doctorFilter}
                onChange={(e) => setDoctorFilter(e.target.value)}
                className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-[#5B9DE6]"
              >
                <option value="all">All Doctors</option>
                {clinicDoctors.map((doc) => (
                  <option key={doc.id} value={doc.name}>
                    {doc.name}
                  </option>
                ))}
              </select>
            </div>

            {/* SERVICE FILTER */}
            <div>
              <label htmlFor="filter-service" className="block text-[10px] font-bold uppercase text-slate-500 mb-1">
                Treatment
              </label>
              <select
                id="filter-service"
                value={serviceFilter}
                onChange={(e) => setServiceFilter(e.target.value)}
                className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-[#5B9DE6]"
              >
                <option value="all">All Treatments</option>
                {clinicServices.map((svc) => (
                  <option key={svc.id} value={svc.title}>
                    {svc.title}
                  </option>
                ))}
              </select>
            </div>

            {/* PREFERRED DATE FILTER */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label htmlFor="filter-date" className="block text-[10px] font-bold uppercase text-slate-500">
                  Date {dateFilter === todayStr && <span className="text-sky-600 font-bold lowercase">(today)</span>}
                </label>
                {dateFilter !== '' && (
                  <button
                    type="button"
                    onClick={() => setDateFilter('')}
                    className="text-[10px] text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
                    title="Clear date filter to view all dates"
                  >
                    All Dates
                  </button>
                )}
              </div>
              <input
                id="filter-date"
                type="date"
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-[#5B9DE6]"
              />
            </div>

          </div>
        </section>

        {/* ERROR STATE */}
        {error && (
          <div
            role="alert"
            className="p-5 rounded-2xl bg-red-50 border border-red-200 flex items-start justify-between gap-4 text-red-800"
          >
            <div className="flex items-start gap-3">
              <AlertCircle size={20} className="text-red-600 flex-shrink-0 mt-0.5" />
              <div>
                <h2 className="font-bold text-sm">Failed to retrieve appointment records</h2>
                <p className="text-xs mt-1 text-red-700">{error}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <button
                type="button"
                onClick={loadData}
                className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs font-semibold shadow-sm transition-colors"
              >
                Retry
              </button>
              {(error.toLowerCase().includes('jwt') ||
                error.toLowerCase().includes('token') ||
                error.toLowerCase().includes('session') ||
                error.toLowerCase().includes('auth')) && (
                <button
                  type="button"
                  onClick={async () => {
                    await clearInvalidSession();
                    onLogout();
                  }}
                  className="px-3 py-1.5 bg-white hover:bg-red-50 text-red-700 border border-red-300 rounded-lg text-xs font-semibold shadow-sm transition-colors"
                >
                  Re-authenticate
                </button>
              )}
            </div>
          </div>
        )}

        {/* LOADING STATE */}
        {loading && (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center shadow-sm space-y-3">
            <RefreshCw size={28} className="animate-spin text-[#5B9DE6] mx-auto" />
            <p className="text-sm text-slate-600 font-medium">Loading appointment requests from Supabase...</p>
          </div>
        )}

        {/* APPOINTMENT CONTENT */}
        {!loading && !error && (
          <>
            {filteredAppointments.length === 0 ? (
              /* EMPTY STATE */
              <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center shadow-sm space-y-3">
                <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center mx-auto text-slate-400">
                  <Inbox size={28} />
                </div>
                <h3 className="text-base font-bold text-slate-900">
                  {dateFilter === todayStr
                    ? "No appointments scheduled for today"
                    : hasActiveFilters
                    ? 'No matching appointments found'
                    : 'No appointment requests yet'}
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 max-w-sm mx-auto">
                  {dateFilter === todayStr
                    ? "There are no appointment bookings scheduled for today. You can select another date or view all appointments."
                    : hasActiveFilters
                    ? 'Try adjusting your search query or clearing filter options to see all appointment records.'
                    : 'New appointment submissions from the website will appear here in real time.'}
                </p>
                <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
                  {dateFilter !== '' && (
                    <button
                      type="button"
                      onClick={() => setDateFilter('')}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl transition-colors cursor-pointer"
                    >
                      <Calendar size={13} />
                      <span>View All Dates</span>
                    </button>
                  )}
                  {hasActiveFilters && (
                    <button
                      type="button"
                      onClick={handleResetFilters}
                      className="inline-flex items-center gap-1.5 px-4 py-2 bg-slate-900 text-white text-xs font-semibold rounded-xl hover:bg-slate-800 transition-colors cursor-pointer"
                    >
                      <RotateCcw size={13} />
                      <span>Reset Filters (Today)</span>
                    </button>
                  )}
                </div>
              </div>
            ) : (
              <>
                {/* RESULTS HEADER */}
                <div className="flex items-center justify-between px-1">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Showing {filteredAppointments.length} of {appointments.length} Appointments (Newest First)
                  </span>
                </div>

                {/* DESKTOP TABLE VIEW (hidden on small screens) */}
                <div className="hidden lg:block bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                      <thead className="bg-slate-50/80 border-b border-slate-200 text-[11px] font-bold uppercase tracking-wider text-slate-600">
                        <tr>
                          <th className="py-3.5 px-4">Patient</th>
                          <th className="py-3.5 px-4">Branch</th>
                          <th className="py-3.5 px-4">Treatment</th>
                          <th className="py-3.5 px-4">Doctor</th>
                          <th className="py-3.5 px-4">Date &amp; Time</th>
                          <th className="py-3.5 px-4">Status</th>
                          <th className="py-3.5 px-4 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {filteredAppointments.map((appt) => (
                          <tr
                            key={appt.id}
                            className="hover:bg-slate-50/80 transition-colors cursor-pointer group"
                            onClick={() => setSelectedAppointment(appt)}
                          >
                            {/* PATIENT */}
                            <td className="py-3.5 px-4">
                              <div className="font-semibold text-slate-900">{appt.full_name}</div>
                              <div className="text-xs text-slate-500 font-mono mt-0.5">{appt.phone}</div>
                            </td>

                            {/* BRANCH */}
                            <td className="py-3.5 px-4 text-xs text-slate-700">
                              <div className="flex items-center gap-1.5">
                                <MapPin size={13} className="text-slate-400 flex-shrink-0" />
                                <span className="line-clamp-1">{appt.branch}</span>
                              </div>
                            </td>

                            {/* SERVICE */}
                            <td className="py-3.5 px-4 text-xs text-slate-700">
                              <span className="line-clamp-1">{appt.service || 'General Consultation'}</span>
                            </td>

                            {/* DOCTOR */}
                            <td className="py-3.5 px-4 text-xs text-slate-700">
                              <span className="line-clamp-1">{appt.doctor || 'Any Specialist'}</span>
                            </td>

                            {/* PREFERRED DATE & TIME */}
                            <td className="py-3.5 px-4 text-xs text-slate-700 whitespace-nowrap">
                              <div className="font-medium text-slate-800">{appt.preferred_date || 'Flexible'}</div>
                              <div className="text-slate-500 text-[11px]">{appt.preferred_time || 'Any time'}</div>
                            </td>

                            {/* STATUS */}
                            <td className="py-3.5 px-4 whitespace-nowrap">
                              {getStatusBadge(appt.status)}
                            </td>

                            {/* ACTION CONTROLS */}
                            <td className="py-3.5 px-4 text-right">
                              <div className="flex items-center justify-end gap-1.5">
                                {appt.status === 'pending' && (
                                  <>
                                    <button
                                      type="button"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        setConfirmModal({ action: 'confirm', appt });
                                      }}
                                      title="Confirm Appointment"
                                      className="inline-flex items-center gap-1 text-xs font-bold text-sky-700 hover:text-sky-900 bg-sky-50 hover:bg-sky-100 px-2.5 py-1.5 rounded-lg border border-sky-200 transition-colors cursor-pointer"
                                    >
                                      <Check size={13} />
                                      <span>Confirm</span>
                                    </button>
                                    <button
                                      type="button"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        setConfirmModal({ action: 'cancel', appt });
                                      }}
                                      title="Cancel Appointment"
                                      className="inline-flex items-center gap-1 text-xs font-bold text-rose-700 hover:text-rose-900 bg-rose-50 hover:bg-rose-100 px-2.5 py-1.5 rounded-lg border border-rose-200 transition-colors cursor-pointer"
                                    >
                                      <X size={13} />
                                      <span>Cancel</span>
                                    </button>
                                  </>
                                )}
                                {appt.status === 'confirmed' && (
                                  <>
                                    <a
                                      href={getConfirmedAppointmentWhatsAppUrl(appt)}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      onClick={(e) => e.stopPropagation()}
                                      title="WhatsApp Patient"
                                      className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 hover:text-emerald-900 bg-emerald-50 hover:bg-emerald-100 px-2.5 py-1.5 rounded-lg border border-emerald-200 transition-colors cursor-pointer"
                                    >
                                      <MessageSquare size={13} />
                                      <span>WhatsApp Patient</span>
                                    </a>
                                    <button
                                      type="button"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        setConfirmModal({ action: 'complete', appt });
                                      }}
                                      title="Mark as Completed"
                                      className="inline-flex items-center gap-1 text-xs font-bold text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 px-2.5 py-1.5 rounded-lg border border-slate-200 transition-colors cursor-pointer"
                                    >
                                      <CheckCircle2 size={13} />
                                      <span>Complete</span>
                                    </button>
                                  </>
                                )}
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setSelectedAppointment(appt);
                                  }}
                                  className="inline-flex items-center gap-1 text-xs font-semibold text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer"
                                >
                                  <span>Details</span>
                                  <ChevronRight size={14} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* MOBILE / TABLET CARD VIEW (visible on small/medium screens) */}
                <div className="lg:hidden space-y-3">
                  {filteredAppointments.map((appt) => (
                    <div
                      key={appt.id}
                      onClick={() => setSelectedAppointment(appt)}
                      className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-3 cursor-pointer hover:border-slate-300 transition-all active:scale-[0.99]"
                    >
                      {/* TOP ROW: PATIENT NAME & STATUS */}
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h3 className="font-bold text-slate-900 text-sm sm:text-base">
                            {appt.full_name}
                          </h3>
                          <a
                            href={`tel:${appt.phone}`}
                            onClick={(e) => e.stopPropagation()}
                            className="text-xs font-mono text-sky-700 hover:underline inline-flex items-center gap-1 mt-0.5"
                          >
                            <Phone size={12} />
                            <span>{appt.phone}</span>
                          </a>
                        </div>
                        {getStatusBadge(appt.status)}
                      </div>

                      {/* DETAILS GRID */}
                      <div className="grid grid-cols-2 gap-2 text-xs text-slate-600 bg-slate-50 p-2.5 rounded-xl">
                        <div className="flex items-center gap-1.5">
                          <Calendar size={13} className="text-slate-400 flex-shrink-0" />
                          <span className="truncate">{appt.preferred_date || 'Flexible'}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Clock size={13} className="text-slate-400 flex-shrink-0" />
                          <span className="truncate">{appt.preferred_time || 'Any time'}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <MapPin size={13} className="text-slate-400 flex-shrink-0" />
                          <span className="truncate">{appt.branch}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Stethoscope size={13} className="text-slate-400 flex-shrink-0" />
                          <span className="truncate">{appt.doctor || 'Any Doctor'}</span>
                        </div>
                      </div>

                      {/* BOTTOM ACTIONS */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs pt-1 border-t border-slate-100">
                        <span className="text-[11px] text-slate-400">
                          Submitted {new Date(appt.created_at).toLocaleDateString()}
                        </span>
                        <div className="flex items-center gap-1.5 self-end sm:self-auto" onClick={(e) => e.stopPropagation()}>
                          {appt.status === 'pending' && (
                            <>
                              <button
                                type="button"
                                onClick={() => setConfirmModal({ action: 'confirm', appt })}
                                className="inline-flex items-center gap-1 text-[11px] font-bold text-sky-700 bg-sky-50 hover:bg-sky-100 px-2 py-1 rounded-lg border border-sky-200"
                              >
                                <Check size={12} />
                                <span>Confirm</span>
                              </button>
                              <button
                                type="button"
                                onClick={() => setConfirmModal({ action: 'cancel', appt })}
                                className="inline-flex items-center gap-1 text-[11px] font-bold text-rose-700 bg-rose-50 hover:bg-rose-100 px-2 py-1 rounded-lg border border-rose-200"
                              >
                                <X size={12} />
                                <span>Cancel</span>
                              </button>
                            </>
                          )}
                          {appt.status === 'confirmed' && (
                            <>
                              <a
                                href={getConfirmedAppointmentWhatsAppUrl(appt)}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                title="WhatsApp Patient"
                                className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 px-2 py-1 rounded-lg border border-emerald-200"
                              >
                                <MessageSquare size={12} />
                                <span>WhatsApp Patient</span>
                              </a>
                              <button
                                type="button"
                                onClick={() => setConfirmModal({ action: 'complete', appt })}
                                className="inline-flex items-center gap-1 text-[11px] font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 px-2 py-1 rounded-lg border border-slate-200"
                              >
                                <CheckCircle2 size={12} />
                                <span>Complete</span>
                              </button>
                            </>
                          )}
                          <button
                            type="button"
                            onClick={() => setSelectedAppointment(appt)}
                            className="inline-flex items-center gap-0.5 text-xs font-semibold text-sky-700 hover:text-sky-900 pl-1"
                          >
                            <span>Details</span>
                            <ChevronRight size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </>
        )}

        {/* PATIENT FEEDBACK MODERATION SECTION */}
        <section aria-label="Patient Feedback Moderation" className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden mt-6">
          <div className="p-5 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <MessageSquare size={18} className="text-slate-700" />
                <h2 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                  Patient Feedback Moderation
                </h2>
              </div>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Review submitted patient testimonials prior to public display
              </p>
            </div>

            {/* STATUS TABS */}
            <div className="inline-flex p-1 bg-slate-100 rounded-xl text-xs font-semibold">
              {(['pending', 'approved', 'rejected'] as FeedbackStatus[]).map((tab) => {
                const count = adminFeedback.filter((f) => f.status === tab).length;
                return (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => setFeedbackTab(tab)}
                    className={`px-3 py-1.5 rounded-lg transition-all capitalize cursor-pointer flex items-center gap-1.5 ${
                      feedbackTab === tab
                        ? 'bg-white text-slate-900 shadow-sm'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <span>{tab}</span>
                    <span
                      className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                        tab === 'pending'
                          ? 'bg-amber-100 text-amber-800'
                          : tab === 'approved'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-slate-200 text-slate-700'
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="p-5">
            {feedbackLoading && adminFeedback.length === 0 ? (
              <div className="py-8 text-center text-xs text-slate-500 flex items-center justify-center gap-2">
                <RefreshCw size={14} className="animate-spin text-sky-600" />
                <span>Loading feedback submissions...</span>
              </div>
            ) : adminFeedback.filter((f) => f.status === feedbackTab).length === 0 ? (
              <div className="py-8 text-center text-xs text-slate-500">
                No {feedbackTab} feedback submissions found.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {adminFeedback
                  .filter((f) => f.status === feedbackTab)
                  .map((item) => (
                    <div
                      key={item.id}
                      className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 flex flex-col justify-between gap-3"
                    >
                      <div className="space-y-2">
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-1 text-amber-400">
                            {[...Array(item.rating)].map((_, i) => (
                              <Star key={i} size={14} className="fill-amber-400" />
                            ))}
                          </div>
                          <span className="text-[11px] text-slate-400 font-mono">
                            {new Date(item.created_at).toLocaleDateString()}
                          </span>
                        </div>

                        <div>
                          <h4 className="font-bold text-sm text-slate-900">
                            {item.full_name}
                          </h4>
                          {(item.treatment || item.branch) && (
                            <p className="text-xs text-slate-500">
                              {[item.treatment, item.branch].filter(Boolean).join(' • ')}
                            </p>
                          )}
                        </div>

                        <p className="text-xs text-slate-700 leading-relaxed italic bg-white p-3 rounded-lg border border-slate-100">
                          "{item.message}"
                        </p>
                      </div>

                      {/* MODERATION ACTIONS */}
                      <div className="pt-2 border-t border-slate-200/80 flex items-center justify-end gap-2">
                        {item.status !== 'approved' && (
                          <button
                            type="button"
                            disabled={feedbackModeratingId === item.id}
                            onClick={() => handleModerateFeedback(item.id, 'approved')}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm transition-colors cursor-pointer disabled:opacity-60"
                          >
                            <Check size={13} />
                            <span>Approve</span>
                          </button>
                        )}

                        {item.status !== 'rejected' && (
                          <button
                            type="button"
                            disabled={feedbackModeratingId === item.id}
                            onClick={() => handleModerateFeedback(item.id, 'rejected')}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-white hover:bg-rose-50 text-rose-700 border border-slate-200 hover:border-rose-200 transition-colors cursor-pointer disabled:opacity-60"
                          >
                            <X size={13} />
                            <span>Reject</span>
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </div>
        </section>

      </main>

      {/* 3. APPOINTMENT DETAIL MODAL */}
      {selectedAppointment && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200"
          onClick={() => setSelectedAppointment(null)}
        >
          <div
            className="bg-white w-full max-w-xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* MODAL HEADER */}
            <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50/50">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                  Appointment Request Details
                </span>
                <h2 className="text-lg font-bold text-slate-900">
                  {selectedAppointment.full_name}
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setSelectedAppointment(null)}
                className="p-1.5 text-slate-400 hover:text-slate-700 rounded-xl hover:bg-slate-200 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* MODAL BODY */}
            <div className="p-6 overflow-y-auto space-y-5 text-sm">
              
              {/* STATUS UPDATE TOAST */}
              {updateMessage && (
                <div
                  role="alert"
                  className={`p-3 rounded-xl text-xs font-medium flex items-center gap-2 ${
                    updateMessage.type === 'success'
                      ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                      : 'bg-red-50 text-red-800 border border-red-200'
                  }`}
                >
                  {updateMessage.type === 'success' ? (
                    <CheckCircle2 size={16} className="text-emerald-600" />
                  ) : (
                    <AlertCircle size={16} className="text-red-600" />
                  )}
                  <span>{updateMessage.text}</span>
                </div>
              )}

              {/* CURRENT STATUS & CONTEXTUAL ACTION WORKFLOW */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-600">
                    Appointment Lifecycle
                  </span>
                  {getStatusBadge(selectedAppointment.status)}
                </div>

                {/* PENDING: Confirm or Cancel */}
                {selectedAppointment.status === 'pending' && (
                  <div className="space-y-2 pt-1">
                    <span className="block text-[11px] text-slate-500 font-medium">
                      Select next action for this appointment request:
                    </span>
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
                      <button
                        type="button"
                        disabled={statusUpdating}
                        onClick={() => setConfirmModal({ action: 'confirm', appt: selectedAppointment })}
                        className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-bold bg-sky-600 hover:bg-sky-700 active:bg-sky-800 text-white shadow-sm shadow-sky-600/20 transition-all cursor-pointer disabled:opacity-60"
                      >
                        <Check size={16} />
                        <span>Confirm Appointment</span>
                      </button>
                      <button
                        type="button"
                        disabled={statusUpdating}
                        onClick={() => setConfirmModal({ action: 'cancel', appt: selectedAppointment })}
                        className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-bold bg-rose-50 hover:bg-rose-100 active:bg-rose-200 text-rose-700 border border-rose-200 transition-all cursor-pointer disabled:opacity-60"
                      >
                        <X size={16} />
                        <span>Cancel Appointment</span>
                      </button>
                    </div>
                  </div>
                )}

                {/* CONFIRMED: WhatsApp Patient & Mark as Completed */}
                {selectedAppointment.status === 'confirmed' && (
                  <div className="space-y-2 pt-1">
                    <span className="block text-[11px] text-slate-500 font-medium">
                      Appointment is confirmed and scheduled with patient.
                    </span>
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                      <a
                        href={getConfirmedAppointmentWhatsAppUrl(selectedAppointment)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-bold bg-[#25D366] hover:bg-[#20bd5a] text-white shadow-sm shadow-emerald-600/20 transition-all cursor-pointer"
                      >
                        <MessageSquare size={16} />
                        <span>WhatsApp Patient</span>
                      </a>
                      <button
                        type="button"
                        disabled={statusUpdating}
                        onClick={() => setConfirmModal({ action: 'complete', appt: selectedAppointment })}
                        className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white shadow-sm shadow-emerald-600/20 transition-all cursor-pointer disabled:opacity-60"
                      >
                        <CheckCircle2 size={16} />
                        <span>Mark as Completed</span>
                      </button>
                    </div>
                  </div>
                )}

                {/* COMPLETED: Terminal State */}
                {selectedAppointment.status === 'completed' && (
                  <div className="p-3 rounded-xl bg-emerald-50/80 border border-emerald-200 flex items-center gap-2 text-xs font-semibold text-emerald-800">
                    <UserCheck size={16} className="text-emerald-600 flex-shrink-0" />
                    <span>Appointment completed • Clinical record finalized</span>
                  </div>
                )}

                {/* CANCELLED: Terminal State */}
                {selectedAppointment.status === 'cancelled' && (
                  <div className="p-3 rounded-xl bg-slate-100 border border-slate-200 flex items-center gap-2 text-xs font-semibold text-slate-600">
                    <XCircle size={16} className="text-slate-500 flex-shrink-0" />
                    <span>Appointment cancelled • Record closed</span>
                  </div>
                )}
              </div>

              {/* PATIENT CONTACT CARDS */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                
                {/* PHONE */}
                <div className="p-3.5 rounded-2xl border border-slate-200 bg-white space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                    Phone Number
                  </span>
                  <a
                    href={`tel:${selectedAppointment.phone}`}
                    className="text-sm font-bold text-sky-700 hover:underline flex items-center gap-1.5"
                  >
                    <Phone size={14} />
                    <span>{selectedAppointment.phone}</span>
                  </a>
                </div>

                {/* WHATSAPP QUICK ACTION */}
                <div className="p-3.5 rounded-2xl border border-emerald-200 bg-emerald-50/50 space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 block">
                    WhatsApp Patient
                  </span>
                  <a
                    href={
                      selectedAppointment.status === 'confirmed'
                        ? getConfirmedAppointmentWhatsAppUrl(selectedAppointment)
                        : getWhatsAppUrl(selectedAppointment.phone, selectedAppointment.full_name)
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-bold text-emerald-700 hover:text-emerald-900 flex items-center gap-1.5"
                  >
                    <MessageSquare size={14} />
                    <span>Send WhatsApp Message</span>
                  </a>
                </div>

              </div>

              {/* DETAILS LIST */}
              <div className="space-y-3 divide-y divide-slate-100 text-xs">
                
                <div className="pt-2 flex items-start justify-between gap-4">
                  <span className="text-slate-500 font-medium">Clinic Branch:</span>
                  <span className="font-semibold text-slate-900 text-right">{selectedAppointment.branch}</span>
                </div>

                <div className="pt-2 flex items-start justify-between gap-4">
                  <span className="text-slate-500 font-medium">Requested Treatment:</span>
                  <span className="font-semibold text-slate-900 text-right">
                    {selectedAppointment.service || 'General Consultation'}
                  </span>
                </div>

                <div className="pt-2 flex items-start justify-between gap-4">
                  <span className="text-slate-500 font-medium">Preferred Specialist:</span>
                  <span className="font-semibold text-slate-900 text-right">
                    {selectedAppointment.doctor || 'Any Available Specialist'}
                  </span>
                </div>

                <div className="pt-2 flex items-start justify-between gap-4">
                  <span className="text-slate-500 font-medium">Preferred Date &amp; Time:</span>
                  <span className="font-semibold text-slate-900 text-right">
                    {selectedAppointment.preferred_date || 'Flexible'} • {selectedAppointment.preferred_time || 'Any Time'}
                  </span>
                </div>

                <div className="pt-2 flex items-start justify-between gap-4">
                  <span className="text-slate-500 font-medium">Submission Timestamp:</span>
                  <span className="text-slate-700 text-right font-mono">
                    {new Date(selectedAppointment.created_at).toLocaleString()}
                  </span>
                </div>

                {selectedAppointment.updated_at && (
                  <div className="pt-2 flex items-start justify-between gap-4">
                    <span className="text-slate-500 font-medium">Last Modified:</span>
                    <span className="text-slate-700 text-right font-mono">
                      {new Date(selectedAppointment.updated_at).toLocaleString()}
                    </span>
                  </div>
                )}

              </div>

              {/* PATIENT NOTE / MESSAGE */}
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block mb-1.5">
                  Patient Notes &amp; Symptoms
                </span>
                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-700 leading-relaxed min-h-[60px]">
                  {selectedAppointment.message ? selectedAppointment.message : <em>No additional notes submitted by patient.</em>}
                </div>
              </div>

            </div>

            {/* MODAL FOOTER */}
            <div className="px-6 py-3.5 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
              <span className="text-[11px] text-slate-400 font-mono">
                ID: {selectedAppointment.id.slice(0, 8)}...
              </span>
              <button
                type="button"
                onClick={() => setSelectedAppointment(null)}
                className="px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-semibold hover:bg-slate-800 transition-colors"
              >
                Close
              </button>
            </div>

          </div>
        </div>
      )}

      {/* 4. CONFIRMATION DIALOG MODAL */}
      {confirmModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[60] bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-150"
          onClick={() => !statusUpdating && setConfirmModal(null)}
        >
          <div
            className="bg-white w-full max-w-md rounded-2xl shadow-2xl border border-slate-200 p-6 space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            {confirmModal.action === 'confirm' && (
              <>
                <div className="w-12 h-12 rounded-2xl bg-sky-100 flex items-center justify-center text-sky-700 mb-1">
                  <CheckCircle2 size={24} />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    Confirm this appointment?
                  </h3>
                  <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                    Confirming this appointment will mark it as scheduled with the patient.
                  </p>
                </div>
                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    type="button"
                    disabled={statusUpdating}
                    onClick={() => setConfirmModal(null)}
                    className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    disabled={statusUpdating}
                    onClick={() => handleStatusTransition(confirmModal.appt, 'confirmed')}
                    className="px-4 py-2 rounded-xl text-xs font-bold bg-sky-600 hover:bg-sky-700 text-white shadow-sm shadow-sky-600/20 transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-60"
                  >
                    {statusUpdating && <RefreshCw size={14} className="animate-spin" />}
                    <span>Confirm Appointment</span>
                  </button>
                </div>
              </>
            )}

            {confirmModal.action === 'cancel' && (
              <>
                <div className="w-12 h-12 rounded-2xl bg-rose-100 flex items-center justify-center text-rose-700 mb-1">
                  <XCircle size={24} />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    Cancel this appointment?
                  </h3>
                  <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                    This appointment will be marked as cancelled.
                  </p>
                </div>
                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    type="button"
                    disabled={statusUpdating}
                    onClick={() => setConfirmModal(null)}
                    className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
                  >
                    Keep Appointment
                  </button>
                  <button
                    type="button"
                    disabled={statusUpdating}
                    onClick={() => handleStatusTransition(confirmModal.appt, 'cancelled')}
                    className="px-4 py-2 rounded-xl text-xs font-bold bg-rose-600 hover:bg-rose-700 text-white shadow-sm shadow-rose-600/20 transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-60"
                  >
                    {statusUpdating && <RefreshCw size={14} className="animate-spin" />}
                    <span>Cancel Appointment</span>
                  </button>
                </div>
              </>
            )}

            {confirmModal.action === 'complete' && (
              <>
                <div className="w-12 h-12 rounded-2xl bg-emerald-100 flex items-center justify-center text-emerald-700 mb-1">
                  <UserCheck size={24} />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    Mark appointment as completed?
                  </h3>
                  <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                    Confirm that the patient's appointment/treatment has been completed.
                  </p>
                </div>
                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    type="button"
                    disabled={statusUpdating}
                    onClick={() => setConfirmModal(null)}
                    className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    disabled={statusUpdating}
                    onClick={() => handleStatusTransition(confirmModal.appt, 'completed')}
                    className="px-4 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm shadow-emerald-600/20 transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-60"
                  >
                    {statusUpdating && <RefreshCw size={14} className="animate-spin" />}
                    <span>Mark as Completed</span>
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* 4b. POST-CONFIRMATION ACTION MODAL: WHATSAPP PATIENT */}
      {confirmedApptForWhatsApp && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[70] bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-150"
          onClick={() => setConfirmedApptForWhatsApp(null)}
        >
          <div
            className="bg-white w-full max-w-md rounded-2xl shadow-2xl border border-slate-200 p-6 space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 flex items-center justify-center text-emerald-600 mb-1">
              <CheckCircle2 size={26} />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Appointment Confirmed!
              </h3>
              <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                Appointment for <strong className="text-slate-900">{confirmedApptForWhatsApp.full_name}</strong> has been confirmed. You can now notify the patient on WhatsApp with their booking confirmation details.
              </p>
            </div>

            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/80 text-xs space-y-2 text-slate-700">
              <div className="flex justify-between">
                <span className="text-slate-500">Patient:</span>
                <span className="font-semibold text-slate-900">{confirmedApptForWhatsApp.full_name} ({confirmedApptForWhatsApp.phone})</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Scheduled Date:</span>
                <span className="font-semibold text-slate-900">{confirmedApptForWhatsApp.preferred_date || 'Flexible Date'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Time Window:</span>
                <span className="font-semibold text-slate-900">{confirmedApptForWhatsApp.preferred_time || 'Clinic Hours'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Clinic / Branch:</span>
                <span className="font-semibold text-slate-900">{confirmedApptForWhatsApp.branch}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Treatment:</span>
                <span className="font-semibold text-slate-900">{confirmedApptForWhatsApp.service || 'General Consultation'}</span>
              </div>
              {confirmedApptForWhatsApp.doctor && (
                <div className="flex justify-between">
                  <span className="text-slate-500">Specialist:</span>
                  <span className="font-semibold text-slate-900">{confirmedApptForWhatsApp.doctor}</span>
                </div>
              )}
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-2.5 pt-2">
              <button
                type="button"
                onClick={() => setConfirmedApptForWhatsApp(null)}
                className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer text-center"
              >
                Close
              </button>
              <a
                href={getConfirmedAppointmentWhatsAppUrl(confirmedApptForWhatsApp)}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setConfirmedApptForWhatsApp(null)}
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-[#25D366] hover:bg-[#20bd5a] text-white shadow-sm shadow-emerald-600/20 transition-all cursor-pointer"
              >
                <MessageSquare size={16} />
                <span>WhatsApp Patient</span>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* 5. CLINIC AVAILABILITY CONFIRMATION MODAL */}
      {branchConfirmModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[60] bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-150"
          onClick={() => !branchUpdatingId && setBranchConfirmModal(null)}
        >
          <div
            className="bg-white w-full max-w-md rounded-2xl shadow-2xl border border-slate-200 p-6 space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            {/* DEACTIVATE CONFIRMATION (ACTIVE -> NOT ACTIVE) */}
            {!branchConfirmModal.targetActive ? (
              <>
                <div className="w-12 h-12 rounded-2xl bg-rose-100 flex items-center justify-center text-rose-700 mb-1">
                  <XCircle size={24} />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    Deactivate this clinic?
                  </h3>
                  <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                    Patients will no longer be able to submit new appointment requests for this clinic.
                  </p>
                  <p className="text-[11px] text-slate-400 mt-2 font-medium">
                    Branch: {branchConfirmModal.branch.name}
                  </p>
                </div>
                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    type="button"
                    disabled={Boolean(branchUpdatingId)}
                    onClick={() => setBranchConfirmModal(null)}
                    className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
                  >
                    Keep Active
                  </button>
                  <button
                    type="button"
                    disabled={Boolean(branchUpdatingId)}
                    onClick={() =>
                      handleBranchToggle(
                        branchConfirmModal.branch.id,
                        branchConfirmModal.targetActive
                      )
                    }
                    className="px-4 py-2 rounded-xl text-xs font-bold bg-rose-600 hover:bg-rose-700 text-white shadow-sm shadow-rose-600/20 transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-60"
                  >
                    {branchUpdatingId && <RefreshCw size={14} className="animate-spin" />}
                    <span>Deactivate Clinic</span>
                  </button>
                </div>
              </>
            ) : (
              /* ACTIVATE CONFIRMATION (NOT ACTIVE -> ACTIVE) */
              <>
                <div className="w-12 h-12 rounded-2xl bg-emerald-100 flex items-center justify-center text-emerald-700 mb-1">
                  <CheckCircle2 size={24} />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    Activate this clinic?
                  </h3>
                  <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                    Patients will be able to submit new appointment requests for this clinic.
                  </p>
                  <p className="text-[11px] text-slate-400 mt-2 font-medium">
                    Branch: {branchConfirmModal.branch.name}
                  </p>
                </div>
                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    type="button"
                    disabled={Boolean(branchUpdatingId)}
                    onClick={() => setBranchConfirmModal(null)}
                    className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    disabled={Boolean(branchUpdatingId)}
                    onClick={() =>
                      handleBranchToggle(
                        branchConfirmModal.branch.id,
                        branchConfirmModal.targetActive
                      )
                    }
                    className="px-4 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm shadow-emerald-600/20 transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-60"
                  >
                    {branchUpdatingId && <RefreshCw size={14} className="animate-spin" />}
                    <span>Activate Clinic</span>
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* DOCTOR AVAILABILITY CONFIRMATION MODAL */}
      {doctorConfirmModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={() => setDoctorConfirmModal(null)}
        >
          <div
            className="bg-white max-w-md w-full rounded-3xl p-6 sm:p-7 shadow-2xl border border-slate-200 space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                    doctorConfirmModal.targetPresent
                      ? 'bg-emerald-100 text-emerald-700'
                      : 'bg-amber-100 text-amber-700'
                  }`}
                >
                  <Stethoscope size={18} />
                </div>
                <h3 className="font-bold text-slate-900 text-base">
                  {doctorConfirmModal.targetPresent
                    ? 'Mark Doctor as Present?'
                    : 'Mark Doctor as Absent?'}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setDoctorConfirmModal(null)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg"
              >
                <X size={18} />
              </button>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              {doctorConfirmModal.targetPresent
                ? `Mark ${doctorConfirmModal.doctor.name} as Present? Patients will be able to select this doctor during online booking.`
                : `Mark ${doctorConfirmModal.doctor.name} as Absent? Patients will not be able to select this specialist in new appointment requests.`}
            </p>

            <div className="pt-2 flex items-center justify-end gap-2.5">
              <button
                type="button"
                onClick={() => setDoctorConfirmModal(null)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={Boolean(doctorUpdatingId)}
                onClick={() =>
                  handleDoctorToggle(
                    doctorConfirmModal.doctor,
                    doctorConfirmModal.targetPresent
                  )
                }
                className={`px-4 py-2 text-xs font-bold text-white rounded-xl transition-all shadow-sm cursor-pointer disabled:opacity-60 flex items-center gap-1.5 ${
                  doctorConfirmModal.targetPresent
                    ? 'bg-emerald-600 hover:bg-emerald-700'
                    : 'bg-amber-600 hover:bg-amber-700'
                }`}
              >
                {doctorUpdatingId && <RefreshCw size={13} className="animate-spin" />}
                <span>
                  {doctorConfirmModal.targetPresent
                    ? 'Confirm Present'
                    : 'Confirm Absent'}
                </span>
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
