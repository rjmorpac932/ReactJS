import React, { useState, useEffect } from 'react';
import axios from 'axios';

function FormularioNotas() {
    const enviarNotaAlServidor = async (nuevaNota) => {
        try {
            const response = await axios.post('http://localhost:3001/notas', nuevaNota);
            console.log('Respuesta del servidor:', response.data);
        } catch (error) {
            console.error('Error al enviar la nota al servidor:', error);
        }
    };

    const enviarSolicitudCalculoAlServidor = async (idAlumno, idTrimestre) => {
        try {
            const response = await axios.get(`http://localhost:3001/notas/${idAlumno}/${idTrimestre}`);
            console.log('Respuesta del servidor:', response.data);
            return response.data;
        } catch (error) {
            console.error('Error al enviar la solicitud de cálculo al servidor:', error);
            throw error;
        }
    };

    const calcularNotaMedia = (notas) => {
        const sumaNotas = notas.reduce((total, nota) => total + nota.nota, 0);
        const notaMedia = sumaNotas / notas.length;
        alert(`La nota media del alumno es: ${notaMedia}`);
    };

    const [alumnos, setAlumnos] = useState([]);

    const cargarAlumnos = async () => {
        try {
            const response = await axios.get('http://localhost:3001/notasAlumnos');
            setAlumnos(response.data);
        } catch (error) {
            console.error('Error al cargar los alumnos:', error);
        }
    };

    useEffect(() => {
        cargarAlumnos();
    }, []);

    const [form, setForm] = useState({
        alumno: '',
        descripcion: '',
        trimestre: '',
        tarea: '',
        nota: '',
    });

    const [form2, setForm2] = useState({
        alumno_calc: '',
        trimestre_calc: '',
    });

    const [errors, setErrors] = useState({
        alumno: '',
        descripcion: '',
        trimestre: '',
        tarea: '',
        nota: '',
    });

    const [errors2, setErrors2] = useState({
        alumno_calc: '',
        trimestre_calc: '',
    });

    const handleChange = (event) => {
        setForm({
            ...form,
            [event.target.name]: event.target.value,
        });
    };

    const handleChange2 = (event) => {
        setForm2({
            ...form2,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (validateForm()) {
            const nuevaNota = {
                alumno: form.alumno,
                descripcion: form.descripcion,
                trimestre: form.trimestre,
                tarea: form.tarea,
                nota: parseFloat(form.nota),
            };
            
            try {
                await enviarNotaAlServidor(nuevaNota);
                alert('Nota agregada exitosamente');
                resetForm();
            } catch (error) {
                console.error('Error al enviar la nota al servidor:', error);
            }
        }
    };

    const handleSubmit2 = async (event) => {
        event.preventDefault();
        if (validateForm2()) {
            try {
                const idAlumno = form2.alumno_calc;
                const idTrimestre = form2.trimestre_calc;

                const response = await enviarSolicitudCalculoAlServidor(idAlumno, idTrimestre);
                console.log('Respuesta del servidor:', response);

                calcularNotaMedia(response); // Mostrar alert con la nota media del alumno

                resetForm2();
            } catch (error) {
                console.error('Error al enviar la solicitud de cálculo al servidor:', error);
            }
        }
    };

    const validateForm = () => {
        let isValid = true;
        let newErrors = { ...errors };

        if (form.alumno.trim() === '') {
            newErrors.alumno = 'Seleccione un alumno/a';
            isValid = false;
        } else {
            newErrors.alumno = '';
        }

        if (form.descripcion.trim() === '') {
            newErrors.descripcion = 'La descripción es requerida';
            isValid = false;
        } else {
            newErrors.descripcion = '';
        }

        if (form.trimestre.trim() === '') {
            newErrors.trimestre = 'Seleccione un trimestre';
            isValid = false;
        } else {   
            newErrors.trimestre = '';
        }

        if (form.tarea.trim() === '') {
            newErrors.tarea = 'Seleccione una tarea';
            isValid = false;
        } else {
            newErrors.tarea = '';
        }

        if (form.nota.trim() === '' || isNaN(form.nota) || form.nota < 0 || form.nota > 10) {
            newErrors.nota = 'Ingrese una nota válida entre 0 y 10';
            isValid = false;
        } else {
            newErrors.nota = '';
        }

        setErrors(newErrors);
        return isValid;
    };

    const validateForm2 = () => {
        let isValid = true;
        let newErrors = { ...errors2 };

        if (form2.alumno_calc.trim() === '') {
            newErrors.alumno_calc = 'Seleccione un alumno/a';
            isValid = false;
        } else {
            newErrors.alumno_calc = '';
        }
        
        if (form2.trimestre_calc.trim() === '') {
            newErrors.trimestre_calc = 'Seleccione un trimestre';
            isValid = false;
        } else {   
            newErrors.trimestre_calc = '';
        }

        setErrors2(newErrors);
        return isValid;
    };

    const resetForm = () => {
        setForm({
            alumno: '',
            descripcion: '',
            trimestre: '',
            tarea: '',
            nota: '',
        });
        setErrors({
            alumno: '',
            descripcion: '',
            trimestre: '',
            tarea: '',
            nota: '',
        });
    };

    const resetForm2 = () => {
        setForm2({
            alumno_calc: '',
            trimestre_calc: ''
        });
    };

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div htmlFor="alumno" className="col-md-6">
                    <form onSubmit={handleSubmit} className="border border-2 bg-light p-4 rounded">
                        <div className="mb-3">
                            <h1>Añadir nota</h1>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Alumno</label>
                            <select
                                name="alumno"
                                value={form.alumno}
                                onChange={handleChange}
                                className={`form-select ${errors.alumno && 'is-invalid'}`}
                            >
                                <option value="">Selecciona un alumno</option>
                                {alumnos.map((alumno) => (
                                    <option key={alumno.id} value={alumno.id}>{alumno.nombre} {alumno.apellidos}</option>
                                ))}
                            </select>
                            {errors.alumno && <div className="invalid-feedback">{errors.alumno}</div>}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="descripcion" className="form-label">Descripción</label>
                            <input
                                placeholder='Escriba una descripción'
                                type="text"
                                name="descripcion"
                                value={form.descripcion}
                                onChange={handleChange}
                                className={`form-control ${errors.descripcion && 'is-invalid'}`}
                            />
                            {errors.descripcion && <div className="invalid-feedback">{errors.descripcion}</div>}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="trimestre" className="form-label">Trimestre</label>
                            <select
                                name="trimestre"
                                value={form.trimestre}
                                onChange={handleChange}
                                className={`form-select ${errors.trimestre && 'is-invalid'}`}
                            >
                                <option value="">Selecciona un trimestre</option>
                                <option value="1">Primer Trimestre</option>
                                <option value="2">Segundo Trimestre</option>
                                <option value="3">Tercer Trimestre</option>
                            </select>
                            {errors.trimestre && <div className="invalid-feedback">{errors.trimestre}</div>}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="tarea" className="form-label">Tarea</label>
                            <select
                                name="tarea"
                                value={form.tarea}
                                onChange={handleChange}
                                className={`form-select ${errors.tarea && 'is-invalid'}`}
                            >
                                <option value="">Selecciona una tarea</option>
                                <option value="1">Práctica individual</option>
                                <option value="2">Práctica grupal</option>
                                <option value="3">Examen teórico</option>
                                <option value="4">Examen práctico</option>
                                <option value="5">Exposición</option>
                            </select>
                            {errors.tarea && <div className="invalid-feedback">{errors.tarea}</div>}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="nota" className="form-label">Nota</label>
                            <input
                                type="number"
                                name="nota"
                                min={0}
                                max={10}
                                step={0.1}
                                value={form.nota}
                                onChange={handleChange}
                                className={`form-control ${errors.nota && 'is-invalid'}`}
                            />
                            {errors.nota && <div className="invalid-feedback">{errors.nota}</div>}
                        </div>
                        <div className='mb-3'>
                            <button type="submit" className="btn btn-primary">Añadir</button>
                        </div>
                    </form>
                    <br />
                    <form onSubmit={handleSubmit2} className="border border-2 bg-light p-4 rounded">
                        <div className="mb-3">
                            <h1>Calcular nota final</h1>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="alumno_calc" className="form-label">Alumno</label>
                            <select
                                name="alumno_calc"
                                value={form2.alumno_calc}
                                onChange={handleChange2}
                                className={`form-select ${errors2.alumno_calc && 'is-invalid'}`}
                            >
                                <option value="">Selecciona un alumno</option>
                                {alumnos.map((alumno) => (
                                    <option key={alumno.id} value={alumno.id}>{alumno.nombre} {alumno.apellidos}</option>
                                ))}
                            </select>
                            {errors2.alumno_calc && <div className="invalid-feedback">{errors2.alumno_calc}</div>}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="trimestre_calc" className="form-label">Trimestre</label>
                            <select
                                name="trimestre_calc"
                                value={form2.trimestre_calc}
                                onChange={handleChange2}
                                className={`form-select ${errors2.trimestre_calc && 'is-invalid'}`}
                            >
                                <option value="">Selecciona un trimestre</option>
                                <option value="1">Primer Trimestre</option>
                                <option value="2">Segundo Trimestre</option>
                                <option value="3">Tercer Trimestre</option>
                            </select>
                            {errors2.trimestre_calc && <div className="invalid-feedback">{errors2.trimestre_calc}</div>}
                        </div>
                        <div className='mb-3'>
                            <button type="submit" className="btn btn-primary">Calcular</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default FormularioNotas;
