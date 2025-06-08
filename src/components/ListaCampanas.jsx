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
  const { getCampanasPorProducto, cargandoCampanas } =
    useContext(ContextoCampana);
  const campanas = getCampanasPorProducto(id_producto);

  const { abrirCampanaModal } = useContext(ModalContext);

  // Mostrar indicador de carga si las campañas están cargando
  if (cargandoCampanas) {
    return (
      <tr className="border-b border-gray-400">
        <td className="px-4 py-3" colSpan={3}>
          <div className="flex justify-center items-center">
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
            <span>Cargando campañas...</span>
          </div>
        </td>
      </tr>
    );
  }

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
            onClick={() => {
              abrirCampanaModal(null, id_producto);
            }}
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
            onClick={() => {
              abrirCampanaModal(null, id_producto);
            }}
            icon={IoAddOutline}
          />
        </td>
      </tr>
    </>
  );
};

export default ListaCampanas;
