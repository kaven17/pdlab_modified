import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Send } from 'lucide-react';

export const AIAssistant: React.FC = () => {
  const [messages, setMessages] = useState<{ text: string; isUser: boolean }[]>([]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, { text: input, isUser: true }]);
      // Simulate AI response (replace with actual AI integration in a real app)
      setTimeout(() => {
        setMessages(prev => [...prev, { text: `AI response to: ${input}`, isUser: false }]);
      }, 1000);
      setInput('');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="glass-morphism p-6 rounded-lg"
    >
      <h3 className="text-xl font-semibold mb-4 text-secondary flex items-center">
        <MessageSquare className="w-6 h-6 mr-2" />
        AI Assistant
      </h3>
      <div className="h-64 overflow-y-auto mb-4 space-y-2">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`p-2 rounded-lg ${
              message.isUser ? 'bg-secondary text-white ml-auto' : 'bg-surface text-text'
            } max-w-3/4 ${message.isUser ? 'ml-auto' : 'mr-auto'}`}
          >
            {message.text}
          </div>
        ))}
      </div>
      <div className="flex">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-grow rounded-l-md bg-surface border-transparent focus:border-secondary focus:ring-0 text-text"
          placeholder="Ask the AI assistant..."
        />
        <button
          onClick={handleSend}
          className="bg-secondary text-white rounded-r-md px-4 py-2 flex items-center"
        >
          <Send className="w-4 h-4 mr-2" />
          Send
        </button>
      </div>
    </motion.div>
  );
};