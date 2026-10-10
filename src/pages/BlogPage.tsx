import React, { useEffect } from 'react';
import { ArrowLeft, Clock, Stethoscope, CheckCircle2, Building2, ArrowUpRight } from 'lucide-react';
import { PUBLISHED_ARTICLE } from '../data/blogData';
import { clinicInfo } from '../data/clinicInfo';

interface BlogPageProps {
  onNavigateHome: () => void;
  onNavigateArticle: (slug: string) => void;
  onBookClick: () => void;
}

export const BlogPage: React.FC<BlogPageProps> = ({
  onNavigateHome,
  onNavigateArticle,
  onBookClick,
}) => {
  const article = PUBLISHED_ARTICLE;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  return (
    <div className="min-h-screen bg-[#D8EEE1] text-slate-900 flex flex-col selection:bg-[#E5FE40] selection:text-slate-900">
      
      {/* STICKY TOP HEADER */}
      <header className="sticky top-0 z-40 bg-[#D8EEE1]/90 backdrop-blur-md border-b border-slate-900/10 px-4 sm:px-8 lg:px-12 py-3.5 transition-all">
        <div className="max-w-[1520px] mx-auto flex items-center justify-between gap-4">
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              onNavigateHome();
            }}
            className="inline-flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-semibold text-slate-700 hover:text-slate-950 transition-colors cursor-pointer group py-1"
          >
            <ArrowLeft size={15} className="group-hover:-translate-x-1 transition-transform" />
            <span>Back to Home</span>
          </a>

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

      {/* EXPANSIVE MAIN CONTENT AREA */}
      <main className="flex-grow py-5 sm:py-8 lg:py-10 px-3 sm:px-6 md:px-8 lg:px-10 xl:px-12 max-w-[1520px] mx-auto w-full">
        
        {/* HERO BANNER */}
        <div className="bg-white rounded-[28px] sm:rounded-[36px] lg:rounded-[40px] p-6 sm:p-8 lg:p-12 border border-white/80 shadow-lg shadow-slate-900/5 mb-6 sm:mb-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[450px] h-[450px] bg-[#5B9DE6]/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
          <div className="absolute bottom-0 left-0 w-[350px] h-[350px] bg-[#D8EEE1]/60 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20" />

          <div className="relative z-10 max-w-3xl">
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-[#3B82F6]" />
              <span className="text-[11px] sm:text-xs font-bold tracking-widest text-[#3B82F6] uppercase">
                DENTAL INSIGHTS &amp; CLINICAL GUIDES
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-light tracking-tight text-slate-900 leading-[1.15] mb-3 sm:mb-4">
              Clinical Insights &amp;{' '}
              <span className="font-normal text-slate-900">Oral Health Education</span>
            </h1>

            <p className="text-slate-600 text-xs sm:text-sm lg:text-base leading-relaxed max-w-2xl">
              Evidence-based clinical articles and patient health guidance authored by specialist doctors to help you recognize signs early and protect your oral health.
            </p>
          </div>
        </div>

        {/* SECTION LABEL */}
        <div className="flex items-center justify-between gap-4 mb-4 px-2">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#3B82F6]" />
            <h2 className="text-xs sm:text-sm font-bold tracking-wider uppercase text-slate-700">
              Featured Clinical Article
            </h2>
          </div>
          <span className="text-xs font-semibold text-slate-400">1 Published Article</span>
        </div>

        {/* FULL-SCREEN FEATURED ARTICLE CARD - MEDIUM & PROFESSIONAL */}
        <div className="bg-white rounded-[28px] sm:rounded-[36px] lg:rounded-[40px] border border-white/90 shadow-xl shadow-slate-900/5 overflow-hidden group hover:shadow-2xl transition-all duration-300">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch min-h-[440px] lg:min-h-[480px]">
            
            {/* FEATURE CLINICAL IMAGE COLUMN (Image 1) */}
            <div className="lg:col-span-5 xl:col-span-5 relative bg-[#0B0F19] flex items-center justify-center p-6 sm:p-8 lg:p-10 overflow-hidden min-h-[280px] sm:min-h-[340px] lg:min-h-full">
              <div className="absolute inset-0 bg-radial from-blue-500/10 via-transparent to-transparent pointer-events-none" />
              
              <div className="relative z-10 w-full flex items-center justify-center">
                <img
                  src={article.images[0].src}
                  alt={article.images[0].alt}
                  className="max-h-[320px] sm:max-h-[380px] lg:max-h-[420px] w-auto max-w-full object-contain rounded-xl shadow-xl group-hover:scale-[1.02] transition-transform duration-500 ease-out"
                  loading="eager"
                />
              </div>

              <div className="absolute top-4 left-4 z-20">
                <span className="px-3 py-1 rounded-full bg-black/70 backdrop-blur-md text-white text-[11px] font-semibold border border-white/15 shadow-md">
                  Featured Clinical Case
                </span>
              </div>
            </div>

            {/* CONTENT COLUMN - MEDIUM NEAT EDITORIAL SCALE */}
            <div className="lg:col-span-7 xl:col-span-7 p-6 sm:p-8 lg:p-10 xl:p-12 flex flex-col justify-between">
              <div>
                {/* Category & Read Time */}
                <div className="flex items-center justify-between gap-3 mb-4">
                  <span className="px-3 py-1 rounded-full bg-blue-50 text-[#3B82F6] text-[11px] font-bold tracking-wide uppercase">
                    {article.category}
                  </span>
                  <span className="flex items-center gap-1.5 text-xs font-semibold text-slate-400">
                    <Clock size={13} />
                    <span>{article.readTime}</span>
                  </span>
                </div>

                {/* Article Title */}
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors leading-[1.3] mb-4 font-malayalam">
                  <a
                    href={`/blog/${article.slug}`}
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigateArticle(article.slug);
                    }}
                    className="hover:underline"
                  >
                    {article.title}
                  </a>
                </h3>

                {/* Excerpt / Summary in Malayalam */}
                <p className="text-slate-600 font-malayalam text-sm sm:text-[15px] leading-relaxed mb-5 max-w-2xl">
                  {article.summary}
                </p>

                {/* Key Points Preview */}
                <div className="space-y-2.5 mb-6 pt-4 border-t border-slate-100 font-malayalam max-w-2xl">
                  {article.keyTakeaways.slice(0, 2).map((point, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                      <CheckCircle2 size={16} className="text-[#3B82F6] flex-shrink-0 mt-0.5" />
                      <span className="leading-snug">{point}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Card Footer: Doctor Info & Read Article Action */}
              <div className="pt-5 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center flex-shrink-0 border border-blue-100 shadow-sm">
                    <Stethoscope size={18} />
                  </div>
                  <div>
                    <div className="text-xs sm:text-sm font-bold text-slate-900">
                      {article.author.name}, <span className="font-semibold text-blue-600">{article.author.degrees}</span>
                    </div>
                    <div className="text-[11px] text-slate-500 leading-tight">
                      {article.author.designation}
                    </div>
                    <div className="text-[10px] text-slate-400 flex items-center gap-1 mt-0.5">
                      <Building2 size={11} />
                      <span>{article.author.institution}</span>
                    </div>
                  </div>
                </div>

                <a
                  href={`/blog/${article.slug}`}
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigateArticle(article.slug);
                  }}
                  className="group/btn inline-flex items-center justify-center gap-2.5 px-5 py-2.5 rounded-full bg-[#0E1726] hover:bg-slate-800 text-white text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer"
                >
                  <span className="font-malayalam">ലേഖനം വായിക്കുക</span>
                  <div className="w-5 h-5 rounded-full bg-[#E5FE40] flex items-center justify-center text-slate-900 group-hover/btn:translate-x-0.5 transition-transform">
                    <ArrowUpRight size={13} strokeWidth={2.8} />
                  </div>
                </a>
              </div>

            </div>

          </div>
        </div>

        {/* BOTTOM APPOINTMENT BANNER */}
        <div className="mt-10 sm:mt-12 bg-[#111724] rounded-[28px] sm:rounded-[36px] p-6 sm:p-10 text-white shadow-lg flex flex-col md:flex-row items-center justify-between gap-5 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#5B9DE6]/15 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 max-w-xl">
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#E5FE40] block mb-1.5">
              Personalized Dental Care
            </span>
            <h2 className="text-xl sm:text-2xl font-light tracking-tight text-white mb-2">
              Have Questions About Your Oral Health?
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
              Schedule a comprehensive clinical consultation with our dental surgeons at our Ponnani or Veliyancode clinics.
            </p>
          </div>

          <div className="relative z-10 flex flex-wrap gap-2.5 flex-shrink-0">
            <button
              type="button"
              onClick={onBookClick}
              className="px-5 py-2.5 rounded-full bg-[#E5FE40] text-slate-900 font-bold text-xs hover:bg-lime-300 transition-colors shadow cursor-pointer"
            >
              Book Consultation
            </button>
            <a
              href={`https://wa.me/${clinicInfo.whatsapp}?text=Hello%20Dento%20Care,%20I%20have%20a%20question%20regarding%20dental%20care.`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-full bg-slate-800 text-white font-medium text-xs hover:bg-slate-700 transition-colors border border-slate-700"
            >
              Chat on WhatsApp
            </a>
          </div>
        </div>

      </main>

      {/* FOOTER */}
      <footer className="w-full border-t border-slate-900/10 py-5 px-4 sm:px-8 text-center text-xs text-slate-500">
        <p>© {new Date().getFullYear()} Dento Care Dental Clinic. All clinical insights authored for patient education.</p>
      </footer>

    </div>
  );
};
