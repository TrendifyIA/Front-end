import React, { useState } from 'react';

const Registro = () => {
  const [form, setForm] = useState({
    nombre: '',
    apellidoPaterno: '',
    apellidoMaterno: '',
    correo: '',
    contraseña: '',
    rol: '',
    acepta: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.acepta) return alert('Debes aceptar los términos.');
    console.log(form);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-primary-500 font-sans">
      <div className="flex flex-col md:flex-row bg-white rounded-lg shadow-lg overflow-hidden w-[90%] max-w-5xl">
        {/* Panel izquierdo */}
        <div className="bg-primary-500 text-white p-8 md:w-1/2 flex flex-col justify-center">
          <h1 className="text-8xl font-bold mb-14"><u>Hola!</u></h1>
          <p className="mb-4">Bienvenido a KeySpotting.</p>
          <p className="mb-4">Regístrate para poder disfrutar de los beneficios de la mejor herramienta de tendencias en el mercado.</p>
          <p className="mb-6">¿Ya tienes una cuenta? Inicia sesión dando clic en el siguiente botón.</p>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">Iniciar Sesión</button>
        </div>

        {/* Formulario */}
        <div className="p-8 md:w-1/2">
          <h2 className="text-3xl font-bold text-center mb-6">Registrarse</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input name="nombre" value={form.nombre} onChange={handleChange} type="text" placeholder="Nombre(s)" className="w-full px-4 py-2 border rounded" />
            <input name="apellidoPaterno" value={form.apellidoPaterno} onChange={handleChange} type="text" placeholder="Apellido Paterno" className="w-full px-4 py-2 border rounded" />
            <input name="apellidoMaterno" value={form.apellidoMaterno} onChange={handleChange} type="text" placeholder="Apellido Materno" className="w-full px-4 py-2 border rounded" />
            <input name="correo" value={form.correo} onChange={handleChange} type="email" placeholder="Correo Electrónico" className="w-full px-4 py-2 border rounded" />
            <input name="contraseña" value={form.contraseña} onChange={handleChange} type="password" placeholder="Contraseña" className="w-full px-4 py-2 border rounded" />
            <select name="rol" value={form.rol} onChange={handleChange} className="w-full px-4 py-2 border rounded">
              <option value="">Soy...</option>
              <option value="estudiante">Colaborador</option>
              <option value="profesional">Administrador</option>
            </select>
            <label className="flex items-center text-sm">
              <input name="acepta" type="checkbox" checked={form.acepta} onChange={handleChange} className="mr-2" />
              Acepta nuestras <a href="#" className="text-blue-600 underline ml-1">Condiciones de uso</a> y <a href="#" className="text-blue-600 underline ml-1">Política de privacidad</a>
            </label>
            <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded">Registrarme</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Registro;
