/**
 * @file Producto.jsx
 * @author Andrea Doce, Jennyfer Jasso
 * @description Página de formulario para registrar información de un producto en el tutorial.
 */
import { BsBoxSeam, BsArrowLeft, BsArrowRight, BsImage } from "react-icons/bs";
import { FaCheck } from "react-icons/fa";
import { RiMegaphoneLine } from "react-icons/ri";
import CustomButton from "../../components/CustomButton";
import { useNavigate } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { ContextoTutorial } from "../../context/ProveedorTutorial";
import { LuMousePointerClick } from "react-icons/lu";

// Almacena el estado del formulario en el localStorage
const STORAGE_KEY = "tutorial_producto_form";

/**
 * componente que representa la página de Producto en el tutorial.
 * Permite al usuario ingresar información sobre un producto.
 * Se guarda la información localmente y permite navegar entre pasos del tutorial.
 * @returns {JSX.Element} Componente de la página de Producto.
 */
const Producto = () => {
  const navegar = useNavigate();
  // Obtiene el estado del producto del contexto del tutorial
  const { producto, setProducto } = useContext(ContextoTutorial);
  // Estado del formulario, recupera datos del localStorage
  const [form, setForm] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved
      ? JSON.parse(saved)
      : producto || {
          nombre: "",
          categoria: "",
          descripcion: "",
          publico_objetivo: "",
          estado: "",
          ruta_img: "",
          img_preview: "",
          // imagenFile: null,
          image_name: ""
        };
  });

<<<<<<< HEAD

  // Almacena el formulario en localStorage cada vez que cambia
=======
  //UseEffect para guardar el estado del formulario en el localStorage al modificarlo.
>>>>>>> 3c0857c75cbf2648f5753862aa6e16c52d3318c4
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(form));
  }, [form]);
  
  useEffect(() => {
    if (form.ruta_img && form.img_preview) {
      return;
    }
    if (form.ruta_img && typeof form.ruta_img === "string") {
      const img = new Image();
      img.src = form.ruta_img;
      img.onload = () => {
        setForm((prev) => ({
          ...prev,
          img_preview: img.src,
        }));
      };
    }
  }, []);
  
  /**
   * maneja los cambios de los campos del formulario.
   * @param {React.ChangeEvent<HTMLInputElement>} e - Evento de cambio del input.
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: name === "estado" ? Number(value) : value,
    });
  };

  /**
   * maneja el cambio de la imagen del producto, genera vista previa y actualiza el estado del formulario.
   * @param {React.ChangeEvent<HTMLInputElement>} e - Evento de cambio del input.
   */
  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        // 5MB
        setMensaje("La imagen no debe exceder los 5MB.");
        return;
      }
      setForm((prev) => ({
        ...prev,
        ruta_img: file,
        img_preview: URL.createObjectURL(file),
        image_name: file.name
        // imagenFile: file,
      }));
      
    }
    // console.log("Imagen seleccionada:", file);
  };

  /**
   * Navega a la página de confirmación del tutorial y guarda el estado del producto.
   * @param {React.FormEvent<HTMLFormElement>} e - Evento de envío del formulario.
   */
  const handleNext = (e) => {
    e.preventDefault();

    // Validar campos requeridos
    const camposIncompletos = [
      "nombre",
      "categoria",
      "descripcion",
      "publico_objetivo",
      "estado",
    ].some((campo) => !form[campo]?.toString().trim());

    if (camposIncompletos || !form.ruta_img) {
      setError("Por favor, complete todos los campos y seleccione una imagen.");
      return;
    }      

    setError("");
    setProducto(form);
    console.log("Imagen del producto:", form.ruta_img);
    navegar("/tutorial/Campana");
  };

  /**
   * Navega al paso anterior del tutorial (Empresa) y guarda el estado del producto.
   * @param {React.FormEvent<HTMLFormElement>} e - Evento de envío del formulario.
   */
  const handleBack = (e) => {
    e.preventDefault();
    setProducto(form);
    navegar("/tutorial/Empresa");
  };

  return (
    <div className="bg-gray-100 min-h-screen font-sans">
      {/* Encabezado informativo */}
      <div className="bg-[#0B2C63] text-white p-6">
        <h1 className="text-lg font-semibold">
          Por favor, complete los siguientes campos para registrar el producto
          que se desea analizar.
        </h1>
        <p className="text-sm">
          Asegúrese de completar todos los campos para obtener resultados más
          precisos y útiles en el análisis.
        </p>
      </div>

      {/* Barra de progreso del tutorial */}
      <div className="flex justify-center items-center my-12 space-x-8">
        <div className="flex flex-col items-center">
          <div className="bg-green-600 text-white rounded-full p-3 text-xl">
            <FaCheck />
          </div>
          <p className="mt-2 text-sm font-medium text-green-700">Empresa</p>
        </div>
        <div className="h-1 w-50 bg-green-600"></div>

        <div className="flex flex-col items-center">
          <div className="border-4 border-[#0B2C63] text-[#0B2C63] rounded-full p-3 text-xl bg-white">
            <BsBoxSeam />
          </div>
          <p className="mt-2 text-sm font-medium text-[#0B2C63]">Producto</p>
        </div>
        <div className="h-1 w-50 bg-gray-300"></div>

        <div className="flex flex-col items-center opacity-50">
          <div className="border-4 border-gray-400 text-gray-400 rounded-full p-3 text-xl bg-white">
            <RiMegaphoneLine />
          </div>
          <p className="mt-2 text-sm font-medium text-gray-400">Campaña</p>
        </div>
      </div>

      {/* Formulario de Producto */}
      <div className="bg-white mx-auto max-w-3xl p-8 rounded shadow">
        <h2 className="text-4xl font-bold mb-6">Producto</h2>

        {error && (
          <div className="mb-6 p-3 bg-red-100 text-red-700 border border-red-400 rounded">
            {error}
          </div>
        )}

        <form>
          {/* Nombre y categoría del producto */}
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
              <label className="block mb-1 font-medium">Categoría</label>
              <select
                required
                name="categoria"
                value={form.categoria}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2 cursor-pointer"
              >
                <option value="">Seleccione una categoría</option>
                <option value="Accesorios de moda">Accesorios de moda</option>
                Add commentMore actions
                <option value="Alimentos">Alimentos</option>
                <option value="Artículos promocionales">
                  Artículos promocionales
                </option>
                <option value="Bebidas">Bebidas</option>
                <option value="Calzado">Calzado</option>
                <option value="Cosméticos">Cosméticos</option>
                <option value="Decoración para el hogar">
                  Decoración para el hogar
                </option>
                <option value="Dispositivos médicos">
                  Dispositivos médicos
                </option>
                <option value="Electrodomésticos">Electrodomésticos</option>
                <option value="Electrónicos">Electrónicos</option>
                <option value="Gadgets tecnológicos">
                  Gadgets tecnológicos
                </option>
                <option value="Herramientas y equipos">
                  Herramientas y equipos
                </option>
                <option value="Higiene personal">Higiene personal</option>
                <option value="Juguetes">Juguetes</option>
                <option value="Libros y material educativo">
                  Libros y material educativo
                </option>
                <option value="Materiales de construcción">
                  Materiales de construcción
                </option>
                <option value="Medicamentos">Medicamentos</option>
                <option value="Muebles">Muebles</option>
                <option value="Papelería y oficina">Papelería y oficina</option>
                <option value="Prendas de vestir">Prendas de vestir</option>
                <option value="Productos artesanales">
                  Productos artesanales
                </option>
                <option value="Productos de limpieza">
                  Productos de limpieza
                </option>
                <option value="Productos deportivos">
                  Productos deportivos
                </option>
                <option value="Productos ecológicos">
                  Productos ecológicos
                </option>
                <option value="Productos infantiles">
                  Productos infantiles
                </option>
                <option value="Productos para mascotas">
                  Productos para mascotas
                </option>
                <option value="Refacciones y autopartes">
                  Refacciones y autopartes
                </option>
                <option value="Software y aplicaciones">
                  Software y aplicaciones
                </option>
                <option value="Suplementos alimenticios">
                  Suplementos alimenticios
                </option>
                <option value="Vehículos">Vehículos</option>
              </select>
            </div>
          </div>

          <div className="mb-4">
            <label className="block mb-1 font-medium">Descripción</label>
            <textarea
              required
              name="descripcion"
              value={form.descripcion}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />
          </div>
          {/* Público objetivo y estado del producto */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block mb-1 font-medium">Público objetivo</label>
              <input
                required
                type="text"
                name="publico_objetivo"
                value={form.publico_objetivo}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Estado</label>
              <select
                required
                name="estado"
                value={form.estado}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2 cursor-pointer"
              >
                <option value="">Seleccione el estado del producto</option>
                <option value={1}>Continuado</option>
                <option value={0}>Descontinuado</option>
              </select>
            </div>
          </div>

          {/* Imagen del producto */}
          <div className="mb-6">
            <label className="block mb-2 font-medium">Imagen de producto</label>

            <label
              htmlFor="imagen"
              className="border-2 border-dashed border-gray-400 rounded p-6 text-center cursor-pointer flex flex-col items-center justify-center text-gray-500 hover:bg-gray-50 transition"
            >
              <input
                type="file"
                id="imagen"
                name="imagen"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
              {form.img_preview ? (
                <>
                  <img
                    src={form.img_preview}
                    alt={`Imagen del producto ${form.nombre}`}
                    className="w-30 h-30 object-contain mb-2 rounded"
                  />
                  <span className="flex items-center gap-1 justify-center">
                    <LuMousePointerClick /> Cambiar imagen
                  </span>
                </>
              ) : (
                <>
                  <BsImage className="text-4xl mb-2" />
                  <span>+ Añadir imagen</span>
                </>
              )}
            </label>

            <p id="nombre-imagen" className="text-sm text-gray-600 mt-2 italic">
              {form.ruta_img ? `Imagen seleccionada: ${form.image_name}` : ""}
            </p>
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

export default Producto;
