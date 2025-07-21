import { Bot } from "lucide-react";
import React from "react";
import { motion } from "framer-motion";

const ChatIcon = ({ setIsOpen }) => {
  return (
    <div
      onClick={() => setIsOpen(true)}
      className="w-20 h-20 rounded-full fixed bottom-10 right-10 bg-slate-900 cursor-pointer
    text-white flex items-center justify-center hover:scale-[1.05] duration-200"
    >
      <Bot size={34} />
    </div>
  );
};

export default ChatIcon;
