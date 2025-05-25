import { FaEdit, FaTrashAlt, FaSyncAlt, FaCheck } from "react-icons/fa";
import sabritaslimon from '../../assets/images/sabritaslimon.png';
import sabritasadobadas from '../../assets/images/sabritasadobadas.png';
import sabritashabanero from '../../assets/images/sabritashabanero.png';
import ProductImage from './ProductImage'; // Importa el nuevo componente
import { useEffect, useState } from "react";

const ProductsPage = () => {

  const productosEjemplo = [
    {
      nombre: "Sabritas limón",
      imagen: sabritaslimon,
      campañas: [
        { nombre: "Menos sodio", estatus: "Procesado" },
        { nombre: "Más producto", estatus: "Procesado" },
      ],
    },
  ];

 
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
            {productosEjemplo.map((producto, productoIndex) =>
              producto.campañas.map((campaña, campañaIndex) => (
                <tr key={`${productoIndex}-${campañaIndex}`}>
                  {campañaIndex === 0 && (
                    <td
                      rowSpan={producto.campañas.length}
                      className="px-4 py-3 text-sm text-gray-900 font-medium align-middle w-1/4"
                    >
                      <div className="flex items-center">
                        <ProductImage 
                          src={producto.imagen}
                          alt={producto.nombre}
                          className="w-16 h-16 mr-2"
                        />
                        <span>{producto.nombre}</span>
                      </div>
                    </td>
                  )}

                  <td className="px-4 py-3 text-sm text-blue-600 font-medium w-1/4">
                    {campaña.nombre === "Añadir" ? (
                      <button className="bg-blue-600 text-white px-3 py-1 rounded-md text-sm hover:bg-blue-700">
                        + Añadir
                      </button>
                    ) : (
                      <span className="hover:underline cursor-pointer">
                        {campaña.nombre} <span className="ml-1">›</span>
                      </span>
                    )}
                  </td>

                  <td className="px-4 py-3 w-1/6">
                    <span
                      className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${
                        campaña.estatus === "Procesado"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {campaña.estatus}
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
                      {campaña.estatus === "Sin procesar" ? (
                        <button className="flex items-center gap-1 bg-gray-400 text-white px-3 py-1 rounded-md text-sm hover:bg-gray-500">
                          <FaSyncAlt className="text-white" />
                          Procesar
                        </button>
                      ) : (
                        <button className="flex items-center gap-1 bg-green-600 text-white px-3 py-1 rounded-md text-sm hover:bg-green-700">
                          <FaCheck className="text-white" />
                          Visualizar
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductsPage;