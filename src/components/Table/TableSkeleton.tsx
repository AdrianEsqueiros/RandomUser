import React from 'react';

const TableSkeleton: React.FC = () => {
  return (
    <div className="table-skeleton">
      <table className="table table-hover table-light" style={{ width: '100%' }}>
        <thead>
          <tr>
            <th><i className="bi bi-check-lg"></i></th>
            <th></th>
            <th>Nombre</th>
            <th>Género</th>
            <th>Dirección</th>
            <th>Teléfono</th>
            <th>Correo electrónico</th>
            <th>País</th>
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: 10 }).map((_, index) => (
            <tr key={index}>
              <td><div className="skeleton-box" /></td>
              <td><div className="skeleton-box skeleton-img" ></div></td>
              <td><div className="skeleton-box" /></td>
              <td><div className="skeleton-box" /></td>
              <td><div className="skeleton-box" /></td>
              <td><div className="skeleton-box" /></td>
              <td><div className="skeleton-box" /></td>
              <td><div className="skeleton-box" /></td>
              <td><div className="skeleton-box" /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableSkeleton;
