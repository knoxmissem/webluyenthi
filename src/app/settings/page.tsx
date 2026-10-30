'use client';

import React, { useState } from 'react';
import { useLearner } from '@/context/LearnerContext';
import { useLanguage } from '@/context/LanguageContext';
import { useTheme } from '@/context/ThemeContext';
import { TrackType } from '@/types';
import {
  Settings,
  User,
  Target,
  Clock,
  Globe,
  RotateCcw,
  CheckCircle2,
  Download,
  Trash2,
  Sparkles,
  Cloud,
  RefreshCw,
  LogOut,
  Sun,
  Moon,
  Laptop
} from 'lucide-react';

export default function SettingsPage() {
  const {
    profile,
    updateProfile,
    resetAllData,
    regenerateStudyPlan,
    playAudioCue,
    currentUser,
    setIsGoogleAuthModalOpen,
    logoutGoogle,
    syncToCloud
  } = useLearner();
  const { language, setLanguage, t } = useLanguage();
  const { theme, setTheme } = useTheme();

  const [name, setName] = useState(profile.name);
  const [avatar, setAvatar] = useState(profile.avatar);
  const [track, setTrack] = useState<TrackType>(profile.track);
  const [targetIelts, setTargetIelts] = useState<number>(profile.targetIeltsBand);
  const [targetHsk, setTargetHsk] = useState<number>(profile.targetHskLevel);
  const [dailyMinutes, setDailyMinutes] = useState<number>(profile.dailyMinutes);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);

  const avatars = ['🦁', '🦊', '🐼', '🦉', '🐯', '🚀', '⭐', '🎓'];

  const handleSave = () => {
    updateProfile({
      name,
      avatar,
      track,
      targetIeltsBand: targetIelts,
      targetHskLevel: targetHsk,
      dailyMinutes
    });
    regenerateStudyPlan();
    playAudioCue('correct');
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  const handleSyncNow = async () => {
    setIsSyncing(true);
    playAudioCue('click');
    await syncToCloud();
    setTimeout(() => setIsSyncing(false), 800);
  };

  const handleExportData = () => {
    const data = {
      profile,
      exportedAt: new Date().toISOString()
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `lingora_backup_${profile.id}.json`;
    a.click();
    playAudioCue('click');
  };

  const handleReset = () => {
    if (confirm(t('Bạn có chắc chắn muốn đặt lại toàn bộ dữ liệu học tập về mặc định?', 'Are you sure you want to reset all learning data to demo defaults?'))) {
      resetAllData();
      playAudioCue('click');
      window.location.reload();
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Header */}
      <div className="pb-4 border-b border-stone-200 dark:border-slate-800">
        <span className="text-[11px] font-extrabold tracking-widest text-stone-400 dark:text-stone-500 uppercase flex items-center gap-1.5">
          <Settings className="w-3.5 h-3.5" />
          {t('CÀI ĐẶT HỆ THỐNG & TÀI KHOẢN', 'ACCOUNT & PREFERENCES')}
        </span>
        <h2 className="text-2xl sm:text-3xl font-black text-stone-900 dark:text-white tracking-tight mt-1">
          {t('Cài Đặt Cá Nhân & Mục Tiêu', 'Settings & Preferences')}
        </h2>
        <p className="text-sm text-stone-600 dark:text-stone-400 mt-1">
          {t(
            'Tùy chỉnh thông tin hồ sơ, điều chỉnh mục tiêu điểm số và ngôn ngữ hiển thị.',
            'Customize your profile, target exam scores, and system language.'
          )}
        </p>
      </div>

      {savedSuccess && (
        <div className="p-4 rounded-2xl bg-emerald-50 text-emerald-800 font-bold text-xs flex items-center gap-2 animate-in fade-in duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>{t('Đã lưu thành công các cài đặt và cập nhật lộ trình học!', 'Settings successfully saved and study plan refreshed!')}</span>
        </div>
      )}

      {/* Google Account & Cloud Sync Card */}
      <div className="rounded-3xl border-2 border-indigo-200 dark:border-indigo-900/60 bg-gradient-to-r from-indigo-50/40 via-white to-white dark:from-indigo-950/20 dark:via-slate-800 dark:to-slate-900 p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Cloud className="w-5 h-5 text-indigo-600" />
            <h3 className="text-base font-extrabold text-stone-900 dark:text-white">
              Tài Khoản Google & Đồng Bộ Đám Mây
            </h3>
          </div>

          {currentUser?.email ? (
            <span className="px-2.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 font-extrabold text-[11px] flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>Đã liên kết Gmail</span>
            </span>
          ) : (
            <span className="px-2.5 py-1 rounded-full bg-stone-100 dark:bg-slate-700 text-stone-600 dark:text-stone-300 font-bold text-[11px]">
              Chế độ cục bộ (Chưa liên kết)
            </span>
          )}
        </div>

        {currentUser?.email ? (
          <div className="space-y-3">
            <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-800/80 border border-stone-200/80 dark:border-slate-700 flex items-center justify-between">
              <div>
                <div className="text-xs font-black text-stone-900 dark:text-white">
                  {currentUser.name}
                </div>
                <div className="text-xs font-mono text-stone-500 dark:text-stone-400">
                  {currentUser.email}
                </div>
                <div className="text-[10px] text-stone-400 mt-1">
                  Đồng bộ lần cuối: {profile.lastSyncedAt ? new Date(profile.lastSyncedAt).toLocaleString('vi-VN') : 'Vừa xong'}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleSyncNow}
                  disabled={isSyncing}
                  className="px-3 py-1.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 hover:bg-indigo-100 text-indigo-700 dark:text-indigo-300 font-bold text-xs flex items-center gap-1.5 transition"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
                  <span>{isSyncing ? 'Đang lưu...' : 'Đồng bộ'}</span>
                </button>

                <button
                  onClick={logoutGoogle}
                  className="px-3 py-1.5 rounded-xl hover:bg-rose-50 text-rose-600 font-bold text-xs flex items-center gap-1 transition"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Đăng xuất</span>
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            <p className="text-xs text-stone-500 dark:text-stone-400 leading-relaxed">
              Đăng nhập tài khoản Gmail để lưu điểm XP, chuỗi ngày streak và dữ liệu bài học trên máy chủ Lingora Cloud.
            </p>
            <button
              onClick={() => setIsGoogleAuthModalOpen(true)}
              className="px-5 py-2.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs shadow-md shadow-indigo-500/20 active:scale-95 transition flex items-center gap-2"
            >
              <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                <path
                  fill="#fff"
                  d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
                />
                <path
                  fill="#fff"
                  d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.34 24 12 24z"
                />
                <path
                  fill="#fff"
                  d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.14-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
                />
                <path
                  fill="#fff"
                  d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.34 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                />
              </svg>
              <span>Đăng nhập bằng tài khoản Google</span>
            </button>
          </div>
        )}
      </div>

      {/* Profile Info Card */}
      <div className="rounded-3xl border border-[#ECE7DE] dark:border-slate-800 bg-white dark:bg-slate-800/90 p-6 shadow-xs space-y-5">
        <h3 className="text-base font-extrabold text-stone-900 dark:text-white flex items-center gap-2">
          <User className="w-4 h-4 text-indigo-600" />
          <span>Thông tin người học</span>
        </h3>

        {/* Avatar Picker */}
        <div>
          <label className="block text-xs font-bold text-stone-600 dark:text-stone-300 mb-2">
            Chọn biểu tượng đại diện:
          </label>
          <div className="flex flex-wrap gap-2">
            {avatars.map(av => (
              <button
                key={av}
                onClick={() => setAvatar(av)}
                className={`w-11 h-11 rounded-2xl text-xl flex items-center justify-center transition border-2 ${
                  avatar === av
                    ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-950 scale-105'
                    : 'border-stone-200 dark:border-slate-700 hover:bg-stone-50'
                }`}
              >
                {av}
              </button>
            ))}
          </div>
        </div>

        {/* Name input */}
        <div>
          <label className="block text-xs font-bold text-stone-600 dark:text-stone-300 mb-1">
            Họ và tên hiển thị:
          </label>
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl border border-stone-300 dark:border-slate-700 bg-stone-50 dark:bg-slate-900 text-sm font-bold"
          />
        </div>
      </div>

      {/* Target & Track Card */}
      <div className="rounded-3xl border border-[#ECE7DE] dark:border-slate-800 bg-white dark:bg-slate-800/90 p-6 shadow-xs space-y-5">
        <h3 className="text-base font-extrabold text-stone-900 dark:text-white flex items-center gap-2">
          <Target className="w-4 h-4 text-emerald-600" />
          <span>Lộ trình & Mục tiêu khảo thí</span>
        </h3>

        {/* Track selector */}
        <div>
          <label className="block text-xs font-bold text-stone-600 dark:text-stone-300 mb-2">
            Đường đua học tập chính:
          </label>
          <div className="grid grid-cols-3 gap-2">
            {[
              { id: 'ielts', label: 'IELTS English' },
              { id: 'hsk', label: 'HSK Chinese' },
              { id: 'both', label: 'Cả IELTS & HSK' },
            ].map(item => (
              <button
                key={item.id}
                onClick={() => setTrack(item.id as TrackType)}
                className={`p-3 rounded-2xl border-2 text-xs font-black transition ${
                  track === item.id
                    ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-950 text-indigo-900 dark:text-indigo-200'
                    : 'border-stone-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-stone-600'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* IELTS target band */}
        {(track === 'ielts' || track === 'both') && (
          <div>
            <div className="flex items-center justify-between text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
              <span>Mục tiêu IELTS Band:</span>
              <strong className="text-blue-600 font-black text-sm">Band {targetIelts.toFixed(1)}</strong>
            </div>
            <input
              type="range"
              min="5.0"
              max="9.0"
              step="0.5"
              value={targetIelts}
              onChange={e => setTargetIelts(parseFloat(e.target.value))}
              className="w-full accent-blue-600"
            />
          </div>
        )}

        {/* HSK target level */}
        {(track === 'hsk' || track === 'both') && (
          <div>
            <div className="flex items-center justify-between text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
              <span>Mục tiêu HSK Cấp độ:</span>
              <strong className="text-rose-600 font-black text-sm">HSK {targetHsk}</strong>
            </div>
            <input
              type="range"
              min="1"
              max="6"
              step="1"
              value={targetHsk}
              onChange={e => setTargetHsk(parseInt(e.target.value))}
              className="w-full accent-rose-600"
            />
          </div>
        )}

        {/* Daily Minutes */}
        <div>
          <div className="flex items-center justify-between text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
            <span>Thời lượng học mỗi ngày:</span>
            <strong className="text-indigo-600 font-black text-sm">{dailyMinutes} phút</strong>
          </div>
          <input
            type="range"
            min="15"
            max="90"
            step="15"
            value={dailyMinutes}
            onChange={e => setDailyMinutes(parseInt(e.target.value))}
            className="w-full accent-indigo-600"
          />
        </div>
      </div>

      {/* Language Preferences Card */}
      <div className="rounded-3xl border border-[#ECE7DE] dark:border-slate-800 bg-white dark:bg-slate-800/90 p-6 shadow-xs space-y-4">
        <h3 className="text-base font-extrabold text-stone-900 dark:text-white flex items-center gap-2">
          <Globe className="w-4 h-4 text-blue-600" />
          <span>Ngôn ngữ giao diện (Interface Language)</span>
        </h3>

        <div className="flex gap-3">
          <button
            onClick={() => setLanguage('vi')}
            className={`flex-1 py-3 px-4 rounded-2xl border-2 font-bold text-xs transition ${
              language === 'vi'
                ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-950 text-indigo-900 dark:text-indigo-200'
                : 'border-stone-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-stone-600 dark:text-stone-300'
            }`}
          >
            🇻🇳 Tiếng Việt (Mặc định)
          </button>

          <button
            onClick={() => setLanguage('en')}
            className={`flex-1 py-3 px-4 rounded-2xl border-2 font-bold text-xs transition ${
              language === 'en'
                ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-950 text-indigo-900 dark:text-indigo-200'
                : 'border-stone-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-stone-600 dark:text-stone-300'
            }`}
          >
            🇬🇧 English
          </button>
        </div>
      </div>

      {/* Theme Mode Card (Day, Night, System) */}
      <div className="rounded-3xl border border-[#ECE7DE] dark:border-slate-800 bg-white dark:bg-slate-800/90 p-6 shadow-xs space-y-4">
        <h3 className="text-base font-extrabold text-stone-900 dark:text-white flex items-center gap-2">
          <Moon className="w-4 h-4 text-indigo-500" />
          <span>Chế độ giao diện (Theme Mode)</span>
        </h3>

        <div className="grid grid-cols-3 gap-3">
          <button
            onClick={() => {
              playAudioCue('click');
              setTheme('light');
            }}
            className={`py-3 px-3 rounded-2xl border-2 font-bold text-xs transition flex flex-col items-center gap-1.5 ${
              theme === 'light'
                ? 'border-amber-500 bg-amber-50 dark:bg-amber-950/40 text-amber-900 dark:text-amber-200 shadow-xs'
                : 'border-stone-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-stone-600 dark:text-stone-300 hover:border-amber-300'
            }`}
          >
            <Sun className="w-4 h-4 text-amber-500" />
            <span>Ban ngày (Day)</span>
          </button>

          <button
            onClick={() => {
              playAudioCue('click');
              setTheme('dark');
            }}
            className={`py-3 px-3 rounded-2xl border-2 font-bold text-xs transition flex flex-col items-center gap-1.5 ${
              theme === 'dark'
                ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-950/60 text-indigo-900 dark:text-indigo-200 shadow-xs'
                : 'border-stone-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-stone-600 dark:text-stone-300 hover:border-indigo-300'
            }`}
          >
            <Moon className="w-4 h-4 text-indigo-500" />
            <span>Ban đêm (Night)</span>
          </button>

          <button
            onClick={() => {
              playAudioCue('click');
              setTheme('system');
            }}
            className={`py-3 px-3 rounded-2xl border-2 font-bold text-xs transition flex flex-col items-center gap-1.5 ${
              theme === 'system'
                ? 'border-teal-600 bg-teal-50 dark:bg-teal-950/40 text-teal-900 dark:text-teal-200 shadow-xs'
                : 'border-stone-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-stone-600 dark:text-stone-300 hover:border-teal-300'
            }`}
          >
            <Laptop className="w-4 h-4 text-teal-500" />
            <span>Hệ thống (Auto)</span>
          </button>
        </div>
      </div>

      {/* Save Button */}
      <button
        onClick={handleSave}
        className="w-full py-4 px-6 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-black text-sm shadow-md shadow-indigo-500/25 active:scale-95 transition"
      >
        Lưu tất cả thay đổi & Đồng bộ lộ trình
      </button>

      {/* Data Export & Reset Buttons */}
      <div className="flex items-center justify-between pt-4 border-t border-stone-200 dark:border-slate-800 text-xs">
        <button
          onClick={handleExportData}
          className="inline-flex items-center gap-1.5 text-stone-600 dark:text-stone-400 hover:text-stone-900 font-bold"
        >
          <Download className="w-4 h-4" />
          <span>Sao lưu dữ liệu cá nhân (Export JSON)</span>
        </button>

        <button
          onClick={handleReset}
          className="inline-flex items-center gap-1.5 text-rose-600 hover:text-rose-700 font-bold"
        >
          <Trash2 className="w-4 h-4" />
          <span>Đặt lại dữ liệu học thử</span>
        </button>
      </div>
    </div>
  );
}
