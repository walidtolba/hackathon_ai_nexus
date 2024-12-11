import React, { useState, useRef, useEffect } from "react";
import { FaPaperPlane, FaRobot, FaTimes, FaMinus } from "react-icons/fa";
import { useTheme } from "../context/ThemeContext";
import axios from "../axios";

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const messagesEndRef = useRef(null);
  const { darkMode } = useTheme();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const userMessage = {
      text: inputMessage,
      sender: "user",
      timestamp: new Date().toLocaleTimeString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");
    setIsLoading(true);

    try {
      // Replace with your actual API endpoint
      const response = await axios.post("/hr/chatbot/", {
        text: inputMessage,
      });

      const botMessage = {
        text: response.data.message,
        sender: "bot",
        timestamp: new Date().toLocaleTimeString(),
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error sending message:", error);
      const errorMessage = {
        text: "Sorry, I encountered an error. Please try again.",
        sender: "bot",
        timestamp: new Date().toLocaleTimeString(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
    setIsMinimized(false);
  };

  const toggleMinimize = (e) => {
    e.stopPropagation();
    setIsMinimized(!isMinimized);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Chat Button */}
      {!isOpen && (
        <button
          onClick={toggleChat}
          className={`flex items-center justify-center w-14 h-14 rounded-full shadow-lg ${
            darkMode
              ? "bg-blue-600 hover:bg-blue-700"
              : "bg-blue-500 hover:bg-blue-600"
          } text-white transition-all duration-200 transform hover:scale-105`}
        >
          <FaRobot className="w-6 h-6" />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div
          className={`${
            isMinimized ? "h-14" : "h-[500px]"
          } w-[350px] flex flex-col rounded-lg shadow-xl transition-all duration-300 ${
            darkMode ? "bg-gray-800" : "bg-white"
          }`}
        >
          {/* Chat Header */}
          <div
            className={`flex items-center justify-between p-4 border-b ${
              darkMode
                ? "border-gray-700 bg-gray-900"
                : "border-gray-200 bg-gray-50"
            } rounded-t-lg cursor-pointer`}
            onClick={toggleMinimize}
          >
            <div className="flex items-center space-x-2">
              <FaRobot className={darkMode ? "text-white" : "text-gray-800"} />
              <h2
                className={`text-lg font-semibold ${
                  darkMode ? "text-white" : "text-gray-800"
                }`}
              >
                AI Assistant
              </h2>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={toggleMinimize}
                className={`p-1 rounded hover:bg-gray-200 ${
                  darkMode ? "text-gray-300 hover:bg-gray-700" : "text-gray-600"
                }`}
              >
                <FaMinus />
              </button>
              <button
                onClick={toggleChat}
                className={`p-1 rounded hover:bg-gray-200 ${
                  darkMode ? "text-gray-300 hover:bg-gray-700" : "text-gray-600"
                }`}
              >
                <FaTimes />
              </button>
            </div>
          </div>

          {!isMinimized && (
            <>
              {/* Messages Container */}
              <div className="flex-1 p-4 overflow-y-auto">
                {messages?.map((message, index) => (
                  <div
                    key={index}
                    className={`flex ${
                      message.sender === "user"
                        ? "justify-end"
                        : "justify-start"
                    } mb-4`}
                  >
                    <div
                      className={`max-w-[70%] p-3 rounded-lg ${
                        message.sender === "user"
                          ? darkMode
                            ? "bg-blue-600 text-white"
                            : "bg-blue-500 text-white"
                          : darkMode
                          ? "bg-gray-700 text-white"
                          : "bg-gray-200 text-gray-800"
                      }`}
                    >
                      <p className="text-sm">{message.text}</p>
                      <span
                        className={`text-xs ${
                          darkMode ? "text-gray-300" : "text-gray-600"
                        }`}
                      >
                        {message?.timestamp}
                      </span>
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start mb-4">
                    <div
                      className={`max-w-[70%] p-3 rounded-lg ${
                        darkMode ? "bg-gray-700" : "bg-gray-200"
                      }`}
                    >
                      <div className="flex space-x-2">
                        <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"></div>
                        <div
                          className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                          style={{ animationDelay: "0.2s" }}
                        ></div>
                        <div
                          className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                          style={{ animationDelay: "0.4s" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input Form */}
              <form
                onSubmit={handleSendMessage}
                className="p-4 border-t border-gray-200"
              >
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    placeholder="Type your message..."
                    className={`flex-1 p-2 rounded-lg border ${
                      darkMode
                        ? "bg-gray-700 border-gray-600 text-white"
                        : "bg-white border-gray-300 text-gray-900"
                    } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  />
                  <button
                    type="submit"
                    disabled={isLoading}
                    className={`px-4 py-2 rounded-lg ${
                      darkMode
                        ? "bg-blue-600 hover:bg-blue-700"
                        : "bg-blue-500 hover:bg-blue-600"
                    } text-white transition-colors duration-200`}
                  >
                    <FaPaperPlane />
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Chatbot;
