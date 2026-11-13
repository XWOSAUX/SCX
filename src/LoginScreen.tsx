import { supabase } from './supabaseClient';
import './LoginScreen.css';
import { useState, useEffect } from 'react';
import { useProfileStore } from './useProfileStore';
import StatusBadge from './StatusBadge';

interface LoginScreenProps {
  onLoginComplete: () => void;
}

function LoginScreen({ onLoginComplete }: LoginScreenProps) {
  const [isVisible, setIsVisible] = useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true); // true = вход, false = регистрация
  const [errorMsg, setErrorMsg] = useState(''); // Для текста ошибки
  const [authLoading, setAuthLoading] = useState(false); // Для блокировки кнопки

  // Плавное появление экрана
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 50);
    return () => clearTimeout(timer);
  }, []);

    const handleAuth = async () => {
    // 1. Сбрасываем старые ошибки и включаем загрузку
    setErrorMsg('');
    setAuthLoading(true);

    try {
      if (isLogin) {
        // ЛОГИКА ВХОДА
        const { error } = await supabase.auth.signInWithPassword({
          email: email,
          password: password,
        });
        if (error) throw error; // Если Supabase вернул ошибку, выкидываем её в catch
      } else {
        // ЛОГИКА РЕГИСТРАЦИИ
        const { error } = await supabase.auth.signUp({
          email: email,
          password: password,
        });
        if (error) throw error;
      }

      // Если ошибки нет, значит вход/рега прошли успешно
      // Вызываем функцию из пропсов, чтобы перекинуть юзера в меню
      onLoginComplete();

    } catch (error: any) {
      // 2. Если что-то сломалось (неверный пароль, нет интернета), ловим ошибку
      console.error(error);
      // Красиво переводим популярные ошибки
      if (error.message.includes("Invalid login credentials")) {
        setErrorMsg("Неверный email или пароль");
      } else if (error.message.includes("User already registered")) {
        setErrorMsg("Этот email уже зарегистрирован");
      } else if (error.message.includes("Password should be at least 6 characters")) {
        setErrorMsg("Пароль должен быть минимум 6 символов");
      } else {
        setErrorMsg(error.message || "Произошла ошибка");
      }
    } finally {
      // 3. Выключаем загрузку в любом случае (успех или ошибка)
      setAuthLoading(false);
    }
  };

  return (
    <div className="login-screen" style={{ opacity: isVisible ? 1 : 0, transition: 'opacity 0.6s ease', }}>
      <div className="login-form-container">
        <h2 className="login-title">
          {isLogin ? 'Вход в SCX' : 'Регистрация в SCX'}
        </h2>

        <div className="profile-controls">
          <label className="input-group">
            <p className="name-text">Email:</p>
            <input
              type="email"
              className="input_profile"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>

          <label className="input-group">
            <p className="name-text">Password:</p>
            <input
              type="password"
              className="input_profile"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
        </div>

        <div className="login-actions">
          <button className="btn-open-mm"
          onClick={handleAuth}
          disabled={authLoading}
          >
            {authLoading ? 'Загрузка...' : (isLogin ? 'Войти' : 'Создать аккаунт')}
          </button>
          
          <button 
            className="btn-open-mm btn-secondary" 
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? 'Регистрация' : 'Вход'}
          </button>
        </div>
        {errorMsg && (
          <div style={{ color: 'red', marginTop: '10px', textAlign: 'center', fontSize: '14px' }}>
            {errorMsg}
          </div>
        )}
      </div>
    </div>
  );
}

export default LoginScreen;