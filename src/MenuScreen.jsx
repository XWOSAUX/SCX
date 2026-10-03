import { useState } from "react";
import ProfileScreen from "./ProfileScreen";

function MenuScreen() {

  const date = new Date();
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() +1).padStart(2, '0');
  const year = date.getFullYear();
  const formattedDate = `${day}.${month}.${year}`;

  const [name, setName] = useState(localStorage.getItem('scx_name') || '');
  const [isEditing, setIsEditing] = useState(true);

  const [currentScreen, setCurrentScreen] = useState('main-menu');
  const profileContinue = () => {

  }

  const handleSave = () => {
    if (name.trim() !== '') {
      setIsEditing(false);
      localStorage.setItem('scx_name', name);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
    handleSave();
    }
  }

  if (currentScreen === 'profile') {
    return <ProfileScreen />;
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
            <button className="btn-open-mm" onClick={() => setCurrentScreen('profile')}>open</button>
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