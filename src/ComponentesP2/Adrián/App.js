import React from 'react';
import { BrowserRouter as Router, Routes } from 'react-router-dom';
import routes from './routes';
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <div className="container mt-5">
        <Navbar />
        <br/>
        <Routes>
          {routes}
        </Routes>
      </div>
    </Router>
  );
}

export default App;