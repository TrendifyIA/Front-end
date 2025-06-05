/**
 * @file ListaProductos.jsx
 * @author Min Che Kim, ...
 * @description Componente que representa una lista de productos junto con sus respectivas campañas.
 */
import { useContext } from "react";
import { ProductoContext } from "../context/ProveedorProducto";
import Producto from "./Producto";

/**
 * Componente que renderiza la lista completa de productos de la empresa
 * 
 * @component
 * @returns {JSX.Element[]} Array de componentes Producto renderizados
 */
const ListaProductos = () => {
  const { productos } = useContext(ProductoContext);

  return productos.map((producto) => {
    return (
      <Producto
        key={producto.id_producto}
        src={producto.ruta_img}
        alt={producto.nombre}
        nombre={producto.nombre}
        id_producto={producto.id_producto}
      />
    );
  });
};

export default ListaProductos;
