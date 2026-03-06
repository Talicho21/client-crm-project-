import React from 'react';

function StatusBadge({ status }) {
  const getStatusColor = () => {
    switch(status) {
      case 'new': return 'badge bg-info';
      case 'contacted': return 'badge bg-warning';
      case 'converted': return 'badge bg-success';
      case 'lost': return 'badge bg-danger';
      default: return 'badge bg-secondary';
    }
  };

  return (
    <span className={getStatusColor()}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
}

export default StatusBadge;