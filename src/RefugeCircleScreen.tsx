import { useParams, useNavigate } from 'react-router-dom';
import { useRefugeStore } from './useRefugeStore';
import { useState } from 'react';
import './RefugeScreen.css'; // Используем стили из RefugeScreen

function RefugeCircleScreen() {
  // 1. Достаем ID из URL (из адресной строки)
  const { id } = useParams(); 
  const navigate = useNavigate();
  
  // 2. Достаем стор
  const { nodes, updateNode, deleteNode } = useRefugeStore();

  // 3. Ищем наш кружок в массиве по ID
  const node = nodes.find(n => n.id === id);

  // 4. Локальный стейт для текста
  const [text, setText] = useState(node?.content || '');
  const [isSaving, setIsSaving] = useState(false);

  // Если кружок не найден (например, ты обновил страницу и стор очистился)
  if (!node) {
    return (
      <div className="refuge-page">
        <h1 className="profile-header">Ошибка</h1>
        <p className="name-text">Кружок не найден. Возможно, нужно вернуться в меню.</p>
        <button className="btn-open-mm" onClick={() => navigate('/refuge')} style={{ marginTop: '20px' }}>
          Назад в Refuge
        </button>
      </div>
    );
  }

  // 5. Функция сохранения
  const handleSave = async () => {
    setIsSaving(true);
    await updateNode(node.id, text); // Обновляем в базе через стор
    setIsSaving(false);
    navigate('/refuge'); // Возвращаемся на главный экран Refuge
  };

  return (
    <div className="refuge-page">
      <h1 className="profile-header">{node.title}</h1>
      <hr className="hr-sanctum-grid" />

      {/* Поле для ввода текста */}
      <textarea
        className="refuge-textarea"
        placeholder="Пиши свои мысли здесь..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        disabled={isSaving}
      />

      <div className="refuge-actions">
        <button className="btn-open-mm" onClick={handleSave} disabled={isSaving}>
          {isSaving ? 'Сохранение...' : 'Save'}
        </button>
        <button className="btn-open-mm" onClick={() => navigate('/refuge')} disabled={isSaving}>
          Cancel
        </button>
        <button 
          className="btn-open-mm" 
          onClick={async () => {
            // Спрашиваем подтверждение, чтобы случайно не удалить
            if (window.confirm("Удалить этот кружок?")) {
              await deleteNode(node.id);
              navigate('/refuge'); // Возвращаемся назад
            }
          }} 
          style={{ borderColor: 'red', color: 'red' }} // Сделаем её красной для опасности
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default RefugeCircleScreen;