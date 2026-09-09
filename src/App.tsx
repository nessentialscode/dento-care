import React, { useState } from 'react';
import { HeroDesktop } from './components/HeroDesktop';
import { EditorialGridSection } from './components/EditorialGridSection';
import { ServicesSection } from './components/ServicesSection';
import { LocationsSection } from './components/LocationsSection';
import { DoctorsSection } from './components/DoctorsSection';
import { ReviewsSection } from './components/ReviewsSection';
import { GallerySection } from './components/GallerySection';
import { AboutSection } from './components/AboutSection';
import { AppointmentModal } from './components/AppointmentModal';
import { Footer } from './components/Footer';

export const App: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalService, setModalService] = useState<string | undefined>(undefined);
  const [modalDoctor, setModalDoctor] = useState<string | undefined>(undefined);
  const [modalBranch, setModalBranch] = useState<string | undefined>(undefined);

  const handleOpenBooking = (service?: string, doctor?: string, branch?: string) => {
    setModalService(service);
    setModalDoctor(doctor);
    setModalBranch(branch);
    setModalOpen(true);
  };

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
        onDoctorClick={() => handleOpenBooking(undefined, 'Dr. Reed')}
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
      <ReviewsSection />

      {/* 7. CLINIC PHOTOGRAPHY GALLERY */}
      <GallerySection />

      {/* 8. ABOUT DENTO CARE & CLINICAL PHILOSOPHY */}
      <AboutSection />

      {/* 9. DARK LUXURY FOOTER */}
      <Footer onBookClick={() => handleOpenBooking()} />

      {/* INTERACTIVE APPOINTMENT MODAL */}
      <AppointmentModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        initialService={modalService}
        initialDoctor={modalDoctor}
        initialBranch={modalBranch}
      />
    </div>
  );
};

export default App;
