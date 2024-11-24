"use client";

import { Home, Mic, Upload, Settings, Info } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Sidebar() {
  const navItems = [
    { icon: Home, label: "Home" },
    { icon: Mic, label: "Record" },
    { icon: Upload, label: "Upload" },
    { icon: Settings, label: "Settings" },
    { icon: Info, label: "Info" },
  ];

  return (
    <nav className="hidden md:flex flex-col fixed top-16 left-0 w-16 h-[calc(100vh-4rem)] bg-background border-r">
      {navItems.map((item) => (
        <Button
          key={item.label}
          variant="ghost"
          size="icon"
          className="h-16 rounded-none"
          title={item.label}
        >
          <item.icon className="h-5 w-5" />
        </Button>
      ))}
    </nav>
  );
}