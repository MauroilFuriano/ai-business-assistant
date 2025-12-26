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
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
          <MapPin className="mr-2 text-red-600" size={20} />
          Dove Siamo
        </h2>
        <div className="space-y-4">
          <p className="flex items-start text-gray-600">
            <span className="font-medium text-gray-900 w-20 shrink-0">Indirizzo:</span>
            {BUSINESS_INFO.address}
          </p>
          <p className="flex items-center text-gray-600">
            <span className="font-medium text-gray-900 w-20 shrink-0">Telefono:</span>
            <a href={`tel:${BUSINESS_INFO.phone}`} className="text-red-600 hover:underline">
              {BUSINESS_INFO.phone}
            </a>
          </p>
          <p className="flex items-center text-gray-600">
             <span className="font-medium text-gray-900 w-20 shrink-0">Email:</span>
             <a href={`mailto:${BUSINESS_INFO.email}`} className="text-red-600 hover:underline">
               {BUSINESS_INFO.email}
             </a>
          </p>
        </div>
        
        {/* Placeholder Map */}
        <div className="mt-4 h-48 bg-gray-200 rounded-lg flex items-center justify-center">
            <p className="text-gray-500 text-sm">Mappa Google integrata qui</p>
        </div>
      </div>

      {/* Hours */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
          <Clock className="mr-2 text-red-600" size={20} />
          Orari di Apertura
        </h2>
        <div className="grid gap-2">
          {Object.entries(BUSINESS_INFO.hours).map(([day, hours]) => (
            <div key={day} className="flex justify-between py-2 border-b border-gray-50 last:border-0">
              <span className="font-medium text-gray-700">{day}</span>
              <span className="text-gray-500 text-sm">{hours}</span>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
          <HelpCircle className="mr-2 text-red-600" size={20} />
          Domande Frequenti
        </h2>
        <div className="space-y-4">
          {Object.entries(BUSINESS_INFO.faq).map(([q, a], idx) => (
            <div key={idx} className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-1">{q}</h3>
              <p className="text-gray-600 text-sm">{a}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Back to Top Button */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-40 right-4 md:bottom-24 md:right-8 bg-red-600 text-white p-3 rounded-full shadow-lg hover:bg-red-700 transition-all duration-300 z-40 flex items-center justify-center ${
          showScrollTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
        }`}
        aria-label="Torna su"
      >
        <ArrowUp size={24} />
      </button>

    </div>
  );
};

export default InfoSection;