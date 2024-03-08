import React, { useState } from 'react';
import { useNavigate, Link } from "react-router-dom";
import axios from 'axios';
import './styles/styles.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // Estado para controlar si se muestra o no la contraseña

  const navigate = useNavigate();

  const handleEdit = (event) => {
    event.preventDefault();

    const user = { username, password };

    axios.post('http://localhost:3001/routeLoginUsuario', user)
      .then(response => {
        if (response.data === 'ok') {
          navigate("/gestionAlumnos/inicio");
        } else {
          alert("Datos incorrectos");
        }
      })
      .catch(error => {
        console.error('Error en la consulta: ', error);
      });
  };

  return (
    <div className='recuadro'>
      <form onSubmit={handleEdit} className="form border border-2 bg-light p-4 rounded">
        <h1>Inicio de sesión</h1>
        <label className="form-label">Usuario:</label>
        <input type="text" className="form-control" placeholder='Ingrese su nombre de usuario...' value={username} onChange={(e) => setUsername(e.target.value)} required />
        <br />
        <label className="form-label">Contraseña:</label>
        <div className="input-group">
          <input type={showPassword ? "text" : "password"} className="form-control" placeholder='Ingrese su contraseña...' value={password} onChange={(e) => setPassword(e.target.value)} required />
          <button type="button" className="btn btn-outline-secondary" onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? "Ocultar" : "Mostrar"}
          </button>
        </div>
        <br />
        <button type="submit" className='button btn btn-primary'>Iniciar sesión</button>
      </form>
      <p>No tienes una cuenta? <Link to="/gestionAlumnos/tibu">Regístrate aquí</Link></p>
    </div>
  );
};

export default Login;
