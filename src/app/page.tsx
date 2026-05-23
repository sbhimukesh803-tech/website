"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Sidebar from "@/components/sidebar";
import TopBar from "@/components/top-bar";
import ChatMessage, { type Message } from "@/components/chat-message";
import ChatInput from "@/components/chat-input";
import TypingIndicator from "@/components/typing-indicator";
import MobileDrawer from "@/components/mobile-drawer";

const initialMessages: Message[] = [
  {
    id: "1",
    role: "assistant",
    content: "Hello! I'm ASTRA. How can I help you today?",
    timestamp: "10:30 AM",
  },
];

const aiResponses: Record<string, string> = {
  default:
    "I appreciate your question! As an AI assistant, I'm here to help with a wide range of topics. Could you tell me more about what you'd like to know?",
  hello:
    "Hello there! Great to meet you. I'm ASTRA, your personal AI assistant. How can I help you today?",
  "black hole":
    "Black holes are regions in space where gravity is so strong that nothing, not even light, can escape from them. They form when massive stars collapse at the end of their life cycle.",
  "what are you":
    "I'm ASTRA, a personal AI assistant designed to help you with questions, creative tasks, analysis, and much more. Think of me as your intelligent companion for any query.",
  help: "Of course! I can help with many things including answering questions, explaining concepts, creative writing, analysis, coding, and general conversation. Just ask away!",
};

function getAIResponse(userMessage: string): string {
  const lower = userMessage.toLowerCase();
  for (const [key, response] of Object.entries(aiResponses)) {
    if (key !== "default" && lower.includes(key)) {
      return response;
    }
  }
  return aiResponses.default;
}

function formatTime(): string {
  const now = new Date();
  return now.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

export default function Home() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [isTyping, setIsTyping] = useState(false);
  const [activeNav, setActiveNav] = useState("chat");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = useCallback(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, scrollToBottom]);

  const handleSend = (content: string) => {
    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      content,
      timestamp: formatTime(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    // Simulate AI response delay
    setTimeout(() => {
      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: getAIResponse(content),
        timestamp: formatTime(),
      };
      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
    }, 1200 + Math.random() * 800);
  };

  return (
    <div className="flex w-full h-screen overflow-hidden">
      {/* Sidebar - desktop */}
      <Sidebar activeItem={activeNav} onItemClick={setActiveNav} />

      {/* Mobile drawer */}
      <MobileDrawer
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        activeItem={activeNav}
        onItemClick={setActiveNav}
      />

      {/* Main content */}
      <div className="flex flex-col flex-1 min-w-0">
        <TopBar onMenuToggle={() => setDrawerOpen(true)} />

        {/* Chat area */}
        <div
          ref={scrollRef}
          className="flex-1 overflow-y-auto px-4 md:px-6 py-6"
        >
          {/* Date badge */}
          <div className="flex justify-center mb-6">
            <span className="px-3 py-1 rounded-full bg-card text-muted-foreground text-xs font-medium">
              Today
            </span>
          </div>

          {/* Messages */}
          <div className="max-w-3xl mx-auto flex flex-col gap-4">
            {messages.map((msg) => (
              <ChatMessage key={msg.id} message={msg} />
            ))}
            {isTyping && <TypingIndicator />}
          </div>
        </div>

        {/* Input bar */}
        <ChatInput onSend={handleSend} disabled={isTyping} />
      </div>
    </div>
  );
}
