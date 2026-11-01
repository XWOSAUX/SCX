interface StatusBadgeProps {
    status: 'loading' | 'success' | 'error';
    text: string;
}

function StatusBadge({ status, text }: StatusBadgeProps) {
    let color = '';

    if (status === 'loading') {
        color = 'orange';
    } else if (status === 'success') {
        color = 'green';
    } else {
        color = 'red';
    }

    return (
        <span style={{ color: color, fontWeight: 'bold' }}>
            {text}
        </span>
    );
}

export default StatusBadge;