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
import RegistrarUsuarioForm from "../ComponentesP2/registrarUsuario";

function Public() {
    return (
        <div>
            <h1>Prácticas React</h1>
            <Router>
                <Menu />
                <Routes>
                    <Route path="/" element={<p></p>} />
                    <Route path="*" element={<NotFound />} />
                    <Route path="/practica1/" element={<RutasAnidadas />} >
                        <Route path="alicia" element={<Formulario></Formulario>} />
                        <Route path="adrian" element={<Boton />} />
                        <Route path="carmen" element={<CambioColorEnMouse></CambioColorEnMouse>} />
                        <Route path="joseantonio" element={<NavBar />} />
                        <Route path="pablo" element={<Footer></Footer>} />
                        <Route path="tibu" element={<Lista />} />
                    </Route>
                    <Route path="/practica2/" element={<RutasAnidadas />} >
                        <Route path="alicia" element={<p>Formulario con evento de Alicia</p>} />
                        <Route path="adrian" element={<p>Formulario con evento de Adrián</p>} />
                        <Route path="carmen" element={<p>Formulario con evento de Carmen</p>} />
                        <Route path="joseantonio" element={<FormularioNotas></FormularioNotas>} />
                        <Route path="pablo" element={<p>Formulario con evento de Pablo</p>} />
                        <Route path="tibu" element={<RegistrarUsuarioForm> </RegistrarUsuarioForm>} />
                    </Route>
                </Routes>
            </Router>
        </div>
    );
}

export default Public;