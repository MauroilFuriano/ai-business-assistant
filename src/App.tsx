import React, { useState, useMemo } from 'react';
import Navigation from './components/Navigation';
import ChatInterface from './components/ChatInterface';
import ServiceCard from './components/ServiceCard';
import InfoSection from './components/InfoSection';
import ContactForm from './components/ContactForm';
import { BUSINESS_INFO } from './constants';
import { ChefHat } from 'lucide-react';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [selectedCategory, setSelectedCategory] = useState('Tutti');

  // Memoize categories to prevent recalculation on every render
  const categories = useMemo(() => {
    return ['Tutti', ...new Set(BUSINESS_INFO.services.map(s => s.category))];
  }, []);

  // Memoize filtered services based on selected category
  const filteredServices = useMemo(() => {
    if (selectedCategory === 'Tutti') {
      return BUSINESS_INFO.services;
    }
    return BUSINESS_INFO.services.filter(s => s.category === selectedCategory);
  }, [selectedCategory]);

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return (
          <div className="space-y-8 pb-20">
            {/* Hero Section */}
            <div className="relative h-64 md:h-80 rounded-2xl overflow-hidden shadow-lg">
              <img 
                src="https://picsum.photos/800/400?random=10" 
                alt="Restaurant Interior" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-6 text-white">
                <div className="flex items-center gap-2 mb-2">
                  <ChefHat className="text-red-500" />
                  <span className="bg-red-600 text-xs font-bold px-2 py-1 rounded uppercase tracking-wider">Aperto Ora</span>
                </div>
                <h1 className="text-3xl font-bold mb-1">{BUSINESS_INFO.name}</h1>
                <p className="text-gray-200 text-sm">{BUSINESS_INFO.type}</p>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-2 gap-4">
              <button 
                onClick={() => setActiveTab('menu')}
                className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center justify-center gap-2 hover:bg-gray-50 transition-colors"
              >
                <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 font-bold text-lg">🍕</div>
                <span className="font-semibold text-gray-800">Il Menu</span>
              </button>
              <button 
                onClick={() => setActiveTab('chat')}
                className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center justify-center gap-2 hover:bg-gray-50 transition-colors"
              >
                 <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-lg">🤖</div>
                <span className="font-semibold text-gray-800">Chiedi all'AI</span>
              </button>
            </div>

            {/* Featured Services */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-800">Piatti Consigliati</h2>
                <button 
                  onClick={() => setActiveTab('menu')}
                  className="text-red-600 text-sm font-medium hover:underline"
                >
                  Vedi tutti
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {BUSINESS_INFO.services.slice(0, 2).map(service => (
                  <ServiceCard key={service.id} service={service} />
                ))}
              </div>
            </div>
            
             {/* CTA */}
             <div className="bg-red-600 rounded-xl p-6 text-white text-center shadow-lg shadow-red-200">
                <h3 className="text-xl font-bold mb-2">Voglia di Pizza?</h3>
                <p className="mb-4 text-red-100 text-sm">Prenota il tuo tavolo in pochi secondi.</p>
                <button 
                  onClick={() => setActiveTab('contact')}
                  className="bg-white text-red-600 font-bold px-6 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  Prenota Ora
                </button>
             </div>
          </div>
        );
      case 'menu':
        return (
          <div className="space-y-6 pb-20">
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Il Nostro Menu</h2>
              
              {/* Category Filter */}
              <div className="flex overflow-x-auto pb-2 gap-2 scrollbar-hide -mx-1 px-1">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                      selectedCategory === cat
                        ? 'bg-red-600 text-white shadow-md shadow-red-100 transform scale-105'
                        : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredServices.length > 0 ? (
                filteredServices.map(service => (
                  <ServiceCard key={service.id} service={service} />
                ))
              ) : (
                <div className="col-span-full text-center py-10 text-gray-500">
                  Nessun piatto trovato in questa categoria.
                </div>
              )}
            </div>
          </div>
        );
      case 'chat':
        return (
          <div className="h-full pb-20 md:pb-0">
             <div className="mb-4">
              <h2 className="text-2xl font-bold text-gray-800">Assistente Virtuale</h2>
              <p className="text-gray-500">Parla con Mario, il nostro esperto digitale.</p>
             </div>
            <ChatInterface />
          </div>
        );
      case 'info':
        return (
          <div className="h-full">
             <div className="mb-4">
              <h2 className="text-2xl font-bold text-gray-800">Informazioni</h2>
             </div>
            <InfoSection />
          </div>
        );
      case 'contact':
        return (
          <div className="h-full">
            <ContactForm />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
      <div className="max-w-3xl mx-auto min-h-screen bg-white shadow-2xl overflow-hidden md:border-x border-gray-200">
        {/* Mobile Header (Sticky) */}
        <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-gray-100 p-4 flex justify-center md:hidden">
          <span className="font-bold text-lg text-gray-800">{BUSINESS_INFO.name}</span>
        </header>

        {/* Desktop Header */}
        <header className="hidden md:flex items-center justify-between p-6 border-b border-gray-100 bg-white">
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center text-white font-bold">BN</div>
             <div>
               <h1 className="text-xl font-bold text-gray-900">{BUSINESS_INFO.name}</h1>
               <p className="text-xs text-gray-500">{BUSINESS_INFO.address}</p>
             </div>
          </div>
          <div className="flex gap-6 text-sm font-medium text-gray-600">
            {/* Desktop Navigation Links */}
            <span className="text-green-600 flex items-center gap-1">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              Aperto
            </span>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="p-4 md:p-8">
          {renderContent()}
        </main>

        {/* Bottom Navigation */}
        <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>
    </div>
  );
};

export default App;