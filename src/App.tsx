import { useState } from 'react';
import LoginScreen from './LoginScreen'; // <-- Добавляем импорт
import MenuScreen from './MenuScreen';   // <-- Добавляем импорт
import { Route, Routes, useNavigate } from 'react-router-dom';
import ProfileScreen from './ProfileScreen';
import NotFound from './NotFound';

function App() {
  
  const navigate = useNavigate();

  const [isExiting, setIsExiting] = useState(false);

  const handleContinue = () => {
    setIsExiting(true); 
    setTimeout(() => {
      navigate('/login');
      setIsExiting(false);
    }, 500);
  };

  
  const handleLoginComplete = () => {
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
    </Routes>

  );
}

export default App;