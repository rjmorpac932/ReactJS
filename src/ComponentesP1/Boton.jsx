import React from 'react';

// Función que devuelve un componente de botón
const Boton = ({ texto, onClick }) => {
  return (
    <button onClick={onClick}>
      {texto}
    </button>
  );
};

export default Boton;
