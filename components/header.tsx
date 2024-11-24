"use client";

import { UserCircle } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-background border-b flex justify-between items-center px-5 z-50">
      <div className="text-xl font-bold">Daisy Medic</div>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <UserCircle className="h-8 w-8" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem>Profile</DropdownMenuItem>
          <DropdownMenuItem>Logout</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}