import React, { useState } from 'react';
import { Result } from '../../interfaces/RandomUser';

interface EditModalProps {
  user: Result | null;
  onClose: () => void;
  onSave: (user: Result) => void;
}

const EditModal: React.FC<EditModalProps> = ({ user, onClose, onSave }) => {
  const [formData, setFormData] = useState<Result | null>(user);

  if (!user) return null;

  const updateNestedField = (field: string, subfield: string | undefined, value: string) => {
    if (subfield) {
      setFormData(prevFormData => ({
        ...prevFormData!,
        [field]: { ...prevFormData![field as keyof Result] as any, [subfield]: value },
      }));
    } else {
      setFormData(prevFormData => ({
        ...prevFormData!,
        [field]: value,
      }));
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const [field, subfield] = name.split('.');
    updateNestedField(field, subfield, value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData!);
    onClose();
  };

  return (
    <div className="modal show d-block" tabIndex={-1} role="dialog">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Editar Usuario</h5>            
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
            <div className="text-center mb-3">
              <img src={user.picture.large} alt="Profile" className="img-fluid rounded-circle" />
            </div>
              <div className="form-group">
                <label htmlFor="firstName">Nombre</label>
                <input
                  type="text"
                  className="form-control"
                  id="firstName"
                  name="name.first"
                  value={formData!.name.first}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="lastName">Apellido</label>
                <input
                  type="text"
                  className="form-control"
                  id="lastName"
                  name="name.last"
                  value={formData!.name.last}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Correo Electrónico</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  value={formData!.email}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="phone">Teléfono</label>
                <input
                  type="text"
                  className="form-control"
                  id="phone"
                  name="phone"
                  value={formData!.phone}
                  onChange={handleChange}
                />
              </div>

              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={onClose}>Cerrar</button>
                <button type="submit" className="btn btn-primary">Guardar Cambios</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
