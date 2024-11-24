"use client";

import { Header } from "@/components/header";
import { Sidebar } from "@/components/sidebar";
import { MobileNav } from "@/components/mobile-nav";
import { RecordingPanel } from "@/components/recording-panel";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="flex pt-16">
        <Sidebar />
        <main className="flex-1 md:ml-16 p-4">
          <RecordingPanel />
        </main>
      </div>
      <MobileNav />
    </div>
  );
}