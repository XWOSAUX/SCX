import './ProfileScreen.css';
import { useNavigate } from 'react-router-dom';
import { useProfileStore } from './useProfileStore';
import { getFormattedDate } from './getFormattedDate';


function ProfileScreen() {

const formattedDate = getFormattedDate();
const navigate = useNavigate();
const name = useProfileStore((state) => state.name);

  return (
  <div className="profile-page">
    <div className='div-profile-header'> 
      <p className="profile-header">Profile</p>
      <p className='profile-header'>{name}</p>
      <p className='profile-header'>Date: {formattedDate}</p>
    </div>
    <hr className='hr-sanctum-grid'/>
    <button className="btn-open-mm" onClick={() => navigate('/menu')}>back</button>
  </div>
  );
}

export default ProfileScreen;