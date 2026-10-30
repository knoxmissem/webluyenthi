'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import { Home, Dumbbell, Sparkles, FileCheck2, Settings } from 'lucide-react';

export function MobileNav() {
  const pathname = usePathname();
  const { t } = useLanguage();

  const navItems = [
    { label: t('Trang chủ', 'Home'), href: '/dashboard', icon: Home },
    { label: t('Từ vựng', 'Vocab'), href: '/flashcards', icon: Sparkles },
    { label: t('Luyện thi', 'Practice'), href: '/practice', icon: Dumbbell },
    { label: t('Thi thử', 'Exams'), href: '/mock-exams', icon: FileCheck2 },
    { label: t('Cài đặt', 'Settings'), href: '/settings', icon: Settings },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-[#E8E3D7] dark:border-slate-800 px-2 py-2 flex items-center justify-around shadow-lg">
      {navItems.map((item) => {
        const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href));
        const Icon = item.icon;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition text-[11px] font-bold ${
              isActive
                ? 'text-indigo-600 dark:text-indigo-400'
                : 'text-stone-500 dark:text-stone-400 hover:text-stone-800 dark:hover:text-stone-200'
            }`}
          >
            <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.5]' : 'stroke-2'}`} />
            <span>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
