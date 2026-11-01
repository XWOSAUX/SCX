import { create } from 'zustand';
import { supabase } from './supabaseClient';

// Описываем, какие данные и функции будут в нашем хранилище
interface ProfileState {
  name: string;
  isLoading: boolean;
  setName: (name: string) => void;
  fetchProfile: () => Promise<void>;
  saveName: () => Promise<void>;
}

export const useProfileStore = create<ProfileState>((set, get) => ({
  name: '',
  isLoading: true,

  // 1. Просто меняем имя в стейте
  setName: (newName) => set({ name: newName }),

  // 2. Загружаем данные из Supabase
  fetchProfile: async () => {
    set({ isLoading: true });
    const { data, error } = await supabase
      .from('profiles')
      .select('name')
      .eq('id', 1)
      .maybeSingle();

    if (error) {
      console.error("Ошибка загрузки:", error);
    } else if (data?.name) {
      set({ name: data.name });
    }
    set({ isLoading: false });
  },

  // 3. Сохраняем данные в Supabase
  saveName: async () => {
    const currentName = get().name; // get() позволяет достать текущее значение из стора
    if (currentName.trim() === '') return;

    const { error } = await supabase
      .from('profiles')
      .upsert({ id: 1, name: currentName });

    if (error) {
      console.error("Ошибка сохранения:", error);
    } else {
      console.log("Успешно сохранено в облако (через Zustand)!");
    }
  },
}));