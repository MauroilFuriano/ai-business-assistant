import React, { useState } from 'react';
import { Calendar, Users, MessageSquare, CheckCircle } from 'lucide-react';

const ContactForm: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    date: '',
    guests: '2',
    notes: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate submission
    setTimeout(() => {
      setSubmitted(true);
    }, 800);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center h-full min-h-[400px] p-8 text-center bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4 text-green-600">
          <CheckCircle size={32} />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Richiesta Inviata!</h2>
        <p className="text-gray-600 mb-6">
          Grazie {formData.name}. Abbiamo ricevuto la tua richiesta di prenotazione. 
          Ti contatteremo al numero {formData.phone} per conferma.
        </p>
        <button 
          onClick={() => { setSubmitted(false); setFormData({name: '', phone: '', date: '', guests: '2', notes: ''}); }}
          className="text-red-600 font-medium hover:underline"
        >
          Effettua un'altra richiesta
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 pb-20 md:pb-6">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-800">Prenota un Tavolo</h2>
        <p className="text-gray-500 text-sm mt-1">Compila il modulo per richiedere la disponibilità.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Nome e Cognome</label>
          <input
            required
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all"
            placeholder="Mario Rossi"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Telefono</label>
          <input
            required
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all"
            placeholder="+39 333 1234567"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              <span className="flex items-center gap-1"><Calendar size={14}/> Data</span>
            </label>
            <input
              required
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              <span className="flex items-center gap-1"><Users size={14}/> Ospiti</span>
            </label>
            <select
              name="guests"
              value={formData.guests}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all"
            >
              {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
                <option key={num} value={num}>{num} Persone</option>
              ))}
              <option value="more">8+ (Contattaci)</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            <span className="flex items-center gap-1"><MessageSquare size={14}/> Note (Allergie, Eventi)</span>
          </label>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            rows={3}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all resize-none"
            placeholder="Es. Intolleranza al lattosio, Compleanno..."
          />
        </div>

        <button
          type="submit"
          className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-xl shadow-lg shadow-red-200 transition-all active:scale-95"
        >
          Invia Richiesta
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
