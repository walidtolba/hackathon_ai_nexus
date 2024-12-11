import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import Chatbot from '../../components/Chatbot';

const ChatbotPage = () => {
  const { darkMode } = useTheme();

  return (
    <div className={`min-h-screen p-6 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="max-w-4xl mx-auto">
        <h1 className={`text-2xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          AI Assistant
        </h1>
        <Chatbot />
      </div>
    </div>
  );
};

export default ChatbotPage;
