import { BusinessInfo } from './types';

export const BUSINESS_INFO: BusinessInfo = {
  name: "Ristorante La Bella Napoli",
  type: "Ristorante Italiano & Pizzeria",
  address: "Via Roma 123, 00100 Roma, Italia",
  phone: "+39 06 12345678",
  email: "info@labellanapoli.example.com",
  hours: {
    "Lunedì": "Chiuso",
    "Martedì": "12:00 - 15:00, 19:00 - 23:00",
    "Mercoledì": "12:00 - 15:00, 19:00 - 23:00",
    "Giovedì": "12:00 - 15:00, 19:00 - 23:00",
    "Venerdì": "12:00 - 15:00, 19:00 - 00:00",
    "Sabato": "19:00 - 00:00",
    "Domenica": "12:00 - 16:00, 19:00 - 23:00"
  },
  services: [
    {
      id: "1",
      name: "Pizza Margherita DOP",
      description: "Pomodoro San Marzano, Mozzarella di Bufala Campana DOP, basilico fresco, olio EVO.",
      price: "€ 12,00",
      category: "Pizze",
      imageUrl: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=500&q=60"
    },
    {
      id: "2",
      name: "Spaghetti alla Carbonara",
      description: "Guanciale croccante, tuorlo d'uovo, Pecorino Romano, pepe nero. Senza panna.",
      price: "€ 14,00",
      category: "Primi",
      imageUrl: "https://images.unsplash.com/photo-1612874742237-6526221588e3?auto=format&fit=crop&w=500&q=60"
    },
    {
      id: "3",
      name: "Tagliere Misto",
      description: "Selezione di salumi e formaggi locali con miele e confetture.",
      price: "€ 18,00",
      category: "Antipasti",
      imageUrl: "https://images.unsplash.com/photo-1541529086526-db283c563270?auto=format&fit=crop&w=500&q=60"
    },
    {
      id: "4",
      name: "Tiramisù della Casa",
      description: "Savoiardi, mascarpone fresco, caffè espresso, cacao amaro.",
      price: "€ 6,00",
      category: "Dolci",
      imageUrl: "https://images.unsplash.com/photo-1542124948-dc391252a940?auto=format&fit=crop&w=500&q=60"
    },
    {
      id: "5",
      name: "Pizza Diavola",
      description: "Pomodoro, mozzarella, salame piccante napoletano.",
      price: "€ 10,00",
      category: "Pizze",
      imageUrl: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=500&q=60"
    }
  ],
  faq: {
    "Fate consegne a domicilio?": "Sì, effettuiamo consegne tramite i principali partner (Glovo, Deliveroo) o direttamente in zona centro.",
    "Avete opzioni senza glutine?": "Certamente! Abbiamo impasti per pizza senza glutine e pasta gluten-free. Segnalalo al cameriere.",
    "È necessario prenotare?": "È vivamente consigliato prenotare nel weekend (Venerdì-Domenica).",
    "Accettate animali?": "Sì, i cani di piccola e media taglia sono i benvenuti nella sala esterna."
  },
  welcomeMessage: "Benvenuto a La Bella Napoli! 🍕 Come posso aiutarti oggi? Puoi chiedermi del menu, degli orari o prenotare un tavolo."
};