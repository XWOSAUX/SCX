import { create } from 'zustand';
import { supabase } from './supabaseClient';

// Описываем, какие данные и функции будут в нашем хранилище
interface ProfileState {
  name: string;
  age: string; // строка, потому что инпут работает со строками; '' = не указан
  isLoading: boolean;
  setName: (name: string) => void;
  setAge: (age: string) => void;
  fetchProfile: () => Promise<void>;
  saveProfile: () => Promise<void>;
}

export const useProfileStore = create<ProfileState>((set, get) => ({
  name: '',
  age: '',
  isLoading: true,

  // 1. Просто меняем значения в стейте
  setName: (newName) => set({ name: newName }),
  setAge: (newAge) => set({ age: newAge }),

  fetchProfile: async () => {
    set({ isLoading: true });
    
    // 1. Получаем текущего залогиненного пользователя
    const { data: { user } } = await supabase.auth.getUser();
    // Если юзера нет (не залогинен) — просто выключаем загрузку и выходим
    if (!user) {
      set({ isLoading: false });
      return;
    }
    const { data, error } = await supabase
      .from('profiles')
      .select('name, age')
      .eq('id', user.id) // 2. Ищем профиль по ID залогиненного юзера
      .maybeSingle();
    if (error) {
      console.error("Ошибка загрузки:", error);
    } else if (data) {
      set({
        name: data.name ?? '',
        age: data.age != null ? String(data.age) : '',
      });
    } else {
        // Если данных нет (только что зарегался), ставим пустые значения
        set({ name: '', age: '' });
    }
    set({ isLoading: false });
  },

  // 3. Сохраняем данные в Supabase
  saveProfile: async () => {
    const { name, age } = get();
    if (name.trim() === '') return;

    // Получаем текущего юзера
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return; // Если не залогинен — не сохраняем

    const trimmedAge = age.trim();
    const ageNumber = trimmedAge === '' ? null : Number(trimmedAge);

    if (ageNumber !== null && (!Number.isInteger(ageNumber) || ageNumber < 0 || ageNumber > 150)) {
      console.error("Некорректный возраст:", age);
      return;
    }

    const { error } = await supabase
      .from('profiles')
      .upsert({ id: user.id, name, age: ageNumber }); // upsert теперь использует user.id

    if (error) {
      console.error("Ошибка сохранения:", error);
    } else {
      console.log("Успешно сохранено в облако!");
    }
  },
}));