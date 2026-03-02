import React from 'react';
import { Home, Utensils, Clock, MessageCircle, Info } from 'lucide-react';

interface NavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({ activeTab, setActiveTab }) => {
  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'menu', label: 'Menu', icon: Utensils },
    { id: 'chat', label: 'AI Chat', icon: MessageCircle },
    { id: 'info', label: 'Info', icon: Info },
    { id: 'contact', label: 'Prenota', icon: Clock }, // Using Clock icon for reservation/contact
  ];

  return (
    <nav className="fixed bottom-0 left-0 w-full bg-zinc-950/80 backdrop-blur-xl border-t border-zinc-800 pb-safe z-50">
      <div className="flex justify-around items-center h-16">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`flex flex-col items-center justify-center w-full h-full space-y-1 transition-all duration-300 ${activeTab === item.id
                ? 'text-amber-500 transform -translate-y-1 drop-shadow-[0_0_8px_rgba(245,158,11,0.5)]'
                : 'text-zinc-500 hover:text-amber-400'
              }`}
          >
            <item.icon size={20} strokeWidth={activeTab === item.id ? 2.5 : 2} />
            <span className="text-xs font-medium">{item.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
};

export default Navigation;
