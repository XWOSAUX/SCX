import { useState, useEffect } from 'react';
import LoginScreen from './LoginScreen';
import MenuScreen from './MenuScreen';  
import { Route, Routes, useNavigate } from 'react-router-dom';
import ProfileScreen from './ProfileScreen';
import NotFound from './NotFound';
import RefugeScreen from './RefugeScreen';
import RefugeCircleScreen from './RefugeCircleScreen';
import CoreScreen from './CoreScreen';
import CoreCircleScreen from './CoreCircleScreen';
import { supabase } from './supabaseClient';
import SettingsScreen from './SettingsScreen';
import { useSettingsStore } from './useSettingsStore';

function App() {
  
  const navigate = useNavigate();

  const [isExiting, setIsExiting] = useState(false);

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const { theme } = useSettingsStore();
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // 2. Проверяем сессию в фоне при загрузке сайта
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setIsAuthenticated(!!session); // если сессия есть - true, если нет - false
    });
  }, []);

  const handleContinue = () => {
    setIsExiting(true); 
    setTimeout(() => {
      // Если авторизован — в меню. Если нет — на логин.
      if (isAuthenticated) {
        navigate('/menu');
      } else {
        navigate('/login');
      }
      setIsExiting(false);
    }, 500);
  };

  
  const handleLoginComplete = () => {
    setIsAuthenticated(true); // Когда юзер вошел, обновляем стейт
    navigate('/menu');
  };

  

  return (
    
    <Routes>
      <Route path='/' element={
        <div>
        <div className={`main-text-title ${isExiting ? 'intro-fade-out' : ''}`}>
          <h1 className="base-main-text" data-text='SCX'>SCX</h1>
          <p className="base-text-style">System Core X</p>
          <div className="div-get-in-btn">
            <button className="get-in-btn" onClick={handleContinue}>
              <span className="btn-text">Сontinue</span>
            </button>
          </div>
        </div>
    </div>
      } />
      <Route path='/login' element={<LoginScreen onLoginComplete={handleLoginComplete} />} />
      <Route path='/menu' element={<MenuScreen />} />
      <Route path='/profile' element={<ProfileScreen />} />
      <Route path="*" element={<NotFound />} />
      <Route path="/refuge" element={<RefugeScreen />} />
      <Route path='/refuge/:id' element={<RefugeCircleScreen />} />
      <Route path="/core" element={<CoreScreen />} />
      <Route path='/core/:id' element={<CoreCircleScreen />} />
      <Route path='/settings' element={<SettingsScreen />} />
    </Routes>

  );
}

export default App;