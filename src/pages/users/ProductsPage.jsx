/**
 * @file ProductsPage.jsx
 * @author Min Che Kim
 * @description Página principal que muestra la tabla de productos y sus campañas asociadas.
 *              Permite agregar nuevos productos y gestionar los existentes.
 */

import { useContext  } from "react";
import ListaProductos from "../../components/ListaProductos";
import { ModalContext } from "../../context/ProveedorModal";
import Procesando from "./Procesando"
import { ProcesamientoContext } from "../../context/ProveedorProcesado";

/**
 * Página que muestra los productos de la empresa y sus campañas asociadas
 * 
 * @component
 * @returns {JSX.Element} Página completa con tabla de productos y campañas
 */
const ProductsPage = () => {

  const { abrirProductoModal } = useContext(ModalContext);
  const { procesando } = useContext(ProcesamientoContext)

  return (
    <div className="min-h-screen bg-gray-100 p-6 relative">
      {procesando && <Procesando />}
      <h1 className="text-2xl font-bold text-gray-900 mb-4">Empresa: Sabritas</h1>

      <button
        onClick={() => {abrirProductoModal()}}
        className="border border-blue-600 text-blue-600 px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-50 mb-4"
      >
        + Agregar producto
      </button>

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
          <tbody>
              <ListaProductos />
          </tbody>
          
        </table>
      </div>

      
    </div>
  );
};

export default ProductsPage;
