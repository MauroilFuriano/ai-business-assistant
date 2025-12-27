import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Loader2 } from 'lucide-react';
import { sendMessageToAI, startChatSession } from '../services/geminiService';
import { ChatMessage } from '../types';
import { BUSINESS_INFO } from '../constants';

const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: 'welcome', role: 'model', text: BUSINESS_INFO.welcomeMessage }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    startChatSession();
    // Focus input on mount for better UX
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userText = input;
    setInput('');
    
    // Add User Message
    const userMsg: ChatMessage = { 
      id: Date.now().toString(), 
      role: 'user', 
      text: userText 
    };
    setMessages(prev => [...prev, userMsg]);
    setIsLoading(true);

    // Call API
    try {
      const responseText = await sendMessageToAI(userText);
      const aiMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: responseText
      };
      setMessages(prev => [...prev, aiMsg]);
    } catch (error: any) {
      console.error("Chat Error:", error);
      
      let errorMessage = "Spiacente, si è verificato un errore imprevisto. Riprova più tardi.";
      
      // Extract specific error message if available
      if (error instanceof Error) {
        errorMessage = error.message;
      } else if (typeof error === 'string') {
        errorMessage = error;
      }

      const errorMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: `⚠️ ${errorMessage}`,
        isError: true
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
      // Re-focus input after sending
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] md:h-[600px] bg-gray-50 md:rounded-xl md:shadow-lg md:border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="bg-red-600 text-white p-4 flex items-center shadow-md z-10">
        <div className="bg-white/20 p-2 rounded-full mr-3">
          <Bot size={24} />
        </div>
        <div>
          <h2 className="font-bold text-lg">Mario - AI Assistant</h2>
          <p className="text-red-100 text-xs flex items-center gap-1">
            {isLoading ? (
              <>
                <Loader2 size={10} className="animate-spin" />
                Sta scrivendo...
              </>
            ) : (
              'Risponde subito'
            )}
          </p>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[85%] p-3 rounded-2xl text-sm md:text-base leading-relaxed ${
                msg.role === 'user'
                  ? 'bg-red-600 text-white rounded-br-none shadow-md'
                  : 'bg-white text-gray-800 border border-gray-200 rounded-bl-none shadow-sm'
              } ${msg.isError ? 'bg-red-100 text-red-600 border-red-300' : ''}`}
            >
              {msg.text.split('\n').map((line, i) => (
                <p key={i} className={i > 0 ? 'mt-1' : ''}>
                  {line.replace(/\*\*(.*?)\*\*/g, '$1').replace(/\*(.*?)\*/g, '$1')}
                </p>
              ))}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white border border-gray-200 text-gray-500 p-4 rounded-2xl rounded-bl-none flex items-center space-x-2 shadow-sm min-w-[100px]">
               <div className="flex space-x-1.5 p-1">
                <div className="w-2.5 h-2.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-2.5 h-2.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-2.5 h-2.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-3 bg-white border-t border-gray-200 mb-16 md:mb-0">
        <div className="flex items-center space-x-2 bg-gray-100 rounded-full px-4 py-2 border border-gray-300 focus-within:border-red-500 focus-within:ring-1 focus-within:ring-red-500 transition-all">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Scrivi un messaggio..."
            className="flex-1 bg-transparent outline-none text-gray-800 placeholder-gray-500"
            disabled={isLoading}
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className={`p-2 rounded-full transition-colors ${
              input.trim() && !isLoading ? 'text-red-600 hover:bg-red-50' : 'text-gray-400'
            }`}
          >
            <Send size={20} />
          </button>
        </div>
        <div className="text-center mt-2">
            <p className="text-[10px] text-gray-400">AI powered by Gemini</p>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;