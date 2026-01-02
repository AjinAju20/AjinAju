import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';

const AIChatBot = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Smart responses based on keywords
  const getResponse = (message) => {
    const msg = message.toLowerCase();
    
    // Greetings
    if (msg.match(/^(hi|hello|hey|hii|heyy|yo|sup|hola)/)) {
      const greetings = [
        "Hey there! 👋 I'm Emma, Ajin's super friendly assistant! What would you like to know about him?",
        "Hiii! 💜 Welcome to Ajin's portfolio! I'm Emma - ask me anything about him!",
        "Hey hey! 🎮 So glad you're here! Want to know about Ajin's skills, projects, or how to contact him?",
      ];
      return greetings[Math.floor(Math.random() * greetings.length)];
    }
    
    // Who is Ajin
    if (msg.match(/(who is ajin|about ajin|tell me about|who's ajin|about him)/)) {
      return "Ajin Aju is a talented Lift Technician and passionate Gamer! 🔧🎮 He works with Fujitec elevators and loves exploring new games. Check out the About section for more! He's honestly super cool 😎";
    }
    
    // Skills
    if (msg.match(/(skill|what can|abilities|expertise|good at|technologies|tech stack)/)) {
      return "Ajin's got some awesome skills! 🚀 He's a certified Lift Technician specializing in Fujitec elevators, plus he's an avid gamer who loves FPS and adventure games. Check out the Skills section for the full list!";
    }
    
    // Projects
    if (msg.match(/(project|work|portfolio|built|created|made)/)) {
      return "Ooh, you wanna see the cool stuff? 🔥 Head over to the Projects section - Ajin's got some impressive work there! From technical projects to gaming achievements, it's all pretty neat!";
    }
    
    // Contact
    if (msg.match(/(contact|reach|hire|email|message|connect|talk to ajin|get in touch)/)) {
      return "Want to connect with Ajin? 📧 Head to the Contact section and drop him a message! He'd love to hear from you. You can also find him on Instagram, LinkedIn, and Facebook! 💬";
    }
    
    // Social media
    if (msg.match(/(social|instagram|linkedin|github|facebook|discord)/)) {
      return "You can find Ajin on multiple platforms! 🌐 Instagram: @_ajin_aju_3_, LinkedIn, Facebook, and Discord. Check out the links in the Hero section or footer!";
    }
    
    // Gaming
    if (msg.match(/(game|gaming|play|gamer|esports)/)) {
      return "Ajin is a passionate gamer! 🎮 He loves exploring new games and finding thrills. Gaming is one of his favorite hobbies alongside his career as a lift technician!";
    }
    
    // Job/Work
    if (msg.match(/(job|work|career|profession|lift|elevator|technician|fujitec)/)) {
      return "Ajin works as a Lift Technician! 🛗 He specializes in Fujitec elevators, handling maintenance, upgrades, and safety optimization. He's all about building high-rise structures and keeping things running smoothly!";
    }
    
    // Location
    if (msg.match(/(where|location|from|live|country|place)/)) {
      return "Ajin is based in India! 🇮🇳 He's working hard as a lift technician while pursuing his passion for gaming.";
    }
    
    // Thanks
    if (msg.match(/(thank|thanks|thx|appreciate)/)) {
      const thanks = [
        "You're welcome! 💜 Anything else you'd like to know?",
        "Aww, no problem! 😊 Happy to help! Need anything else?",
        "Anytime, friend! 🌟 Let me know if there's more I can help with!",
      ];
      return thanks[Math.floor(Math.random() * thanks.length)];
    }
    
    // Bye
    if (msg.match(/(bye|goodbye|see you|later|cya|gtg)/)) {
      const byes = [
        "Bye bye! 👋 Thanks for stopping by Ajin's portfolio! Come back soon!",
        "See ya! 💜 Don't forget to check out the Contact section if you want to connect with Ajin!",
        "Take care! 🌟 Hope you enjoyed exploring Ajin's portfolio!",
      ];
      return byes[Math.floor(Math.random() * byes.length)];
    }
    
    // Who are you / Emma
    if (msg.match(/(who are you|your name|emma|what are you)/)) {
      return "I'm Emma! 💜 Ajin's virtual assistant here to help you navigate his portfolio. I can tell you about his skills, projects, or how to contact him. What would you like to know?";
    }
    
    // How are you
    if (msg.match(/(how are you|how's it going|what's up|how do you do)/)) {
      return "I'm doing great, thanks for asking! 😊 Always happy to chat with visitors. What can I help you with today?";
    }
    
    // Help
    if (msg.match(/(help|what can you do|options|menu)/)) {
      return "I can help you with: \n\n• 👤 Info about Ajin\n• 💼 His skills & expertise\n• 🚀 Projects he's worked on\n• 📧 How to contact him\n• 🌐 Social media links\n\nJust ask away!";
    }
    
    // Compliments
    if (msg.match(/(awesome|cool|nice|great|amazing|love)/)) {
      return "Aww, you're too kind! 🥰 Ajin would be thrilled to hear that! Don't forget to drop him a message in the Contact section!";
    }
    
    // Default responses
    const defaults = [
      "Hmm, I'm not sure about that one! 🤔 But I can tell you about Ajin's skills, projects, or how to contact him. What interests you?",
      "Ooh, that's a tricky one! 😅 Try asking me about Ajin's work, skills, or how to reach him!",
      "I might need a bit more context! 💭 I'm best at answering questions about Ajin - his projects, skills, career, or contact info. What would you like to know?",
      "Not quite sure what you mean, but hey! 👋 Ask me about Ajin's portfolio, skills, or how to get in touch with him!",
    ];
    return defaults[Math.floor(Math.random() * defaults.length)];
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage = inputValue.trim();
    setInputValue('');
    
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    // Simulate typing delay for natural feel
    setTimeout(() => {
      const response = getResponse(userMessage);
      setMessages(prev => [...prev, { role: 'assistant', content: response }]);
      setIsLoading(false);
    }, 500 + Math.random() * 500);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

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
              <span className="text-xs text-green-400">● Online</span>
            </div>
            <button onClick={() => setIsExpanded(false)} className="text-gray-400 hover:text-white transition-colors" aria-label="Close chat">
              <X size={20} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.length === 0 && (
              <div className="text-center text-gray-400 mt-8 space-y-2">
                <p className="text-lg">👋 Hey there!</p>
                <p>I'm Emma, Ajin's assistant.</p>
                <p className="text-sm text-gray-500">Ask me about his skills, projects, or how to contact him!</p>
              </div>
            )}
            {messages.map((msg, index) => (
              <div key={index} className={"flex " + (msg.role === "user" ? "justify-end" : "justify-start")}>
                <div className={"max-w-[80%] p-3 rounded-lg whitespace-pre-line " + (msg.role === "user" ? "bg-blue-600 text-white" : "bg-gray-800 text-gray-200")}>
                  {msg.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-800 text-gray-200 p-3 rounded-lg">
                  <span className="animate-pulse">Emma is typing...</span>
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
