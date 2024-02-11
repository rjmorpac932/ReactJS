const db = require("../conexion");
const express = require('express');

const app = express.Router();

app.post('/usuario', (req, res) => {
    const { nombre, apellidos, departamento, usuario, password } = req.body;

    // Comprobar si el usuario ya existe
    const checkUsuarioSql = 'SELECT * FROM usuarios WHERE usuario = ?';

    db.query(checkUsuarioSql, [usuario], (checkErr, checkResult) => {

        if (checkErr) {
            console.log('Error en la consulta SQL: ' + checkErr.message);
            res.status(500).json({ error: 'Error interno del servidor' });
        } else {

            if (checkResult.length > 0) {
                // El usuario ya existe
                console.log('El usuario ya existe:', checkResult[0]);
                res.status(409).json({ error: 'El usuario ya existe', usuarioExistente: checkResult[0] });
            } else {
                // El usuario no existe.
                const insertarUsuarioSql = 'INSERT INTO usuarios (nombre, apellidos, departamento, usuario, password) VALUES (?, ?, ?, ?, ?)'
                const values = [nombre, apellidos, departamento, usuario, password];

                db.query(insertarUsuarioSql, values, (insertErr) => {
                    if (insertErr) {
                        console.log('Error al insertar datos: ' + insertErr.message);
                        res.status(500).json({ error: 'Error interno del servidor' });
                    } else {
                        console.log('Datos insertados');
                        res.json({ mensaje: 'Usuario registrado correctamente' });
                    }
                });
            }
        }
    });

});

module.exports = app;