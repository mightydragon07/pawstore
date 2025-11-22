// components/Chatbox.jsx
"use client";
import React, { useState, useEffect, useRef } from 'react';
import { X, Send, Minimize2, Maximize2, MessageCircle } from 'lucide-react';

export const Chatbox = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, text: "Woof woof! 🐕 Hi there! I'm Max, your SmartPaws assistant! I'm here to help you find the perfect smart devices for your furry friend. What can I help you with today?", sender: 'bot' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const botResponses = {
    "hello": "Hey there! 🐾 I'm wagging my tail with excitement to help you! What smart devices are you interested in?",
    "hi": "Hi! 🦴 Ready to fetch some amazing pet tech for you!",
    "help": "I can assist you with:\n• Product recommendations 🎯\n• Order tracking 📦\n• Device setup 🔧\n• Pet care tips 💡\n• Pricing information 💰\n\nJust ask me anything!",
    "products": "We have an amazing selection! 🚀 Check out our GPS trackers, smart feeders, health monitors, and interactive toys. Which category interests you?",
    "tracker": "Our GPS trackers are pawsome! 🗺️ They offer real-time tracking, geo-fencing, and long battery life. The Fi Smart Collar and Tractive GPS are customer favorites!",
    "feeder": "Smart feeders are fantastic! 🍽️ The Smart Feeder Pro features AI-powered portion control, automatic scheduling, and app connectivity. Perfect for busy pet parents!",
    "price": "Our products range from $59 to $249! 💰 We have options for every budget. Looking for something specific?",
    "recommend": "Based on popularity, I'd suggest:\n🥇 Smart Feeder Pro ($149)\n🥈 GPS Pet Tracker ($99)\n🥉 PetPace Smart Collar ($199)\n\nAll are bestsellers with excellent reviews!",
    "shipping": "We offer free shipping on orders over $150! 📦 Standard delivery takes 3-5 business days. Need it faster? Ask about express shipping!",
    "health": "Health monitoring devices are essential! ❤️ Our smart collars track vital signs, activity levels, and sleep patterns. Perfect for keeping your pet healthy!",
    "thanks": "You're very welcome! 🐕 My tail is wagging! Is there anything else I can fetch for you?",
    "bye": "Goodbye, friend! 👋 Come back anytime you need help with pet tech. Have a pawsome day!",
    "default": "Interesting! 🤔 Let me think about that... Could you tell me more about what you're looking for? I'm all ears!"
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = { id: Date.now(), text: input, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const lowerInput = input.toLowerCase();
      let botResponse = botResponses.default;

      for (const [key, value] of Object.entries(botResponses)) {
        if (lowerInput.includes(key)) {
          botResponse = value;
          break;
        }
      }

      const botMessage = { 
        id: Date.now() + 1, 
        text: botResponse, 
        sender: 'bot' 
      };
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1200);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Floating Chat Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 group"
        >
          <div className="relative">
            {/* Pulse Ring */}
            <div className="absolute inset-0 bg-blue-500 rounded-full animate-ping opacity-75"></div>
            
            {/* Main Button */}
            <div className="relative w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full shadow-2xl shadow-blue-500/50 flex items-center justify-center transform group-hover:scale-110 transition-all duration-300">
              <MessageCircle className="w-7 h-7 text-white" />
            </div>

            {/* Notification Badge */}
            <div className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-lg animate-bounce">
              1
            </div>
          </div>

          {/* Tooltip */}
          <div className="absolute bottom-full right-0 mb-3 px-4 py-2 bg-slate-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap shadow-xl border border-slate-700">
            Chat with Max! 🐕
            <div className="absolute top-full right-6 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-slate-900"></div>
          </div>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div 
          className={`fixed z-50 transition-all duration-300 ${
            isMinimized 
              ? 'bottom-6 right-6 w-80' 
              : 'bottom-6 right-6 w-96 h-[600px]'
          }`}
          style={{ maxWidth: 'calc(100vw - 2rem)' }}
        >
          <div className="h-full flex flex-col bg-slate-900 backdrop-blur-xl rounded-2xl shadow-2xl border border-slate-700 overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-500 p-4 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-2xl backdrop-blur-sm">
                    🦮
                  </div>
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-white shadow-lg"></div>
                </div>
                <div>
                  <h3 className="text-white font-bold text-lg">Max</h3>
                  <p className="text-white/80 text-xs">Your Assistant 🐕</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                >
                  {isMinimized ? <Maximize2 className="w-4 h-4 text-white" /> : <Minimize2 className="w-4 h-4 text-white" />}
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-white" />
                </button>
              </div>
            </div>

            {!isMinimized && (
              <>
                {/* Messages Area */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-800/30">
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} animate-slide-up`}
                    >
                      <div
                        className={`max-w-[85%] rounded-2xl px-4 py-3 ${
                          msg.sender === 'user'
                            ? 'bg-blue-600 text-white'
                            : 'bg-slate-700 text-gray-100 border border-slate-600'
                        }`}
                      >
                        <p className="text-sm whitespace-pre-line leading-relaxed">{msg.text}</p>
                      </div>
                    </div>
                  ))}
                  
                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="bg-slate-700 rounded-2xl px-4 py-3 border border-slate-600">
                        <div className="flex space-x-2">
                          <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
                          <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                          <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                <div className="p-4 bg-slate-800 border-t border-slate-700">
                  <div className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Ask anything... 🐾"
                      className="flex-1 bg-slate-700 text-white px-4 py-3 rounded-xl border border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder-gray-400 text-sm"
                    />
                    <button
                      onClick={handleSend}
                      disabled={!input.trim()}
                      className="p-3 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-600 disabled:cursor-not-allowed rounded-xl text-white transition-all transform hover:scale-105 shadow-lg shadow-blue-500/30"
                    >
                      <Send className="w-5 h-5" />
                    </button>
                  </div>
                  <p className="text-xs text-gray-500 mt-2 text-center">
                    Powered by SmartPaws AI • Max v1.0
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slide-up {
          animation: slide-up 0.3s ease-out;
        }
      `}</style>
    </>
  );
};