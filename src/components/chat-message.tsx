"use client";

import { Check, CheckCheck } from "lucide-react";

export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

interface ChatMessageProps {
  message: Message;
}

export default function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === "user";

  return (
    <div
      className={`flex w-full animate-fade-in ${
        isUser ? "justify-end" : "justify-start"
      }`}
    >
      {/* AI avatar */}
      {!isUser && (
        <div className="flex-shrink-0 mr-3 mt-1">
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-accent/20 text-accent text-xs font-bold">
            A
          </div>
        </div>
      )}

      <div
        className={`max-w-[80%] md:max-w-[70%] ${
          isUser ? "items-end" : "items-start"
        }`}
      >
        <div
          className={`px-4 py-3 rounded-2xl ${
            isUser
              ? "bg-user-bubble text-user-bubble-foreground rounded-br-md"
              : "bg-ai-bubble text-ai-bubble-foreground rounded-bl-md"
          }`}
        >
          <p className="text-sm leading-relaxed">{message.content}</p>
        </div>

        {/* Timestamp + read receipt */}
        <div
          className={`flex items-center gap-1 mt-1 px-1 ${
            isUser ? "justify-end" : "justify-start"
          }`}
        >
          <span className="text-xs text-muted-foreground">
            {message.timestamp}
          </span>
          {isUser && (
            <CheckCheck
              size={14}
              className="text-accent"
              aria-label="Message read"
            />
          )}
        </div>
      </div>
    </div>
  );
}
