import React from 'react';
import { Result } from '../../interfaces/RandomUser';
import { countryMapping } from '../../utils/countryMapping';

interface UserTableProps {
  data: Result[];
  selectedIds: string[];
  handleCheckboxChange: (id: string) => void;
  handleSelectAllChange: () => void;
  handleView: (user: Result) => void;
  handleEdit: (user: Result) => void;
}

const UserTable: React.FC<UserTableProps> = ({
  data,
  selectedIds,
  handleCheckboxChange,
  handleSelectAllChange,
  handleView,
  handleEdit,
}) => {
  return (
    <table className="table table-hover table-light" style={{ width: '100%' }}>
      <thead>
        <tr>
          <th style={{ minWidth: '50px' }}>
            <input
              type="checkbox"
              checked={selectedIds.length === data.length}
              onChange={handleSelectAllChange}
            />
          </th>
          <th style={{ minWidth: '70px' }}></th>
          <th>Nombre</th>
          <th>Género</th>
          <th>Dirección</th>
          <th>Teléfono</th>
          <th>Correo electrónico</th>
          <th>País</th>
          <th style={{ minWidth: '100px' }}>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {data.map((user, index) => (
          <tr key={index}>
            <td>
              <input
                className="form-check-input"
                type="checkbox"
                checked={selectedIds.includes(user.login.uuid)}
                onChange={() => handleCheckboxChange(user.login.uuid)}
              />
            </td>
            <td className="table-img-cell"><img src={user.picture.thumbnail} alt="Profile" className="img-thumbnail" /></td>
            <td>{user.name.first} {user.name.last}</td>
            <td>{user.gender}</td>
            <td>{user.location.street.name}</td>
            <td>{user.phone}</td>
            <td>{user.email}</td>
            <td>{countryMapping[user.nat]}</td>
            <td>
              <button className="btn btn-sm btn-outline-info me-2" onClick={() => handleView(user)}>
                <i className="bi bi-eye"></i>
              </button>
              <button className="btn btn-sm btn-outline-primary me-2" onClick={() => handleEdit(user)}>
                <i className="bi bi-pencil"></i>
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UserTable;
