'use client';

import React, { useState } from 'react';
import { useLearner } from '@/context/LearnerContext';
import { useLanguage } from '@/context/LanguageContext';
import {
  X,
  ShieldCheck,
  CheckCircle2,
  Cloud,
  Sparkles,
  ArrowRight,
  User,
  Mail
} from 'lucide-react';

interface GoogleAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function GoogleAuthModal({ isOpen, onClose }: GoogleAuthModalProps) {
  const { loginWithGoogle, playAudioCue } = useLearner();
  const { t } = useLanguage();

  const [selectedPreset, setSelectedPreset] = useState<string | null>('ducanh.ielts@gmail.com');
  const [customEmail, setCustomEmail] = useState('');
  const [customName, setCustomName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const presetAccounts = [
    {
      name: 'DucAnh Nguyen',
      email: 'ducanh.ielts@gmail.com',
      avatar: '🦁',
      badge: 'IELTS Band 7.5 Target'
    },
    {
      name: 'Linh Tran',
      email: 'linh.hsk5@gmail.com',
      avatar: '🐼',
      badge: 'HSK 5 Target'
    }
  ];

  const handleLogin = async (email: string, name?: string) => {
    setIsSubmitting(true);
    playAudioCue('click');

    try {
      const res = await loginWithGoogle(email, name);
      if (res && res.success) {
        setIsSuccess(true);
        playAudioCue('level_up');
        setTimeout(() => {
          setIsSuccess(false);
          onClose();
        }, 1200);
      }
    } catch (err) {
      console.error('Login error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="max-w-md w-full bg-white dark:bg-slate-900 border-2 border-stone-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl animate-in zoom-in-95 duration-200 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          disabled={isSubmitting}
          className="absolute top-5 right-5 p-2 rounded-full text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 hover:bg-stone-100 dark:hover:bg-slate-800 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Google Official G Logo */}
        <div className="w-14 h-14 rounded-2xl bg-white dark:bg-slate-800 border-2 border-stone-200 dark:border-slate-700 flex items-center justify-center mx-auto mb-4 shadow-sm">
          <svg className="w-8 h-8" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
            />
            <path
              fill="#34A853"
              d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.34 24 12 24z"
            />
            <path
              fill="#FBBC05"
              d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.14-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
            />
            <path
              fill="#EA4335"
              d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.34 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
            />
          </svg>
        </div>

        {/* Title */}
        <div className="text-center mb-6">
          <h3 className="text-xl sm:text-2xl font-black text-stone-900 dark:text-white tracking-tight">
            Đăng Nhập Bằng Google
          </h3>
          <p className="text-xs text-stone-500 dark:text-stone-400 mt-1.5 leading-relaxed">
            Kết nối tài khoản Gmail để tự động sao lưu điểm XP, chuỗi ngày streak và sổ tay lỗi sai lên máy chủ đám mây.
          </p>
        </div>

        {/* Success Alert */}
        {isSuccess ? (
          <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 text-center space-y-1.5 animate-in zoom-in-95">
            <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
            <h4 className="font-extrabold text-sm text-emerald-800 dark:text-emerald-200">
              Đăng nhập thành công!
            </h4>
            <p className="text-xs text-emerald-600/90 font-medium">
              Dữ liệu tài khoản của bạn đã được tải và sẵn sàng đồng bộ.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Quick 1-Click Account Presets (Google Account Chooser) */}
            <div className="space-y-2">
              <span className="text-[11px] font-bold text-stone-400 uppercase tracking-wider">
                Chọn tài khoản để đăng nhập nhanh (1-Click Google Sign-In):
              </span>

              <div className="space-y-2">
                {presetAccounts.map(acc => (
                  <button
                    key={acc.email}
                    type="button"
                    disabled={isSubmitting}
                    onClick={() => handleLogin(acc.email, acc.name)}
                    className="w-full p-3.5 rounded-2xl border-2 border-stone-200 dark:border-slate-800 hover:border-indigo-600 hover:bg-indigo-50/50 dark:hover:bg-indigo-950/40 text-left transition flex items-center justify-between group active:scale-98 shadow-2xs"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{acc.avatar}</span>
                      <div>
                        <div className="text-xs font-black text-stone-900 dark:text-white group-hover:text-indigo-600 transition">
                          {acc.name}
                        </div>
                        <div className="text-[11px] font-mono text-stone-500 dark:text-stone-400">
                          {acc.email}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-stone-100 dark:bg-slate-700 text-stone-600 dark:text-stone-300">
                        {acc.badge}
                      </span>
                      <ArrowRight className="w-4 h-4 text-stone-400 group-hover:text-indigo-600 group-hover:translate-x-0.5 transition" />
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Gmail Input Divider */}
            <div className="relative flex py-1 items-center">
              <div className="grow border-t border-stone-200 dark:border-slate-800"></div>
              <span className="shrink mx-3 text-[10px] font-bold text-stone-400 uppercase">
                Hoặc nhập Gmail khác
              </span>
              <div className="grow border-t border-stone-200 dark:border-slate-800"></div>
            </div>

            {/* Custom Input */}
            <div className="space-y-2">
              <div className="relative">
                <Mail className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  placeholder="vidu@gmail.com"
                  value={customEmail}
                  onChange={e => {
                    setCustomEmail(e.target.value);
                    setSelectedPreset(null);
                  }}
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-stone-200 dark:border-slate-700 bg-stone-50 dark:bg-slate-800 text-xs font-semibold focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              {customEmail && (
                <div className="relative animate-in fade-in">
                  <User className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Họ và tên hiển thị"
                    value={customName}
                    onChange={e => setCustomName(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-stone-200 dark:border-slate-700 bg-stone-50 dark:bg-slate-800 text-xs font-semibold focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              )}
            </div>

            {/* Submit Button */}
            <button
              onClick={() => {
                const targetEmail = customEmail.trim() || selectedPreset || 'ducanh.ielts@gmail.com';
                const targetName = customName.trim() || targetEmail.split('@')[0];
                handleLogin(targetEmail, targetName);
              }}
              disabled={isSubmitting}
              className="w-full py-3.5 px-6 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xs uppercase tracking-wider shadow-lg shadow-indigo-500/25 active:scale-95 transition flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Đang kết nối tài khoản Google...</span>
                </>
              ) : (
                <>
                  <Cloud className="w-4 h-4" />
                  <span>Tiếp Tục Bằng Tài Khoản Google</span>
                </>
              )}
            </button>

            {/* Cloud Sync Assurance */}
            <div className="flex items-center justify-center gap-1.5 text-[10px] text-stone-400 font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
              <span>Tiến độ và thông tin được bảo mật và mã hóa tự động</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
