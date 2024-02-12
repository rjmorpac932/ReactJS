import { Outlet, NavLink } from "react-router-dom";

function RutasAnidadasApp() {
    return (
        <div className="my-5">

            <div className="d-flex flex-wrap justify-content-center">
                <div className="col-xl-2 col-lg-3 col-md-4 col-sm-6 mb-3">
                    <NavLink to={"carmen"} className="btn btn-outline-primary btn-lg btn-block" activeClassName="active">Ingresar alumno</NavLink>
                </div>
                <div className="col-xl-2 col-lg-3 col-md-4 col-sm-6 mb-3">
                    <NavLink to={"joseantonio"} className="btn btn-outline-primary btn-lg btn-block" activeClassName="active">Notas</NavLink>
                </div>
                <div className="col-xl-2 col-lg-3 col-md-4 col-sm-6 mb-3">
                    <NavLink to={"alicia"} className="btn btn-outline-primary btn-lg btn-block" activeClassName="active">Actualizar alumno</NavLink>
                </div>
                <div className="col-xl-2 col-lg-3 col-md-4 col-sm-6 mb-3">
                    <NavLink to={"pablo"} className="btn btn-outline-primary btn-lg btn-block" activeClassName="active">Eliminar alumno</NavLink>
                </div>
            </div>

            <div className="mt-5">
                <Outlet />
            </div>
        </div>
    );
}

export default RutasAnidadasApp;
