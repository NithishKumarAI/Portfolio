import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const SUGGESTIONS = [
  "🎯 Why hire Gunasree?",
  "📍 Where is she based?",
  "🏗️ How she built TaskNerve",
  "🏆 Hackathon wins"
];

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: "Hi! I'm Hedgy 🦔. I know everything about Gunasree's work and background. Ask me about her RAG pipelines, where she's from, or her hackathon wins!" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const generateResponse = async (userMessage: string) => {
    if (!GEMINI_API_KEY) {
      return "⚠️ I'm missing my brain! (API Key not correctly configured). Please check VITE_GEMINI_API_KEY in .env file.";
    }

    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${GEMINI_API_KEY}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `You are Hedgy, a friendly and professional AI assistant for Gunasree R's portfolio. 
              You represent Gunasree, an AI ENGINEER.
              
              Context about Gunasree R:
              - Personal Background: 21-year-old woman from Salem, Tamil Nadu, India.
              - AI Engineer at Ausweg Info Control (Jul 2025 - Jan 2026): 
                - Engineered RAG pipelines boosting accuracy by 72% and reducing data lookup time by 60%.
                - Built production-ready LLM chatbots for EMS.
              - Data Analyst at Ausweg (Aug 2024 - Dec 2024): 
                - Optimized MQTT IIoT pipelines making them 38% more stable.
                - Enhanced real-time production visibility by 32%.
              - ML Intern at Corizo: Designed RNN/LSTM stock prediction models (+24% accuracy).
              - Technical Skills: LLMs, RAG, NLP, Python, TensorFlow, PyTorch, Vector DBs, Next.js, React.
              - Major Projects: 
                - TaskNerve: GCC orchestration with AI-driven SLA breach detection.
                - Crowd Guardian: Edge-AI system using Stampede Risk Index (SRI) algorithm.
                - FairAssess.ai: Bias detection engine boosting applicant diversity by 52%.
              - Achievements: 
                - Winner of GCC x 6S Hackathon (₹25,000 first prize).
                - Recognized at VISAI 2024 and PSG ITech 2026.
                - Google Cloud Gen AI Certified.
              - Education: B.Tech in IT (CGPA 8.1).
              - Personal & Hobbies: 
                - Identity: A "Techie Girl" with a deep-rooted passion for nature and the outdoors.
                - Adventure: An avid trekker and hiker who actively seeks out adventurous spots during her travels.
                - History & Culture: Fascinated by historical landmarks and finds inspiration in exploring diverse global cultures.
                - Creative: Enjoys playing the guitar, reading widely, and maintaining a high-energy, extroverted approach to collaboration.
                - Disciplined: Committed to daily self-reflection via journaling and an evening walk every single day.
                - Growth Mindset: Driven by a curiosity to learn and explore—whether through emerging technologies or new life experiences.
                - Interests: Values storytelling in all its forms, particularly through movies, series, and anime.
              - Travel: Global mindset. Spent 4 months immersive in Malaysia, exploring local nature, food, and culture (documented through Instagram logs).
              - Life Philosophy: Gunasree defines true success as the achievement of personal peace and happiness.
              
              Tone: Professional, warm, and data-driven. Highlight her balance of technical precision and adventurous spirit. Keep answers highly concise (under 3 sentences) unless asked for more detail.
              
              User Question: ${userMessage}`
            }]
          }]
        })
      });

      const data = await response.json();

      if (data.error) {
        throw new Error(data.error.message);
      }

      return data.candidates[0].content.parts[0].text;
    } catch (error) {
      console.error('Gemini API Error:', error);
      return "Sorry, I'm having trouble connecting to my neural network right now. Please try again later!";
    }
  };

  const handleSend = async (text: string = input) => {
    const cleanText = typeof text === 'string' ? text.replace(/✨\s*/g, '') : input;
    if (!cleanText.trim()) return;

    const newMessages = [...messages, { role: 'user', content: cleanText } as Message];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    const response = await generateResponse(cleanText);

    setMessages(prev => [...prev, { role: 'assistant', content: response }]);
    setIsLoading(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed bottom-24 right-4 md:right-8 w-[90vw] md:w-96 h-[550px] max-h-[85vh] rounded-2xl flex flex-col overflow-hidden z-50 shadow-2xl font-inter"
            style={{
              background: '#0e1117',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              boxShadow: '0 10px 40px rgba(0,0,0,0.5)'
            }}
          >
            {/* Header */}
            <div className="p-4 flex justify-between items-center" style={{ background: '#1c1c24' }}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full font-bold flex items-center justify-center text-white text-lg" style={{ background: '#7e57c2' }}>
                  H
                </div>
                <div>
                  <h3 className="font-bold text-white text-md">Hedgy (Gunasree's AI)</h3>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="w-2 h-2 bg-green-500 rounded-full" />
                    <span className="text-sm" style={{ color: '#4ade80' }}>Online</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Close Chat"
              >
                <X size={20} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4" style={{ background: '#0e1117' }}>
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
                >
                  <div className={`rounded-2xl p-4 text-[15px] leading-relaxed max-w-[85%] ${msg.role === 'user'
                    ? 'bg-cyan-500 text-black font-medium'
                    : 'text-gray-200'
                    }`}
                    style={msg.role === 'assistant' ? { background: '#1e1e24' } : {}}
                  >
                    <ReactMarkdown>{msg.content}</ReactMarkdown>
                  </div>
                </motion.div>
              ))}

              {isLoading && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-3">
                  <div className="bg-slate-800 border border-white/5 rounded-2xl p-4 flex gap-1 items-center" style={{ background: '#1e1e24' }}>
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Suggestions & Input Container */}
            <div className="p-4 pt-2" style={{ background: '#0e1117' }}>
              {messages.length === 1 && (
                <div className="flex flex-wrap gap-2 mb-4 justify-start">
                  {SUGGESTIONS.map((suggestion) => (
                    <button
                      key={suggestion}
                      onClick={() => handleSend(suggestion)}
                      className="px-4 py-2 text-sm rounded-xl border border-white/10 transition-colors text-cyan-400 hover:bg-white/5 whitespace-nowrap"
                      style={{ background: '#16161e' }}
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              )}

              <div className="flex gap-2 relative">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyPress}
                  placeholder="Ask Hedgy anything..."
                  className="flex-1 rounded-2xl px-5 py-3.5 text-[15px] text-white focus:outline-none placeholder:text-gray-500"
                  style={{ background: '#16161e', border: '1px solid rgba(255,255,255,0.05)' }}
                />
                <button
                  onClick={() => handleSend()}
                  disabled={!input.trim() || isLoading}
                  className="w-12 flex-shrink-0 flex items-center justify-center rounded-xl bg-cyan-400 text-black hover:bg-cyan-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed absolute right-1.5 top-1.5 bottom-1.5"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
        {!isOpen && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white text-black font-bold px-4 py-2 rounded-full text-sm shadow-xl flex items-center gap-2"
          >
            Hi! Ask Me! <span className="text-lg">👋</span>
            <div className="absolute right-[-6px] top-1/2 -translate-y-1/2 w-0 h-0 border-t-[6px] border-t-transparent border-l-[8px] border-l-white border-b-[6px] border-b-transparent"></div>
          </motion.div>
        )}
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative w-16 h-16 rounded-full flex items-center justify-center shadow-2xl"
          style={{
            background: 'linear-gradient(135deg, #a855f7 0%, #7e22ce 100%)',
            boxShadow: '0 0 0 8px rgba(168, 85, 247, 0.2)'
          }}
        >
          {isOpen ? (
            <X size={28} className="text-white" />
          ) : (
            <svg viewBox="0 0 24 24" fill="white" width="32" height="32">
              <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20ZM12 6L8 9L9.5 13H14.5L16 9L12 6ZM8 15H16L12 18L8 15Z" />
            </svg>
          )}
          {!isOpen && (
            <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-red-500 rounded-full border-2 border-purple-900" />
          )}
        </motion.button>
      </div>
    </>
  );
}
