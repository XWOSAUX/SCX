import { useNavigate } from "react-router-dom";

function NotFound() {
  const navigate = useNavigate();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', color: 'white' }}>
      <h1 style={{ fontSize: '80px', margin: 0 }}>404</h1>
      <p style={{ fontSize: '24px' }}>Такой страницы не существует</p>
      <button 
        onClick={() => navigate('/')} 
        style={{ marginTop: '20px', padding: '10px 20px', fontSize: '18px', cursor: 'pointer' }}
      >
        На главную
      </button>
    </div>
  );
}

export default NotFound;