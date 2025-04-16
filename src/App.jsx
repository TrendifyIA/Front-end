import './App.css'
import NavBar from './components/NavBar.jsx'
import { Routes, Route, Link } from 'react-router-dom';
import TerminosYCond from './components/TerminosYCond.jsx';

function App() {
  return (
    <div>
      <nav class="bg-blue-900 text-white p-4 flex gap-4">
        <Link to="/terminos" class="hover:underline">Términos y Condiciones</Link>
      </nav>

      <Routes>
        <Route path="/terminos" element={<TerminosYCond />} />
      </Routes>
    </div>
  );
}

export default App;
