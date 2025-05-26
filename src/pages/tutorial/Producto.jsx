/**
 * @file Producto.jsx
 * @author Jennyfer Jasso, ...
 * @description Página de formulario para registrar información de un producto en el tutorial.
 */

import { BsBoxSeam, BsArrowLeft, BsArrowRight } from "react-icons/bs";
import { FaCheck } from "react-icons/fa";
import { BsImage } from "react-icons/bs";
import { RiMegaphoneLine } from "react-icons/ri";
import CustomButton from "../../components/CustomButton";
import { useNavigate } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { ContextoTutorial } from "../../context/ProveedorTutorial";

const STORAGE_KEY = "tutorial_producto_form";

const Producto = () => {
  const navegar = useNavigate();
  const { producto, setProducto } = useContext(ContextoTutorial);
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
          imagenPreview: "",
        };
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(form));
  }, [form]);

  // useEffect(() => {
  //   if (form.ruta_img && form.imagenPreview) {
  //     return;
  //   }
  //   if (form.ruta_img) {
  //     const img = new Image();
  //     img.src = form.ruta_img;
  //     img.onload = () => {
  //       setForm((prev) => ({
  //         ...prev,
  //         imagenPreview: img.src,
  //       }));
  //     };
  //   }
  // }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: name === "estado" ? Number(value) : value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setForm((prev) => ({
        ...prev,
        ruta_img: file.name, // Solo el nombre para la base de datos
        imagenPreview: URL.createObjectURL(file), // Preview temporal
      }));
    }
  };

  const handleNext = (e) => {
    e.preventDefault();
    setProducto(form);
    navegar("/tutorial/Campana");
  };

  const handleBack = (e) => {
    e.preventDefault();
    setProducto(form);
    navegar("/tutorial/Empresa");
  };

  return (
    <div className="bg-gray-100 min-h-screen font-sans">
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

      <div className="bg-white mx-auto max-w-3xl p-8 rounded shadow">
        <h2 className="text-4xl font-bold mb-6">Producto</h2>

        <form>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block mb-1 font-medium">Nombre</label>
              <input
                required
                type="text"
                id="nombreProducto"
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
                id="categoria"
                name="categoria"
                value={form.categoria}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2 cursor-pointer"
              >
                <option value="">Seleccione una categoría</option>
                <option value="Accesorios de moda">Accesorios de moda</option>
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
            <input
              required
              type="text"
              id="descripcion"
              name="descripcion"
              value={form.descripcion}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block mb-1 font-medium">Público objetivo</label>
              <input
                required
                type="text"
                id="publico_objetivo"
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
                id="estado"
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

          <div className="mb-6">
            <label className="block mb-2 font-medium">Imagen de producto</label>

            <label
              htmlFor="imagen"
              className="border-2 border-dashed border-gray-400 rounded p-6 text-center cursor-pointer flex flex-col items-center justify-center text-gray-500 hover:bg-gray-50 transition"
            >
              <BsImage className="text-4xl mb-2" />
              <span>+ Añadir imagen</span>
              <input
                type="file"
                id="imagen"
                name="imagen"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
                // onChange={(e) => {
                //   const file = e.target.files?.[0];
                //   if (file) {
                //     setForm((prev) => ({
                //       ...prev,
                //       ruta_img: file.name,
                //     }));
                //     document.getElementById(
                //       "nombre-imagen"
                //     ).textContent = `Imagen seleccionada: ${file.name}`;
                //   }
                // }}
              />
            </label>
            {form.imagenPreview && (
              <img
                src={form.imagenPreview}
                alt="Imagen de producto"
                className="mt-2 max-h-50 rounded shadow"
              />
            )}

            <p id="nombre-imagen" className="text-sm text-gray-600 mt-2 italic">
              {form.ruta_img ? `Imagen seleccionada: ${form.ruta_img}` : ""}
            </p>
          </div>

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
