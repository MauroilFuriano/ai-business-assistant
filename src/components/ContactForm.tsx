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
      <div className="flex flex-col items-center justify-center h-full min-h-[400px] p-8 text-center bg-zinc-900/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-zinc-800">
        <div className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center mb-6 text-emerald-500 animate-[bounce_2s_infinite]">
          <CheckCircle size={40} />
        </div>
        <h2 className="text-3xl font-black text-zinc-100 mb-3 tracking-tight">Tavolo Riservato!</h2>
        <p className="text-zinc-400 mb-8 max-w-sm leading-relaxed">
          Benvenuto nel club, {formData.name}. Abbiamo bloccato il tuo posto.
          Ti chiameremo al {formData.phone} per conferma. Preparati per una serata fantastica.
        </p>
        <button
          onClick={() => { setSubmitted(false); setFormData({ name: '', phone: '', date: '', guests: '2', notes: '' }); }}
          className="text-amber-500 font-bold hover:text-amber-400 transition-colors uppercase tracking-wider text-sm flex items-center gap-2"
        >
          Effettua un'altra richiesta
        </button>
      </div>
    );
  }

  return (
    <div className="bg-zinc-900/80 backdrop-blur-xl rounded-2xl p-6 md:p-8 shadow-2xl border border-zinc-800 pb-24 md:pb-8 relative overflow-hidden">
      {/* Decorative gradient */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 blur-[100px] pointer-events-none rounded-full"></div>

      <div className="mb-8 relative z-10">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-3xl font-black text-zinc-100 tracking-tight">Vieni a Trovarci</h2>
          <span className="bg-red-500/10 text-red-500 border border-red-500/20 text-xs font-bold px-2.5 py-1 rounded-md uppercase tracking-wider animate-pulse flex items-center gap-1">
            <span className="w-1.5 h-1.5 bg-red-500 rounded-full"></span> Alta Richiesta
          </span>
        </div>
        <p className="text-zinc-400 text-sm">I weekend registrano rapidi sold-out. Blocca subito la tua esperienza.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
        <div>
          <label className="block text-sm font-bold text-zinc-300 mb-2">Nome e Cognome</label>
          <input
            required
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-5 py-3 bg-zinc-950 border border-zinc-800 text-zinc-100 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all placeholder:text-zinc-700"
            placeholder="Come preferisci essere chiamato?"
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-zinc-300 mb-2">Telefono</label>
          <input
            required
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-5 py-3 bg-zinc-950 border border-zinc-800 text-zinc-100 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all placeholder:text-zinc-700"
            placeholder="+39 333 1234567"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-bold text-zinc-300 mb-2">
              <span className="flex items-center gap-2"><Calendar size={16} className="text-amber-500" /> Data</span>
            </label>
            <input
              required
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full px-5 py-3 bg-zinc-950 border border-zinc-800 text-zinc-100 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all [color-scheme:dark]"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-zinc-300 mb-2">
              <span className="flex items-center gap-2"><Users size={16} className="text-amber-500" /> Ospiti</span>
            </label>
            <select
              name="guests"
              value={formData.guests}
              onChange={handleChange}
              className="w-full px-5 py-3 bg-zinc-950 border border-zinc-800 text-zinc-100 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all"
            >
              {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
                <option key={num} value={num}>{num} {num === 1 ? 'Persona' : 'Persone'}</option>
              ))}
              <option value="more">8+ V.I.P.</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-bold text-zinc-300 mb-2">
            <span className="flex items-center gap-2"><MessageSquare size={16} className="text-amber-500" /> Desideri Particolari?</span>
          </label>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            rows={3}
            className="w-full px-5 py-3 bg-zinc-950 border border-zinc-800 text-zinc-100 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all resize-none placeholder:text-zinc-700"
            placeholder="Intolleranze? Festeggiamenti speciali? Faccelo sapere."
          />
        </div>

        <button
          type="submit"
          className="relative w-full overflow-hidden group bg-gradient-to-r from-amber-500 to-amber-600 text-zinc-950 font-black py-4 rounded-xl shadow-[0_0_20px_rgba(245,158,11,0.4)] transition-all active:scale-95 hover:shadow-[0_0_30px_rgba(245,158,11,0.6)]"
        >
          <span className="relative z-10 flex flex-col items-center justify-center">
            Blocca il Tuo Tavolo
            <span className="text-xs font-semibold opacity-80 normal-case mt-0.5">Conferma Immediata</span>
          </span>
          {/* Shimmer Effect */}
          <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-20 group-hover:animate-shimmer" />
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
