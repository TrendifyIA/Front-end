/**
 * @file Producto.jsx
 * @author Min Che Kim, ...
 * @description Componente que representa un producto sin detalles, mostrando su nombre, imagen y una lista de campañas asociadas.
 */

import ProductImage from "../pages/users/ProductImage";
import { useContext, useState } from "react";
import { ContextoCampana } from "../context/ProveedorCampana";
import { FaPencilAlt } from "react-icons/fa";
import ListaCampanas from "./ListaCampanas";
import { ModalContext } from "../context/ProveedorModal";

/**
 * Componente que renderiza un producto con sus campañas asociadas
 * 
 * @component
 * @param {Object} props - Propiedades del componente
 * @param {number} props.id_producto - ID único del producto
 * @param {string} props.nombre - Nombre del producto
 * @param {string} [props.src] - URL de la imagen del producto
 * @param {string} props.alt - Texto alternativo para la imagen
 * @param {boolean} [props.editingNombre] - Indica si el nombre está en modo edición
 * @returns {JSX.Element} Conjunto de filas de tabla que representan al producto y sus campañas
 */
const Producto = (props) => {
  const [nombreTemporal, setNombreTemporal] = useState("");
  const { getCampanasPorProducto, cargandoCampanas } = useContext(ContextoCampana);
  const campanas = getCampanasPorProducto(props.id_producto);

  const { abrirProductoModal } = useContext(ModalContext);

  /**
   * Maneja los cambios en el input de nombre durante la edición
   * @param {React.ChangeEvent<HTMLInputElement>} e - Evento de cambio
   */
  const handleNombreChange = (e) => setNombreTemporal(e.target.value);

  //console.log(props.src);
  return (
    <>
      <tr>
        <td
          rowSpan={cargandoCampanas ? 2 : campanas.length + 2} //????
          className="px-4 py-3 font-medium text-sm text-gray-900 align-top"
        >
          <div className="flex items-center gap-2">
            <ProductImage
              src={`${props.src || ""}`}
              alt={props.alt}
              className="w-16 h-16 cursor-pointer object-contain rounded" // border border-gray-400
            />
            {props.editingNombre ? (
              <input
                type="text"
                value={nombreTemporal}
                onChange={handleNombreChange}
                onBlur={() => {}}
                autoFocus
                className="border rounded px-2 py-1 text-sm"
              />
            ) : (
              <span className="flex items-center gap-1">
                {props.nombre}
                <FaPencilAlt
                  className="text-blue-500 hover:text-blue-700 cursor-pointer"
                  onClick={() => {
                    abrirProductoModal(props.id_producto);
                  }}
                />
              </span>
            )}
          </div>
        </td>
      </tr>
      <ListaCampanas id_producto={props.id_producto} />
    </>
  );
};

export default Producto;
