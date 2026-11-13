import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCoreStore } from './useCoreStore'; 
import { useState } from 'react';
import './RefugeScreen.css';
import StatusBadge from './StatusBadge';

function CoreScreen() {
  const navigate = useNavigate();
  const [isAdding, setIsAdding] = useState(false); // Открыт ли инпут
  const [newTitle, setNewTitle] = useState('');    // Текст названия
  const { nodes, isLoading, fetchNodes, addNode } = useCoreStore();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // При заходе на экран загружаем кружки
  useEffect(() => {
    fetchNodes();
  }, [fetchNodes]);

  if (isLoading) {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <StatusBadge status="loading" text="Синхронизация Core..." />
    </div>
  );
}

  const handleAddNode = async () => {
    // Если пусто, уже 10 штук или ИДЕТ ОТПРАВКА — ничего не делаем
    if (newTitle.trim() === '' || nodes.length >= 10 || isSubmitting) return;
    
    setIsSubmitting(true); // Ставим замок
    
    try {
      await addNode(newTitle);
      setIsAdding(false);
      setNewTitle('');
    } catch (error) {
      console.error("Не удалось создать:", error);
    } finally {
      setIsSubmitting(false); // Снимаем замок в любом случае (успех или ошибка)
    }
  };

  return (
    <div className="refuge-page">
      <h1 className="profile-header">Core</h1>
      <hr className="hr-sanctum-grid" />
      
        <div className="refuge-grid">
                {/* 1. Выводим существующие кружки */}
                {nodes.map((node) => (
            <div key={node.id} className="refuge-circle filled" onClick={() => navigate(`/core/${node.id}`)}>{node.title}</div>
                ))}

                {/* 2. Логика добавления нового */}
                {nodes.length < 10 && (
                <>
                {isAdding ? (
              // Если открыт инпут
              <textarea
                className="refuge-input-add"
                placeholder="Название..."
                autoFocus
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault(); // Останавливаем перенос строки
                    if (!isSubmitting) handleAddNode(); // Вызываем только если не ждем
                  }
                  if (e.key === 'Escape') {
                    setIsAdding(false);
                    setNewTitle('');
                  }
                }}
              />
                ) : (
              // Если инпут закрыт, показываем кнопку "+"
              <div 
                className="refuge-circle empty" 
                onClick={() => setIsAdding(true)}
              >
                +
              </div>
                 )}
                </>
                )}
            </div>
        <button className="btn-open-mm" onClick={() => navigate('/menu')} disabled={isSubmitting}>back</button>
    </div>
  );
}

export default CoreScreen;