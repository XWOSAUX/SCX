import { useState, useEffect } from 'react';

interface LoginScreenProps {
  onLoginComplete: () => void;
}

function LoginScreen({ onLoginComplete }: LoginScreenProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const [dot1, setDot1] = useState(false);
  const [dot2, setDot2] = useState(false);
  const [dot3, setDot3] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 50);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isLoading) return;

    let step = 0;
    const interval = setInterval(() => {
      step = (step % 3) + 1;
      setDot1(step >= 1);
      setDot2(step >= 2);
      setDot3(step >= 3);
    }, 500);

    return () => clearInterval(interval);
  }, [isLoading]);

  useEffect(() => {
    const timer = setTimeout(() => {

        setIsLoading(false); 

        setTimeout(() => {
          if (onLoginComplete) onLoginComplete();
        }, 1000);
      
  }, 3000);

  return () => clearTimeout(timer); // Очищаем первый таймер, если компонент исчез
  }, [onLoginComplete]);

  return (
    <div className="login-screen"
    style={{
        opacity: isVisible ? 1 : 0,
        transition: 'opacity 0.6s ease',
    }}
    >
      {isLoading ? (
        <p className="login-loading">
          Выполняется вход в систему Core X
          <span className={dot1 ? 'dot visible' : 'dot'}>.</span>
          <span className={dot2 ? 'dot visible' : 'dot'}>.</span>
          <span className={dot3 ? 'dot visible' : 'dot'}>.</span>
        </p>
      ) : (
        <p className="login-success">Вход выполнен!</p>
      )}
    </div>
  );
}

export default LoginScreen;