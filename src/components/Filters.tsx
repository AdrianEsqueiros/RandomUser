import React, { useState } from 'react';
import Select from 'react-select';
import { nationalityOptions } from '../utils/countryMapping';

interface FiltersProps {
  onFilterChange: (filters: { gender: string; nat: string }) => void;
}

const genderOptions = [
  { value: 'female', label: 'Female' },
  { value: 'male', label: 'Male' },
];

const Filters: React.FC<FiltersProps> = ({ onFilterChange }) => {
  const [gender, setGender] = useState('');
  const [nat, setNat] = useState('');

  const handleGenderChange = (selectedOption: any) => {
    setGender(selectedOption ? selectedOption.value : '');
  };

  const handleNatChange = (selectedOption: any) => {
    setNat(selectedOption ? selectedOption.value : '');
  };

  const handleSearchClick = () => {
    onFilterChange({ gender, nat });
  };

  return (
    <div className="card border-0 shadow-sm filtros-content my-3 z-3 ">
      <div className="card-body">
        <div className="row py-2">
          <div className="form-group col-sm-12 col-lg-4 mb-1">
            <Select
              options={nationalityOptions}
              onChange={handleNatChange}
              isClearable
              placeholder="NACIONALIDAD"
            />
          </div>
          <div className="form-group col-sm-12 col-lg-4 mb-1">
            <Select
              options={genderOptions}
              onChange={handleGenderChange}
              isClearable
              placeholder="GENERO"
            />
          </div>
          <div className="col-sm-12 col-lg-4">
            <button className="btn btn-sm btn-primary px-4 btn-search" onClick={handleSearchClick}>
              <i className="bi bi-search me-2"></i> Buscar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filters;
