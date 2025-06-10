/**
 * @file ProductsPage.jsx
 * @author Min Che Kim
 * @description Página principal que muestra la tabla de productos y sus campañas asociadas.
 *              Permite agregar nuevos productos y gestionar los existentes.
 */

import { useContext  } from "react";
import ListaProductos from "../../components/ListaProductos";
import { ModalContext } from "../../context/ProveedorModal";
import { UsuarioContext } from "../../context/ProveedorUsuario";

/**
 * Página que muestra los productos de la empresa y sus campañas asociadas
 * 
 * @component
 * @returns {JSX.Element} Página completa con tabla de productos y campañas
 */
const ProductsPage = () => {

  const { abrirProductoModal } = useContext(ModalContext);
  const { nombreEmpresa } = useContext(UsuarioContext);

  return (
    <div className="min-h-screen bg-gray-100 p-6 relative">
      <h1 className="text-2xl font-bold text-gray-900 mb-4">
        Empresa: {nombreEmpresa}
        </h1>

      <button
        onClick={() => {abrirProductoModal()}}
        className="border border-blue-600 text-blue-600 px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-50 mb-4"
      >
        + Agregar producto
      </button>
      
      <ListaProductos />
      
    </div>
  );
};

export default ProductsPage;