import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const RegistrarUsuarioForm = () => {
  // Estado para almacenar los datos del formulario
  const [formData, setFormData] = useState({
    nombre: '',
    apellidos: '',
    departamento: 'informatica',
    usuario: '',
    password: ''
  });

  const navigate = useNavigate();

  // Estado para controlar la visibilidad de la contraseña
  const [showPassword, setShowPassword] = useState(false);

  // Estado para controlar si se ha ingresado algún dato en los campos de usuario y contraseña
  const [userInput, setUserInput] = useState({
    usuario: false,
    password: false
  });

  // Función que maneja el cambio en los campos del formulario
  const handleChange = (e) => {
    // Extrae el nombre y valor del campo del evento
    const { name, value } = e.target;

    // Convierte el texto a mayúsculas
    const formattedValue = (name === 'nombre' || name === 'apellidos') ? value.toUpperCase() : value;

    // Actualiza el estado con los nuevos datos del formulario
    setFormData({
      ...formData,
      [name]: formattedValue
    });

    // Actualiza el estado para indicar que se ha ingresado algún dato en el campo
    setUserInput({
      ...userInput,
      [name]: value.trim() !== ''
    });
  };

  // Función que se ejecuta cuando se envía el formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validar que los campos no estén vacíos antes de enviar la solicitud al servidor
    if (formData.nombre.trim() === '' || formData.apellidos.trim() === '' || formData.usuario.trim() === '' || formData.password.trim() === ''){
      // Mostrar mensaje de error si los campos están vacíos
      alert("Por favor, algunos campos están vacíos.");
      return;
    }
    // Validar los campos antes de enviar la solicitud al servidor
    if (!validateUsuario() || !validatePassword()) {
      // Mostrar mensaje de error si los campos no son válidos
      alert("Los campos usuario y/o constraseña no son válidos.");
      return;
    }

    try {
      // Realizar una solicitud POST al servidor
      const response = await axios.post('http://localhost:3001/usuario', formData);

      // Manejar la respuesta del servidor según tus necesidades
      console.log('Respuesta del servidor:', response.data);

      // Limpiar el formulario después de un registro exitoso
      setFormData({
        nombre: '',
        apellidos: '',
        departamento: 'informatica',
        usuario: '',
        password: ''
      });

      alert("Usuario registrado.")

      navigate('/gestionAlumnos');


    } catch (error) {
      // Manejar errores de la solicitud al servidor
      console.log('El nombre de usuario ya existe.');
      alert("El nombre de usuario ya existe, pruebe con otro.")
    }
  };

  // Función que se ejecuta cuando se selecciona un campo
  const handleFocus = (e) => {
    console.log(`Campo ${e.target.name} en foco`);
  };

  // Validación del campo de usuario
  const validateUsuario = () => {
    return formData.usuario.length >= 6;
  };

  // Validación del campo de contraseña
  const validatePassword = () => {
    const requisitos = /^(?=.*[A-Z])(?=.*\d).{6,12}$/;
    // Test comprueba los datos anteriores
    return requisitos.test(formData.password);
  };

  // Función para cambiar la visibilidad de la contraseña
  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <form onSubmit={handleSubmit} className="border border-2 bg-light p-4 rounded">

            <div className="mb-3">
              <h1>Registro</h1>
              <label htmlFor="nombre" className="form-label">Nombre:</label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                onFocus={handleFocus}
                className="form-control"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="apellidos" className="form-label">Apellidos:</label>
              <input
                type="text"
                id="apellidos"
                name="apellidos"
                value={formData.apellidos}
                onChange={handleChange}
                onFocus={handleFocus}
                className="form-control"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="departamento" className="form-label">Departamento:</label>
              <select
                id="departamento"
                name="departamento"
                value={formData.departamento}
                onChange={handleChange}
                className="form-select"
              >
                <option value="informatica">Informática</option>
              </select>
            </div>

            <div className="mb-3">
              <label htmlFor="usuario" className="form-label">Usuario:</label>
              <input
                type="text"
                id="usuario"
                name="usuario"
                value={formData.usuario}
                onChange={handleChange}
                onFocus={handleFocus}
                className={`form-control ${userInput.usuario && !validateUsuario() ? 'is-invalid' : ''}`}
              />

              {userInput.usuario && !validateUsuario() && (
                <div className="invalid-feedback">
                  El usuario debe tener al menos 6 caracteres.
                </div>
              )}
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label">Contraseña:</label>

              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                onFocus={handleFocus}
                className={`form-control ${userInput.password && !validatePassword() ? 'is-invalid' : ''}`}
              />
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={handleTogglePassword}
              >
                {showPassword ? 'Ocultar' : 'Mostrar'}
              </button>


              {userInput.password && !validatePassword() && (
                <div className="invalid-feedback">
                  La contraseña debe tener entre 6 y 12 caracteres, al menos 1 mayúscula y 1 número.
                </div>
              )}
            </div>
            <button type="submit" className="btn btn-primary">Registrar Usuario</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegistrarUsuarioForm;
