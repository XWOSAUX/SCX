import { createClient } from '@supabase/supabase-js';

// Приводим import.meta к any, чтобы TypeScript не ругался
const env = (import.meta as any).env;

// Создаем и экспортируем клиент для работы с базой
export const supabase = createClient(
  env.VITE_SUPABASE_URL,
  env.VITE_SUPABASE_ANON_KEY
);

// Тестовый запрос к нашей таблице
supabase.from('profiles').select('*').then(({ data, error }) => {
  if (error) {
    console.error("Ошибка подключения:", error);
  } else {
    console.log("Успех! База подключена. Данные:", data);
  }
});