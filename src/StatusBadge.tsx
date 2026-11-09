import './StatusBadge.css';

interface StatusBadgeProps {
  status: 'loading' | 'success' | 'error';
  text: string;
}

function StatusBadge({ status, text }: StatusBadgeProps) {
    // Формируем имя класса в зависимости от статуса
    const className = `status-badge status-${status}`;

    return (
        <span className={className}>
            {text}
        </span>
    );
}

export default StatusBadge;