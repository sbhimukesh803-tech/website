"use client";

import {
  Home,
  MessageSquare,
  Mic,
  History,
  Bookmark,
  Settings,
  X,
} from "lucide-react";

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
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

export default function MobileDrawer({
  isOpen,
  onClose,
  activeItem,
  onItemClick,
}: MobileDrawerProps) {
  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/50 z-40 md:hidden"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div className="fixed inset-y-0 left-0 w-64 bg-sidebar border-r border-border z-50 md:hidden animate-fade-in">
        <div className="flex items-center justify-between p-4 border-b border-border">
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-accent text-accent-foreground font-bold text-sm">
              A
            </div>
            <span className="font-semibold text-foreground">ASTRA.AI</span>
          </div>
          <button
            onClick={onClose}
            className="flex items-center justify-center w-8 h-8 rounded-lg text-muted-foreground hover:text-foreground hover:bg-sidebar-hover transition-colors cursor-pointer"
            aria-label="Close menu"
          >
            <X size={18} />
          </button>
        </div>

        <nav className="flex flex-col p-2 gap-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeItem === item.id;

            return (
              <button
                key={item.id}
                onClick={() => {
                  onItemClick(item.id);
                  onClose();
                }}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all cursor-pointer ${
                  isActive
                    ? "bg-sidebar-active text-accent font-medium"
                    : "text-muted-foreground hover:bg-sidebar-hover hover:text-foreground"
                }`}
              >
                <Icon size={18} strokeWidth={1.5} />
                {item.label}
              </button>
            );
          })}
        </nav>
      </div>
    </>
  );
}
