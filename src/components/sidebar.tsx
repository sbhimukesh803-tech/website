"use client";

import { useState } from "react";
import {
  Home,
  MessageSquare,
  Mic,
  History,
  Bookmark,
  Settings,
} from "lucide-react";

interface SidebarProps {
  activeItem: string;
  onItemClick: (item: string) => void;
}

const navItems = [
  { id: "home", icon: Home, label: "Home" },
  { id: "chat", icon: MessageSquare, label: "Chat" },
  { id: "voice", icon: Mic, label: "Voice Mode" },
  { id: "history", icon: History, label: "History" },
  { id: "saved", icon: Bookmark, label: "Saved" },
  { id: "settings", icon: Settings, label: "Settings" },
];

export default function Sidebar({ activeItem, onItemClick }: SidebarProps) {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  return (
    <aside className="hidden md:flex flex-col items-center w-16 lg:w-18 py-6 gap-2 bg-sidebar border-r border-border">
      {/* Logo */}
      <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-accent text-accent-foreground font-bold text-lg mb-4">
        A
      </div>

      {/* Nav icons */}
      <nav className="flex flex-col items-center gap-1 flex-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeItem === item.id;
          const isHovered = hoveredItem === item.id;

          return (
            <button
              key={item.id}
              onClick={() => onItemClick(item.id)}
              onMouseEnter={() => setHoveredItem(item.id)}
              onMouseLeave={() => setHoveredItem(null)}
              className={`relative flex items-center justify-center w-10 h-10 rounded-xl transition-all duration-200 cursor-pointer ${
                isActive
                  ? "bg-sidebar-active text-accent"
                  : "text-muted-foreground hover:bg-sidebar-hover hover:text-foreground"
              }`}
              aria-label={item.label}
              aria-current={isActive ? "page" : undefined}
            >
              <Icon size={20} strokeWidth={1.5} />

              {/* Tooltip */}
              {isHovered && (
                <span className="absolute left-full ml-3 px-2 py-1 rounded-md bg-card text-card-foreground text-xs whitespace-nowrap z-50 animate-fade-in">
                  {item.label}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* User avatar placeholder */}
      <div className="mt-auto">
        <button
          className="flex items-center justify-center w-10 h-10 rounded-full bg-accent/20 text-accent transition-colors hover:bg-accent/30 cursor-pointer"
          aria-label="User profile"
        >
          <span className="text-sm font-medium">U</span>
        </button>
      </div>
    </aside>
  );
}
