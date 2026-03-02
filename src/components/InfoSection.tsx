import React, { useState, useEffect } from 'react';
import { MapPin, Phone, PhoneCall, Mail, Clock, HelpCircle, ArrowUp } from 'lucide-react';
import { BUSINESS_INFO } from '../constants';

const InfoSection: React.FC = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div className="space-y-6 pb-32 md:pb-8 relative">
      {/* Contact Info */}
      <div className="bg-zinc-900/80 backdrop-blur-xl rounded-2xl p-6 shadow-2xl border border-zinc-800 transition-all hover:bg-zinc-800/80">
        <h2 className="text-xl font-bold text-zinc-100 mb-4 flex items-center tracking-tight">
          <MapPin className="mr-2 text-amber-500" size={20} />
          Dove Siamo
        </h2>
        <div className="space-y-4">
          <p className="flex items-start text-zinc-400">
            <span className="font-medium text-zinc-200 w-20 shrink-0">Indirizzo:</span>
            {BUSINESS_INFO.address}
          </p>
          <p className="flex items-center text-zinc-400">
            <span className="font-medium text-zinc-200 w-20 shrink-0">Telefono:</span>
            <a href={`tel:${BUSINESS_INFO.phone}`} className="text-amber-500 hover:text-amber-400 hover:underline transition-colors">
              {BUSINESS_INFO.phone}
            </a>
          </p>
          <p className="flex items-center text-zinc-400">
            <span className="font-medium text-zinc-200 w-20 shrink-0">Email:</span>
            <a href={`mailto:${BUSINESS_INFO.email}`} className="text-amber-500 hover:text-amber-400 hover:underline transition-colors">
              {BUSINESS_INFO.email}
            </a>
          </p>
        </div>

        {/* Placeholder Map */}
        <div className="mt-6 h-48 bg-zinc-950 rounded-xl flex items-center justify-center border border-zinc-800/50 shadow-inner">
          <p className="text-zinc-600 text-sm font-medium">Mappa Google integrata qui</p>
        </div>
      </div>

      {/* Hours */}
      <div className="bg-zinc-900/80 backdrop-blur-xl rounded-2xl p-6 shadow-2xl border border-zinc-800 transition-all hover:bg-zinc-800/80">
        <h2 className="text-xl font-bold text-zinc-100 mb-4 flex items-center tracking-tight">
          <Clock className="mr-2 text-amber-500" size={20} />
          Orari di Apertura
        </h2>
        <div className="grid gap-2">
          {Object.entries(BUSINESS_INFO.hours).map(([day, hours]) => (
            <div key={day} className="flex justify-between py-2 border-b border-zinc-800/50 last:border-0">
              <span className="font-medium text-zinc-300">{day}</span>
              <span className="text-zinc-500 text-sm">{hours}</span>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ */}
      <div className="bg-zinc-900/80 backdrop-blur-xl rounded-2xl p-6 shadow-2xl border border-zinc-800 transition-all hover:bg-zinc-800/80">
        <h2 className="text-xl font-bold text-zinc-100 mb-4 flex items-center tracking-tight">
          <HelpCircle className="mr-2 text-amber-500" size={20} />
          Domande Frequenti
        </h2>
        <div className="space-y-4">
          {Object.entries(BUSINESS_INFO.faq).map(([q, a], idx) => (
            <div key={idx} className="bg-zinc-950/50 p-4 rounded-xl border border-zinc-800/50 hover:border-amber-500/20 hover:shadow-[0_0_15px_rgba(245,158,11,0.05)] transition-all">
              <h3 className="font-semibold text-zinc-200 mb-2">{q}</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">{a}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Back to Top Button */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-40 right-4 md:bottom-24 md:right-8 bg-amber-500 text-zinc-950 p-3.5 rounded-full shadow-[0_0_15px_rgba(245,158,11,0.4)] hover:bg-amber-400 hover:scale-110 transition-all duration-300 z-40 flex items-center justify-center ${showScrollTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
          }`}
        aria-label="Torna su"
      >
        <ArrowUp size={24} />
      </button>

    </div>
  );
};

export default InfoSection;