import { NavLink } from "react-router-dom";
import "./Menu.css";

function Menu() {
    return ( 
        <nav>
            <ul style={{ display: "flex", listStyle: "none" }}>
                <li style={{ marginRight: "10px" }}><NavLink to="/practica1">Spring1</NavLink></li>
                <li style={{ marginRight: "10px" }}><NavLink to="/practica2">Spring2</NavLink></li>
            </ul>
        </nav>
     );
}

export default Menu;