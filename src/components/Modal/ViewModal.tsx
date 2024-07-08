import React from 'react';
import { Result } from '../../interfaces/RandomUser';

interface ViewModalProps {
  user: Result | null;
  onClose: () => void;
}

const ViewModal: React.FC<ViewModalProps> = ({ user, onClose }) => {
  if (!user) return null;

  return (
    <div className="modal show d-block" tabIndex={-1} role="dialog">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Ver Usuario</h5>            
          </div>
          <div className="modal-body">
            <div className="text-center mb-3">
              <img src={user.picture.large} alt="Profile" className="img-fluid rounded-circle" />
            </div>
            <p><strong>Nombre:</strong> {user.name.title} {user.name.first} {user.name.last}</p>
            <p><strong>Género:</strong> {user.gender}</p>
            <p><strong>Fecha de Nacimiento:</strong> {new Date(user.dob.date).toLocaleDateString()} (Edad: {user.dob.age})</p>
            <p><strong>Dirección:</strong> {user.location.street.number} {user.location.street.name}, {user.location.city}, {user.location.state}, {user.location.country}, {user.location.postcode}</p>
            <p><strong>Teléfono:</strong> {user.phone}</p>
            <p><strong>Celular:</strong> {user.cell}</p>
            <p><strong>Correo Electrónico:</strong> {user.email}</p>
            <p><strong>Usuario:</strong> {user.login.username}</p>
            {/* <p><strong>UUID:</strong> {user.login.uuid}</p> */}
            <p><strong>Registrado:</strong> {new Date(user.registered.date).toLocaleDateString()}</p>
            <p><strong>Coordenadas:</strong> {user.location.coordinates.latitude}, {user.location.coordinates.longitude}</p>
            <p><strong>Zona Horaria:</strong> {user.location.timezone.description} ({user.location.timezone.offset})</p>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>Cerrar</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewModal;
