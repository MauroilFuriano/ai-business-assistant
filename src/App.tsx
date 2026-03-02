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
            <div className="relative h-72 md:h-[550px] rounded-[2rem] overflow-hidden shadow-2xl group">
              <img
                src="/images/hero.png"
                alt="Restaurant Interior"
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/60 to-transparent flex flex-col justify-end p-8 text-zinc-100">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <ChefHat className="text-amber-500 w-6 h-6" />
                    <span className="bg-emerald-600/90 backdrop-blur-sm text-xs font-bold px-3 py-1.5 rounded-md uppercase tracking-wider shadow-lg shadow-emerald-900/40">Aperto Ora</span>
                  </div>
                  <button
                    onClick={() => setActiveTab('contact')}
                    className="hidden md:flex items-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 text-zinc-950 font-bold px-6 py-2.5 rounded-full shadow-[0_0_20px_rgba(245,158,11,0.4)] hover:shadow-[0_0_30px_rgba(245,158,11,0.6)] hover:scale-105 transition-all duration-300 animate-pulse"
                  >
                    Prenota un Tavolo
                  </button>
                </div>
                <h1 className="text-4xl md:text-5xl font-black mb-2 tracking-tight text-white drop-shadow-lg">{BUSINESS_INFO.name}</h1>
                <p className="text-zinc-300 text-base md:text-lg font-medium max-w-xl line-clamp-2 shadow-black drop-shadow-md">Un'esperienza sensoriale unica. Scopri il vero sapore d'Italia nel cuore della città, dove la tradizione sposa l'innovazione.</p>
                <button
                  onClick={() => setActiveTab('contact')}
                  className="md:hidden mt-4 w-full flex justify-center items-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 text-zinc-950 font-bold px-6 py-3 rounded-xl shadow-[0_0_15px_rgba(245,158,11,0.4)] active:scale-95 transition-all duration-300"
                >
                  Prenota Subito
                </button>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => setActiveTab('menu')}
                className="bg-zinc-800/40 backdrop-blur-md p-6 md:p-8 rounded-2xl shadow-lg shadow-black/20 border border-zinc-700/50 flex flex-col items-center justify-center gap-4 hover:bg-zinc-700/60 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/40 group"
              >
                <div className="w-16 h-16 bg-amber-500/10 rounded-full flex items-center justify-center text-amber-500 font-bold text-3xl group-hover:scale-110 transition-transform duration-300">🍕</div>
                <span className="font-semibold text-lg text-zinc-200">Il Menu</span>
              </button>
              <button
                onClick={() => setActiveTab('chat')}
                className="bg-zinc-800/40 backdrop-blur-md p-6 md:p-8 rounded-2xl shadow-lg shadow-black/20 border border-zinc-700/50 flex flex-col items-center justify-center gap-4 hover:bg-zinc-700/60 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/40 group"
              >
                <div className="w-16 h-16 bg-emerald-500/10 rounded-full flex items-center justify-center text-emerald-500 font-bold text-3xl group-hover:scale-110 transition-transform duration-300">🤖</div>
                <span className="font-semibold text-lg text-zinc-200">Chiedi all'AI</span>
              </button>
            </div>

            {/* Featured Services */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-zinc-100 tracking-tight">Piatti Consigliati</h2>
                <button
                  onClick={() => setActiveTab('menu')}
                  className="text-amber-500 text-sm font-medium hover:text-amber-400 transition-colors"
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
                    className={`px-5 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-all duration-300 ${selectedCategory === cat
                        ? 'bg-amber-500 text-zinc-950 shadow-[0_0_15px_rgba(245,158,11,0.3)] transform scale-105'
                        : 'bg-zinc-900 text-zinc-400 border border-zinc-800 hover:bg-zinc-800 hover:text-zinc-200'
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
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans selection:bg-amber-500/30">
      {/* Dynamic Immersive Background */}
      <div className="w-full min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-zinc-900 via-zinc-950 to-black overflow-hidden relative flex flex-col">
        {/* Subtle Noise Texture Overlay */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-30 pointer-events-none mix-blend-overlay"></div>
        {/* Decorative background glow */}
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-amber-600/10 blur-[150px] rounded-full pointer-events-none mix-blend-screen"></div>
        <div className="absolute bottom-0 right-1/4 w-[800px] h-[800px] bg-emerald-900/10 blur-[150px] rounded-full pointer-events-none mix-blend-screen"></div>

        {/* Mobile Header (Sticky) */}
        <header className="sticky top-0 z-30 bg-zinc-900/80 backdrop-blur-md border-b border-zinc-800 p-4 flex justify-between items-center md:hidden">
          <span className="font-bold text-xl text-zinc-100 tracking-tight">{BUSINESS_INFO.name}</span>
          <span className="flex items-center gap-2 text-xs font-medium text-amber-500 bg-amber-500/10 px-2 py-1 rounded-md">
            <span className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-pulse"></span>
            Aperto
          </span>
        </header>

        {/* Desktop Header */}
        <header className="hidden md:flex items-center justify-between px-12 py-6 border-b border-zinc-800 bg-zinc-900/80 backdrop-blur-md sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl flex items-center justify-center text-zinc-950 font-black text-xl shadow-lg shadow-amber-500/20">BN</div>
            <div>
              <h1 className="text-2xl font-bold text-zinc-100 tracking-tight">{BUSINESS_INFO.name}</h1>
              <p className="text-sm text-zinc-400 font-medium">{BUSINESS_INFO.address}</p>
            </div>
          </div>
          <div className="flex gap-6 text-sm font-medium">
            <span className="text-emerald-500 flex items-center gap-2 bg-emerald-500/10 px-3 py-1.5 rounded-lg border border-emerald-500/20">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]"></span>
              Aperto Ora
            </span>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="relative z-10 flex-grow p-6 md:p-12 max-w-7xl mx-auto w-full">
          {renderContent()}
        </main>

        {/* Bottom Navigation */}
        <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>
    </div>
  );
};

export default App;