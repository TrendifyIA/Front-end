/**
 * @file Login.jsx
 * @author Eduardo Rosas, Jennyfer Jasso, ...
 * @description Página de inicio de sesión para acceder a Trendify.
 */
import React, { useState } from "react";
import CustomButton from "../components/CustomButton.jsx";

const Login = () => {
  const [credenciales, setCredenciales] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredenciales({ ...credenciales, [name]: value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setError("");

  try {
    const response = await fetch("http://127.0.0.1:8080/usuario/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credenciales.email,
        password: credenciales.password,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      localStorage.removeItem("tutorial_empresa_form");
      localStorage.removeItem("tutorial_producto_form");
      localStorage.removeItem("tutorial_campana_form");

      localStorage.setItem("token", data.access_token);
      localStorage.setItem("id_usuario", data.id_usuario);

      const id_usuario = data.id_usuario;
      localStorage.setItem("id_usuario", id_usuario);

      if (
        localStorage.getItem(`tutorial_completado_${id_usuario}`) === "true"
      ) {
        window.location.replace("/users/adminproductos");
      } else if (data.activa === true) {
        window.location.replace("/tutorial/");
      } else {
        window.location.replace("planes_protected");
      }
    } else {
      // Mostrar error del backend
      setError(data.error || "Error desconocido al iniciar sesión");
    }
  } catch (error) {
    console.error("Error al iniciar sesión:", error);
    setError("No se pudo conectar con el servidor");
  }
};


  return (
    <div className="min-h-screen flex items-center justify-center bg-primary-500 font-sans">
      <div className="flex flex-col md:flex-row bg-white rounded-lg shadow-lg overflow-hidden w-[90%] max-w-5xl">
        {/* Panel izquierdo */}
        <div className="bg-primary-500 text-white p-8 md:w-1/2 flex flex-col justify-center">
          <h1 className="text-5xl font-bold mb-4">¡Hola!</h1>
          <p className="mb-4">Bienvenido a Trendify.</p>
          <p className="mb-4">
            Inicia sesión para poder acceder a la mejor herramienta de
            tendencias en el mercado.
          </p>
          <p className="mb-6">
            ¿Aún no tienes una cuenta? Regístrate dando clic en el siguiente
            botón.
          </p>
          <CustomButton
            texto="Registrarse"
            tipo="terciario"
            extraClases="text-center"
            ruta="/simple/registro"
          />
        </div>
        {/* Formulario */}
        <div className="p-8 md:w-1/2">
          <h2 className="text-3xl font-bold text-center mb-6">
            Iniciar Sesión
          </h2>
        {error && (
          <div className="text-red-600 text-sm mb-2 text-center">
            {error}
          </div>
        )}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                name="email"
                value={credenciales.email}
                onChange={handleChange}
                type="email"
                placeholder="Correo Electrónico"
                className="w-full px-4 py-2 border rounded"
                required
              />
            </div>
            <div>
              <input
                name="password"
                value={credenciales.password}
                onChange={handleChange}
                type="password"
                placeholder="Contraseña"
                className="w-full px-4 py-2 border rounded"
                required
              />
            </div>
            <p className="text-sm">
              ¿Has olvidado tu contraseña? Da clic{" "}
              <a href="#" className="text-blue-600 underline">
                aquí
              </a>{" "}
              para poder recuperarla.
            </p>
            <CustomButton
              texto="Iniciar Sesión"
              onClick={() => console.log("Iniciando sesión...")}
              tipo="primario"
              extraClases="text-center w-full"
              type="submit"
            />
          </form>
        </div>
      </div>
    </div>
  );
};
//
export default Login;