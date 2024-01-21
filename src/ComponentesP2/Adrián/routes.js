import React from 'react';
import { Route } from 'react-router-dom';
import Inicio from './components/Inicio';
import Nosotros from './components/Nosotros';
import Contacto from './components/Contacto';
import AreaTriangulo from './components/AreaTriangulo';
import Login from './components/Login';

const routes = (
  <>
    <Route path="/" element={<Inicio />} />
    <Route path="/nosotros" element={<Nosotros />} />
    <Route path="/contacto" element={<Contacto />} />
    <Route path="/area-triangulo" element={<AreaTriangulo />} />
    <Route path="/login" element={<Login />} />
  </>
);

export default routes;