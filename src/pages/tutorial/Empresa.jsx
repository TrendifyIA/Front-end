/**
 * @file Empresa.jsx
 * @author Sandra Herrera, Jennyfer Jasso
 * @description Página de formulario para registrar información de una empresa en el tutorial.
 */

import {
  BsBuildings,
  BsBoxSeam,
  BsArrowLeft,
  BsArrowRight,
} from "react-icons/bs";
import { RiMegaphoneLine } from "react-icons/ri";
import CustomButton from "../../components/CustomButton";
import { ContextoTutorial } from "../../context/ProveedorTutorial";
import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Clave para almacenar el formulario en localStorage
const STORAGE_KEY = "tutorial_empresa_form";

/**
 * @component Permite guardar y recuperar datos del formulario usando localStorage y contexto.
 * @returns {JSX.Element} Elemento JSX con el formulario de empresa.
 */
const TutorialEmpresa = () => {
  const navegar = useNavigate();
  const { empresa, setEmpresa } = useContext(ContextoTutorial);

  // Estado local del formulario, inicializado desde localStorage o contexto
  const [form, setForm] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved
      ? JSON.parse(saved)
      : empresa || {
          nombre: "",
          nicho: "",
          direccion: "",
          propuesta_valor: "",
          descripcion_servicio: "",
          competidores: "",
        };
  });

  // Guarda el formulario en localStorage cada vez que cambia
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(form));
  }, [form]);

  /**
   * Maneja los cambios en los campos del formulario.
   * @param {Object} e Evento de cambio del input.
   */
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  /**
   * Guarda los datos y navega a la siguiente pantalla.
   * @param {Object} e Evento de submit.
   */
  const handleNext = (e) => {
    e.preventDefault();
    const camposIncompletos = Object.entries(form).some(
      ([_, valor]) => !valor.trim()
    );

    if (camposIncompletos) {
      setError("Por favor, complete todos los campos antes de continuar.");
      return;
    }

    setError("");
    localStorage.setItem(STORAGE_KEY, JSON.stringify(form));
    setEmpresa(form);
    navegar("/tutorial/Producto");
  };

  /**
   * Guarda los datos y navega a la pantalla anterior.
   * @param {Object} e Evento de submit.
   */
  const handleBack = (e) => {
    e.preventDefault();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(form));
    setEmpresa(form);
    navegar("/tutorial");
  };

  return (
    // Contenedor principal de la página
    <div className="bg-gray-100 min-h-screen font-sans">
      <div className="bg-[#0B2C63] text-white p-6">
        <h1 className="text-lg font-semibold">
          Por favor, complete los siguientes campos para registrar su empresa.
        </h1>
        <p className="text-sm">
          Asegúrese de completar todos los campos para obtener resultados más
          precisos y útiles en el análisis.
        </p>
      </div>

      {/* Línea de progreso */}
      <div className="flex justify-center items-center my-12 space-x-8">
        {/* Paso Empresa */}
        <div className="flex flex-col items-center">
          <div className="border-4 border-[#0B2C63] text-[#0B2C63] rounded-full p-3 text-xl bg-white">
            <BsBuildings />
          </div>
          <p className="mt-2 text-sm font-medium text-[#0B2C63]">Empresa</p>
        </div>
        <div className="h-1 w-50 bg-gray-300"></div>
        {/* Paso Producto */}
        <div className="flex flex-col items-center">
          <div className="border-4 border-gray-400 text-gray-400 rounded-full p-3 text-xl bg-white">
            <BsBoxSeam />
          </div>
          <p className="mt-2 text-sm font-medium text-gray-400">Producto</p>
        </div>
        <div className="h-1 w-50 bg-gray-300"></div>
        {/* Paso Campaña */}
        <div className="flex flex-col items-center opacity-50">
          <div className="border-4 border-gray-400 text-gray-400 rounded-full p-3 text-xl bg-white">
            <RiMegaphoneLine />
          </div>
          <p className="mt-2 text-sm font-medium text-gray-400">Campaña</p>
        </div>
      </div>

      {/* Formulario de empresa */}
      <div className="bg-white mx-auto max-w-3xl p-8 rounded shadow">
        <h2 className="text-4xl font-bold mb-6">Empresa</h2>

        {error && (
          <div className="mb-6 p-3 bg-red-100 text-red-700 border border-red-400 rounded">
            {error}
          </div>
        )}

        <form>
          <div className="flex flex-row gap-4 w-full">
            <div className="flex flex-col gap-2 mb-4 w-1/2">
              <label htmlFor="nameCompany" className="font-medium">
                Nombre de la empresa
              </label>
              <input
                required
                type="text"
                id="nameCompany"
                name="nombre"
                value={form.nombre}
                onChange={handleChange}
                className="border-2 border-neutral-400 p-2 rounded-[5px] focus:outline-none focus:border-secondary-400"
              />
            </div>
            <div className="flex flex-col gap-2 mb-4 w-1/2">
              <label htmlFor="nicho" className="font-medium">
                Sector de mercado
              </label>
              <select
                required
                id="nicho"
                name="nicho"
                value={form.nicho}
                onChange={handleChange}
                className="border-2 border-neutral-400 p-2 rounded-[5px] focus:outline-none focus:border-secondary-400"
              >
                <option value="">Selecciona una sector</option>
                <option value="Moda y belleza">Moda y belleza</option>
                <option value="Alimentos y bebidas">Alimentos y bebidas</option>
                <option value="Salud y bienestar">Salud y bienestar</option>
                <option value="Tecnología">Tecnología</option>
                <option value="Educación">Educación</option>
                <option value="Transporte">Transporte</option>
                <option value="Hogar y decoración">Hogar y decoración</option>
                <option value="Entretenimiento">Entretenimiento</option>
              </select>
            </div>
          </div>

          <div className="flex flex-col gap-2 mb-4 w-full">
            <label htmlFor="location" className="font-medium">
              Dirección física
            </label>
            <input
              required
              type="text"
              id="location"
              name="direccion"
              value={form.direccion}
              onChange={handleChange}
              className="border-2 border-neutral-400 p-2 rounded-[5px] focus:outline-none focus:border-secondary-400"
            />
          </div>

          <div className="flex flex-col gap-2 mb-4 w-full">
            <label className="font-medium">Propuesta de valor</label>
            <input
              required
              type="text"
              name="propuesta_valor"
              value={form.propuesta_valor}
              onChange={handleChange}
              className="border-2 border-neutral-400 p-2 rounded-[5px] focus:outline-none focus:border-secondary-400"
            />
          </div>

          <div className="flex flex-col gap-2 mb-4 w-full">
            <label className="font-medium">
              Descripción de servicios/productos
            </label>
            <input
              required
              type="text"
              name="descripcion_servicio"
              value={form.descripcion_servicio}
              onChange={handleChange}
              className="border-2 border-neutral-400 p-2 rounded-[5px] focus:outline-none focus:border-secondary-400"
            />
          </div>

          <div className="flex flex-col gap-2 mb-4 w-full">
            <label className="font-medium">Competidores</label>
            <input
              required
              type="text"
              name="competidores"
              value={form.competidores}
              onChange={handleChange}
              className="border-2 border-neutral-400 p-2 rounded-[5px] focus:outline-none focus:border-secondary-400"
            />
          </div>

          {/* Botones de navegación */}
          <div className="flex justify-between px-10">
            <CustomButton
              texto={<BsArrowLeft className="text-2xl" />}
              onClick={handleBack}
              extraClases="bg-[#0c1f57] text-white px-6 py-3 rounded-md"
            />
            <CustomButton
              texto={<BsArrowRight className="text-2xl" />}
              onClick={handleNext}
              extraClases="bg-[#0c1f57] text-white px-6 py-3 rounded-md"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default TutorialEmpresa;
