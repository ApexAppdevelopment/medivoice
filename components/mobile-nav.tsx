"use client";

import { List, Mic, Upload, Settings, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export function MobileNav() {
  const router = useRouter();
  
  const navItems = [
    { icon: List, label: "Scribes", path: "/scribes" },
    { icon: Mic, label: "Voice", path: "/voice-assistant" },
    { icon: Upload, label: "Upload", path: "/upload" },
    { icon: Settings, label: "Settings", path: "/settings" },
    { icon: Info, label: "Info", path: "/info" },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-background border-t flex justify-around items-center">
      {navItems.map((item) => (
        <Button
          key={item.label}
          variant="ghost"
          size="icon"
          className="h-12"
          title={item.label}
          onClick={() => router.push(item.path)}
        >
          <item.icon className="h-5 w-5" />
        </Button>
      ))}
    </nav>
  );
}