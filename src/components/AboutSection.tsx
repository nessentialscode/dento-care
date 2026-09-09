import React from 'react';
import { Shield, Sparkles, HeartHandshake, Microscope } from 'lucide-react';

export const AboutSection: React.FC = () => {
  const pillars = [
    {
      icon: Microscope,
      title: "Microscopic Accuracy",
      desc: "High-magnification surgical loupes and digital sensors to identify concerns before they cause pain."
    },
    {
      icon: HeartHandshake,
      title: "Compassionate Care",
      desc: "Every appointment proceeds at your pace, ensuring gentle anesthesia and total peace of mind."
    },
    {
      icon: Shield,
      title: "Hospital-Grade Sterilization",
      desc: "Class-B autoclave sterilization protocol ensuring pristine hygiene for every single instrument."
    },
    {
      icon: Sparkles,
      title: "Aesthetic Restoration",
      desc: "Lifelike ceramic restorations designed in harmony with your facial symmetry and natural bite."
    }
  ];

  return (
    <section id="about" className="relative w-full px-3 sm:px-6 md:px-8 lg:px-10 py-12 sm:py-20">
      <div className="max-w-[1520px] mx-auto">
        
        {/* LARGE ROUNDED EDITORIAL CANVAS */}
        <div className="bg-[#5B9DE6] rounded-[34px] sm:rounded-[48px] p-8 sm:p-14 lg:p-16 text-white shadow-2xl shadow-sky-900/15 relative overflow-hidden">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* LEFT TEXT COLUMN */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-xs font-semibold backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-[#E5FE40]" />
                <span>Our Clinical Philosophy</span>
              </div>

              <h2 className="text-4xl sm:text-6xl font-light tracking-tight leading-[1.05]">
                Modern Dental Care Designed Around Your Comfort.
              </h2>

              <p className="text-white/90 text-sm sm:text-base leading-relaxed">
                At Dento Care Dental Clinic in Ponnani, we blend compassionate chairside care with the latest advancements in modern digital dentistry. We believe that maintaining a healthy, radiant smile should never be an intimidating or stressful experience.
              </p>

              <p className="text-white/80 text-xs sm:text-sm leading-relaxed">
                Whether you visit us for preventative cleanings, single-sitting root canals, or full-arch dental implants, our team is dedicated to transparent communication, personalized treatment plans, and enduring clinical outcomes.
              </p>
            </div>

            {/* RIGHT PILLARS GRID */}
            <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {pillars.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div
                    key={idx}
                    className="bg-white/10 backdrop-blur-md rounded-[26px] p-6 border border-white/20 hover:bg-white/15 transition-all"
                  >
                    <div className="w-10 h-10 rounded-full bg-[#E5FE40] text-slate-900 flex items-center justify-center mb-4">
                      <Icon size={20} strokeWidth={2.2} />
                    </div>
                    <h3 className="text-lg font-medium text-white mb-2">
                      {item.title}
                    </h3>
                    <p className="text-xs text-white/80 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                );
              })}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
