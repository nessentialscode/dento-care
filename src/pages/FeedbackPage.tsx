import React, { useState } from 'react';
import { Star, CheckCircle2, ArrowLeft, Send, Sparkles, AlertCircle } from 'lucide-react';
import { submitFeedback, type SubmitFeedbackPayload } from '../services/feedbackService';
import { clinicLocations } from '../data/locations';
import { clinicServices } from '../data/services';

interface FeedbackPageProps {
  onNavigateHome: () => void;
  onBookClick?: () => void;
}

export const FeedbackPage: React.FC<FeedbackPageProps> = ({
  onNavigateHome,
}) => {
  const [fullName, setFullName] = useState('');
  const [rating, setRating] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [treatment, setTreatment] = useState('');
  const [branch, setBranch] = useState('');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!fullName.trim() || !message.trim()) {
      setErrorMessage('Please fill in your name and feedback message.');
      return;
    }

    if (rating < 1 || rating > 5) {
      setErrorMessage('Please select a rating between 1 and 5 stars.');
      return;
    }

    setSubmitting(true);
    try {
      const payload: SubmitFeedbackPayload = {
        fullName: fullName.trim(),
        rating,
        treatment: treatment.trim() || undefined,
        branch: branch.trim() || undefined,
        message: message.trim(),
      };

      await submitFeedback(payload);
      setSubmitted(true);
    } catch (err: unknown) {
      console.error('Feedback submission failed:', err);
      setErrorMessage(
        err instanceof Error
          ? err.message
          : 'Unable to submit your feedback at this time. Please try again.'
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#D8EEE1] text-slate-900 flex flex-col selection:bg-[#E5FE40] selection:text-slate-900">
      {/* HEADER NAVBAR */}
      <header className="w-full bg-white/85 backdrop-blur-md border-b border-slate-200/80 sticky top-0 z-30 px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <button
          type="button"
          onClick={onNavigateHome}
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-700 hover:text-slate-950 transition-colors cursor-pointer"
        >
          <ArrowLeft size={16} />
          <span>Back to Home</span>
        </button>

        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#3B82F6]" />
          <span className="text-xs font-bold uppercase tracking-wider text-slate-600">
            Dento Care • Patient Voice
          </span>
        </div>
      </header>

      {/* MAIN CONTAINER */}
      <main className="flex-1 max-w-3xl w-full mx-auto px-4 py-8 sm:py-16">
        <div className="bg-white rounded-[32px] sm:rounded-[44px] p-6 sm:p-12 shadow-2xl shadow-slate-900/10 border border-slate-200/80">
          
          {submitted ? (
            <div className="text-center py-8 sm:py-12 space-y-5 animate-in fade-in zoom-in-95 duration-300">
              <div className="w-16 h-16 rounded-3xl bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
                <CheckCircle2 size={36} />
              </div>

              <div className="space-y-2 max-w-lg mx-auto">
                <h2 className="text-2xl sm:text-3xl font-light text-slate-900">
                  Thank You for Your Feedback!
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Your review has been successfully submitted. To maintain authentic patient trust, new submissions appear publicly after clinical editorial verification.
                </p>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={onNavigateHome}
                  className="w-full sm:w-auto px-6 py-3 rounded-full bg-slate-900 hover:bg-slate-800 text-white text-xs sm:text-sm font-bold transition-all shadow-md cursor-pointer"
                >
                  Return to Homepage
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setMessage('');
                    setTreatment('');
                    setBranch('');
                  }}
                  className="w-full sm:w-auto px-6 py-3 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs sm:text-sm font-bold transition-all cursor-pointer"
                >
                  Submit Another Review
                </button>
              </div>
            </div>
          ) : (
            <div>
              {/* TITLE */}
              <div className="mb-8 text-center max-w-xl mx-auto">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 text-sky-700 text-xs font-semibold mb-3 border border-sky-200/60">
                  <Sparkles size={13} className="text-[#3B82F6]" />
                  <span>Your Experience Matters</span>
                </div>
                <h1 className="text-3xl sm:text-4xl font-light tracking-tight text-slate-900">
                  Share Your Patient Experience
                </h1>
                <p className="text-xs sm:text-sm text-slate-600 mt-2">
                  Help us continually refine our gentle, modern dental care across Ponnani and Veliyancode clinics.
                </p>
              </div>

              {/* ERROR NOTICE */}
              {errorMessage && (
                <div className="mb-6 p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 flex items-start gap-3 text-xs">
                  <AlertCircle size={16} className="text-rose-600 flex-shrink-0 mt-0.5" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* FEEDBACK FORM */}
              <form onSubmit={handleSubmit} className="space-y-5">
                
                {/* RATING */}
                <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200/80 text-center space-y-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600">
                    Overall Experience Rating *
                  </label>
                  <div className="flex items-center justify-center gap-2 py-1">
                    {[1, 2, 3, 4, 5].map((star) => {
                      const active = (hoverRating !== null ? hoverRating : rating) >= star;
                      return (
                        <button
                          key={star}
                          type="button"
                          onMouseEnter={() => setHoverRating(star)}
                          onMouseLeave={() => setHoverRating(null)}
                          onClick={() => setRating(star)}
                          className="p-1.5 transition-transform hover:scale-110 focus:outline-none cursor-pointer"
                          aria-label={`Rate ${star} star${star > 1 ? 's' : ''}`}
                        >
                          <Star
                            size={32}
                            className={`transition-colors ${
                              active
                                ? 'fill-amber-400 text-amber-400 drop-shadow-sm'
                                : 'text-slate-300 fill-transparent'
                            }`}
                          />
                        </button>
                      );
                    })}
                  </div>
                  <span className="text-xs font-semibold text-slate-500 block">
                    {rating === 5 && 'Outstanding & Gentle'}
                    {rating === 4 && 'Very Good'}
                    {rating === 3 && 'Average'}
                    {rating === 2 && 'Needs Improvement'}
                    {rating === 1 && 'Unsatisfactory'}
                  </span>
                </div>

                {/* FULL NAME */}
                <div>
                  <label htmlFor="feedback-name" className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                    Your Full Name *
                  </label>
                  <input
                    id="feedback-name"
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Fathima Zahra"
                    className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#5B9DE6]"
                  />
                </div>

                {/* TREATMENT / SERVICE (OPTIONAL) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="feedback-treatment" className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                      Treatment Received
                    </label>
                    <div className="relative">
                      <select
                        id="feedback-treatment"
                        value={treatment}
                        onChange={(e) => setTreatment(e.target.value)}
                        className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#5B9DE6]"
                      >
                        <option value="">Select Treatment (Optional)</option>
                        {clinicServices.map((srv) => (
                          <option key={srv.id} value={srv.title}>
                            {srv.title}
                          </option>
                        ))}
                        <option value="General Consultation">General Consultation</option>
                        <option value="Root Canal Treatment">Root Canal Treatment</option>
                        <option value="Teeth Whitening">Teeth Whitening</option>
                        <option value="Dental Implants">Dental Implants</option>
                        <option value="Clear Aligners">Clear Aligners</option>
                        <option value="Other Dental Care">Other Dental Care</option>
                      </select>
                    </div>
                  </div>

                  {/* BRANCH (OPTIONAL) */}
                  <div>
                    <label htmlFor="feedback-branch" className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                      Clinic Branch
                    </label>
                    <div className="relative">
                      <select
                        id="feedback-branch"
                        value={branch}
                        onChange={(e) => setBranch(e.target.value)}
                        className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#5B9DE6]"
                      >
                        <option value="">Select Clinic Branch (Optional)</option>
                        {clinicLocations.map((loc) => (
                          <option key={loc.id} value={loc.name}>
                            {loc.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* FEEDBACK MESSAGE */}
                <div>
                  <label htmlFor="feedback-message" className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                    Your Feedback / Review *
                  </label>
                  <textarea
                    id="feedback-message"
                    required
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell us about your consultation, the doctor's care, comfort during procedure, or clinic atmosphere..."
                    className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#5B9DE6] resize-none"
                  />
                </div>

                {/* SUBMIT BUTTON */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-4 px-6 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm shadow-xl hover:shadow-2xl transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75"
                  >
                    {submitting ? (
                      <span>Submitting Feedback...</span>
                    ) : (
                      <>
                        <span>Submit Patient Feedback</span>
                        <Send size={16} />
                      </>
                    )}
                  </button>
                  <p className="text-[11px] text-center text-slate-500 mt-2.5">
                    Reviews undergo brief moderation prior to public display to prevent spam.
                  </p>
                </div>

              </form>
            </div>
          )}

        </div>
      </main>
    </div>
  );
};
