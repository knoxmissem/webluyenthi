import type { Metadata } from 'next';
import { Suspense } from 'react';
import { Inter } from 'next/font/google';
import './globals.css';
import { LanguageProvider } from '@/context/LanguageContext';
import { LearnerProvider } from '@/context/LearnerContext';
import { ThemeProvider } from '@/context/ThemeContext';
import { AppShell } from '@/components/layout/AppShell';

const inter = Inter({
  subsets: ['latin', 'vietnamese'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'LINGORA — Nền Tảng Học Luyện Thi IELTS & HSK Gamified',
  description: 'Học luyện thi IELTS và HSK thông minh với lộ trình cá nhân hóa, thi thử thực tế, sổ tay lỗi sai và bản đồ học tập gamified.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" suppressHydrationWarning className={`${inter.variable} font-sans`}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function() {
              try {
                var stored = localStorage.getItem('lingora-theme');
                var systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                var isDark = stored === 'dark' || (stored !== 'light' && systemDark);
                if (isDark) {
                  document.documentElement.classList.add('dark');
                  document.documentElement.setAttribute('data-theme', 'dark');
                  document.documentElement.style.colorScheme = 'dark';
                } else {
                  document.documentElement.classList.remove('dark');
                  document.documentElement.setAttribute('data-theme', 'light');
                  document.documentElement.style.colorScheme = 'light';
                }
              } catch(e) {}
            })();`
          }}
        />
      </head>
      <body className="min-h-screen antialiased selection:bg-indigo-500 selection:text-white">
        <ThemeProvider>
          <LanguageProvider>
            <LearnerProvider>
              <Suspense fallback={<div className="min-h-screen bg-[#FBF9F5] dark:bg-[#0B1120]" />}>
                <AppShell>{children}</AppShell>
              </Suspense>
            </LearnerProvider>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
