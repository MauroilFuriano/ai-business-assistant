export interface Service {
  id: string;
  name: string;
  description: string;
  price: string;
  category: string;
  imageUrl?: string;
}

export interface BusinessInfo {
  name: string;
  type: string;
  address: string;
  phone: string;
  email: string;
  hours: Record<string, string>;
  services: Service[];
  faq: Record<string, string>;
  welcomeMessage: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  isError?: boolean;
}
