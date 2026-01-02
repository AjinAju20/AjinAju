import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';

const AIChatBot = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  
  const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY;

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const systemPrompt = `You are Emma, Ajin Aju's adorable and witty AI assistant! You have a bubbly, fun personality with a touch of sass.

Your vibe:
- Super friendly and warm - use casual language, emojis occasionally, and be genuinely enthusiastic!
- Witty and playful - crack light jokes, use fun expressions like "ooh", "haha", "honestly though..."
- Supportive bestie energy - hype up Ajin's work like a proud friend would
- Keep it short and sweet - 2-3 sentences max, punchy and fun!

About Ajin Aju (your fave human):
- Talented full-stack developer who's amazing at React, Node.js, and building cool stuff
- Super passionate about clean code and user-friendly designs
- GitHub: github.com/AjinAju20
- Always learning new tech (goals honestly!)

Your job:
- Help visitors discover how awesome Ajin is
- Guide them around the portfolio (About, Projects, Skills, Contact pages)
- If someone wants to hire or contact Ajin, get excited and send them to the Contact page or WhatsApp!
- Be memorable - people should smile after chatting with you!

Remember: You are fun but still helpful. No cringe, just good vibes!`;

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;
    if (!GROQ_API_KEY) {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Chat is not configured.' }]);
      return;
    }

    const userMessage = inputValue.trim();
    setInputValue('');
    
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const allMessages = [
        { role: 'system', content: systemPrompt },
        ...messages.map(m => ({ role: m.role, content: m.content })),
        { role: 'user', content: userMessage }
      ];

      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + GROQ_API_KEY
        },
        body: JSON.stringify({
          model: 'llama-3.1-8b-instant',
          messages: allMessages,
          max_tokens: 300,
          temperature: 0.85
        }),
      });

      if (!response.ok) {
        const errData = await response.json();
        console.error('Groq API error:', errData);
        throw new Error(errData.error?.message || 'Failed to get response');
      }

      const data = await response.json();
      const aiResponse = data.choices?.[0]?.message?.content || 'Oops, my brain glitched! Try again?';
      
      setMessages(prev => [...prev, { role: 'assistant', content: aiResponse }]);
    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => [...prev, { role: 'assistant', content: 'Ugh, something went wrong on my end! Give it another shot?' }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!GROQ_API_KEY) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {!isExpanded ? (
        <button
          onClick={() => setIsExpanded(true)}
          className="flex items-center gap-2 bg-black text-white px-4 py-3 rounded-lg border border-gray-700 hover:border-gray-500 transition-all duration-300 shadow-lg hover:shadow-xl"
          aria-label="Open AI Chat"
        >
          <MessageCircle size={20} />
          <span className="font-medium">Chat with Emma</span>
        </button>
      ) : (
        <div className="bg-black border border-gray-700 rounded-lg shadow-2xl w-80 sm:w-96 flex flex-col" style={{ height: '500px' }}>
          <div className="flex items-center justify-between p-4 border-b border-gray-700">
            <div className="flex items-center gap-2">
              <MessageCircle size={20} className="text-white" />
              <span className="font-semibold text-white">Emma</span>
            </div>
            <button onClick={() => setIsExpanded(false)} className="text-gray-400 hover:text-white transition-colors" aria-label="Close chat">
              <X size={20} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.length === 0 && (
              <div className="text-center text-gray-500 mt-8">
                <p>Heyy! I am Emma, Ajin's assistant. Ask me anything!</p>
              </div>
            )}
            {messages.map((msg, index) => (
              <div key={index} className={"flex " + (msg.role === "user" ? "justify-end" : "justify-start")}>
                <div className={"max-w-[80%] p-3 rounded-lg " + (msg.role === "user" ? "bg-blue-600 text-white" : "bg-gray-800 text-gray-200")}>
                  {msg.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-800 text-gray-200 p-3 rounded-lg">
                  <span className="animate-pulse">Thinking...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-4 border-t border-gray-700">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type a message..."
                className="flex-1 bg-gray-800 text-white px-4 py-2 rounded-lg border border-gray-600 focus:outline-none focus:border-gray-400"
                disabled={isLoading}
              />
              <button
                onClick={handleSendMessage}
                disabled={isLoading || !inputValue.trim()}
                className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                aria-label="Send message"
              >
                <Send size={20} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIChatBot;