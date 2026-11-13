import { useNavigate } from 'react-router-dom';
import { getFormattedDate } from "./getFormattedDate";
import StatusBadge from './StatusBadge';
import { useProfileStore } from './useProfileStore';
import { useEffect } from "react";
import { useRefugeStore } from './useRefugeStore';
import { useCoreStore } from './useCoreStore';

function MenuScreen() {
  const formattedDate = getFormattedDate();

  const navigate = useNavigate();

  // name для того чтоб могли из стора доставать имя. загрузку и тд оставляем.
  const { name, isLoading, fetchProfile } = useProfileStore();

  const { nodes: refugeNodes, fetchNodes: fetchRefugeNodes } = useRefugeStore();
  const { nodes: coreNodes, fetchNodes: fetchCoreNodes } = useCoreStore();

  useEffect(() => {
     fetchProfile();
     fetchRefugeNodes();
     fetchCoreNodes();
  }, [fetchProfile, fetchRefugeNodes, fetchCoreNodes]);

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
          <p className="top-text">SCX: Pre-Alpha</p>
        </div>
        <div className="sanctum-grid">
          <div className="chamber profile-div">
            <p className="main-text">Profile</p>
            <hr className="hr-sanctum-grid" />
            <div className="container_name">
              <p className="name-text">
                Name: <span className="name-value">
                  {name && name.trim() !== '' 
                    ? name 
                    : <span className="empty-name-prompt">Напишите имя в настройках профиля</span>}
                </span>
              </p>
            </div>
            <p className="date-text">Date: {formattedDate}</p>
            <button className="btn-open-mm" onClick={() => navigate('/profile')}>Open</button>
          </div>

          <div className="chamber refuge-div">
            <p className="main-text">Refuge</p>
            <hr className="hr-sanctum-grid" />
            <p className="statistics-elements name-text">Element's: <span className="name-value">{refugeNodes.length}</span></p>
            <button className="btn-open-mm" onClick={() => navigate('/refuge')}>Open</button>
          </div>

          <div className="chamber core-div">
            <p className="main-text">Core</p>
            <hr className="hr-sanctum-grid" />
            <p className="statistics-elements name-text">Element's: <span className="name-value">{coreNodes.length}</span></p>
            <button className="btn-open-mm" onClick={() => navigate('/core')}>Open</button>
          </div>

          <div className="chamber doubt-chamber-div">
            <p className="main-text">Doubt Chamber <span className='text-test'>(Coming next year...❄️)</span></p>
            <hr className="hr-sanctum-grid" />
            <p className="statistics-dh name-text">Case's: <span className="name-value">0</span></p>
            <p className="statistics-dh name-text">Solved Case's: <span className="name-value">0</span></p>
            <p className="statistics-dh name-text">In progress Case's: <span className="name-value">0</span></p>
            <button className="btn-open-mm">Open</button>
          </div>

        </div>
      </div>
  );
}

export default MenuScreen;