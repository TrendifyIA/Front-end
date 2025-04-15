import './App.css'
import NavBar from './components/NavBar.jsx'
import { Routes, Route, Link } from 'react-router-dom';
import CodigoEquipo from './components/CodigoEquipo.jsx';
import VerificacionOTP from './components/VerificacionOTP.jsx';


function App() {
  return (
    <div>
      <nav class="bg-blue-900 text-white p-4 flex gap-4">
        <Link to="/codigo-equipo" class="hover:underline">Código de equipo</Link>
        <Link to="/otp" class="hover:underline">Verificación OTP</Link>
      </nav>

      <Routes>
        <Route path="/codigo-equipo" element={<CodigoEquipo />} />
        <Route path="/otp" element={<VerificacionOTP />} />
      </Routes>
    </div>
  );
}

export default App;

// hice unas rutas rapidas para probar los componentes :3