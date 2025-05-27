import { FaEdit, FaTrashAlt, FaSyncAlt, FaCheck } from "react-icons/fa";
import ProductImage from './users/ProductImage';
import { useEffect, useState } from "react";

const ProductsPage = () => {

  const [productos, setProductos] = useState([]);
  useEffect(() => {
  const idEmpresa = 4;
  fetch(`http://localhost:8080/producto/productos/${idEmpresa}`)
    .then(response => response.json())
    .then(data => {
      console.log("Productos:", data);
      setProductos(data);
    })
    .catch(error => console.error("Error al obtener productos:", error));
}, []);


 
  const [campanas, setCampanas] = useState([]);

  useEffect(() => {
    console.log("Descargando campañas...");
    fetch("http://localhost:8080/campana/campanas")
      .then((response) => response.json())
      .then((data) => {
        console.log("Campañas recibidas:", data);
        setCampanas(data);
      })
      .catch((error) => console.error("Error al obtener campañas:", error));
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-4">Empresa: Sabritas</h1>

      <div className="mb-4">
        <button className="border border-blue-600 text-blue-600 px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-50">
          + Agregar producto
        </button>
      </div>

      <div className="mb-4 flex gap-4">
        <input
          type="text"
          placeholder="Ingresa un producto o campaña"
          className="flex-1 rounded-md border border-gray-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <select className="w-48 rounded-md border border-gray-300 px-4 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option value="">Estatus</option>
          <option value="Procesado">Procesado</option>
          <option value="Sin procesar">Sin procesar</option>
        </select>
      </div>

      <div className="rounded-lg bg-white shadow">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 w-1/4">
                Nombre del producto
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 w-1/4">
                Campaña
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 w-1/6">
                Estatus
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 w-1/3">
                Acciones
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {productos.map((producto, productoIndex) => (
              console.log("Producto:", producto),
              <tr key={productoIndex}>
                <td className="px-4 py-3 text-sm text-gray-900 font-medium align-middle w-1/4">
                  <div className="flex items-center">
                    <ProductImage 
                      src={producto.ruta_img} // URL Cloudinary
                      alt={producto.nombre}
                      className="w-16 h-16 mr-2"
                    />
                    <span>{producto.nombre}</span>
                  </div>
                </td>

                <td className="px-4 py-3 text-sm text-blue-600 font-medium w-1/4">
                  <span className="text-gray-600">Sin campañas</span>
                </td>

                <td className="px-4 py-3 w-1/6">
                  <span className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${producto.estado === "1" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}`}>
                    {producto.estado === "1" ? "Activo" : "Inactivo"}
                  </span>
                </td>

                <td className="px-4 py-3 w-1/3">
                  <div className="flex gap-2">
                    <button className="flex items-center gap-1 bg-blue-600 text-white px-3 py-1 rounded-md text-sm hover:bg-blue-700">
                      <FaEdit className="text-white" />
                      Editar
                    </button>
                    <button className="flex items-center gap-1 bg-red-600 text-white px-3 py-1 rounded-md text-sm hover:bg-red-700">
                      <FaTrashAlt className="text-white" />
                      Eliminar
                    </button>
                  </div>
                </td>
              </tr>
            ))}

          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductsPage;