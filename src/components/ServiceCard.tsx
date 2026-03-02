import React from 'react';
import { Service } from '../types';

interface ServiceCardProps {
  service: Service;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
  return (
    <div className="bg-zinc-900 rounded-2xl shadow-lg shadow-black/20 border border-zinc-800 overflow-hidden hover:shadow-2xl hover:shadow-amber-500/10 hover:-translate-y-1 transition-all duration-300 group">
      <div className="aspect-[4/3] overflow-hidden relative bg-zinc-800">
        <img
          src={service.imageUrl || "https://placehold.co/400x300/18181b/ffffff?text=No+Image"}
          alt={service.name}
          className="w-full h-full object-cover object-top transform group-hover:scale-110 transition-transform duration-700"
        />
        {/* Scarcity/Neuromarketing Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {service.price === '€ 14,00' || service.name.includes('Carbonara') ? (
            <span className="bg-amber-500 text-zinc-950 text-xs font-black px-2.5 py-1 rounded-md shadow-lg flex items-center gap-1 uppercase tracking-wide animate-[pulse_3s_ease-in-out_infinite]">
              🔥 Bestseller
            </span>
          ) : null}
          {service.name.includes('Diavola') && (
            <span className="bg-red-600 text-white text-xs font-black px-2.5 py-1 rounded-md shadow-lg flex items-center gap-1 uppercase tracking-wide">
              🌶️ Piccante
            </span>
          )}
        </div>
        <div className="absolute top-3 right-3 bg-zinc-950/80 backdrop-blur-md px-3 py-1.5 rounded-lg text-amber-500 font-black shadow-lg border border-amber-500/20 group-hover:bg-amber-500 group-hover:text-zinc-950 transition-colors duration-300">
          {service.price}
        </div>
      </div>
      <div className="p-5">
        <div className="text-xs font-bold text-emerald-500 uppercase tracking-wider mb-2 flex items-center justify-between">
          <span>{service.category}</span>
        </div>
        <h3 className="text-xl font-bold text-zinc-100 mb-2 truncate group-hover:text-amber-500 transition-colors">{service.name}</h3>
        <p className="text-zinc-400 text-sm line-clamp-2 leading-relaxed">{service.description}</p>
      </div>
    </div>
  );
};

export default ServiceCard;
