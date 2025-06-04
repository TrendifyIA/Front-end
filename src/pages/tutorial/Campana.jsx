/**
 * @file Campana.jsx
 * @author Jennyfer Jasso, Eduardo Rosas, ...
 * @description Página de formulario para registrar información de una campaña en el tutorial.
 */
import { BsBoxSeam, BsArrowLeft, BsArrowRight } from "react-icons/bs";
import { RiMegaphoneLine } from "react-icons/ri";
import { FaCheck } from "react-icons/fa";
import CustomButton from "../../components/CustomButton";
import { ContextoTutorial } from "../../context/ProveedorTutorial";
import { useNavigate } from "react-router-dom";
import { useContext, useState, useEffect } from "react";

const STORAGE_KEY = "tutorial_campana_form";

/**
 * Componente de formulario que permite al usuario registrar los datos de una campaña
 * como parte del proceso guiado del tutorial.
 * Guarda los datos en localStorage para persistencia entre recargas.
 *
 * @returns {JSX.Element} Formulario de campaña con navegación entre pasos del tutorial.
 */
const Campana = () => {
  const navegar = useNavigate();
  const { campana, setCampana } = useContext(ContextoTutorial); // Contexto para manejar el estado de la campaña

  // Estado local para manejar el formulario de campaña
  const [form, setForm] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved
      ? JSON.parse(saved)
      : campana || {
          nombre: "",
          objetivo: "",
          mensaje_clave: "",
          f_inicio: "",
          f_fin: "",
          presupuesto: "",
          canales_distribucion: "",
        };
  });

  // Almacena el formulario en localStorage cada vez que cambia
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(form));
  }, [form]);

  /**
   * Maneja el cambio de cualquier input del formulario
   *
   * @param {React.ChangeEvent<HTMLInputElement>} e
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: name === "presupuesto" ? Number(value) : value,
    });
  };

  /**
   * Maneja la navegación al siguiente paso, guardando la campaña en el contexto global
   *
   * @param {React.FormEvent} e
   */
  const handleNext = (e) => {
    e.preventDefault();

    const camposRequeridos = [
      "nombre",
      "objetivo",
      "mensaje_clave",
      "f_inicio",
      "f_fin",
      "presupuesto",
      "canales_distribucion",
    ];

    const camposIncompletos = camposRequeridos.some(
      (campo) => !form[campo]?.toString().trim()
    );

    if (camposIncompletos || Number(form.presupuesto) <= 0) {
      setError("Por favor, complete todos los campos y asegúrese de que el presupuesto sea mayor a 0.");
      return;
    }

    setError("");
    setCampana(form);
    navegar("/tutorial/confirmacion");
  };

  /**
   * Maneja la navegación al paso anterior, guardando la campaña en el contexto global
   * @param {React.FormEvent} e
   */
  const handleBack = (e) => {
    e.preventDefault();
    setCampana(form);
    navegar("/tutorial/Producto");
  };

  return (
    <div className="bg-gray-100 min-h-screen font-sans">
      <div className="bg-[#0B2C63] text-white p-6">
        <h1 className="text-lg font-semibold">
          Por favor, complete los siguientes campos para registrar la campaña que se desea analizar.
        </h1>
        <p className="text-sm">
          La información ingresada permitirá identificar aspectos clave de la campaña y facilitará la detección de tendencias relevantes.
        </p>
        <p className="text-sm">
          Asegúrese de completar todos los campos para obtener resultados más precisos y útiles en el análisis.
        </p>
      </div>

      {/* Línea de progreso */}
      <div className="flex justify-center items-center my-12 space-x-8">
        <div className="flex flex-col items-center">
          <div className="bg-green-600 text-white rounded-full p-3 text-xl">
            <FaCheck />
          </div>
          <p className="mt-2 text-sm font-medium text-green-700">Empresa</p>
        </div>
        <div className="h-1 w-50 bg-green-600"></div>

        <div className="flex flex-col items-center">
          <div className="bg-green-600 text-white rounded-full p-3 text-xl">
            <FaCheck />
          </div>
          <p className="mt-2 text-sm font-medium text-green-700">Producto</p>
        </div>
        <div className="h-1 w-50 bg-green-600"></div>

        <div className="flex flex-col items-center">
          <div className="border-4 border-[#0B2C63] text-[#0B2C63] rounded-full p-3 text-xl bg-white">
            <RiMegaphoneLine />
          </div>
          <p className="mt-2 text-sm font-medium text-[#0B2C63]">Campaña</p>
        </div>
      </div>

      {/* Formulario de campaña */}
      <div className="bg-white mx-auto max-w-3xl p-8 rounded shadow">
        <h2 className="text-4xl font-bold mb-6">Campaña</h2>
        <form>
          {/* Campos de texto */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block mb-1 font-medium">Nombre</label>
              <input
                required
                type="text"
                name="nombre"
                value={form.nombre}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Objetivo</label>
              <input
                required
                type="text"
                name="objetivo"
                value={form.objetivo}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block mb-1 font-medium">Mensaje clave</label>
            <input
              required
              type="text"
              name="mensaje_clave"
              value={form.mensaje_clave}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1 font-medium">Canales de distribución</label>
            <input
              required
              type="text"
              name="canales_distribucion"
              value={form.canales_distribucion}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />
          </div>

          {/* Fechas y presupuesto */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <label className="block mb-1 font-medium">Fecha de inicio</label>
              <input
                required
                type="date"
                name="f_inicio"
                value={form.f_inicio}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Fecha final</label>
              <input
                required
                type="date"
                name="f_fin"
                value={form.f_fin}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Presupuesto</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500 text-sm">$</span>
                <input
                  required
                  type="number"
                  min="0"
                  step="0.01"
                  name="presupuesto"
                  value={form.presupuesto}
                  onChange={handleChange}
                  className="w-full border rounded pl-8 pr-3 py-2"
                  placeholder="0.00"
                />
              </div>
            </div>
          </div>

          {/* Navegación*/}
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

export default Campana;
