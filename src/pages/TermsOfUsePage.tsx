import React, { useEffect } from 'react';
import { ArrowLeft, FileText, Mail, Phone, MapPin, Calendar, Clock, CheckCircle2, AlertCircle, ShieldAlert } from 'lucide-react';

interface TermsOfUsePageProps {
  onNavigateHome: () => void;
  onBookClick: () => void;
  onPrivacyClick?: () => void;
}

export const TermsOfUsePage: React.FC<TermsOfUsePageProps> = ({
  onNavigateHome,
  onBookClick,
  onPrivacyClick
}) => {
  // Update page title and meta description on mount
  useEffect(() => {
    const prevTitle = document.title;
    document.title = 'Terms of Use — Dento Care Dental Clinic';

    const metaDesc = document.querySelector('meta[name="description"]');
    const prevDesc = metaDesc ? metaDesc.getAttribute('content') : '';
    if (metaDesc) {
      metaDesc.setAttribute(
        'content',
        'Terms of Use for Dento Care Dental Clinic. Review website terms, appointment request conditions, medical disclaimers, and user guidelines.'
      );
    }

    window.scrollTo({ top: 0, behavior: 'instant' });

    return () => {
      document.title = prevTitle;
      if (metaDesc && prevDesc) {
        metaDesc.setAttribute('content', prevDesc);
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#D8EEE1] text-slate-900 flex flex-col selection:bg-[#E5FE40] selection:text-slate-900">
      
      {/* STICKY HEADER */}
      <header className="sticky top-0 z-40 bg-[#D8EEE1]/90 backdrop-blur-md border-b border-slate-900/10 px-4 sm:px-8 py-3.5 sm:py-4 transition-all">
        <div className="max-w-5xl mx-auto flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={onNavigateHome}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-700 hover:text-slate-950 transition-colors cursor-pointer group py-1"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            <span>Back to Home</span>
          </button>

          <div className="flex items-center gap-2 sm:gap-3">
            {onPrivacyClick && (
              <button
                type="button"
                onClick={onPrivacyClick}
                className="px-3.5 sm:px-4 py-2 text-xs sm:text-sm font-semibold text-slate-700 hover:text-slate-950 transition-colors cursor-pointer"
              >
                Privacy Policy
              </button>
            )}
            <button
              type="button"
              onClick={onBookClick}
              className="px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-[#111724] text-white hover:bg-slate-800 text-xs sm:text-sm font-semibold shadow-md transition-colors cursor-pointer"
            >
              Book Consultation
            </button>
          </div>
        </div>
      </header>

      {/* MAIN CONTENT AREA */}
      <main className="flex-grow px-3 sm:px-6 md:px-8 py-8 sm:py-14">
        <article className="max-w-4xl mx-auto bg-white rounded-[32px] sm:rounded-[44px] shadow-xl border border-sky-100 overflow-hidden">
          
          {/* BANNER HEADER */}
          <div className="bg-[#111724] text-white p-6 sm:p-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-80 bg-[#5B9DE6]/15 rounded-full blur-3xl pointer-events-none" />
            
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-semibold text-[#E5FE40] mb-3">
              <FileText size={14} />
              <span>Legal Terms & Conditions</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-light tracking-tight text-white leading-tight">
              Terms of Use
            </h1>
            <p className="text-slate-300 text-xs sm:text-sm mt-2 max-w-2xl leading-relaxed">
              Please read these terms and conditions carefully before using the Dento Care Dental Clinic website or submitting appointment requests.
            </p>

            <div className="mt-6 pt-4 border-t border-slate-800/80 flex flex-wrap items-center gap-4 sm:gap-6 text-xs text-slate-400">
              <span className="flex items-center gap-1.5">
                <Calendar size={13} className="text-[#E5FE40]" />
                Last Updated: 11 September 2026
              </span>
              <span>•</span>
              <span>Effective Date: 11 September 2026</span>
              <span>•</span>
              <span className="text-slate-300 font-medium">Dento Care Dental Clinic</span>
            </div>
          </div>

          {/* DOCUMENT BODY */}
          <div className="p-6 sm:p-12 lg:p-16 space-y-10 text-slate-700 text-sm sm:text-base leading-relaxed">

            {/* 1. ACCEPTANCE OF TERMS */}
            <section className="space-y-3">
              <h2 className="text-xl sm:text-2xl font-semibold text-slate-900 tracking-tight flex items-center gap-2.5">
                <span className="flex items-center justify-center w-7 h-7 rounded-full bg-sky-100 text-[#5B9DE6] text-xs font-bold">1</span>
                Acceptance of Terms
              </h2>
              <p>
                Welcome to <strong>Dento Care Dental Clinic</strong> (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;). These Terms of Use govern your access to and use of our official website, online appointment booking features, and associated digital communication channels.
              </p>
              <p>
                By visiting our website or submitting an appointment request, you agree to comply with and be bound by these Terms of Use and our{' '}
                <a
                  href="/privacy-policy"
                  onClick={(e) => {
                    if (onPrivacyClick) {
                      e.preventDefault();
                      onPrivacyClick();
                    }
                  }}
                  className="text-[#5B9DE6] font-semibold hover:underline"
                >
                  Privacy Policy
                </a>. If you do not agree to these terms, please refrain from using this website.
              </p>
            </section>

            {/* 2. HEALTHCARE & MEDICAL DISCLAIMER */}
            <section className="space-y-3">
              <h2 className="text-xl sm:text-2xl font-semibold text-slate-900 tracking-tight flex items-center gap-2.5">
                <span className="flex items-center justify-center w-7 h-7 rounded-full bg-sky-100 text-[#5B9DE6] text-xs font-bold">2</span>
                Healthcare & Medical Information Disclaimer
              </h2>
              <div className="p-4 sm:p-5 rounded-2xl bg-amber-50/80 border border-amber-200/90 flex items-start gap-3 text-amber-900">
                <AlertCircle size={20} className="text-amber-600 flex-shrink-0 mt-0.5" />
                <div className="space-y-2 text-xs sm:text-sm leading-relaxed">
                  <p className="font-semibold text-amber-950">
                    Not a Substitute for Professional Dental or Medical Advice:
                  </p>
                  <p>
                    All content published on this website—including dental treatment overviews, procedural guides, specialist profiles, clinical photography, and frequently asked questions—is provided solely for general informational and educational purposes. It does not constitute medical advice, clinical diagnosis, or a personalized treatment plan.
                  </p>
                  <p>
                    Browsing this website or communicating with us via online forms does not establish a formal doctor-patient relationship. A doctor-patient relationship is created only after an in-person clinical examination and medical consultation at our clinic.
                  </p>
                </div>
              </div>

              <div className="p-4 sm:p-5 rounded-2xl bg-rose-50/80 border border-rose-200/90 flex items-start gap-3 text-rose-900">
                <ShieldAlert size={20} className="text-rose-600 flex-shrink-0 mt-0.5" />
                <div className="space-y-1 text-xs sm:text-sm leading-relaxed">
                  <p className="font-semibold text-rose-950">
                    No Emergency Services via Website:
                  </p>
                  <p>
                    This website and its online inquiry forms are <strong>not</strong> intended for acute emergencies, severe dental trauma, uncontrolled bleeding, or life-threatening conditions. If you are experiencing a medical emergency, please proceed immediately to the nearest hospital casualty department or call emergency medical services.
                  </p>
                </div>
              </div>
            </section>

            {/* 3. APPOINTMENT REQUESTS & SCHEDULING */}
            <section className="space-y-3">
              <h2 className="text-xl sm:text-2xl font-semibold text-slate-900 tracking-tight flex items-center gap-2.5">
                <span className="flex items-center justify-center w-7 h-7 rounded-full bg-sky-100 text-[#5B9DE6] text-xs font-bold">3</span>
                Appointment Requests & Scheduling Conditions
              </h2>
              <p>
                When you submit an appointment request through our website or initiate a conversation through WhatsApp, you understand and agree to the following conditions:
              </p>
              
              <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 sm:p-6 space-y-3">
                <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 size={16} className="text-emerald-500 mt-0.5 flex-shrink-0" />
                    <span><strong>Request, Not Guaranteed Booking:</strong> Submitting the appointment form is a booking request and does not automatically confirm an appointment slot.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 size={16} className="text-emerald-500 mt-0.5 flex-shrink-0" />
                    <span><strong>Staff Verification Required:</strong> Your appointment is confirmed only when a member of our clinic reception team contacts you via telephone call or WhatsApp to confirm the date, time, and doctor availability.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 size={16} className="text-emerald-500 mt-0.5 flex-shrink-0" />
                    <span><strong>Schedule & Doctor Availability:</strong> Appointment timings and specialist doctor consultations are subject to surgical schedules, clinic operating hours, and unavoidable clinical delays.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 size={16} className="text-emerald-500 mt-0.5 flex-shrink-0" />
                    <span><strong>Patient Accuracy:</strong> You agree to provide accurate and complete contact information (name, valid phone number) and relevant dental notes so our team can reach you effectively.</span>
                  </li>
                </ul>
              </div>
            </section>

            {/* 4. PATIENT CONTACT & COMMUNICATIONS */}
            <section className="space-y-3">
              <h2 className="text-xl sm:text-2xl font-semibold text-slate-900 tracking-tight flex items-center gap-2.5">
                <span className="flex items-center justify-center w-7 h-7 rounded-full bg-sky-100 text-[#5B9DE6] text-xs font-bold">4</span>
                Patient Communications & Consent to Contact
              </h2>
              <p>
                By providing your phone number and submitting an appointment inquiry, you expressly authorize Dento Care Dental Clinic and our reception staff to contact you via:
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm">
                <li>Telephone voice calls to verify your identity and confirm appointment times.</li>
                <li>WhatsApp messages to send appointment confirmations, clinic address links, or scheduling updates.</li>
                <li>SMS text notifications regarding your consultation status or clinic schedule changes.</li>
              </ul>
              <p className="text-xs sm:text-sm text-slate-600">
                You may request not to receive non-essential follow-up messages at any time by notifying our reception team during your call or visit.
              </p>
            </section>

            {/* 5. NO ONLINE PAYMENTS OR PURCHASES */}
            <section className="space-y-3">
              <h2 className="text-xl sm:text-2xl font-semibold text-slate-900 tracking-tight flex items-center gap-2.5">
                <span className="flex items-center justify-center w-7 h-7 rounded-full bg-sky-100 text-[#5B9DE6] text-xs font-bold">5</span>
                Payment Terms & In-Clinic Billing
              </h2>
              <p>
                The Dento Care website operates purely as an informational and appointment scheduling portal.
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm">
                <li>We do <strong>not</strong> collect online payments, banking credentials, or card details on this website.</li>
                <li>We do <strong>not</strong> sell commercial products, online digital goods, or recurring subscriptions through this site.</li>
                <li>All consultation fees, diagnostic evaluations, X-rays, and procedural treatments are billed transparently in person at our clinic reception desks upon completion of your visit.</li>
              </ul>
            </section>

            {/* 6. INTELLECTUAL PROPERTY */}
            <section className="space-y-3">
              <h2 className="text-xl sm:text-2xl font-semibold text-slate-900 tracking-tight flex items-center gap-2.5">
                <span className="flex items-center justify-center w-7 h-7 rounded-full bg-sky-100 text-[#5B9DE6] text-xs font-bold">6</span>
                Intellectual Property Rights
              </h2>
              <p>
                All materials, visual assets, text, photography, graphic designs, clinic logos, service marks, and interface code on this website are the property of Dento Care Dental Clinic or its licensors and are protected under Indian copyright, trademark, and intellectual property laws.
              </p>
              <p>
                You may view and access website materials for personal, non-commercial use solely to learn about our clinic and book appointments. You may not copy, reproduce, modify, republish, distribute, or reverse-engineer any part of this website without our prior written consent.
              </p>
            </section>

            {/* 7. ACCEPTABLE USE */}
            <section className="space-y-3">
              <h2 className="text-xl sm:text-2xl font-semibold text-slate-900 tracking-tight flex items-center gap-2.5">
                <span className="flex items-center justify-center w-7 h-7 rounded-full bg-sky-100 text-[#5B9DE6] text-xs font-bold">7</span>
                Acceptable Use Policy
              </h2>
              <p>When using this website, you agree not to:</p>
              <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm">
                <li>Submit false, fraudulent, or fictitious appointment requests.</li>
                <li>Impersonate any individual, patient, or entity.</li>
                <li>Use automated scripts, bots, scrapers, or crawlers to access the site or extract data.</li>
                <li>Attempt to bypass security controls, tamper with backend Edge Functions, or compromise database integrity.</li>
                <li>Transmit viruses, worms, malware, or any harmful code designed to disrupt normal website operations.</li>
              </ul>
              <p className="text-xs sm:text-sm text-slate-600">
                We reserve the right to block, restrict, or report abusive IP addresses or individuals engaging in unauthorized activities.
              </p>
            </section>

            {/* 8. THIRD-PARTY SERVICES & LINKS */}
            <section className="space-y-3">
              <h2 className="text-xl sm:text-2xl font-semibold text-slate-900 tracking-tight flex items-center gap-2.5">
                <span className="flex items-center justify-center w-7 h-7 rounded-full bg-sky-100 text-[#5B9DE6] text-xs font-bold">8</span>
                Third-Party Links & External Services
              </h2>
              <p>
                Our website links to or utilizes third-party tools to deliver a smooth patient experience:
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm">
                <li><strong>WhatsApp (Meta Platforms, Inc.):</strong> For direct messaging and instant consultations.</li>
                <li><strong>Google Maps:</strong> For interactive directions and clinic navigation.</li>
                <li><strong>Supabase Inc. & Vercel Inc.:</strong> For secure backend processing and web delivery.</li>
              </ul>
              <p className="text-xs sm:text-sm text-slate-600">
                We do not control and are not responsible for the privacy practices, content, or availability of third-party websites or services. Your interactions with third-party platforms are governed by their respective terms and policies.
              </p>
            </section>

            {/* 9. PRIVACY */}
            <section className="space-y-3">
              <h2 className="text-xl sm:text-2xl font-semibold text-slate-900 tracking-tight flex items-center gap-2.5">
                <span className="flex items-center justify-center w-7 h-7 rounded-full bg-sky-100 text-[#5B9DE6] text-xs font-bold">9</span>
                Privacy & Data Protection
              </h2>
              <p>
                Your privacy is of paramount importance to us. Our collection, handling, and security of personal information submitted via appointment requests are governed by our{' '}
                <a
                  href="/privacy-policy"
                  onClick={(e) => {
                    if (onPrivacyClick) {
                      e.preventDefault();
                      onPrivacyClick();
                    }
                  }}
                  className="text-[#5B9DE6] font-semibold hover:underline"
                >
                  Privacy Policy
                </a>.
              </p>
              <p>
                By using our website, you consent to data handling in accordance with our Privacy Policy.
              </p>
            </section>

            {/* 10. LIMITATION OF LIABILITY */}
            <section className="space-y-3">
              <h2 className="text-xl sm:text-2xl font-semibold text-slate-900 tracking-tight flex items-center gap-2.5">
                <span className="flex items-center justify-center w-7 h-7 rounded-full bg-sky-100 text-[#5B9DE6] text-xs font-bold">10</span>
                Limitation of Liability & Disclaimer of Warranties
              </h2>
              <p>
                This website and its content are provided on an &quot;as is&quot; and &quot;as available&quot; basis without warranties of any kind, either express or implied, including but not limited to warranties of fitness for a particular purpose, non-infringement, or error-free operation.
              </p>
              <p>
                To the fullest extent permitted by applicable law, Dento Care Dental Clinic, its doctors, staff, and affiliates shall not be liable for any direct, indirect, incidental, consequential, or punitive damages arising from:
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm">
                <li>Your access to, use of, or inability to access or use the website.</li>
                <li>Any reliance placed on informational content on this website.</li>
                <li>Any delay, failure, or rescheduling of requested appointment slots.</li>
                <li>Any interruption, bug, or technical malfunction beyond our reasonable control.</li>
              </ul>
            </section>

            {/* 11. GOVERNING LAW & JURISDICTION */}
            <section className="space-y-3">
              <h2 className="text-xl sm:text-2xl font-semibold text-slate-900 tracking-tight flex items-center gap-2.5">
                <span className="flex items-center justify-center w-7 h-7 rounded-full bg-sky-100 text-[#5B9DE6] text-xs font-bold">11</span>
                Governing Law & Jurisdiction
              </h2>
              <p>
                These Terms of Use and any disputes or claims arising out of or related to your use of this website shall be governed by and construed in accordance with the laws of India, applicable in the State of Kerala.
              </p>
              <p>
                Any legal action, suit, or proceeding arising out of or relating to these Terms or the clinic website shall be instituted exclusively in the competent civil courts of Malappuram district, Kerala, India.
              </p>
            </section>

            {/* 12. CHANGES TO THESE TERMS */}
            <section className="space-y-3">
              <h2 className="text-xl sm:text-2xl font-semibold text-slate-900 tracking-tight flex items-center gap-2.5">
                <span className="flex items-center justify-center w-7 h-7 rounded-full bg-sky-100 text-[#5B9DE6] text-xs font-bold">12</span>
                Modifications & Updates to Terms
              </h2>
              <p>
                We may revise or update these Terms of Use from time to time to reflect adjustments to our website, clinical operations, or relevant legal requirements. When changes are made, the &quot;Last Updated&quot; date at the top of this page will be updated. Your continued use of the website following any posted modifications constitutes your acceptance of the updated terms.
              </p>
            </section>

            {/* 13. CONTACT INFORMATION */}
            <section className="space-y-4 pt-4 border-t border-slate-200">
              <h2 className="text-xl sm:text-2xl font-semibold text-slate-900 tracking-tight flex items-center gap-2.5">
                <span className="flex items-center justify-center w-7 h-7 rounded-full bg-sky-100 text-[#5B9DE6] text-xs font-bold">13</span>
                Contact Information
              </h2>
              <p>
                If you have questions, feedback, or concerns regarding these Terms of Use, please reach out to our clinic administrative office:
              </p>

              <div className="bg-[#111724] text-white p-6 sm:p-8 rounded-3xl space-y-4 shadow-md">
                <div className="border-b border-slate-800 pb-3">
                  <h3 className="font-semibold text-lg text-white">Dento Care Dental Clinic</h3>
                  <p className="text-xs text-slate-400">Ponnani Flagship & Veliyancode Medcity Branches</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
                  <div className="flex items-start gap-2.5 text-slate-300">
                    <MapPin size={16} className="text-[#E5FE40] flex-shrink-0 mt-0.5" />
                    <span>KK Junction, near ISS School, Ponnani, Kerala 679577</span>
                  </div>

                  <div className="flex items-center gap-2.5 text-slate-300">
                    <Mail size={16} className="text-[#E5FE40] flex-shrink-0" />
                    <a href="mailto:dentocareponnani@gmail.com" className="hover:text-white underline transition-colors">
                      dentocareponnani@gmail.com
                    </a>
                  </div>

                  <div className="flex items-center gap-2.5 text-slate-300">
                    <Phone size={16} className="text-[#E5FE40] flex-shrink-0" />
                    <a href="tel:+917510355355" className="hover:text-white transition-colors">
                      +91 7510355355 (Phone / WhatsApp)
                    </a>
                  </div>

                  <div className="flex items-start gap-2.5 text-slate-300">
                    <Clock size={16} className="text-[#E5FE40] flex-shrink-0 mt-0.5" />
                    <div>
                      <div>Mon – Sat: 10:00 AM – 7:00 PM</div>
                      <div className="text-slate-400">Sunday: Closed</div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

          </div>

          {/* DOCUMENT FOOTER */}
          <div className="p-6 sm:p-8 bg-slate-50 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <button
              type="button"
              onClick={onNavigateHome}
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-700 hover:text-slate-950 transition-colors cursor-pointer"
            >
              <ArrowLeft size={16} />
              <span>Return to Dento Care Home</span>
            </button>

            <button
              type="button"
              onClick={onBookClick}
              className="px-6 py-3 rounded-full bg-[#5B9DE6] hover:bg-blue-600 text-white font-bold text-xs sm:text-sm shadow-md transition-colors cursor-pointer"
            >
              Schedule Consultation
            </button>
          </div>

        </article>
      </main>

      {/* FOOTER BAR */}
      <footer className="py-6 text-center text-xs text-slate-600 border-t border-slate-900/10">
        <p>© {new Date().getFullYear()} Dento Care Dental Clinic. All rights reserved.</p>
      </footer>

    </div>
  );
};
