import { Send, Bot, User, X } from "lucide-react";
import React, { useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";

const ChatBot = ({ setIsOpen }) => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm your AI assistant. How can I help you today?",
      sender: "bot",
      timestamp: new Date().toLocaleTimeString(),
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (input.trim() === "") return;

    const userMsg = {
      id: messages.length + 1,
      text: input,
      sender: "user",
      timestamp: new Date().toLocaleTimeString(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await axios.post("http://127.0.0.1:5000/api/gemini-chat", {
        message: input,
      });

      const botMsg = {
        id: messages.length + 2,
        text: res.data.reply,
        sender: "bot",
        timestamp: new Date().toLocaleTimeString(),
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          id: messages.length + 2,
          text: "Oops! Error talking to AI 😢",
          sender: "bot",
          timestamp: new Date().toLocaleTimeString(),
        },
      ]);
    }

    setLoading(false);
  };

  return (
    <motion.div
      key="chatbot"
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 500 }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="fixed bottom-10 right-10 w-96 h-[500px] rounded-lg bg-white border border-slate-300 shadow-xl flex flex-col"
    >
      {/* Header */}
      <div className="bg-slate-700 text-white p-4 rounded-t-lg flex items-center justify-between space-x-2">
        <div className="flex items-center">
          <Bot className="w-6 h-6" />
          <h2 className="text-lg font-semibold ml-2">AI Assistant</h2>
        </div>
        <button
          onClick={() => setIsOpen(false)}
          className="p-1 rounded-full hover:bg-slate-900 duration-100 cursor-pointer"
        >
          <X />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-xs px-4 py-2 rounded-lg text-sm ${
                message.sender === "user"
                  ? "bg-slate-600 text-white"
                  : "bg-white border border-slate-200"
              }`}
            >
              <div className="flex items-start space-x-2">
                {message.sender === "bot" ? (
                  <Bot className="w-4 h-4 mt-1 text-slate-600" />
                ) : (
                  <User className="w-4 h-4 mt-1" />
                )}
                <div>
                  <p>{message.text}</p>
                  <p
                    className={`text-xs mt-1 ${
                      message.sender === "user"
                        ? "text-slate-200"
                        : "text-slate-500"
                    }`}
                  >
                    {message.timestamp}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
        {loading && (
          <p className="text-sm text-slate-500 italic">AI is typing...</p>
        )}
      </div>

      {/* Input Area */}
      <div className="border-t border-slate-200 p-4 bg-white rounded-b-lg">
        <div className="flex space-x-2">
          <textarea
            placeholder="Type your message..."
            className="flex-1 border border-slate-300 rounded-lg px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-slate-500"
            rows="1"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && sendMessage()}
          />
          <button
            className="bg-slate-600 text-white p-2 rounded-lg"
            onClick={sendMessage}
            disabled={loading}
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ChatBot;
