import logo from './logo.svg';
import './App.css';
import NavBar from './ComponentesP1/Navbar';
import Formulario from './ComponentesP1/Formulario';

function App() {
  return (
    <div className="App">
      <strong>Componente José Antonio</strong>
      <NavBar/>
      <strong>Componente Alicia</strong>
      <Formulario></Formulario>
      <strong>Componente Carmen</strong>
      {/* tu componente aquí */}
      <strong>Componente Tibu</strong>
      {/* tu componente aquí */}
      <strong>Componente Adrián</strong>
      {/* tu componente aquí */}
      <strong>Componente Pablo</strong>
      {/* tu componente aquí */}
    </div>
  );
}

export default App;
