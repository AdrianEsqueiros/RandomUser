import React from 'react';

const Navbar: React.FC = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <a className="navbar-brand mx-auto" href="/">
          <img
            src="https://logo.clearbit.com/clearbit.com"
            alt="Logo de la empresa"
            className="d-inline-block align-text-top"
            height="30"
          />
        </a>        
      </div>
    </nav>
  );
};

export default Navbar;
