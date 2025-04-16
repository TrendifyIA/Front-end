import './App.css'
import NavBar from './components/NavBar.jsx'
import { Routes, Route, Link } from 'react-router-dom';
import TerminosYCond from './components/TerminosYCond.jsx';
import LandingPage from './components/LandingPage.jsx';

function App() {
  return (
    <div>
      <nav class="bg-blue-900 text-white p-4 flex gap-4">
        <Link to="/terminos" class="hover:underline">Términos y Condiciones</Link>
        <Link to="/inicio" class="hover:underline">Inicio</Link>
      </nav>

      <Routes>
        <Route path="/terminos" element={<TerminosYCond />} />
        <Route path="/inicio" element={<LandingPage />} />
      </Routes>
    </div>
  );
}

export default App;
