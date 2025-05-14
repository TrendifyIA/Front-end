import React, { useState } from 'react';

const Login = () => {
  const [credenciales, setCredenciales] = useState({
    correo: '',
    contraseña: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredenciales({ ...credenciales, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Iniciando sesión con:', credenciales);
    // Aquí podrías llamar a tu API para autenticar
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-primary-500 font-sans">
      <div className="flex flex-col md:flex-row bg-white rounded-lg shadow-lg overflow-hidden w-[90%] max-w-5xl">
        {/* Panel izquierdo */}
        <div className="bg-primary-500 text-white p-8 md:w-1/2 flex flex-col justify-center">
          <h1 className="text-5xl font-bold mb-4">¡Hola!</h1>
          <p className="mb-4">Bienvenido a KeySpotting.</p>
          <p className="mb-4">Inicia sesión para poder acceder a la mejor herramienta de tendencias en el mercado.</p>
          <p className="mb-6">¿Aún no tienes una cuenta? Regístrate dando clic en el siguiente botón.</p>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">Registrarme</button>
        </div>

        {/* Formulario */}
        <div className="p-8 md:w-1/2">
          <h2 className="text-3xl font-bold text-center mb-6">Iniciar Sesión</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                name="correo"
                value={credenciales.correo}
                onChange={handleChange}
                type="email"
                placeholder="Correo Electrónico"
                className="w-full px-4 py-2 border rounded"
                required
              />
            </div>
            <div>
              <input
                name="contraseña"
                value={credenciales.contraseña}
                onChange={handleChange}
                type="password"
                placeholder="Contraseña"
                className="w-full px-4 py-2 border rounded"
                required
              />
            </div>
            <p className="text-sm">
              ¿Has olvidado tu contraseña? Da clic <a href="#" className="text-blue-600 underline">aquí</a> para poder recuperarla.
            </p>
            <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded">
              Iniciar Sesión
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
