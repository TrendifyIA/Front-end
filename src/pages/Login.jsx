/**
 * @file Login.jsx
 * @author Eduardo Rosas, Jennyfer Jasso, ...
 * @description Página de inicio de sesión para acceder a Trendify.
 */

import React, { useContext, useState, useRef } from "react";
import CustomButton from "../components/CustomButton.jsx";
import { ContextoTutorial } from "../context/ProveedorTutorial.jsx";
import { ContextoEmpresa } from "../context/ProveedorEmpresa.jsx";
import ReCAPTCHA from "react-google-recaptcha";
import InputPassword from "../components/InputPassword.jsx";

/**
 * Componente que representa la página de login de la aplicación Trendify.
 * Permite al usuario ingresar sus credenciales, valida con reCAPTCHA v2,
 * y redirige con base en el estado de su cuenta y progreso del tutorial.
 *
 * @component
 * @returns {JSX.Element} Página de inicio de sesión.
 */
const Login = () => {
  const [credenciales, setCredenciales] = useState({
    email: "",
    password: "",
  });

  const [captchaToken, setCaptchaToken] = useState(null); // Token del reCAPTCHA
  const captchaRef = useRef(null); // Referencia al componente reCAPTCHA
  const [loading, setLoading] = useState(false); // Indicador de carga
  const [error, setError] = useState(""); // Mensaje de error si ocurre

  const { obtenerTutorialCompletado } = useContext(ContextoTutorial);
  const { isEmpresaRegistrada } = useContext(ContextoEmpresa);

  /**
   * Maneja los cambios en los campos del formulario de login.
   *
   * @param {React.ChangeEvent<HTMLInputElement>} e - Evento del input.
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredenciales({ ...credenciales, [name]: value });
  };

  /**
   * Envía las credenciales al backend, valida el captcha, guarda información en localStorage
   * y redirige al usuario según su estado en el sistema.
   *
   * @param {React.FormEvent} e - Evento de envío del formulario.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!captchaToken) {
      setError("Por favor verifica el captcha.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:8080/usuario/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: credenciales.email,
          password: credenciales.password,
          captcha: captchaToken,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Limpia formularios de tutorial anteriores
        localStorage.removeItem("tutorial_empresa_form");
        localStorage.removeItem("tutorial_producto_form");
        localStorage.removeItem("tutorial_campana_form");

        // Guarda token y usuario en localStorage
        localStorage.setItem("token", data.access_token);
        localStorage.setItem("id_usuario", data.id_usuario);

      // const id_usuario = data.id_usuario;
      const tutorialCompletado = await obtenerTutorialCompletado();
      const empresaRegistrada = await isEmpresaRegistrada();
      //console.log("Tutorial completado:", tutorialCompletado);

        // Redirección según estado del usuario
        if (tutorialCompletado || empresaRegistrada) {
          window.location.replace("/users/adminproductos");
        } else if (data.activa === true) {
          window.location.replace("/tutorial/");
        } else {
          window.location.replace("/simple/planes_protected");
        }
      } else {
        setError(data.error || "Error desconocido al iniciar sesión");
        if (captchaRef.current) {
          captchaRef.current.reset();
          setCaptchaToken(null);
        }
      }
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      setError("No se pudo conectar con el servidor");
      if (captchaRef.current) {
        captchaRef.current.reset();
        setCaptchaToken(null);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-primary-500 font-sans">
      <div className="flex flex-col md:flex-row bg-white rounded-lg shadow-lg overflow-hidden w-[90%] max-w-5xl">
        {/* Panel izquierdo: información de bienvenida y redirección a registro */}
        <div className="bg-primary-500 text-white p-8 md:w-1/2 flex flex-col justify-center">
          <h1 className="text-5xl font-bold mb-4">¡Hola!</h1>
          <p className="mb-4">Bienvenido a Trendify.</p>
          <p className="mb-4">
            Inicia sesión para poder acceder a la mejor herramienta de tendencias en el mercado.
          </p>
          <p className="mb-6">
            ¿Aún no tienes una cuenta? Regístrate dando clic en el siguiente botón.
          </p>
          <CustomButton
            texto="Registrarse"
            tipo="terciario"
            extraClases="text-center"
            ruta="/simple/registro"
          />
        </div>

        {/* Panel derecho: formulario de login */}
        <div className="p-8 md:w-1/2">
          <h2 className="text-3xl font-bold text-center mb-6">Iniciar Sesión</h2>

          {error && (
            <div className="text-red-600 text-sm mb-2 text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              name="email"
              value={credenciales.email}
              onChange={handleChange}
              type="email"
              placeholder="Correo Electrónico"
              className="w-full px-4 py-2 border rounded"
              required
            />
            <InputPassword
              value={credenciales.password}
              onChange={handleChange}
            />
            
            <ReCAPTCHA
              ref={captchaRef}
              sitekey={import.meta.env.VITE_GOOGLE_RECAPTCHA}
              onChange={(token) => setCaptchaToken(token)}
              className="flex justify-center"
            />

            <CustomButton
              texto={loading ? "Verificando..." : "Iniciar Sesión"}
              onClick={() => console.log("Iniciando sesión...")}
              tipo="primario"
              extraClases="text-center w-full"
              type="submit"
              disabled={loading}
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
