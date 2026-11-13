import { useNavigate } from 'react-router-dom';
import { useSettingsStore } from './useSettingsStore';
import { useEffect } from 'react';
import './ProfileScreen.css'; // Используем стили профиля для рамки
import './SettingsScreen.css';

function SettingsScreen() {
  const navigate = useNavigate();
  const { theme, setTheme } = useSettingsStore();

  // Этот эффект применяет тему к HTML при загрузке
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <div className="profile-page">
      <div className='div-profile-header'> 
        <p className="profile-header">Settings</p>
      </div>
      <hr className='hr-sanctum-grid'/>
      
        <p className='profile-header'>Theme</p>

      <div className="theme-buttons">
        <button className="btn-open-mm" onClick={() => setTheme('dark')} style={{ borderColor: theme === 'dark' ? 'var(--color-primary)' : '' }}>
          Dark Theme
        </button>
        
        <button className="btn-open-mm" onClick={() => setTheme('original')} style={{ borderColor: theme === 'original' ? 'var(--color-primary)' : '' }}>
          Original Theme
        </button>

        <button className="btn-open-mm" onClick={() => setTheme('light')} style={{ borderColor: theme === 'light' ? 'var(--color-primary)' : '' }}>
          Light Theme
        </button>
      </div>

      <div className="profile-footer">
        <div className="footer-left">
          <button className="btn-open-mm" onClick={() => navigate('/profile')}>back</button>
        </div>
      </div>
    </div>
  );
}

export default SettingsScreen;