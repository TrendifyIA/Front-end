/**
 * @file RegistroUsuario.jsx
 * @author Eduardo Rosas
 * @description Pantalla para registrar usuarios
 */

import React, { useState } from 'react';
import CustomButton from '../components/CustomButton';
import ModalTerminos from '../components/ModalTerminos';
import ModalPrivacidad from '../components/ModalPrivacidad';
import InputPassword from '../components/InputPassword';

const Registro = () => {
  const [error, setError] = useState('');
  const [showTerminos, setShowTerminos] = useState(false);
  const [showPrivacidad, setShowPrivacidad] = useState(false);

  const [form, setForm] = useState({
    nombre: '',
    apellido_paterno: '',
    apellido_materno: '',
    email: '',
    password: '',
    acepta: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!form.acepta) {
      setError('Debes aceptar los términos.');
      return;
    }

    try {
      const response = await fetch('http://127.0.0.1:8080/usuario/registro', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Error en el registro');
        return;
      }

      alert('¡Registro exitoso!');
      setForm({ nombre: '', apellido_paterno: '', apellido_materno: '', email: '', password: '', acepta: false });
      window.location.href = '/simple/login';
    } catch (error) {
      console.error('Error:', error);
      setError('Hubo un problema con el registro.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-primary-500 font-sans">
      {/* MODALES */}
      {showTerminos && <ModalTerminos onClose={() => setShowTerminos(false)} />}
      {showPrivacidad && <ModalPrivacidad onClose={() => setShowPrivacidad(false)} />}

      {/* CONTENIDO */}
      <div className="flex flex-col md:flex-row bg-white rounded-lg shadow-lg overflow-hidden w-[90%] max-w-5xl">
        {/* Panel izquierdo */}
        <div className="bg-primary-500 text-white p-8 md:w-1/2 flex flex-col justify-center">
          <h1 className="text-5xl font-bold mb-4">¡Hola!</h1>
          <p className="mb-4">Bienvenido a Trendify.</p>
          <p className="mb-4">Regístrate para poder disfrutar de los beneficios de la mejor herramienta de tendencias en el mercado.</p>
          <p className="mb-6">¿Ya tienes una cuenta? Inicia sesión dando clic en el siguiente botón.</p>
          <CustomButton texto="Iniciar Sesión" tipo="terciario" extraClases="text-center" ruta="/simple/login" />
        </div>

        {/* Formulario */}
        <div className="p-8 md:w-1/2">
          <h2 className="text-3xl font-bold text-center mb-6">Registrarse</h2>
          {error && <div className="text-red-600 text-sm mb-2 text-center">{error}</div>}
          <form onSubmit={handleSubmit} className="space-y-4">
            <input name="nombre" value={form.nombre} onChange={handleChange} type="text" placeholder="Nombre(s)" className="w-full px-4 py-2 border rounded" />
            <input name="apellido_paterno" value={form.apellido_paterno} onChange={handleChange} type="text" placeholder="Apellido Paterno" className="w-full px-4 py-2 border rounded" />
            <input name="apellido_materno" value={form.apellido_materno} onChange={handleChange} type="text" placeholder="Apellido Materno" className="w-full px-4 py-2 border rounded" />
            <input name="email" value={form.email} onChange={handleChange} type="email" placeholder="Correo Electrónico" className="w-full px-4 py-2 border rounded" />
            <InputPassword value={form.password} onChange={handleChange} />

            <label className="flex items-center text-sm flex-wrap">
              <input name="acepta" type="checkbox" checked={form.acepta} onChange={handleChange} className="mr-2" />
              Acepto los
              <button type="button" onClick={() => setShowTerminos(true)} className="text-blue-600 underline mx-1">Términos y Condiciones</button>
              y
              <button type="button" onClick={() => setShowPrivacidad(true)} className="text-blue-600 underline ml-1">Política de Privacidad</button>
            </label>

            <CustomButton
              texto="Registrarse"
              onClick={() => console.log('Registrando...')}
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

export default Registro;
