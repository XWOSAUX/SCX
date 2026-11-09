import { useState, useEffect } from 'react';
import { useProfileStore } from './useProfileStore';
import StatusBadge from './StatusBadge';

interface LoginScreenProps {
  onLoginComplete: () => void;
}

function LoginScreen({ onLoginComplete }: LoginScreenProps) {
  const [isVisible, setIsVisible] = useState(false);
  const { fetchProfile, isLoading } = useProfileStore();

  // Плавное появление экрана
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 50);
    return () => clearTimeout(timer);
  }, []);

  // Запускаем загрузку профиля и ждем, пока она закончится
  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  // Как только загрузка завершилась (isLoading === false), перекидываем в меню
  useEffect(() => {
    if (!isLoading) {
      const timer = setTimeout(() => {
        onLoginComplete();
      }, 500); // небольшая пауза, чтобы юзер увидел, что загрузка завершена
      return () => clearTimeout(timer);
    }
  }, [isLoading, onLoginComplete]);

  return (
    <div 
      className="login-screen"
      style={{
        opacity: isVisible ? 1 : 0,
        transition: 'opacity 0.6s ease',
      }}
    >
      {isLoading ? (
        <StatusBadge status="loading" text="Синхронизация..." />
      ) : (
        <StatusBadge status="success" text="Выполняется вход!" />
      )}
    </div>
  );
}

export default LoginScreen;