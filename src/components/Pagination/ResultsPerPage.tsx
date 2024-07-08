import React from 'react';

interface ResultsPerPageProps {
  resultsPerPage: number;
  onResultsPerPageChange: (resultsPerPage: number) => void;
}

const ResultsPerPage: React.FC<ResultsPerPageProps> = ({ resultsPerPage, onResultsPerPageChange }) => {
  return (
    <div className="d-flex align-items-center mb-3">
      <label className="me-2" htmlFor="resultsPerPage">
        #Registros: 
      </label>
      <select
        id="resultsPerPage"
        className="form-select"
        value={resultsPerPage}
        onChange={(e) => onResultsPerPageChange(parseInt(e.target.value, 10))}
      >
        <option value={10}>10</option>
        <option value={20}>20</option>
        <option value={50}>50</option>
        <option value={100}>100</option>
      </select>
    </div>
  );
};

export default ResultsPerPage;
