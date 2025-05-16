import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

const SubscribedRoute = ({ children }) => {
  const [isChecking, setIsChecking] = useState(true);
  const [hasAccess, setHasAccess] = useState(false);

  useEffect(() => {
    const verificarSuscripcion = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setHasAccess(false);
        setIsChecking(false);
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

        const data = await res.json();

        if (res.ok && data.suscripcion === 1) {
          setHasAccess(true);
        } else {
          setHasAccess(false);
        }
      } catch (error) {
        console.error("Error verificando suscripción:", error);
        setHasAccess(false);
      } finally {
        setIsChecking(false);
      }
    };

    verificarSuscripcion();
  }, []);

  if (isChecking) return <div className="text-center text-white mt-12">Cargando...</div>;

  if (!localStorage.getItem('token')) {
    return <Navigate to="/simple/login" />;
  }

  return hasAccess ? children : <Navigate to="/simple/planes_protected" />;
};

export default SubscribedRoute;
