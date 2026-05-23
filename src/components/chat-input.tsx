"use client";

import { useState, useRef, type KeyboardEvent } from "react";
import { Paperclip, Mic, Send } from "lucide-react";

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
}

export default function ChatInput({ onSend, disabled }: ChatInputProps) {
  const [value, setValue] = useState("");
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const handleSend = () => {
    const trimmed = value.trim();
    if (!trimmed || disabled) return;
    onSend(trimmed);
    setValue("");
    if (inputRef.current) {
      inputRef.current.style.height = "auto";
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleInput = () => {
    if (inputRef.current) {
      inputRef.current.style.height = "auto";
      inputRef.current.style.height = `${Math.min(inputRef.current.scrollHeight, 120)}px`;
    }
  };

  return (
    <div className="px-4 md:px-6 pb-4 pt-2">
      <div className="flex items-end gap-2 bg-input rounded-2xl border border-border px-4 py-2 transition-all focus-within:border-accent/40 focus-within:shadow-[0_0_0_1px_rgba(255,178,140,0.1)]">
        {/* Attach */}
        <button
          className="flex-shrink-0 flex items-center justify-center w-9 h-9 rounded-lg text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
          aria-label="Attach file"
        >
          <Paperclip size={18} strokeWidth={1.5} />
        </button>

        {/* Text area */}
        <textarea
          ref={inputRef}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          onInput={handleInput}
          placeholder="Ask ASTRA anything..."
          rows={1}
          disabled={disabled}
          className="flex-1 bg-transparent text-input-foreground placeholder:text-muted-foreground text-sm resize-none outline-none py-2 max-h-[120px]"
          aria-label="Message input"
        />

        {/* Mic */}
        <button
          className="flex-shrink-0 flex items-center justify-center w-9 h-9 rounded-lg text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
          aria-label="Voice input"
        >
          <Mic size={18} strokeWidth={1.5} />
        </button>

        {/* Send */}
        <button
          onClick={handleSend}
          disabled={!value.trim() || disabled}
          className={`flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-xl transition-all cursor-pointer ${
            value.trim()
              ? "bg-accent text-accent-foreground shadow-md hover:shadow-lg"
              : "bg-accent/20 text-accent/50"
          }`}
          aria-label="Send message"
        >
          <Send size={18} strokeWidth={1.5} />
        </button>
      </div>
    </div>
  );
}
