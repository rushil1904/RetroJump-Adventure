import React, { useState } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';

const ChatAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Welcome to RetroJump Adventure! How can I help you with the game?", sender: 'bot' }
  ]);
  const [input, setInput] = useState('');
  const [isMinimized, setIsMinimized] = useState(false);
  const [quickReplies, setQuickReplies] = useState([
    "How do I move?",
    "Tell me about the characters",
    "What's the storyline?",
    "Any special features?"
  ]);

  const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

  const gameContext = `
You are an AI assistant for the RetroJump Adventure game. This game is a 2D platformer with the following details:
- Controls: 'W' for jump, 'A' for left movement, 'D' for right movement
- Characters: The main character is a customized sprite navigating through various obstacles and enjoying power-ups
- Storyline: The game follows the 23-year life journey of the main character, encountering friends and overcoming obstacles
- Gameplay: Players interact with objects, collect power-ups, and overcome challenges
- Special features: Unique messages appear on interaction with objects, and reloading the page can show different message permutations
- Browser compatibility: Works best on Chrome/Chromium-based desktop browsers
- Unique aspect: The game is a personalized adventure celebrating someone's life journey

Please answer any questions about the game based on this information. If asked about details not provided here, politely state that you don't have that specific information.
`;

const handleSend = async () => {
    if (!input.trim()) return;
  
    const userMessage = { text: input, sender: 'user' };
    setMessages([...messages, userMessage]);
    setInput('');
  
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-pro"});
      const prompt = `${gameContext}\n\nUser: ${input}\nAssistant:`;
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = await response.text();
      
      setMessages(prev => [...prev, { text, sender: 'bot' }]);
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [...prev, { text: 'Sorry, I encountered an error.', sender: 'bot' }]);
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-gray-800 text-white rounded-full p-4 shadow-lg hover:bg-gray-900" // Darkened button
        >
          Chat
        </button>
      )}
      {isOpen && (
        <div className={`bg-white rounded-lg shadow-xl ${isMinimized ? 'w-60' : 'w-80 h-136'} flex flex-col transition-all duration-300`}>
          <div className="p-4 flex justify-between items-center" style={{ backgroundColor: '#804dee' }}> {/* Background color updated */}
            <h3 className="text-lg font-semibold text-white">RetroJump Assistant</h3> {/* White text */}
            <div>
              <button onClick={() => setIsMinimized(!isMinimized)} className="mr-2 text-white hover:text-gray-200">
                {isMinimized ? '□' : '−'}
              </button>
              <button onClick={() => setIsOpen(false)} className="text-white hover:text-gray-200">&times;</button>
            </div>
          </div>
          {!isMinimized && (
            <>
              <div className="flex-1 overflow-y-auto p-4 max-h-[calc(30rem-8rem)]">
                {messages.map((message, index) => (
                  <div key={index} className={`mb-2 ${message.sender === 'user' ? 'text-right' : 'text-left'}`}>
                    <span className={`inline-block p-2 rounded-lg ${
                      message.sender === 'user' 
                        ? 'bg-blue-600 text-white' // Darkened user message background
                        : 'bg-gray-300 text-black'
                    }`}>
                      {message.text}
                    </span>
                  </div>
                ))}
              </div>
              <div className="p-4 border-t">
                <div className="flex flex-wrap gap-2 mb-2">
                  {quickReplies.map((reply, index) => (
                    <button 
                      key={index}
                      onClick={() => setInput(reply)}
                      className="bg-gray-700 text-white px-2 py-1 rounded text-sm hover:bg-gray-900" // Darkened quick reply button
                    >
                      {reply}
                    </button>
                  ))}
                </div>
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Type your message..."
                  className="w-full p-2 border rounded"
                />
                <button onClick={handleSend} className="mt-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Send</button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default ChatAssistant;
