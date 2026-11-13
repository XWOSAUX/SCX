import './ProfileScreen.css';
import { useNavigate } from 'react-router-dom';
import { useProfileStore } from './useProfileStore';
import { getFormattedDate } from './getFormattedDate';
import { useState } from 'react';


function ProfileScreen() {

const [isEditing, setIsEditing] = useState(false);

const { name, setName, age, setAge, saveProfile } = useProfileStore();

const formattedDate = getFormattedDate();
const navigate = useNavigate();
const handleSave = async () => {
  if (name.trim() === '') {
    alert('Имя не может быть пустым, бро');
    return;
  }
  const ageNumber = Number(age);
  if (age.trim() !== '' && (!Number.isInteger(ageNumber) || ageNumber < 0 || ageNumber > 150)) {
    alert('Возраст должен быть целым числом от 0 до 150');
    return;
  }
  await saveProfile(); // Сохраняем в Supabase
  setIsEditing(false); // Выключаем режим редактирования
};


  return (
  <div className="profile-page">
    <div className='div-profile-header'> 
      <p className="profile-header">Profile</p>
      <p className='profile-header'>{name}</p>
      <p className='profile-header'>Date: {formattedDate}</p>
    </div>
    <hr className='hr-sanctum-grid'/>

    <div className="container_name">
      {isEditing ? (
        <div className='profile-controls'>

          <label className='input-group'>
            <p className="name-text">Name:</p>
            <input
              type="text"
              className="input_profile"
              placeholder="Введи имя"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label> 

          <label className='input-group'>
            <p className="name-text">Age:</p>
            <input
              type="number"
              className="input_profile"
              placeholder="Введи возраст"
              min={0}
              max={150}
              value={age}
              onChange={(e) => setAge(e.target.value)}
          />
          </label>

        </div>
      ) : (
        <div className='profile-controls'>
          <p className="name-text">
            Name: <span className="name-value">{name || 'Не указано'}</span>
          </p>
          <p className="name-text">
            Age: <span className="name-value">{age || 'Не указано'}</span>
          </p>
        </div>
      )}
    </div>
    <div className='profile-footer'>
      {/* Левая часть */}
      <div className="footer-left">
        <button className="btn-open-mm" onClick={() => navigate('/menu')}>back</button>
      </div>

      {/* Центр */}
      <button className="btn-open-mm">Settings</button>

      {/* Правая часть */}
      <div className="footer-right">
        {isEditing ? (
          <>
            <button className="btn-open-mm" onClick={handleSave}>Save</button>
            <button className="btn-open-mm" onClick={() => setIsEditing(false)}>Cancel</button>
          </>
        ) : (
          <button className="btn-open-mm" onClick={() => setIsEditing(true)}>Edit</button>
        )}
      </div>
    </div>
  </div>
  );
}

export default ProfileScreen;