import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import NotFound from "../pages/NotFound";
import Menu from "../components/Menu";
import RutasAnidadas from "../pages/RutasAnidadas";
import FormularioNotas from "../ComponentesP2/FormularioNotas";
import NavBar from "../ComponentesP1/Navbar";
import Formulario from "../ComponentesP1/Formulario";
import Boton from "../ComponentesP1/Boton";
import CambioColorEnMouse from "../ComponentesP1/OnMouseOver";
import Footer from "../ComponentesP1/Footer";
import Lista from "../ComponentesP1/Lista";
import Actualizacion from "../ComponentesP2/Actualizacion";
import RegistrarUsuarioForm from "../ComponentesP2/registrarUsuario";
import Login from "../ComponentesP2/Login"
import Eliminar from "../ComponentesP2/EliminarAlumno"
import MiFormulario from "../ComponentesP2/FormularioIngresoAlumno";
import PDFViewer from "../components/pdfViewer";
import RutasAnidadasApp from "../pages/RutasAnidadasApp";

function Public() {

    const documentacion = `${process.env.PUBLIC_URL}/PDF/documentacion.pdf`;
    const presentacion = `${process.env.PUBLIC_URL}/PDF/presentacion.pdf`;

    return (
        <div>
            <Router>
                <Menu />
                <Routes>
                    <Route path="/" element={<p></p>} />
                    <Route path="/reactGitPageProyect" eelement={<p></p>} />
                    <Route path="*" element={<NotFound />} />
                    <Route path="/documentacion" element={<div><PDFViewer src={documentacion} /></div>} />
                    <Route path="/presentacion" element={<div><PDFViewer src={presentacion} /></div>} />
                    <Route path="/practica1/" element={<RutasAnidadas />} >
                        <Route path="alicia" element={<Formulario></Formulario>} />
                        <Route path="adrian" element={<Boton />} />
                        <Route path="carmen" element={<CambioColorEnMouse></CambioColorEnMouse>} />
                        <Route path="joseantonio" element={<NavBar />} />
                        <Route path="pablo" element={<Footer></Footer>} />
                        <Route path="tibu" element={<Lista />} />
                    </Route>
                    <Route path="/gestionAlumnos" element={<Login />} />
                    <Route path="/gestionAlumnos/tibu" element={<RegistrarUsuarioForm></RegistrarUsuarioForm>} />

                    <Route path="/gestionAlumnos/inicio/" element={<RutasAnidadasApp />} >
                        <Route path="carmen" element={<MiFormulario />} />
                        <Route path="joseantonio" element={<FormularioNotas></FormularioNotas>} />
                        <Route path="alicia" element={<Actualizacion />} />
                        <Route path="pablo" element={<Eliminar />} />

                    </Route>
                </Routes>
            </Router>
        </div>
    );
}

export default Public;