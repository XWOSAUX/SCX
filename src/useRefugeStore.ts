import { create } from 'zustand';
import { supabase } from './supabaseClient';

// 1. Описываем, как выглядит один кружок в базе данных
export interface RefugeNode {
  id: string;          // UUID
  title: string;       // Название
  content: string | null; // Текст (может быть пустым)
  created_at: string;  // Дата создания
}

// 2. Описываем, что будет в нашем сторе
interface RefugeState {
  nodes: RefugeNode[];
  isLoading: boolean;
  fetchNodes: () => Promise<void>;
  addNode: (title: string) => Promise<void>;
  updateNode: (id: string, content: string) => Promise<void>;
  deleteNode: (id: string) => Promise<void>;
}

export const useRefugeStore = create<RefugeState>((set, get) => ({
  nodes: [],
  isLoading: false,

  // 3. Загрузка всех кружков текущего юзера
  fetchNodes: async () => {
    set({ isLoading: true });
    
    // Получаем текущего юзера
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return set({ isLoading: false });

    // Идем в базу и берем только ЕГО кружки, сортируя по дате создания
    const { data, error } = await supabase
      .from('refuge_nodes')
      .select('*')
      .eq('user_id', user.id) // ВАЖНО: ищем только свои
      .order('created_at', { ascending: true }); // Сначала старые, потом новые

    if (error) {
      console.error("Ошибка загрузки кружков:", error);
    } else if (data) {
      set({ nodes: data });
    }
    set({ isLoading: false });
  },

  // 4. Добавление нового кружка
  addNode: async (title) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    // Вставляем в базу и просим Supabase вернуть нам созданную запись (select().single())
    const { data, error } = await supabase
      .from('refuge_nodes')
      .insert([{ user_id: user.id, title: title, content: '' }])
      .select()
      .single();

    if (error) {
      console.error("Ошибка создания кружка:", error);
    } else if (data) {
      // Добавляем новый кружок в наш локальный стейт (чтобы не перезагружать страницу)
      set((state) => ({ nodes: [...state.nodes, data] }));
    }
  },

  // 5. Обновление текста внутри кружка
  updateNode: async (id, content) => {
    const { error } = await supabase
      .from('refuge_nodes')
      .update({ content: content })
      .eq('id', id);

    if (error) {
      console.error("Ошибка обновления:", error);
    } else {
      // Обновляем текст в локальном стейте
      set((state) => ({
        nodes: state.nodes.map((node) => 
          node.id === id ? { ...node, content } : node
        )
      }));
    }
  },

  // 6. Удаление кружка
  deleteNode: async (id) => {
    const { error } = await supabase
      .from('refuge_nodes')
      .delete()
      .eq('id', id);

    if (error) {
      console.error("Ошибка удаления:", error);
    } else {
      // Удаляем кружок из локального стейта
      set((state) => ({
        nodes: state.nodes.filter((node) => node.id !== id)
      }));
    }
  },
}));