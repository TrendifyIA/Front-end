/**
 * @file ListaCampanas.jsx
 * @author Min Che Kim, ...
 * @description Componente que representa una lista de campañas en una tabla. Se hace uso del componente Campana.jsx
 */
import { useContext, useState } from "react";
import Campana from "./Campana";
import { ContextoCampana } from "../context/ProveedorCampana";
import BotonIcon from "./BotonIcon";
import { IoAddOutline } from "react-icons/io5";
import { ModalContext } from "../context/ProveedorModal";


/**
 * Componente que renderiza una lista de campañas para un producto específico
 * 
 * @component
 * @param {Object} props - Propiedades del componente
 * @param {number} props.id_producto - ID del producto del cual mostrar las campañas
 * @returns {JSX.Element} Conjunto de filas de tabla con las campañas del producto
 */
const ListaCampanas = ({ id_producto }) => {
  const { getCampanasPorProducto } = useContext(ContextoCampana);
  const campanas = getCampanasPorProducto(id_producto);

  const { abrirCampanaModal } = useContext(ModalContext);

//console.log(campanas);

  /**
   * Si no hay campañas, muestra solo el botón para añadir
   */
  if (!campanas || campanas.length === 0) {
    return (
      <tr className="border-b border-gray-400">
        <td className="px-4 py-1" colSpan={3}>
          
          <BotonIcon
            className="flex items-center gap-1 bg-blue-900 text-white px-3 py-1 rounded-md text-sm hover:bg-blue-700"
            nombre="Añadir"
            onClick={() => {abrirCampanaModal(null, id_producto)}}
            icon={IoAddOutline}
          />
        </td>
      </tr>
    );
  }

  /**
   * Si hay campañas, muestra cada una seguida del botón para añadir más
   */
  return (
    <>
      {campanas.map((campana) => {
        return (
          <Campana
            key={campana.id_campana}
            id_campana={campana.id_campana}
            id_producto={id_producto}
            nombre={campana.nombre}
            estatus={campana.estado}
          />
        );
      })}

      <tr className="border-b border-gray-400">
        <td className="px-4 py-3">
          <BotonIcon
            className="flex items-center gap-1 bg-blue-900 text-white px-3 py-1 rounded-md text-sm hover:bg-blue-700"
            nombre="Añadir"
            onClick={() => {abrirCampanaModal(null, id_producto)}}
            icon={IoAddOutline}
          />
        </td>
      </tr>
    </>
  );
};

export default ListaCampanas;
