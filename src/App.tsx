import React, { useState, useEffect } from 'react';
import { HeroDesktop } from './components/HeroDesktop';
import { EditorialGridSection } from './components/EditorialGridSection';
import { ServicesSection } from './components/ServicesSection';
import { LocationsSection } from './components/LocationsSection';
import { DoctorsSection } from './components/DoctorsSection';
import { ReviewsSection } from './components/ReviewsSection';
import { GallerySection } from './components/GallerySection';
import { AppointmentModal } from './components/AppointmentModal';
import { Footer } from './components/Footer';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';
import { TermsOfUsePage } from './pages/TermsOfUsePage';
import { FeedbackPage } from './pages/FeedbackPage';
import { AdminLoginPage } from './pages/AdminLoginPage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { getAdminSession, onAdminAuthStateChange, isAuthorizedAdmin, signOutAdmin } from './services/authService';
import type { Session } from '@supabase/supabase-js';
import { ShieldAlert, RefreshCw, ArrowLeft, LogOut } from 'lucide-react';

export const App: React.FC = () => {
  const [currentPath, setCurrentPath] = useState(
    typeof window !== 'undefined' ? window.location.pathname : '/'
  );
  const [modalOpen, setModalOpen] = useState(false);
  const [modalService, setModalService] = useState<string | undefined>(undefined);
  const [modalDoctor, setModalDoctor] = useState<string | undefined>(undefined);
  const [modalBranch, setModalBranch] = useState<string | undefined>(undefined);

  // Admin authentication state
  const [adminSession, setAdminSession] = useState<Session | null>(null);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    // Initial session check
    getAdminSession().then((session) => {
      setAdminSession(session);
      setAuthLoading(false);
    });

    // Listen for auth state changes
    const subscription = onAdminAuthStateChange((_event, session) => {
      setAdminSession(session);
      setAuthLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigateTo = (path: string) => {
    if (path !== window.location.pathname) {
      window.history.pushState({}, '', path);
      setCurrentPath(path);
    } else {
      setCurrentPath(path);
    }
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const handleOpenBooking = (service?: string, doctor?: string, branch?: string) => {
    setModalService(service);
    setModalDoctor(doctor);
    setModalBranch(branch);
    setModalOpen(true);
  };

  // ADMIN ROUTE: /admin or /admin/
  if (currentPath === '/admin' || currentPath === '/admin/') {
    if (authLoading) {
      return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
          <div className="text-center space-y-3">
            <RefreshCw size={32} className="animate-spin text-[#5B9DE6] mx-auto" />
            <p className="text-sm font-semibold text-slate-600">Verifying administrator session...</p>
          </div>
        </div>
      );
    }

    if (!adminSession || !adminSession.user) {
      return (
        <AdminLoginPage
          onSuccess={() => navigateTo('/admin')}
          onNavigateHome={() => navigateTo('/')}
        />
      );
    }

    // Authenticated user check for administrative authorization
    const isAuthorized = isAuthorizedAdmin(adminSession.user);

    if (!isAuthorized) {
      return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-white rounded-3xl p-8 border border-slate-200 shadow-xl text-center space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-red-100 flex items-center justify-center mx-auto text-red-600">
              <ShieldAlert size={28} />
            </div>
            <h1 className="text-xl font-bold text-slate-900">Access Denied</h1>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Signed in as <strong>{adminSession.user.email}</strong>. This account does not possess administrator privileges for the Dento Care Portal.
            </p>
            <div className="pt-2 flex flex-col sm:flex-row gap-2.5 justify-center">
              <button
                type="button"
                onClick={async () => {
                  await signOutAdmin();
                  navigateTo('/admin');
                }}
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-semibold transition-colors"
              >
                <LogOut size={14} />
                <span>Sign Out</span>
              </button>
              <button
                type="button"
                onClick={() => navigateTo('/')}
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold transition-colors"
              >
                <ArrowLeft size={14} />
                <span>Back to Website</span>
              </button>
            </div>
          </div>
        </div>
      );
    }

    return (
      <AdminDashboardPage
        adminEmail={adminSession.user.email}
        onLogout={async () => {
          await signOutAdmin();
          navigateTo('/admin');
        }}
        onNavigateHome={() => navigateTo('/')}
      />
    );
  }

  if (currentPath === '/privacy-policy' || currentPath === '/privacy-policy/') {
    return (
      <>
        <PrivacyPolicyPage
          onNavigateHome={() => navigateTo('/')}
          onBookClick={() => handleOpenBooking()}
        />
        <AppointmentModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          initialService={modalService}
          initialDoctor={modalDoctor}
          initialBranch={modalBranch}
          onPrivacyClick={() => navigateTo('/privacy-policy')}
        />
      </>
    );
  }

  if (currentPath === '/terms' || currentPath === '/terms/') {
    return (
      <>
        <TermsOfUsePage
          onNavigateHome={() => navigateTo('/')}
          onBookClick={() => handleOpenBooking()}
          onPrivacyClick={() => navigateTo('/privacy-policy')}
        />
        <AppointmentModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          initialService={modalService}
          initialDoctor={modalDoctor}
          initialBranch={modalBranch}
          onPrivacyClick={() => navigateTo('/privacy-policy')}
        />
      </>
    );
  }

  if (currentPath === '/feedback' || currentPath === '/feedback/') {
    return (
      <>
        <FeedbackPage
          onNavigateHome={() => navigateTo('/')}
          onBookClick={() => handleOpenBooking()}
        />
        <AppointmentModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          initialService={modalService}
          initialDoctor={modalDoctor}
          initialBranch={modalBranch}
          onPrivacyClick={() => navigateTo('/privacy-policy')}
        />
      </>
    );
  }

  const isHomeRoute = currentPath === '/' || currentPath === '' || currentPath === '/index.html';

  if (isHomeRoute) {
    return (
      <div className="min-h-screen bg-[#D8EEE1] text-slate-900 flex flex-col selection:bg-[#E5FE40] selection:text-slate-900">
        
        {/* 1. HERO DESKTOP / MAIN CANVAS (Faithful to Reference Image 1) */}
        <HeroDesktop onBookClick={() => handleOpenBooking()} />

      {/* 2. EDITORIAL GRID & MOBILE LAYOUT SECTION (Faithful to Reference Image 2) */}
      <EditorialGridSection
        onBookClick={() => handleOpenBooking()}
        onServiceClick={(serviceId) => {
          if (serviceId === 'dental-implants') {
            handleOpenBooking('Dental Implants');
          } else {
            const el = document.getElementById('treatments');
            el?.scrollIntoView({ behavior: 'smooth' });
          }
        }}
        onDoctorClick={() => handleOpenBooking(undefined, 'Dr. Lijeesh Kadambil')}
      />

      {/* 3. TREATMENTS & CLINICAL CARE */}
      <ServicesSection
        onBookService={(serviceName) => handleOpenBooking(serviceName)}
      />

      {/* 4. MULTI-LOCATION SECTION (Ponnani Flagship & Expansion) */}
      <LocationsSection
        onBookClick={(branchName) => handleOpenBooking(undefined, undefined, branchName)}
      />

      {/* 5. SPECIALIST DOCTORS */}
      <DoctorsSection
        onBookDoctor={(docName) => handleOpenBooking(undefined, docName)}
      />

      {/* 6. VERIFIED PATIENT REVIEWS (4.9 Google Rating / 32+ Reviews) */}
      <ReviewsSection onNavigateFeedback={() => navigateTo('/feedback')} />

      {/* 7. CLINIC PHOTOGRAPHY GALLERY */}
      <GallerySection />

      {/* 8. DARK LUXURY FOOTER */}
      <Footer
        onBookClick={() => handleOpenBooking()}
        onPrivacyClick={() => navigateTo('/privacy-policy')}
        onTermsClick={() => navigateTo('/terms')}
      />

        {/* INTERACTIVE APPOINTMENT MODAL */}
        <AppointmentModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          initialService={modalService}
          initialDoctor={modalDoctor}
          initialBranch={modalBranch}
          onPrivacyClick={() => navigateTo('/privacy-policy')}
        />
      </div>
    );
  }

  // 404 ROUTE HANDLER FOR UNKNOWN PATHS
  return (
    <>
      <NotFoundPage
        onNavigateHome={() => navigateTo('/')}
        onBookClick={() => handleOpenBooking()}
      />
      <AppointmentModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        initialService={modalService}
        initialDoctor={modalDoctor}
        initialBranch={modalBranch}
        onPrivacyClick={() => navigateTo('/privacy-policy')}
      />
    </>
  );
};

export default App;
