import React, { useEffect } from 'react';
import { ArrowLeft, ShieldCheck, Mail, Phone, MapPin, Calendar, Clock, CheckCircle2, AlertCircle } from 'lucide-react';

interface PrivacyPolicyPageProps {
  onNavigateHome: () => void;
  onBookClick: () => void;
}

export const PrivacyPolicyPage: React.FC<PrivacyPolicyPageProps> = ({
  onNavigateHome,
  onBookClick
}) => {
  // Update page title and meta description on mount
  useEffect(() => {
    const prevTitle = document.title;
    document.title = 'Privacy Policy — Dento Care Dental Clinic';

    let metaDesc = document.querySelector('meta[name="description"]');
    const prevDesc = metaDesc ? metaDesc.getAttribute('content') : '';
    if (metaDesc) {
      metaDesc.setAttribute(
        'content',
        'Privacy Policy for Dento Care Dental Clinic. Learn how we handle appointment requests, patient information, and security practices.'
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
              <ShieldCheck size={14} />
              <span>Legal & Transparency</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-light tracking-tight text-white leading-tight">
              Privacy Policy
            </h1>
            <p className="text-slate-300 text-xs sm:text-sm mt-2 max-w-2xl leading-relaxed">
              Dento Care Dental Clinic is committed to safeguarding your privacy and protecting the confidentiality of your consultation and health-related inquiries.
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

            {/* 1. INTRODUCTION */}
            <section className="space-y-3">
              <h2 className="text-xl sm:text-2xl font-semibold text-slate-900 tracking-tight flex items-center gap-2.5">
                <span className="flex items-center justify-center w-7 h-7 rounded-full bg-sky-100 text-[#5B9DE6] text-xs font-bold">1</span>
                Introduction & Overview
              </h2>
              <p>
                Welcome to <strong>Dento Care Dental Clinic</strong> (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;). We operate our flagship dental surgical clinic located in Ponnani, Kerala, and our speciality dental branch at Aspel Medcity, Veliyancode. This Privacy Policy describes how we collect, handle, protect, and process personal information submitted through our official website and appointment scheduling channels.
              </p>
              <p>
                By accessing our website, using our online appointment request features, or communicating with our clinic team, you acknowledge the data handling practices described in this document.
              </p>
            </section>

            {/* 2. INFORMATION WE COLLECT */}
            <section className="space-y-3">
              <h2 className="text-xl sm:text-2xl font-semibold text-slate-900 tracking-tight flex items-center gap-2.5">
                <span className="flex items-center justify-center w-7 h-7 rounded-full bg-sky-100 text-[#5B9DE6] text-xs font-bold">2</span>
                Information We Collect
              </h2>
              <p>
                We only collect personal information that is directly necessary to process your dental consultation inquiries and schedule clinic appointments.
              </p>
              
              <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 sm:p-6 space-y-3">
                <h3 className="font-bold text-slate-900 text-sm sm:text-base">Appointment Request Information:</h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm text-slate-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={16} className="text-emerald-500 mt-0.5 flex-shrink-0" />
                    <span><strong>Full Name:</strong> To identify patient records.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={16} className="text-emerald-500 mt-0.5 flex-shrink-0" />
                    <span><strong>Contact Phone / WhatsApp:</strong> For confirmation calls & messages.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={16} className="text-emerald-500 mt-0.5 flex-shrink-0" />
                    <span><strong>Clinic Branch:</strong> Ponnani Flagship or Veliyancode Branch.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={16} className="text-emerald-500 mt-0.5 flex-shrink-0" />
                    <span><strong>Desired Treatment:</strong> e.g., Implants, Root Canal, Aligners.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={16} className="text-emerald-500 mt-0.5 flex-shrink-0" />
                    <span><strong>Preferred Doctor:</strong> Specialist preference or any available surgeon.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={16} className="text-emerald-500 mt-0.5 flex-shrink-0" />
                    <span><strong>Date & Time Preference:</strong> Requested consultation slot.</span>
                  </li>
                  <li className="flex items-start gap-2 sm:col-span-2">
                    <CheckCircle2 size={16} className="text-emerald-500 mt-0.5 flex-shrink-0" />
                    <span><strong>Optional Notes / Symptoms:</strong> Specific concerns, pain descriptions, or previous dental care history.</span>
                  </li>
                </ul>
              </div>

              <p className="text-xs sm:text-sm text-slate-600">
                Additionally, our web servers and security screening tools automatically collect technical logs, such as IP addresses and anti-abuse verification tokens, to defend against automated spam, denial-of-service attempts, and bot attacks.
              </p>
            </section>

            {/* 3. NO ONLINE PAYMENTS */}
            <section className="space-y-3">
              <h2 className="text-xl sm:text-2xl font-semibold text-slate-900 tracking-tight flex items-center gap-2.5">
                <span className="flex items-center justify-center w-7 h-7 rounded-full bg-sky-100 text-[#5B9DE6] text-xs font-bold">3</span>
                Payment Information & Transactions
              </h2>
              <div className="p-4 sm:p-5 rounded-2xl bg-amber-50/80 border border-amber-200/90 flex items-start gap-3 text-amber-900">
                <AlertCircle size={20} className="text-amber-600 flex-shrink-0 mt-0.5" />
                <div className="space-y-1 text-xs sm:text-sm leading-relaxed">
                  <p className="font-semibold text-amber-950">
                    No Online Payments, Purchases, or Card Processing:
                  </p>
                  <p>
                    The Dento Care website does <strong>not</strong> collect, process, or store financial credentials, credit/debit card numbers, UPI PINs, or banking passwords. We do not sell products, services, or subscriptions online. All treatment billing, consultations, and payment settlements occur in person at our clinic reception desks.
                  </p>
                </div>
              </div>
            </section>

            {/* 4. PURPOSE OF PROCESSING */}
            <section className="space-y-3">
              <h2 className="text-xl sm:text-2xl font-semibold text-slate-900 tracking-tight flex items-center gap-2.5">
                <span className="flex items-center justify-center w-7 h-7 rounded-full bg-sky-100 text-[#5B9DE6] text-xs font-bold">4</span>
                Purpose of Processing
              </h2>
              <p>We process your submitted personal information solely for legitimate clinical and operational purposes:</p>
              <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm">
                <li><strong>Appointment Scheduling & Verification:</strong> To schedule appointments, match you with the appropriate dental surgeon, and confirm availability.</li>
                <li><strong>Patient Communication:</strong> To reach you via phone call or WhatsApp to confirm appointment timing, provide clinic arrival directions, or inform you of schedule adjustments.</li>
                <li><strong>Clinical Preparation:</strong> To provide our doctors with context regarding your symptoms, ensuring tailored, comfortable, and efficient clinical treatment.</li>
                <li><strong>System Security:</strong> To detect, prevent, and mitigate spam, fraud, and unauthorized requests.</li>
                <li><strong>Legal & Regulatory Compliance:</strong> To satisfy statutory medical record obligations and clinical guidelines under Indian healthcare laws.</li>
              </ul>
            </section>

            {/* 5. HANDLING & THIRD-PARTY SERVICES */}
            <section className="space-y-3">
              <h2 className="text-xl sm:text-2xl font-semibold text-slate-900 tracking-tight flex items-center gap-2.5">
                <span className="flex items-center justify-center w-7 h-7 rounded-full bg-sky-100 text-[#5B9DE6] text-xs font-bold">5</span>
                Data Handling & Third-Party Service Providers
              </h2>
              <p>
                We maintain a strict confidentiality standard. We <strong>do not sell, rent, lease, or monetize</strong> your personal details with advertisers, data brokers, or marketing networks.
              </p>
              <p>
                Your appointment requests are processed through trusted, enterprise-grade cloud service providers under confidentiality agreements:
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm">
                <li><strong>Hosting & Server Infrastructure:</strong> Our web interface is served via Vercel Inc., maintaining encrypted transport and fast global distribution.</li>
                <li><strong>Database & Edge Computing:</strong> Appointment submissions are processed through Supabase Inc. utilizing encrypted PostgreSQL databases and isolated edge execution environments.</li>
                <li><strong>WhatsApp Messaging:</strong> When you select the &quot;Instant Booking via WhatsApp&quot; or &quot;Send via WhatsApp Now&quot; button, you are redirected to WhatsApp (Meta Platforms Inc.), where communications are subject to WhatsApp&apos;s privacy policy and end-to-end encryption.</li>
              </ul>
            </section>

            {/* 6. SECURITY MEASURES */}
            <section className="space-y-3">
              <h2 className="text-xl sm:text-2xl font-semibold text-slate-900 tracking-tight flex items-center gap-2.5">
                <span className="flex items-center justify-center w-7 h-7 rounded-full bg-sky-100 text-[#5B9DE6] text-xs font-bold">6</span>
                Security Safeguards
              </h2>
              <p>
                We implement robust administrative, physical, and technical safeguards designed to protect your personal data:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1 text-xs sm:text-sm">
                  <h4 className="font-semibold text-slate-900">Encrypted Transmission</h4>
                  <p className="text-slate-600">All data transmitted between your browser and our servers uses HTTPS with Transport Layer Security (TLS 1.3).</p>
                </div>
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1 text-xs sm:text-sm">
                  <h4 className="font-semibold text-slate-900">Row Level Security (RLS)</h4>
                  <p className="text-slate-600">Our database strictly bars public anonymous read/write queries, allowing insertions only through authenticated backend Edge Functions.</p>
                </div>
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1 text-xs sm:text-sm">
                  <h4 className="font-semibold text-slate-900">Access Control & Hygiene</h4>
                  <p className="text-slate-600">Administrative access is restricted strictly to authorized clinic staff, using rotated secret keys with zero credentials exposed in client code.</p>
                </div>
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1 text-xs sm:text-sm">
                  <h4 className="font-semibold text-slate-900">Anti-Abuse Verification</h4>
                  <p className="text-slate-600">Server-side payload validation and multi-layer honeypot mechanisms reject malicious bots and spam traffic.</p>
                </div>
              </div>
            </section>

            {/* 7. DATA RETENTION */}
            <section className="space-y-3">
              <h2 className="text-xl sm:text-2xl font-semibold text-slate-900 tracking-tight flex items-center gap-2.5">
                <span className="flex items-center justify-center w-7 h-7 rounded-full bg-sky-100 text-[#5B9DE6] text-xs font-bold">7</span>
                Data Retention
              </h2>
              <p>
                We retain personal information submitted through appointment requests only for as long as reasonably necessary to fulfill the specific purposes for which it was collected. This includes scheduling and conducting your clinical consultations, maintaining essential patient appointment histories, communicating follow-up dental care, and satisfying any applicable legal, clinical, or professional healthcare recordkeeping obligations.
              </p>
              <p>
                When personal data is no longer required for these legitimate clinical or legal purposes, we securely delete or anonymize the records in accordance with our administrative guidelines.
              </p>
            </section>

            {/* 8. INCIDENT HANDLING */}
            <section className="space-y-3">
              <h2 className="text-xl sm:text-2xl font-semibold text-slate-900 tracking-tight flex items-center gap-2.5">
                <span className="flex items-center justify-center w-7 h-7 rounded-full bg-sky-100 text-[#5B9DE6] text-xs font-bold">8</span>
                Security Incidents & Breach Protocols
              </h2>
              <p>
                We maintain active security monitoring. In the improbable event of a security breach or incident that compromises the integrity or confidentiality of your personal information, we will investigate the matter promptly, deploy immediate containment and remediation measures, and notify affected individuals and regulatory authorities in compliance with applicable law.
              </p>
            </section>

            {/* 9. YOUR RIGHTS */}
            <section className="space-y-3">
              <h2 className="text-xl sm:text-2xl font-semibold text-slate-900 tracking-tight flex items-center gap-2.5">
                <span className="flex items-center justify-center w-7 h-7 rounded-full bg-sky-100 text-[#5B9DE6] text-xs font-bold">9</span>
                Your Privacy Rights & Choices
              </h2>
              <p>Depending on your jurisdiction and subject to mandatory clinical recordkeeping rules, you may exercise the following rights:</p>
              <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm">
                <li><strong>Access:</strong> You may request a copy of the inquiry information we maintain about you.</li>
                <li><strong>Correction:</strong> You may request that we rectify inaccurate or outdated contact numbers or appointment preferences.</li>
                <li><strong>Deletion:</strong> You may request that we delete your inquiry data from our appointment database, provided there is no conflicting legal or medical requirement to preserve the record.</li>
                <li><strong>Withdrawal of Consent:</strong> You may request that we cease contacting you regarding non-urgent appointment confirmations by reaching out to our reception desk.</li>
              </ul>
            </section>

            {/* 10. CONTACT INFORMATION */}
            <section className="space-y-4 pt-4 border-t border-slate-200">
              <h2 className="text-xl sm:text-2xl font-semibold text-slate-900 tracking-tight flex items-center gap-2.5">
                <span className="flex items-center justify-center w-7 h-7 rounded-full bg-sky-100 text-[#5B9DE6] text-xs font-bold">10</span>
                Contact Us Regarding Privacy
              </h2>
              <p>
                If you have questions, concerns, or requests regarding this Privacy Policy or our data handling practices, please contact our clinic management:
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

                  <div className="flex items-center gap-2.5 text-slate-300">
                    <Clock size={16} className="text-[#E5FE40] flex-shrink-0" />
                    <span>Mon – Sat: 9:00 AM – 8:00 PM</span>
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
