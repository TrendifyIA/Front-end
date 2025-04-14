import "./App.css";
import NavBar from "./components/NavBar.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RecoverPassword from "./pages/RecoverPassword.jsx";
import ResetPassword from "./pages/ResetPassword.jsx";

/*

Usando React Router se crean rutas para cada página de la aplicación, 
en este caso la ruta principal ("/") sería la landing page de la aplicación.

No todas las rutas serán visible desde App.js 
Sin embargo las ponemos aquí, hasta que se complete el flujo de navegación

Solo se coloca un BrowserRouter dentro de la aplicación
Dentro de los componentes de react se colocan Links que permiten navegar entre rutas
Ejemplo <Link to="/recover-password">Recuperar contraseña</Link>
*/

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <h1 className="text-3xl font-bold underline text-center">
              Hola mundo Trendify
            </h1>
          }
        />
        <Route path="/recover-password" element={<RecoverPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
