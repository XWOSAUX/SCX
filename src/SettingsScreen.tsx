import { useNavigate } from 'react-router-dom';
import { useSettingsStore } from './useSettingsStore';
import { useEffect } from 'react';
import { supabase } from './supabaseClient';
import './ProfileScreen.css';
import './SettingsScreen.css';

function SettingsScreen() {
  const navigate = useNavigate();
  const { theme, setTheme } = useSettingsStore();
  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = '/'; // Перезагружаем страницу и выкидываем на интро
  };

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
          <button className="btn-open-mm btn-danger" onClick={handleLogout}>Logout</button>
        </div>
      </div>
    </div>
  );
}

export default SettingsScreen;