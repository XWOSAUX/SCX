import { useState, KeyboardEvent } from "react";
import { useNavigate } from 'react-router-dom';
import { getFormattedDate } from "./getFormattedDate";
import StatusBadge from './StatusBadge';
import { useProfileStore } from './useProfileStore';
import { useEffect } from "react";


function MenuScreen() {

  const formattedDate = getFormattedDate();

  const navigate = useNavigate();

  const { name, setName, saveName, isLoading, fetchProfile } = useProfileStore();
  const [isEditing, setIsEditing] = useState(true);

  const handleSave = async () => {
    if (name.trim() !== '') {
      setIsEditing(false);
      await saveName();
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
    handleSave();
    }
  }

  
  useEffect(() => {
     fetchProfile();
  }, [fetchProfile]);

  // Сначала проверка
  if (isLoading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <StatusBadge status="loading" text="Синхронизация с базой данных..." />
      </div>
    );
  }

  return (

      <div className="menu-screen">

        <div className="info-way">
          <p className="top-text">SCX:/Main-Menu</p>
        </div>
        <div className="sanctum-grid">
          <div className="chamber profile-div">
            <p className="main-text">Profile</p>
            <hr className="hr-sanctum-grid" />
            <div className="container_name">
              {isEditing ? (
                <input
                  type="text"
                  className="input_profile"
                  placeholder="Введи имя"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onBlur={handleSave}
                  onKeyDown={handleKeyDown}
                />
              ) : (
                <p className="name-text" onClick={() => setIsEditing(true)}>
                  Name: <span className="name-value">{name}</span>
                </p>
              )}
            </div>
            <p className="date-text">Date: {formattedDate}</p>
            <button className="btn-open-mm" onClick={() => navigate('/profile')}>open</button>
          </div>

          <div className="chamber refuge-div">
            <p className="main-text">Refuge</p>
            <hr className="hr-sanctum-grid" />
            <p className="statistics-elements name-text">Element's: <span className="name-value">0</span></p>
            <button className="btn-open-mm">open</button>
          </div>

          <div className="chamber core-div">
            <p className="main-text">Core</p>
            <hr className="hr-sanctum-grid" />
            <p className="statistics-elements name-text">Element's: <span className="name-value">0</span></p>
            <button className="btn-open-mm">open</button>
          </div>

          <div className="chamber doubt-chamber-div">
            <p className="main-text">Doubt Chamber</p>
            <hr className="hr-sanctum-grid" />
            <p className="statistics-dh name-text">Case's: <span className="name-value">0</span></p>
            <p className="statistics-dh name-text">Solved Case's: <span className="name-value">0</span></p>
            <p className="statistics-dh name-text">In progress Case's: <span className="name-value">0</span></p>
            <button className="btn-open-mm">open</button>
          </div>

        </div>
      </div>
  );
}

export default MenuScreen;