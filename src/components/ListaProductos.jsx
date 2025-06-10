/**
 * @file ListaProductos.jsx
 * @author Min Che Kim, ...
 * @description Componente que representa una lista de productos junto con sus respectivas campañas.
 */
import { useContext } from "react";
import { ContextoProducto } from "../context/ProveedorProducto";
import Producto from "./Producto";
import { FaBoxOpen } from "react-icons/fa";
import { ModalContext } from "../context/ProveedorModal";
/**
 * Componente que renderiza la lista completa de productos de la empresa
 *
 * @component
 * @returns {JSX.Element[]} Array de componentes Producto renderizados
 */
const ListaProductos = () => {
  const { productos, cargandoProductos } = useContext(ContextoProducto);
  const { abrirProductoModal } = useContext(ModalContext);

  // Mostrar indicador de carga si los productos se están cargando
  if (cargandoProductos) {
    return (
      <div className="flex justify-center items-center h-svh">
        <svg
          className="animate-spin -ml-1 mr-3 h-5 w-5 text-blue-500"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
        <span>Cargando productos...</span>
      </div>
    );
  }

  return productos.length === 0 ? (
    <div className="flex flex-col justify-center items-center h-svh text-gray-500 text-center">
      <FaBoxOpen className="size-32" />
      <p className="font-bold text-xl mb-2">
        No hay nada aquí
        <br />
      </p>
      <p className="mb-8">¡Agrega un producto para comenzar!</p>
      <button
        onClick={() => {abrirProductoModal()}}
        className="border border-blue-600 text-blue-600 px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-50 mb-4"
      >
        + Agregar producto
      </button>
    </div>
  ) : (
    productos.map((producto) => {
      return (
        <Producto
          key={producto.id_producto}
          src={producto.ruta_img}
          alt={producto.nombre}
          nombre={producto.nombre}
          estado={producto.estado}
          id_producto={producto.id_producto}
        />
      );
    })
  );
};

export default ListaProductos;
