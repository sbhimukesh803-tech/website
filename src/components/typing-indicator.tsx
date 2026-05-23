"use client";

export default function TypingIndicator() {
  return (
    <div className="flex justify-start animate-fade-in">
      <div className="flex-shrink-0 mr-3 mt-1">
        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-accent/20 text-accent text-xs font-bold">
          A
        </div>
      </div>
      <div className="bg-ai-bubble rounded-2xl rounded-bl-md px-5 py-4">
        <div className="flex items-center gap-1.5">
          <span className="block w-2 h-2 rounded-full bg-typing-dot animate-typing-1" />
          <span className="block w-2 h-2 rounded-full bg-typing-dot animate-typing-2" />
          <span className="block w-2 h-2 rounded-full bg-typing-dot animate-typing-3" />
        </div>
      </div>
    </div>
  );
}
