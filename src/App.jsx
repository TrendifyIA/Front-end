import './App.css'
import NavBar from './components/NavBar.jsx' 
import { useState } from 'react';
import Encuestas from './components/Encuestas';
import FolderEncuesta from './components/FolderEncuesta';


function App() {
  const [encuestas, setEncuestas] = useState([]);
  const [encuestaActiva, setEncuestaActiva] = useState(null);

  const agregarNuevaEncuesta = () => {
    const nuevaEncuesta = {
      id: Date.now(),
      titulo: 'Título de encuesta',
      ultimaModificacion: new Date().toLocaleDateString(),
      preguntas: [],
    };
    setEncuestaActiva(nuevaEncuesta);
  };

  const guardarEncuesta = (encuestaGuardada) => {
    setEncuestas((prev) => {
      const actualizadas = prev.filter(e => e.id !== encuestaGuardada.id);
      return [...actualizadas, encuestaGuardada];
    });
    setEncuestaActiva(null);
  };

  const editarEncuesta = (id) => {
    const encuesta = encuestas.find(e => e.id === id);
    setEncuestaActiva(encuesta);
  };

  return (
    <>
      <NavBar/>
      {encuestaActiva ? (
        <FolderEncuesta
          encuestaInicial={encuestaActiva}
          onTerminarEncuesta={guardarEncuesta}
        />
      ) : (
        <Encuestas
          encuestas={encuestas}
          onAgregarEncuesta={agregarNuevaEncuesta}
          onEditarEncuesta={editarEncuesta}
        />
      )}
    </>
  );
}

export default App;