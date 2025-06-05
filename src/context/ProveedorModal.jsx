/**
 * @file ProveedorModal.jsx
 * @author Min Che Kim, ...
 * @description Proveedor de contexto para manejar modales relacionados con campañas y productos.
 */
import { createContext, useState } from "react";
import CampanaModal from "../components/CampanaModal";
import ProductoModal from "../components/ProductoModal";

/**
 * Contexto para compartir el estado y las funciones de control de modales
 */
export const ModalContext = createContext();

/**
 * Proveedor de contexto que gestiona los estados y comportamientos de los modales
 *
 * @component
 * @param {Object} props - Propiedades del componente
 * @param {React.ReactNode} props.children - Componentes hijos que consumirán el contexto
 * @returns {JSX.Element} Provider de contexto con los modales renderizados condicionalmente
 */
const ProveedorModal = ({ children }) => {
  // Para manejar el modal de campañas
  const [editarCampana, setEditarCampana] = useState(false);
  const [campanaSeleccionada, setCampanaSeleccionada] = useState(null);

  const [idProducto, setIdProducto] = useState(null);

  /**
   * Abre el modal de campañas para edición o creación
   *
   * @function
   * @param {number|null} id - ID de la campaña a editar (null para crear nueva)
   * @param {number|null} idProducto - ID del producto asociado a la campaña
   */
  const abrirCampanaModal = (id, idProducto = null) => {
    setCampanaSeleccionada(id);
    setEditarCampana(true);
    setIdProducto(idProducto);
  };

  /**
   * Cierra el modal de campañas y restablece los estados
   *
   * @function
   */
  const cerrarCampanaModal = () => {
    setEditarCampana(false);
    setCampanaSeleccionada(null);
  };

  // Para manejar el modal de productos
  const [editarProducto, setEditarProducto] = useState(false);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);

  /**
   * Abre el modal de productos para edición o creación
   *
   * @function
   * @param {number|null} id - ID del producto a editar (null para crear nuevo)
   */
  const abrirProductoModal = (id) => {
    setProductoSeleccionado(id);
    setEditarProducto(true);
  };

  /**
   * Cierra el modal de productos y restablece los estados
   *
   * @function
   */
  const cerrarProductoModal = () => {
    setEditarProducto(false);
    setProductoSeleccionado(null);
  };

  const value = {
    idProducto,
    editarCampana,
    setEditarCampana,
    campanaSeleccionada,
    abrirCampanaModal,
    cerrarCampanaModal,
    abrirProductoModal,
  };

  return (
    <ModalContext.Provider value={value}>
      {children}

      {editarCampana && (
        <CampanaModal
          id_campana={campanaSeleccionada}
          idProducto={idProducto}
          onClose={cerrarCampanaModal}
        />
      )}

      {editarProducto && (
        <ProductoModal
          id_producto={productoSeleccionado}
          onClose={cerrarProductoModal}
        />
      )}
    </ModalContext.Provider>
  );
};

export default ProveedorModal;
