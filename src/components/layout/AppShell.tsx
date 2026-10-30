'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { MobileNav } from './MobileNav';
import { LevelUpModal } from '../dashboard/LevelUpModal';

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Certain screens like landing page, auth, onboarding, or fullscreen exam don't need the standard dashboard sidebar
  const isLandingPage = pathname === '/';
  const isOnboarding = pathname === '/onboarding';
  const isAuthPage = pathname === '/login' || pathname === '/register' || pathname === '/auth';
  const isFullExam = pathname.startsWith('/mock-exams/') && pathname.split('/').length > 2;

  if (isLandingPage || isOnboarding || isAuthPage) {
    return (
      <div className="min-h-screen bg-[#FBF9F5] dark:bg-[#0B1120] text-stone-900 dark:text-stone-100 flex flex-col">
        {children}
        <LevelUpModal />
      </div>
    );
  }

  if (isFullExam) {
    return (
      <div className="min-h-screen bg-[#F8F9FA] dark:bg-[#0B1120] text-stone-900 dark:text-stone-100 flex flex-col">
        {children}
        <LevelUpModal />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-[#FBF9F5] dark:bg-[#0B1120] text-stone-900 dark:text-stone-100">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0 pb-16 md:pb-6">
        <Header />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto animate-in fade-in duration-300">
          {children}
        </main>
      </div>
      <MobileNav />
      <LevelUpModal />
    </div>
  );
}
