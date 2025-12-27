import React from 'react';
import { Service } from '../types';

interface ServiceCardProps {
  service: Service;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
      <div className="aspect-[4/3] overflow-hidden relative bg-gray-100">
        <img 
          src={service.imageUrl || "https://placehold.co/400x300?text=No+Image"} 
          alt={service.name} 
          className="w-full h-full object-cover object-top transform hover:scale-105 transition-transform duration-500" 
        />
        <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-md text-sm font-bold text-gray-800 shadow-sm">
          {service.price}
        </div>
      </div>
      <div className="p-4">
        <div className="text-xs font-semibold text-red-500 uppercase tracking-wide mb-1">
          {service.category}
        </div>
        <h3 className="font-bold text-gray-900 mb-2">{service.name}</h3>
        <p className="text-gray-600 text-sm line-clamp-2">{service.description}</p>
      </div>
    </div>
  );
};

export default ServiceCard;
