<div align="center">
  <img width="100%" alt="AI Restaurant Concierge Banner" src=https://github.com/MauroilFuriano/ai-business-assistant/blob/main/src/immagine_demo.png?raw=true"" />

  # 🍕 AI Business Assistant | Ristorante Demo
  
  [![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
  [![Google Gemini](https://img.shields.io/badge/Google%20Gemini-8E75B2?style=for-the-badge&logo=google-gemini&logoColor=white)](https://deepmind.google/technologies/gemini/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
  [![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com/)

  <p>
    <strong>Una demo interattiva per il settore Horeca/Ristorazione.</strong><br>
    Sito web moderno con integrato "Mario", un cameriere virtuale basato su AI che gestisce prenotazioni e risponde alle domande dei clienti h24.
  </p>
  
  [🌐 Prova la Demo Live](https://ai-business-assistant-two.vercel.app/)
</div>

---

## 💡 Il Concetto
I ristoratori perdono ore al telefono per rispondere sempre alle stesse domande ("Siete aperti?", "Avete il senza glutine?", "C'è posto per 4?").
Questo progetto dimostra come un **Sito Web AI-Driven** possa automatizzare il customer care.

Il cuore del sistema è **Mario**, un chatbot istruito specificamente per comportarsi come un cameriere italiano gentile, professionale e attento alla sicurezza alimentare.

## ✨ Funzionalità Principali

### 🤖 "Mario" - AI Concierge (Gemini Powered)
Non è un semplice bot a risposte preimpostate. Grazie al **Prompt Engineering** su Google Gemini:
* **Gestione Allergeni & Intolleranze:** Risponde con precisione a domande critiche per la salute (es. *"Avete pizze senza glutine?"* o *"Quali piatti sono senza lattosio?"*), consultando la knowledge base del ristorante.
* **Gestione Orari:** Informa i clienti sull'apertura in base al giorno corrente.
* **Simulazione Prenotazioni:** Accoglie richieste di tavoli raccogliendo dati (Nome, Ospiti, Orario).
* **Personality:** Mantiene un tono cordiale, usa emoji e risponde solo a domande pertinenti.

### 📱 UI/UX Ristorante Moderno
* **Menu Digitale Filtrabile:** Navigazione fluida tra Antipasti, Primi, Pizze, ecc.
* **Tab System:** Interfaccia stile "App Mobile" con navigazione inferiore per massima usabilità da smartphone.
* **Contact Form:** Modulo prenotazione classico per chi preferisce non usare la chat.

---

## 🛠 Tech Stack & Architettura

* **Frontend:** React (Vite) + TypeScript
* **Styling:** Tailwind CSS (Design System pulito e responsive)
* **AI Engine:** Google Gemini SDK (`@google/genai`)
* **State Management:** React Hooks (`useState`, `useMemo`, `useEffect`)
* **Icons:** Lucide React

### 🧠 Come funziona l'AI (Knowledge Injection)
Il bot non "inventa". I dati del ristorante sono centralizzati nel file `constants.ts`.
Il sistema (`geminiService.ts`) inietta dinamicamente questi dati nel "System Prompt" di Gemini ogni volta che si avvia una chat.
Questo garantisce che l'AI risponda sempre con prezzi, orari e informazioni sugli allergeni aggiornate.

```typescript
// Esempio della logica di iniezione dati
const buildSystemInstruction = () => {
  return `
    Sei "Mario", l'assistente di "${BUSINESS_INFO.name}".
    
    MENU: ${menuData}
    FAQ (Allergeni/Servizi): ${faqData}
    
    REGOLE:
    1. Rispondi SOLO in Italiano.
    2. Se chiedono opzioni senza glutine, conferma la disponibilità in base ai dati FAQ.
    3. Sii gentile e professionale.
  `;
};