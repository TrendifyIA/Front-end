import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const [isAuthorized, setIsAuthorized] = useState(null);

  useEffect(() => {
    const verificarToken = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setIsAuthorized(false);
        return;
      }

      try {
        const res = await fetch("http://127.0.0.1:8080/usuario/verificar", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.ok) {
          setIsAuthorized(true);
        } else {
          setIsAuthorized(false);
        }
      } catch (error) {
        console.error("Error al verificar token:", error);
        setIsAuthorized(false);
      }
    };

    verificarToken();
  }, []);

  if (isAuthorized === null) {
    return <div className="text-center text-white mt-12">Cargando...</div>;
  }

  return isAuthorized ? children : <Navigate to="/simple/login" />;
};

export default PrivateRoute;
