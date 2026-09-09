import React from 'react';
import { Star, CheckCircle, Quote } from 'lucide-react';
import { clinicReviews, reviewStats } from '../data/reviews';

export const ReviewsSection: React.FC = () => {
  return (
    <section id="reviews" className="relative w-full px-3 sm:px-6 md:px-8 lg:px-10 py-12 sm:py-20">
      <div className="max-w-[1520px] mx-auto">
        
        {/* OVERALL RATING BANNER */}
        <div className="bg-[#5B9DE6] rounded-[34px] sm:rounded-[48px] p-8 sm:p-14 mb-10 sm:mb-16 text-white shadow-2xl shadow-sky-900/15 relative overflow-hidden">
          
          <div className="absolute -right-10 -bottom-10 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* LEFT STATS */}
            <div className="lg:col-span-5 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-xs font-semibold backdrop-blur-md">
                <CheckCircle size={14} className="text-[#E5FE40]" />
                <span>Verified Patient Feedback</span>
              </div>
              <h2 className="text-5xl sm:text-7xl font-light tracking-tight leading-none">
                {reviewStats.averageRating}
                <span className="text-2xl sm:text-3xl font-normal opacity-80"> / 5.0</span>
              </h2>
              <div className="flex items-center gap-1.5 text-amber-300 text-2xl">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={24} className="fill-amber-300 text-amber-300" />
                ))}
              </div>
              <p className="text-sm sm:text-base text-white/90">
                Based on <span className="font-bold text-white">{reviewStats.totalCount} Google Reviews</span> for our Ponnani dental clinic.
              </p>
            </div>

            {/* RIGHT EDITORIAL QUOTE */}
            <div className="lg:col-span-7 bg-white/15 backdrop-blur-md rounded-[28px] p-6 sm:p-10 border border-white/20">
              <Quote size={36} className="text-[#E5FE40] mb-4 opacity-80" />
              <blockquote className="text-xl sm:text-2xl font-light leading-relaxed mb-4 text-white">
                "{clinicReviews[0].quote}"
              </blockquote>
              <div className="flex items-center justify-between pt-4 border-t border-white/20 text-xs sm:text-sm">
                <div>
                  <span className="font-bold text-white block">{clinicReviews[0].author}</span>
                  <span className="text-white/70">{clinicReviews[0].treatment}</span>
                </div>
                <span className="px-3 py-1 rounded-full bg-white/20 text-white font-medium">
                  {clinicReviews[0].source}
                </span>
              </div>
            </div>

          </div>

        </div>

        {/* ADDITIONAL VERIFIED REVIEWS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {clinicReviews.slice(1).map((rev) => (
            <div
              key={rev.id}
              className="bg-white rounded-[30px] p-7 shadow-lg shadow-slate-900/5 border border-slate-200/80 flex flex-col justify-between hover:shadow-xl transition-all"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} size={16} className="fill-amber-400" />
                    ))}
                  </div>
                  <span className="text-[11px] text-slate-400 font-medium">{rev.timeAgo}</span>
                </div>

                <p className="text-slate-700 text-sm leading-relaxed mb-6 font-normal">
                  "{rev.quote}"
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <span className="text-sm font-bold text-slate-900 block">{rev.author}</span>
                  <span className="text-xs text-[#3B82F6] font-medium">{rev.treatment}</span>
                </div>
                <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
                  Verified
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
