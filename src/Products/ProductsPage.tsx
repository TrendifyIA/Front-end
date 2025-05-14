import { FaEdit, FaTrashAlt, FaSyncAlt } from "react-icons/fa";

const ProductsPage = () => {
  const productos = [
    {
      nombre: "Sabritas limón",
      campañas: [
        { nombre: "Menos sodio", estatus: "Procesado" },
        { nombre: "Más producto", estatus: "Procesado" },
      ],
    },
    {
      nombre: "Sabritas adobadas",
      campañas: [{ nombre: "Salsa secreta", estatus: "Procesado" }],
    },
    {
      nombre: "Sabritas habanero",
      campañas: [{ nombre: "Añadir", estatus: "Sin procesar" }],
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-6">
        Empresa: Sabritas
      </h1>

      <div className="mb-6">
        <button className="border border-blue-600 text-blue-600 px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-50">
          + Agregar producto
        </button>
      </div>

      <div className="mb-6 flex gap-4">
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

      <div className="rounded-lg bg-white shadow overflow-x-auto">
        <table className="w-full table-fixed">
          <thead className="bg-gray-100">
            <tr>
              {["Nombre del producto", "Campaña", "Estatus", "Acciones"].map(
                (header) => (
                  <th
                    key={header}
                    className="px-6 py-3 text-left text-sm font-semibold text-gray-700"
                  >
                    {header}
                  </th>
                )
              )}
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {productos.map((producto, productoIndex) =>
              producto.campañas.map((campaña, campañaIndex) => (
                <tr key={`${productoIndex}-${campañaIndex}`}>
                  {campañaIndex === 0 && (
                    <td
                      rowSpan={producto.campañas.length}
                      className="px-6 py-4 text-sm text-gray-900 font-medium align-middle"
                    >
                      {producto.nombre}
                    </td>
                  )}

                  <td className="px-6 py-4 text-sm text-blue-600 font-medium">
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

                  <td className="px-6 py-4">
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

                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button className="flex items-center gap-1 bg-blue-600 text-white px-3 py-1 rounded-md text-sm hover:bg-blue-700">
                        <FaEdit className="text-white" />
                        Editar
                      </button>
                      <button className="flex items-center gap-1 bg-red-600 text-white px-3 py-1 rounded-md text-sm hover:bg-red-700">
                        <FaTrashAlt className="text-white" />
                        Eliminar
                      </button>
                      <button className="flex items-center gap-1 bg-gray-400 text-white px-3 py-1 rounded-md text-sm hover:bg-gray-500">
                        <FaSyncAlt className="text-white" />
                        Procesar
                      </button>
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
