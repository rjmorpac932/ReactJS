import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="btn-group">
        <Link to="/" className="btn btn-dark">
          Inicio
        </Link>
        <Link to="/nosotros" className="btn btn-dark">
          Nosotros
        </Link>
        <Link to="/contacto" className="btn btn-dark">
          Contacto
        </Link>
        <Link to="/area-triangulo" className="btn btn-dark">
          Área Triángulo
        </Link>
        <Link to="/login" className="btn btn-dark">
          Iniciar sesión
        </Link>
      </div>
    </div>
  );
};

export default Navbar;