import React from "react";
import axios from "axios";
import "../App.css";

class MiFormulario extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formularioData: {
        nombre: "",
        apellidos: "",
        email: "",
      },
      errors: {},
      showConfirmation: false,
    };
  }

  handleInputChange = (event) => {
    this.setState({
      formularioData: {
        ...this.state.formularioData,
        [event.target.name]: event.target.value,
      },
    });
  };

  validateEmailFormat = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  validateForm = () => {
    const { nombre, apellidos, email } = this.state.formularioData;
    const errors = {};

    if (!nombre.trim()) {
      errors.nombre = "El nombre no puede estar vacío";
    }

    if (!apellidos.trim()) {
      errors.apellidos = "Los apellidos no pueden estar vacíos";
    }

    if (!email.trim()) {
      errors.email = "El correo electrónico no puede estar vacío";
    } else if (!this.validateEmailFormat(email)) {
      errors.email = "El formato del correo electrónico no es válido";
    }

    this.setState({ errors });

    return Object.keys(errors).length === 0;
  };

  handleSubmit = async (event) => {
    event.preventDefault();

    const isValid = this.validateForm();

    if (isValid) {
      this.setState({ showConfirmation: true });
    }
  };

  handleConfirmation = async () => {
    const { nombre, apellidos, email } = this.state.formularioData;

    try {
      const response = await axios.post("http://localhost:3001/api/insert", {
        nombre,
        apellidos,
        email,
      });

      console.log("Datos del formulario enviados correctamente", response.data);
    } catch (error) {
      console.error("Error al enviar los datos del formulario:", error.message);
    }

    this.setState({ showConfirmation: false });
  };

  render() {
    const { errors, showConfirmation } = this.state;

    if (showConfirmation) {
      return (
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-6">
              <div className="border border-2 bg-light p-4 rounded">
                <h1>Confirmar envío</h1>
                <p>
                  Nombre: {this.state.formularioData.nombre}<br />
                  Apellidos: {this.state.formularioData.apellidos}<br />
                  Email: {this.state.formularioData.email}
                </p>
                <button onClick={this.handleConfirmation} className="btn btn-primary">
                  Confirmar
                </button>
                <button onClick={() => this.setState({ showConfirmation: false })} className="btn btn-secondary ml-2">
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <form
              onSubmit={this.handleSubmit}
              className="border border-2 bg-light p-4 rounded"
            >
              <fieldset>
                <h1>Ingrese Nuevo Alumno</h1>
                <div className="form-group row">
                  <label htmlFor="nombre" className="col-12 col-form-label">
                    Nombre:
                  </label>
                  <div className="col-12">
                    <div className={`input-group ${errors.nombre ? "has-error" : ""}`}>
                      <input
                        id="nombre"
                        name="nombre"
                        placeholder="Ingrese nombre del alumno..."
                        type="text"
                        className={`form-control ${errors.nombre ? "is-invalid" : ""}`}
                        onChange={this.handleInputChange}
                      />
                    </div>
                    {errors.nombre && <p className="text-danger">{errors.nombre}</p>}
                  </div>
                </div>
                <div className="form-group row">
                  <label htmlFor="apellidos" className="col-12 col-form-label">
                    Apellidos:
                  </label>
                  <div className="col-12">
                    <input
                      id="apellidos"
                      name="apellidos"
                      placeholder="Ingrese apellidos del alumno..."
                      type="text"
                      className={`form-control ${errors.apellidos ? "is-invalid" : ""}`}
                      onChange={this.handleInputChange}
                    />
                    {errors.apellidos && (
                      <div className="col-12">
                        <p className="text-danger">{errors.apellidos}</p>
                      </div>
                    )}
                  </div>
                </div>
                <div className="form-group row">
                  <label htmlFor="email" className="col-12 col-form-label">
                    Email:
                  </label>
                  <div className="col-12">
                    <input
                      id="email"
                      name="email"
                      placeholder="Ingrese email del alumno..."
                      type="email"
                      className={`form-control ${errors.email ? "is-invalid" : ""}`}
                      onChange={this.handleInputChange}
                    />
                    {errors.email && (
                      <div className="col-12">
                        <p className="text-danger">{errors.email}</p>
                      </div>
                    )}
                  </div>
                </div>
                <div className="form-group row">
                  <div className="offset-4 col-8">
                    <button type="submit" className="btn btn-primary">
                      Enviar
                    </button>
                  </div>
                </div>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default MiFormulario;
