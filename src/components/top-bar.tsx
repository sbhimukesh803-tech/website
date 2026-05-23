"use client";

import { Mic, Sun, Moon, Menu } from "lucide-react";
import { useState } from "react";

interface TopBarProps {
  onMenuToggle: () => void;
}

export default function TopBar({ onMenuToggle }: TopBarProps) {
  const [isDark, setIsDark] = useState(true);

  return (
    <header className="flex items-center justify-between px-4 md:px-6 h-16 border-b border-border bg-background/80 backdrop-blur-sm">
      {/* Mobile menu button */}
      <button
        onClick={onMenuToggle}
        className="md:hidden flex items-center justify-center w-9 h-9 rounded-lg text-muted-foreground hover:text-foreground hover:bg-sidebar-hover transition-colors cursor-pointer"
        aria-label="Toggle menu"
      >
        <Menu size={20} strokeWidth={1.5} />
      </button>

      {/* Brand */}
      <div className="flex items-center gap-2">
        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-accent text-accent-foreground font-bold text-sm">
          A
        </div>
        <h1 className="text-foreground font-semibold tracking-tight text-lg">
          ASTRA.AI
        </h1>
      </div>

      {/* Right controls */}
      <div className="flex items-center gap-1">
        <button
          className="flex items-center justify-center w-9 h-9 rounded-lg text-muted-foreground hover:text-foreground hover:bg-sidebar-hover transition-colors cursor-pointer"
          aria-label="Voice mode"
        >
          <Mic size={18} strokeWidth={1.5} />
        </button>
        <button
          onClick={() => setIsDark(!isDark)}
          className="flex items-center justify-center w-9 h-9 rounded-lg text-muted-foreground hover:text-foreground hover:bg-sidebar-hover transition-colors cursor-pointer"
          aria-label="Toggle theme"
        >
          {isDark ? (
            <Sun size={18} strokeWidth={1.5} />
          ) : (
            <Moon size={18} strokeWidth={1.5} />
          )}
        </button>
      </div>
    </header>
  );
}
