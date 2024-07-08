import React from 'react';
import Navbar from './components/Navbar';
import DataTable from './components/Table/DataTable';
import './App.css';

const App: React.FC = () => {
  return (
    <>
      <Navbar />
      <div className="container pt-4">
        <h2 className='fw-bolder'>Random User</h2>
        <DataTable />
      </div>
    </>
  );
};

export default App;
