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
    <div className="flex flex-col h-[calc(100vh-4rem)] md:h-[600px] bg-zinc-900/90 backdrop-blur-xl md:rounded-2xl md:shadow-2xl md:border border-zinc-800 overflow-hidden relative">
      {/* Decorative Glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 blur-[80px] rounded-full pointer-events-none"></div>

      {/* Header */}
      <div className="bg-gradient-to-r from-zinc-800 to-zinc-900 border-b border-zinc-700/50 text-zinc-100 p-4 flex items-center shadow-md z-10">
        <div className="bg-amber-500/10 border border-amber-500/20 text-amber-500 p-2.5 rounded-xl mr-4 shadow-[0_0_15px_rgba(245,158,11,0.2)]">
          <Bot size={24} className="animate-pulse" />
        </div>
        <div>
          <h2 className="font-bold text-lg tracking-tight">Mario <span className="text-amber-500 font-medium">Assistant</span></h2>
          <p className="text-zinc-400 text-xs flex items-center gap-1.5 font-medium">
            {isLoading ? (
              <>
                <Loader2 size={12} className="animate-spin text-emerald-500" />
                Elaborazione...
              </>
            ) : (
              <>
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full shadow-[0_0_5px_rgba(16,185,129,0.5)]"></span>
                In ascolto
              </>
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
              className={`max-w-[85%] p-4 rounded-2xl text-sm md:text-base leading-relaxed break-words shadow-sm ${msg.role === 'user'
                  ? 'bg-amber-500 text-zinc-950 rounded-br-none shadow-[0_4px_15px_rgba(245,158,11,0.2)] font-medium'
                  : 'bg-zinc-800/80 backdrop-blur-sm text-zinc-200 border border-zinc-700/50 rounded-bl-none'
                } ${msg.isError ? 'bg-red-500/10 text-red-400 border-red-500/20' : ''}`}
            >
              {msg.text.split('\n').map((line, i) => (
                <p key={i} className={i > 0 ? 'mt-2' : ''}>
                  {line.replace(/\*\*(.*?)\*\*/g, '$1').replace(/\*(.*?)\*/g, '$1')}
                </p>
              ))}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-zinc-800 border border-zinc-700 text-zinc-500 p-4 rounded-2xl rounded-bl-none flex items-center space-x-2 shadow-sm min-w-[80px]">
              <div className="flex space-x-1.5 p-1">
                <div className="w-2 h-2 bg-amber-500/50 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-2 h-2 bg-amber-500/70 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-2 h-2 bg-amber-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 bg-zinc-900/80 backdrop-blur-xl border-t border-zinc-800 mb-16 md:mb-0 z-10">
        <div className="flex items-center space-x-2 bg-zinc-950 rounded-2xl px-5 py-3 border border-zinc-800 focus-within:border-amber-500/50 focus-within:shadow-[0_0_15px_rgba(245,158,11,0.1)] transition-all duration-300">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Chiedimi informazioni o prenota..."
            className="flex-1 bg-transparent outline-none text-zinc-100 placeholder-zinc-600 font-medium"
            disabled={isLoading}
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className={`p-2.5 rounded-xl transition-all duration-300 ${input.trim() && !isLoading
                ? 'bg-amber-500 text-zinc-950 hover:bg-amber-400 hover:scale-105 hover:shadow-[0_0_10px_rgba(245,158,11,0.4)]'
                : 'bg-zinc-800 text-zinc-600'
              }`}
          >
            <Send size={18} className={input.trim() && !isLoading ? 'transform translate-x-0.5 -translate-y-0.5' : ''} />
          </button>
        </div>
        <div className="text-center mt-3">
          <p className="text-[10px] text-zinc-600 font-medium tracking-wider uppercase">Neural Network Backend</p>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;