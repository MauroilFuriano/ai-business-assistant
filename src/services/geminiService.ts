import { GoogleGenAI, Chat } from "@google/genai";
import { BUSINESS_INFO } from "../constants";

let aiClient: GoogleGenAI | null = null;
let chatSession: Chat | null = null;

const getClient = () => {
  if (!aiClient) {
    if (!process.env.API_KEY) {
      console.error("API_KEY environment variable is missing.");
      throw new Error("API Key mancante. Impossibile connettersi all'assistente.");
    }
    aiClient = new GoogleGenAI({ apiKey: process.env.API_KEY });
  }
  return aiClient;
};

const buildSystemInstruction = (): string => {
  const { name, type, address, phone, email, hours, services, faq } = BUSINESS_INFO;

  const servicesText = services
    .map(s => `- ${s.name} (${s.price}): ${s.description}`)
    .join("\n");
  
  const hoursText = Object.entries(hours)
    .map(([day, time]) => `${day}: ${time}`)
    .join("\n");

  const faqText = Object.entries(faq)
    .map(([q, a]) => `Q: ${q}\nA: ${a}`)
    .join("\n\n");

  return `
    Sei "Mario", l'assistente virtuale ufficiale di "${name}", un ${type}.
    
    Il tuo compito è rispondere alle domande dei clienti in modo gentile, professionale e tipicamente italiano (puoi usare qualche esclamazione amichevole ma resta educato).

    DETTAGLI ATTIVITÀ:
    Indirizzo: ${address}
    Telefono: ${phone}
    Email: ${email}

    ORARI DI APERTURA:
    ${hoursText}

    MENU / SERVIZI:
    ${servicesText}

    FAQ (Domande Frequenti):
    ${faqText}

    REGOLE IMPORTANTI:
    1. Rispondi SOLO in Italiano.
    2. Rispondi SOLO a domande relative al ristorante. Se ti chiedono altro (meteo, politica, matematica), rispondi gentilmente che puoi aiutare solo con informazioni sul ristorante.
    3. Se ti chiedono di prenotare, chiedi: Nome, Numero di Persone, Data e Ora. Una volta forniti, ringrazia e dì che la richiesta è stata inoltrata allo staff (simulazione).
    4. Sii breve e conciso.
    5. Usa le emoji occasionalmente 🍕🍝🍷.
    6. Se non trovi l'informazione nei dati forniti, invita a chiamare il numero ${phone}. NON INVENTARE INFORMAZIONI.
  `;
};

export const startChatSession = () => {
  try {
    const client = getClient();
    chatSession = client.chats.create({
      model: "gemini-3-flash-preview",
      config: {
        systemInstruction: buildSystemInstruction(),
      },
    });
  } catch (error) {
    console.error("Failed to start chat session", error);
  }
};

export const sendMessageToAI = async (userMessage: string): Promise<string> => {
  if (!chatSession) {
    startChatSession();
  }
  
  if (!chatSession) {
     return "Spiacente, servizio momentaneamente non disponibile. Controlla la chiave API.";
  }

  try {
    const result = await chatSession.sendMessage({ message: userMessage });
    return result.text || "Mi dispiace, non ho capito. Puoi ripetere?";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Si è verificato un errore tecnico. Per favore chiama il ristorante.";
  }
};
