'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useLearner } from '@/context/LearnerContext';
import { useLanguage } from '@/context/LanguageContext';
import {
  Compass,
  ArrowRight,
  ArrowLeft,
  Mail,
  Lock,
  User,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  Eye,
  EyeOff,
  Flame,
  Award,
  Globe
} from 'lucide-react';

function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialMode = searchParams.get('mode') === 'register' ? 'register' : 'login';

  const { loginWithGoogle, loginWithEmail, playAudioCue, profile, currentUser } = useLearner();
  const { t } = useLanguage();

  const [mode, setMode] = useState<'login' | 'register'>(initialMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // If already logged in and onboarding done, redirect to dashboard
  useEffect(() => {
    if (currentUser?.email && profile.hasCompletedOnboarding) {
      router.push('/dashboard');
    }
  }, [currentUser, profile.hasCompletedOnboarding, router]);

  const presetAccounts = [
    {
      name: 'DucAnh Nguyen',
      email: 'ducanh.ielts@gmail.com',
      avatar: '🦁',
      badge: 'IELTS Band 7.5'
    },
    {
      name: 'Linh Tran',
      email: 'linh.hsk5@gmail.com',
      avatar: '🐼',
      badge: 'HSK 5 Target'
    }
  ];

  const handlePostAuthRedirect = (hasCompletedOnboarding: boolean) => {
    setIsSuccess(true);
    playAudioCue('level_up');
    setTimeout(() => {
      if (!hasCompletedOnboarding) {
        router.push('/onboarding');
      } else {
        router.push('/dashboard');
      }
    }, 900);
  };

  const handleGoogleAuth = async (targetEmail: string, targetName?: string) => {
    setIsSubmitting(true);
    setErrorMessage('');
    playAudioCue('click');

    try {
      const res = await loginWithGoogle(targetEmail, targetName);
      if (res && res.success) {
        handlePostAuthRedirect(res.hasCompletedOnboarding);
      } else {
        setErrorMessage(res.error || 'Đăng nhập Google không thành công.');
      }
    } catch {
      setErrorMessage('Đã xảy ra lỗi kết nối. Vui lòng thử lại.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setErrorMessage('Vui lòng nhập địa chỉ email hợp lệ.');
      return;
    }
    if (!password || password.length < 6) {
      setErrorMessage('Mật khẩu cần tối thiểu 6 ký tự.');
      return;
    }
    if (mode === 'register' && !name.trim()) {
      setErrorMessage('Vui lòng nhập họ và tên của bạn.');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage('');
    playAudioCue('click');

    try {
      const res = await loginWithEmail(email, password, name, mode === 'register');
      if (res && res.success) {
        handlePostAuthRedirect(res.hasCompletedOnboarding);
      } else {
        setErrorMessage(res.error || 'Xác thực tài khoản thất bại.');
      }
    } catch {
      setErrorMessage('Đã xảy ra sự cố mạng. Vui lòng thử lại.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FBF9F5] dark:bg-[#0B1120] text-stone-900 dark:text-stone-100 flex flex-col justify-between">
      {/* Top Bar */}
      <header className="px-6 lg:px-12 py-5 border-b border-[#E8E3D7] dark:border-slate-800 bg-white/70 dark:bg-slate-900/70 backdrop-blur-md flex items-center justify-between">
        <Link href="/" className="inline-flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-2xl bg-indigo-600 flex items-center justify-center text-white shadow-md shadow-indigo-500/25 group-hover:scale-105 transition">
            <Compass className="w-5 h-5" />
          </div>
          <div>
            <span className="font-black text-lg tracking-tight bg-gradient-to-r from-indigo-600 to-cyan-600 bg-clip-text text-transparent">
              LINGORA
            </span>
            <span className="hidden sm:inline-block ml-2 text-[10px] font-bold text-stone-400 uppercase tracking-widest">
              IELTS & HSK
            </span>
          </div>
        </Link>

        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-stone-500 hover:text-indigo-600 dark:text-stone-400 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{t('Quay lại trang chủ', 'Back to Home')}</span>
        </Link>
      </header>

      {/* Main Container */}
      <main className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-10">
        <div className="w-full max-w-4xl grid grid-cols-1 lg:grid-cols-12 gap-8 bg-white dark:bg-slate-900 border-2 border-stone-200 dark:border-slate-800 rounded-3xl shadow-xl overflow-hidden">
          
          {/* Left Hero Sidebar (Visual & Benefits) */}
          <div className="lg:col-span-5 bg-gradient-to-br from-indigo-600 via-indigo-700 to-blue-800 text-white p-8 flex flex-col justify-between relative overflow-hidden">
            <div className="absolute -top-10 -right-10 w-44 h-44 bg-cyan-400/20 rounded-full blur-2xl" />
            <div className="absolute -bottom-10 -left-10 w-44 h-44 bg-indigo-400/20 rounded-full blur-2xl" />

            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-cyan-200 text-xs font-extrabold mb-6 border border-white/15">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Gamified IELTS & HSK</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-black leading-tight tracking-tight mb-4">
                Bắt đầu hành trình chinh phục song ngữ.
              </h2>
              <p className="text-xs sm:text-sm text-indigo-100/90 leading-relaxed mb-6">
                Tài khoản của bạn sẽ tự động lưu lại toàn bộ tiến độ, điểm XP, chuỗi ngày streak và sổ tay lỗi sai trên máy chủ đám mây.
              </p>

              <div className="space-y-3.5 text-xs text-indigo-100 font-semibold">
                <div className="flex items-center gap-2.5">
                  <div className="w-6 h-6 rounded-lg bg-white/15 flex items-center justify-center shrink-0">
                    <Flame className="w-3.5 h-3.5 text-amber-300 fill-amber-300" />
                  </div>
                  <span>Hải trình vô tận mở khóa từng trạm gamified</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <div className="w-6 h-6 rounded-lg bg-white/15 flex items-center justify-center shrink-0">
                    <Globe className="w-3.5 h-3.5 text-cyan-300" />
                  </div>
                  <span>Kho đề thi thử IELTS & HSK tự chấm điểm tức thì</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <div className="w-6 h-6 rounded-lg bg-white/15 flex items-center justify-center shrink-0">
                    <Award className="w-3.5 h-3.5 text-emerald-300" />
                  </div>
                  <span>Tặng ngay +50 XP khởi động sau khi thiết lập mục tiêu</span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-white/15 text-[11px] text-indigo-200 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-300 shrink-0" />
              <span>Dữ liệu đồng bộ an toàn theo từng tài khoản Gmail</span>
            </div>
          </div>

          {/* Right Form Area */}
          <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-center">
            {/* Tab Switcher */}
            <div className="flex items-center p-1 rounded-2xl bg-stone-100 dark:bg-slate-800 mb-6">
              <button
                type="button"
                onClick={() => {
                  setMode('login');
                  setErrorMessage('');
                }}
                className={`flex-1 py-2.5 rounded-xl font-extrabold text-xs transition ${
                  mode === 'login'
                    ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-xs'
                    : 'text-stone-500 hover:text-stone-900 dark:hover:text-stone-200'
                }`}
              >
                {t('Đăng nhập', 'Sign In')}
              </button>
              <button
                type="button"
                onClick={() => {
                  setMode('register');
                  setErrorMessage('');
                }}
                className={`flex-1 py-2.5 rounded-xl font-extrabold text-xs transition ${
                  mode === 'register'
                    ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-xs'
                    : 'text-stone-500 hover:text-stone-900 dark:hover:text-stone-200'
                }`}
              >
                {t('Đăng ký tài khoản', 'Sign Up')}
              </button>
            </div>

            {/* Success State */}
            {isSuccess ? (
              <div className="py-12 text-center space-y-3 animate-in zoom-in-95">
                <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-9 h-9" />
                </div>
                <h3 className="text-xl font-black text-stone-900 dark:text-white">
                  {mode === 'register' ? 'Đăng ký thành công!' : 'Đăng nhập thành công!'}
                </h3>
                <p className="text-xs text-stone-500 dark:text-stone-400">
                  Đang chuyển tiếp tới bước thiết lập lộ trình học cá nhân hóa...
                </p>
                <div className="w-6 h-6 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mt-4" />
              </div>
            ) : (
              <div className="space-y-5">
                {/* 1-Click Google Sign In Section */}
                <div>
                  <label className="block text-[11px] font-bold text-stone-400 uppercase tracking-wider mb-2">
                    {t('Đăng nhập nhanh 1-chạm bằng Gmail:', 'Fast 1-click Google Sign-In:')}
                  </label>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {presetAccounts.map(acc => (
                      <button
                        key={acc.email}
                        type="button"
                        disabled={isSubmitting}
                        onClick={() => handleGoogleAuth(acc.email, acc.name)}
                        className="p-3 rounded-2xl border-2 border-stone-200 dark:border-slate-800 hover:border-indigo-600 hover:bg-indigo-50/40 dark:hover:bg-indigo-950/30 text-left transition flex items-center justify-between group active:scale-98"
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <span className="text-xl shrink-0">{acc.avatar}</span>
                          <div className="truncate">
                            <div className="text-xs font-black text-stone-800 dark:text-white group-hover:text-indigo-600 transition truncate">
                              {acc.name}
                            </div>
                            <div className="text-[10px] font-mono text-stone-400 truncate">
                              {acc.email}
                            </div>
                          </div>
                        </div>
                        <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-stone-100 dark:bg-slate-700 text-stone-500 shrink-0">
                          {acc.badge}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Divider */}
                <div className="relative flex py-1 items-center">
                  <div className="grow border-t border-stone-200 dark:border-slate-800"></div>
                  <span className="shrink mx-3 text-[10px] font-bold text-stone-400 uppercase">
                    {t('Hoặc với Email & Mật khẩu', 'Or with Email & Password')}
                  </span>
                  <div className="grow border-t border-stone-200 dark:border-slate-800"></div>
                </div>

                {/* Error Banner */}
                {errorMessage && (
                  <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-300 text-xs font-semibold animate-in fade-in">
                    {errorMessage}
                  </div>
                )}

                {/* Traditional Form */}
                <form onSubmit={handleEmailAuth} className="space-y-3.5">
                  {mode === 'register' && (
                    <div>
                      <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                        {t('Họ và tên của bạn', 'Full Name')}
                      </label>
                      <div className="relative">
                        <User className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          required
                          value={name}
                          onChange={e => setName(e.target.value)}
                          placeholder="Nguyễn Văn A"
                          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-200 dark:border-slate-700 bg-stone-50 dark:bg-slate-800 text-xs font-semibold focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                        />
                      </div>
                    </div>
                  )}

                  <div>
                    <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                      {t('Địa chỉ Email / Gmail', 'Email / Gmail')}
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        placeholder="tenban@gmail.com"
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-200 dark:border-slate-700 bg-stone-50 dark:bg-slate-800 text-xs font-semibold focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                      {t('Mật khẩu', 'Password')}
                    </label>
                    <div className="relative">
                      <Lock className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        required
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-stone-200 dark:border-slate-700 bg-stone-50 dark:bg-slate-800 text-xs font-semibold focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 transition"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full mt-2 py-3.5 px-6 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs uppercase tracking-wider shadow-lg shadow-indigo-600/25 active:scale-95 transition flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>{t('Đang xử lý...', 'Processing...')}</span>
                      </>
                    ) : (
                      <>
                        <span>{mode === 'register' ? t('Đăng Ký & Khảo Sát Lộ Trình', 'Sign Up & Set Up Plan') : t('Đăng Nhập & Tiếp Tục', 'Sign In & Continue')}</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Footer info */}
      <footer className="py-4 text-center text-[11px] text-stone-400 dark:text-stone-500">
        LINGORA — Nền tảng học luyện thi IELTS & HSK thế hệ mới.
      </footer>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="w-8 h-8 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin" /></div>}>
      <LoginContent />
    </Suspense>
  );
}
