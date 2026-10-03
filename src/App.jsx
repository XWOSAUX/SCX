import { useState } from 'react';
import LoginScreen from './LoginScreen'; // <-- Добавляем импорт
import MenuScreen from './MenuScreen';   // <-- Добавляем импорт

function App() {

  const [currentScreen, setCurrentScreen] = useState('intro');

  const [isExiting, setIsExiting] = useState(false);

  const handleContinue = () => {
    setIsExiting(true); 
    setTimeout(() => {
      setCurrentScreen('login');
      setIsExiting(false);
    }, 500);
  };

  
  const handleLoginComplete = () => {
    setCurrentScreen('menu');
  };

  return (
    <div>
      {currentScreen === 'intro' && (
        <div className={`main-text-title ${isExiting ? 'intro-fade-out' : ''}`}>
          <h1 className="base-main-text" data-text='SCX'>SCX</h1>
          <p className="base-text-style">System Core X</p>
          <div className="div-get-in-btn">
            <button className="get-in-btn" onClick={handleContinue}>
              <span className="btn-text">Сontinue</span>
            </button>
          </div>
        </div>
      )}

      {currentScreen === 'login' && (
        <LoginScreen onLoginComplete={handleLoginComplete} />
      )}

      {currentScreen === 'menu' && (
        <MenuScreen />
      )}
    </div>
  );
}

export default App;