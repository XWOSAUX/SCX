import { create } from 'zustand';

export type Theme = 'dark' | 'original' | 'light';

interface SettingsState {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

export const useSettingsStore = create<SettingsState>((set) => ({
  // По умолчанию берем тему из localStorage, или ставим 'dark'
  theme: (localStorage.getItem('scx-theme') as Theme) || 'dark',
  
  setTheme: (theme) => {
    localStorage.setItem('scx-theme', theme);
    set({ theme });
  },
}));