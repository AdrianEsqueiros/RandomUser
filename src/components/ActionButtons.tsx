import React from 'react';

interface ActionButtonsProps {
  onToggleFilters: () => void;
  onDelete: () => void;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({ onToggleFilters, onDelete }) => {
  return (
    <div className="d-flex justify-content-start align-items-center my-3">
      <button className="btn btn-sm btn-outline-primary px-4 me-2" id="filtrosBtn" onClick={onToggleFilters}>
        <i className="bi bi-sliders"></i> Filtros
      </button>
      <button className="btn btn-sm btn-outline-danger px-4 me-2" onClick={onDelete}>
        <i className="bi bi-trash3"></i> Eliminar
      </button>
    </div>
  );
};

export default ActionButtons;
