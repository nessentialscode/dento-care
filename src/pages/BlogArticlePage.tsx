import React, { useState, useEffect, useCallback } from 'react';
import {
  ArrowLeft,
  ChevronRight,
  Clock,
  ShieldAlert,
  Maximize2,
  X,
  ChevronLeft,
  Stethoscope,
  Building2,
  BookOpen,
  CalendarCheck,
  CheckCircle2,
  Eye,
} from 'lucide-react';
import { PUBLISHED_ARTICLE, type ClinicalImage } from '../data/blogData';
import { clinicInfo } from '../data/clinicInfo';

interface BlogArticlePageProps {
  onNavigateHome: () => void;
  onNavigateBlog: () => void;
  onBookClick: () => void;
}

export const BlogArticlePage: React.FC<BlogArticlePageProps> = ({
  onNavigateHome,
  onNavigateBlog,
  onBookClick,
}) => {
  const article = PUBLISHED_ARTICLE;
  const [activeLightboxIndex, setActiveLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (activeLightboxIndex === null) return;
      if (e.key === 'Escape') {
        setActiveLightboxIndex(null);
      } else if (e.key === 'ArrowRight') {
        setActiveLightboxIndex((prev) =>
          prev !== null ? (prev + 1) % article.images.length : null
        );
      } else if (e.key === 'ArrowLeft') {
        setActiveLightboxIndex((prev) =>
          prev !== null ? (prev - 1 + article.images.length) % article.images.length : null
        );
      }
    },
    [activeLightboxIndex, article.images.length]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const activeImage: ClinicalImage | null =
    activeLightboxIndex !== null ? article.images[activeLightboxIndex] : null;

  return (
    <div className="min-h-screen bg-[#D8EEE1] text-slate-900 flex flex-col selection:bg-[#E5FE40] selection:text-slate-900">
      
      {/* STICKY TOP HEADER */}
      <header className="sticky top-0 z-40 bg-[#D8EEE1]/90 backdrop-blur-md border-b border-slate-900/10 px-4 sm:px-8 lg:px-12 py-3.5 transition-all">
        <div className="max-w-[1520px] mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 sm:gap-4">
            <a
              href="/blog"
              onClick={(e) => {
                e.preventDefault();
                onNavigateBlog();
              }}
              className="inline-flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-semibold text-slate-700 hover:text-slate-950 transition-colors cursor-pointer group py-1"
            >
              <ArrowLeft size={15} className="group-hover:-translate-x-1 transition-transform" />
              <span>Back to Articles</span>
            </a>
            <span className="text-slate-300 hidden sm:inline">•</span>
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                onNavigateHome();
              }}
              className="hidden sm:inline-flex text-xs font-medium text-slate-500 hover:text-slate-800 transition-colors"
            >
              Home
            </a>
          </div>

          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              onNavigateHome();
            }}
            className="flex items-center gap-2"
          >
            <div className="w-7 h-7 rounded-lg bg-white shadow-sm flex items-center justify-center p-1">
              <img
                src="/images/dento-care-icon.png"
                alt="Dento Care"
                width={28}
                height={28}
                className="w-full h-full object-contain"
              />
            </div>
            <span className="font-bold text-sm tracking-tight text-slate-900">
              Dento Care
            </span>
          </a>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onBookClick}
              className="px-4 py-2 rounded-full bg-[#111724] text-white hover:bg-slate-800 text-xs font-semibold shadow-md transition-colors cursor-pointer"
            >
              Book Consultation
            </button>
          </div>
        </div>
      </header>

      {/* MAIN CONTAINER */}
      <main className="flex-grow py-5 sm:py-8 px-3 sm:px-6 md:px-8 lg:px-10 xl:px-12 max-w-[1520px] mx-auto w-full">
        
        {/* BREADCRUMB */}
        <nav aria-label="Breadcrumb" className="mb-4 sm:mb-5 flex items-center gap-1.5 text-xs text-slate-500 overflow-x-auto whitespace-nowrap px-1">
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              onNavigateHome();
            }}
            className="hover:text-slate-800 transition-colors"
          >
            Home
          </a>
          <ChevronRight size={12} className="text-slate-400 flex-shrink-0" />
          <a
            href="/blog"
            onClick={(e) => {
              e.preventDefault();
              onNavigateBlog();
            }}
            className="hover:text-slate-800 transition-colors"
          >
            Blog
          </a>
          <ChevronRight size={12} className="text-slate-400 flex-shrink-0" />
          <span className="text-slate-700 font-medium truncate max-w-xs sm:max-w-md font-malayalam">
            {article.title}
          </span>
        </nav>

        {/* HERO ARTICLE HEADER CARD */}
        <div className="bg-white rounded-[28px] sm:rounded-[36px] p-5 sm:p-8 lg:p-10 border border-white/80 shadow-lg shadow-slate-900/5 mb-6 sm:mb-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#5B9DE6]/10 rounded-full blur-3xl pointer-events-none -mr-16 -mt-16" />
          <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-[#D8EEE1]/60 rounded-full blur-3xl pointer-events-none -ml-16 -mb-16" />

          <div className="relative z-10 max-w-4xl">
            {/* Category badge & Read Time */}
            <div className="flex flex-wrap items-center gap-2.5 mb-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-[#3B82F6] text-[11px] font-bold tracking-wide uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-[#3B82F6]" />
                <span>{article.category}</span>
              </span>
              <span className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-400">
                <Clock size={13} />
                <span>{article.readTime}</span>
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 text-[11px] font-medium">
                <BookOpen size={12} className="text-blue-500" />
                <span>Clinical Education</span>
              </span>
            </div>

            {/* Article Title - Medium & Professional */}
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-slate-900 leading-[1.3] mb-6 font-malayalam">
              {article.title}
            </h1>

            {/* Author byline */}
            <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-100 border border-blue-200/60 flex items-center justify-center text-blue-700 shadow-sm flex-shrink-0">
                  <Stethoscope size={20} />
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-900">
                    {article.author.name}, <span className="font-semibold text-blue-600">{article.author.degrees}</span>
                  </div>
                  <div className="text-xs text-slate-600">
                    {article.author.designation}
                  </div>
                  <div className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5">
                    <Building2 size={11} />
                    <span>{article.author.institution}</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* 2-COLUMN EDITORIAL LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          
          {/* MAIN ARTICLE READING COLUMN (8 cols) */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* FEATURED / MAIN CLINICAL IMAGE (IMAGE 1) */}
            <figure className="bg-white rounded-[24px] sm:rounded-[30px] p-3.5 sm:p-5 border border-white/90 shadow-md shadow-slate-900/5 overflow-hidden">
              <div
                className="relative cursor-pointer group overflow-hidden rounded-xl sm:rounded-2xl bg-[#0B0F19] flex items-center justify-center min-h-[280px] sm:min-h-[380px] max-h-[480px]"
                onClick={() => setActiveLightboxIndex(0)}
              >
                <img
                  src={article.images[0].src}
                  alt={article.images[0].alt}
                  className="max-h-[440px] w-auto max-w-full object-contain transition-transform duration-300 group-hover:scale-[1.01]"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-slate-950/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/95 text-slate-900 text-xs font-semibold shadow-lg backdrop-blur-sm">
                    <Maximize2 size={13} />
                    <span>Enlarge Image</span>
                  </span>
                </div>
              </div>
              <figcaption className="mt-3 px-1 text-xs text-slate-600 flex items-start justify-between gap-3">
                <span className="leading-relaxed">
                  <strong className="text-slate-800 font-semibold">Image 1:</strong> {article.images[0].caption}
                </span>
                <button
                  type="button"
                  onClick={() => setActiveLightboxIndex(0)}
                  className="inline-flex items-center gap-1 text-[#3B82F6] hover:text-blue-700 text-xs font-semibold flex-shrink-0 cursor-pointer"
                >
                  <Eye size={12} />
                  <span>Enlarge</span>
                </button>
              </figcaption>
            </figure>

            {/* ARTICLE TEXT CONTENT - MEDIUM & NEAT READABILITY */}
            <article className="bg-white rounded-[24px] sm:rounded-[32px] p-5 sm:p-8 lg:p-10 border border-white/80 shadow-md shadow-slate-900/5 space-y-5 text-slate-700 font-malayalam text-[15px] sm:text-base leading-[1.8] sm:leading-[1.85]">
              
              {/* Paragraph 1 */}
              <p>
                {article.paragraphs[0].text}
              </p>

              {/* Paragraph 2 */}
              <p>
                {article.paragraphs[1].text}
              </p>

              {/* Paragraph 3 - Clinical finding highlight */}
              <div className="p-4 sm:p-5 rounded-xl sm:rounded-2xl bg-amber-50/90 border-l-4 border-amber-500 text-slate-950 font-semibold text-sm sm:text-base leading-relaxed">
                {article.paragraphs[2].text}
              </div>

              {/* Paragraph 4 */}
              <p>
                {article.paragraphs[3].text}
              </p>

              {/* CLINICAL IMAGE 2: Intraoral lesion near posterior teeth */}
              <figure className="my-6 bg-slate-50 rounded-xl sm:rounded-2xl p-3 sm:p-4 border border-slate-200/70 font-sans">
                <div
                  className="relative cursor-pointer group overflow-hidden rounded-lg sm:rounded-xl bg-[#0B0F19] flex items-center justify-center min-h-[240px] sm:min-h-[340px] max-h-[420px]"
                  onClick={() => setActiveLightboxIndex(1)}
                >
                  <img
                    src={article.images[1].src}
                    alt={article.images[1].alt}
                    className="max-h-[390px] w-auto max-w-full object-contain transition-transform duration-300 group-hover:scale-[1.01]"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-slate-950/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/95 text-slate-900 text-xs font-semibold shadow">
                      <Maximize2 size={13} />
                      <span>Enlarge Image</span>
                    </span>
                  </div>
                </div>
                <figcaption className="mt-2.5 px-1 text-xs text-slate-600 flex items-start justify-between gap-3">
                  <span className="leading-relaxed">
                    <strong className="text-slate-800 font-semibold">Image 2:</strong> {article.images[1].caption}
                  </span>
                  <button
                    type="button"
                    onClick={() => setActiveLightboxIndex(1)}
                    className="text-[#3B82F6] hover:text-blue-700 text-xs font-semibold flex-shrink-0 cursor-pointer"
                  >
                    Enlarge
                  </button>
                </figcaption>
              </figure>

              {/* Paragraph 5 */}
              <p>
                {article.paragraphs[4].text}
              </p>

              {/* Paragraph 6 */}
              <p>
                {article.paragraphs[5].text}
              </p>

              {/* CLINICAL IMAGES 3 & 4: Side by Side Gallery Grid */}
              <div className="my-6 grid grid-cols-1 sm:grid-cols-2 gap-4 font-sans">
                
                {/* Image 3 */}
                <figure className="bg-slate-50 rounded-xl sm:rounded-2xl p-2.5 sm:p-3 border border-slate-200/70 flex flex-col justify-between">
                  <div
                    className="relative cursor-pointer group overflow-hidden rounded-lg sm:rounded-xl bg-[#0B0F19] flex items-center justify-center h-56 sm:h-64"
                    onClick={() => setActiveLightboxIndex(2)}
                  >
                    <img
                      src={article.images[2].src}
                      alt={article.images[2].alt}
                      className="max-h-full w-auto max-w-full object-contain transition-transform duration-300 group-hover:scale-[1.02]"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-slate-950/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/95 text-slate-900 text-[11px] font-semibold shadow">
                        <Maximize2 size={12} />
                        <span>Enlarge</span>
                      </span>
                    </div>
                  </div>
                  <figcaption className="mt-2 text-xs text-slate-600 leading-snug">
                    <strong className="text-slate-800 font-semibold">Image 3:</strong> {article.images[2].caption}
                  </figcaption>
                </figure>

                {/* Image 4 */}
                <figure className="bg-slate-50 rounded-xl sm:rounded-2xl p-2.5 sm:p-3 border border-slate-200/70 flex flex-col justify-between">
                  <div
                    className="relative cursor-pointer group overflow-hidden rounded-lg sm:rounded-xl bg-[#0B0F19] flex items-center justify-center h-56 sm:h-64"
                    onClick={() => setActiveLightboxIndex(3)}
                  >
                    <img
                      src={article.images[3].src}
                      alt={article.images[3].alt}
                      className="max-h-full w-auto max-w-full object-contain transition-transform duration-300 group-hover:scale-[1.02]"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-slate-950/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/95 text-slate-900 text-[11px] font-semibold shadow">
                        <Maximize2 size={12} />
                        <span>Enlarge</span>
                      </span>
                    </div>
                  </div>
                  <figcaption className="mt-2 text-xs text-slate-600 leading-snug">
                    <strong className="text-slate-800 font-semibold">Image 4:</strong> {article.images[3].caption}
                  </figcaption>
                </figure>

              </div>

              {/* Paragraph 7 */}
              <p>
                {article.paragraphs[6].text}
              </p>

              {/* Paragraph 8 */}
              <p>
                {article.paragraphs[7].text}
              </p>

              {/* Doctor's Closing Emphasis Callout Box */}
              <div className="mt-6 p-5 sm:p-7 rounded-2xl bg-gradient-to-br from-[#111724] to-slate-900 text-white shadow-md space-y-2.5 font-sans">
                <div className="text-sm sm:text-base font-bold font-malayalam text-[#E5FE40] leading-relaxed">
                  {article.paragraphs[8].text}
                </div>
                <div className="text-base sm:text-lg font-light italic text-white tracking-wide">
                  {article.paragraphs[9].text}
                </div>
              </div>

              {/* Clinical Takeaways */}
              <div className="mt-6 p-5 sm:p-6 rounded-2xl bg-blue-50/70 border border-blue-100 space-y-3 font-sans">
                <div className="text-xs font-bold uppercase tracking-wider text-[#3B82F6] flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#3B82F6]" />
                  <span>പ്രധാന ക്ലിനിക്കൽ ഓർമ്മപ്പെടുത്തലുകൾ</span>
                </div>
                <ul className="space-y-2 font-malayalam text-xs sm:text-sm text-slate-700">
                  {article.keyTakeaways.map((point, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <CheckCircle2 size={15} className="text-[#3B82F6] flex-shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* MEDICAL CONTENT SAFETY DISCLAIMER */}
              <div className="mt-6 p-4 rounded-xl bg-slate-50 border border-slate-200/80 flex items-start gap-3 text-slate-600 text-xs font-sans leading-relaxed">
                <ShieldAlert size={16} className="text-slate-400 flex-shrink-0 mt-0.5" />
                <p>
                  {article.disclaimer}
                </p>
              </div>

            </article>

          </div>

          {/* RIGHT SIDEBAR (4 cols) - MEDIUM & NEAT CLINICAL CARDS */}
          <aside className="lg:col-span-4 space-y-5 lg:sticky lg:top-20">
            
            {/* DOCTOR PROFILE CARD */}
            <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 border border-white/80 shadow-md shadow-slate-900/5">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-100 to-indigo-100 text-blue-700 flex items-center justify-center font-bold text-base flex-shrink-0 shadow-sm border border-blue-200/60">
                  DM
                </div>
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Article Author
                  </div>
                  <div className="text-sm font-bold text-slate-900">
                    {article.author.name}
                  </div>
                  <div className="text-xs font-semibold text-blue-600">
                    {article.author.degrees}
                  </div>
                </div>
              </div>

              <div className="space-y-1 text-xs text-slate-600 pb-4 border-b border-slate-100">
                <div className="font-medium text-slate-800">
                  {article.author.designation}
                </div>
                <div className="text-slate-500 flex items-center gap-1.5">
                  <Building2 size={13} className="text-slate-400 flex-shrink-0" />
                  <span>{article.author.institution}</span>
                </div>
              </div>

              <div className="pt-3 text-[11px] text-slate-500 leading-relaxed">
                Clinical report shared for patient awareness and preventive dental healthcare education.
              </div>
            </div>

            {/* CLINICAL IMAGES QUICK GALLERY PREVIEW */}
            <div className="bg-white rounded-2xl sm:rounded-3xl p-5 border border-white/80 shadow-md shadow-slate-900/5">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  Case Images ({article.images.length})
                </h3>
                <span className="text-[11px] text-blue-600 font-medium">Click to enlarge</span>
              </div>

              <div className="grid grid-cols-2 gap-2">
                {article.images.map((img, idx) => (
                  <button
                    key={img.id}
                    type="button"
                    onClick={() => setActiveLightboxIndex(idx)}
                    className="relative group rounded-lg overflow-hidden bg-slate-950 aspect-video flex items-center justify-center cursor-pointer border border-slate-200/80"
                  >
                    <img
                      src={img.src}
                      alt={img.alt}
                      className="max-h-full w-auto object-contain group-hover:scale-105 transition-transform"
                    />
                    <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-[10px] font-bold">
                      Image {idx + 1}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* APPOINTMENT QUICK CARD - COMPACT & NEAT */}
            <div className="bg-[#111724] rounded-2xl sm:rounded-3xl p-5 text-white shadow-md space-y-3">
              <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-[#E5FE40]">
                <CalendarCheck size={16} />
              </div>
              <h3 className="text-sm font-bold">
                Routine Oral Health Checkup
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Have a non-healing sore or sharp tooth edge? Don't ignore it—consult with our dental surgeons.
              </p>
              <div className="pt-1 flex flex-col gap-2">
                <button
                  type="button"
                  onClick={onBookClick}
                  className="w-full py-2.5 rounded-full bg-[#E5FE40] text-slate-900 font-bold text-xs hover:bg-lime-300 transition-colors shadow-sm cursor-pointer"
                >
                  Book Clinical Consultation
                </button>
                <a
                  href={`https://wa.me/${clinicInfo.whatsapp}?text=Hello%20Dento%20Care,%20I%20would%20like%20to%20consult%20about%20an%20oral%20examination.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2 rounded-full bg-slate-800 text-center text-white font-medium text-xs hover:bg-slate-700 transition-colors border border-slate-700"
                >
                  WhatsApp Consultation
                </a>
              </div>
            </div>

          </aside>

        </div>

        {/* BOTTOM APPOINTMENT BANNER */}
        <div className="mt-10 sm:mt-14 bg-[#111724] rounded-[28px] sm:rounded-[36px] p-6 sm:p-10 text-white shadow-lg flex flex-col md:flex-row items-center justify-between gap-5 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#5B9DE6]/15 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10 max-w-xl">
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#E5FE40] block mb-1.5">
              Oral Health Checkup
            </span>
            <h2 className="text-xl sm:text-2xl font-light tracking-tight text-white mb-2">
              Have a Sharp Tooth or Persistent Mouth Ulcer?
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
              Timely clinical evaluation provides peace of mind. Schedule a routine intraoral examination with the dental surgeons at Dento Care.
            </p>
          </div>

          <div className="relative z-10 flex flex-wrap gap-2.5 flex-shrink-0">
            <button
              type="button"
              onClick={onBookClick}
              className="px-5 py-2.5 rounded-full bg-[#E5FE40] text-slate-900 font-bold text-xs hover:bg-lime-300 transition-colors shadow cursor-pointer"
            >
              Book Examination
            </button>
            <a
              href={`https://wa.me/${clinicInfo.whatsapp}?text=Hello%20Dento%20Care,%20I%20would%20like%20to%20consult%20about%20an%20oral%20examination.`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-full bg-slate-800 text-white font-medium text-xs hover:bg-slate-700 transition-colors border border-slate-700"
            >
              WhatsApp Us
            </a>
          </div>
        </div>

      </main>

      {/* CLINICAL LIGHTBOX MODAL */}
      {activeImage && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Clinical Image Viewer"
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex flex-col justify-between p-4 sm:p-6 animate-in fade-in duration-200"
          onClick={() => setActiveLightboxIndex(null)}
        >
          {/* Lightbox Topbar */}
          <div
            className="flex items-center justify-between text-white max-w-5xl mx-auto w-full py-2 z-10"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-xs sm:text-sm font-semibold text-slate-300">
              Clinical Image {activeLightboxIndex! + 1} of {article.images.length}
            </div>

            <button
              type="button"
              onClick={() => setActiveLightboxIndex(null)}
              className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Close image viewer"
            >
              <X size={18} />
            </button>
          </div>

          {/* Lightbox Image Container (Preserves original proportions, zero decorative filters) */}
          <div
            className="flex-grow flex items-center justify-center relative max-w-5xl mx-auto w-full p-2"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Prev Image Button */}
            <button
              type="button"
              onClick={() =>
                setActiveLightboxIndex((prev) =>
                  prev !== null ? (prev - 1 + article.images.length) % article.images.length : null
                )
              }
              className="absolute left-2 sm:left-4 z-10 w-10 h-10 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center transition-colors cursor-pointer border border-white/20"
              aria-label="Previous image"
            >
              <ChevronLeft size={20} />
            </button>

            <img
              src={activeImage.src}
              alt={activeImage.alt}
              className="max-h-[75vh] sm:max-h-[80vh] max-w-full object-contain rounded-lg shadow-2xl"
            />

            {/* Next Image Button */}
            <button
              type="button"
              onClick={() =>
                setActiveLightboxIndex((prev) =>
                  prev !== null ? (prev + 1) % article.images.length : null
                )
              }
              className="absolute right-2 sm:right-4 z-10 w-10 h-10 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center transition-colors cursor-pointer border border-white/20"
              aria-label="Next image"
            >
              <ChevronRight size={20} />
            </button>
          </div>

          {/* Lightbox Caption */}
          <div
            className="max-w-3xl mx-auto w-full text-center text-xs text-slate-300 py-2.5 px-4 bg-black/50 rounded-xl border border-white/10 z-10"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="leading-relaxed">
              <strong className="text-white font-medium">Image {activeLightboxIndex! + 1}:</strong> {activeImage.caption}
            </p>
          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer className="w-full border-t border-slate-900/10 py-5 px-4 sm:px-8 text-center text-xs text-slate-500">
        <p>© {new Date().getFullYear()} Dento Care Dental Clinic. Clinical article authored for patient health awareness.</p>
      </footer>

    </div>
  );
};
