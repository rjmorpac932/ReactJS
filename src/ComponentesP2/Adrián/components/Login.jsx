import React, { useState } from 'react';
import './styles.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const login = (e) => {
    e.preventDefault();
    console.log(`Username: ${username}, Password: ${password}`);
  };

  return (
    <div className='recuadro'>
      <h1>Inicio de sesión</h1>
    <form onSubmit={login} className="form">
      <label>
        Usuario:
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className='input' />
      </label>
      <label>
        Contraseña:
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className='input'/>
      </label>
      <button type="submit" className='button'>Iniciar sesión</button>
    </form>
    </div>
  );
};

export default Login;