/**
 * @file ListaCampanas.jsx
 * @author Min Che Kim, ...
 * @description Componente que representa una lista de campañas en una tabla. Se hace uso del componente Campana.jsx
 */
import { useContext } from "react";
import Campana from "./Campana";
import { ContextoCampana } from "../context/ProveedorCampana";

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

  // Mostrar indicador de carga si las campañas están cargando
  if (cargandoCampanas) {
    return (
      <div className="flex justify-center items-center py-5">
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
    );
  }

  /**
   * Si hay campañas, muestra cada una seguida del botón para añadir más
   */
  return (
    <table className="w-full">
      <thead className="bg-gray-100">
        <tr>
          <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 w-1/4">
            Nombre de la Campaña
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
        {!campanas || campanas.length === 0 ? (
          <tr>
            <td
              colSpan={3}
              className="px-4 py-3 text-base text-gray-500 font-normal text-center"
            >
              <div className="flex items-center justify-center w-full">
                Agrega una campaña para este producto.
              </div>
            </td>
          </tr>
        ) : (
          campanas.map((campana) => {
            return (
              <Campana
                key={campana.id_campana}
                id_campana={campana.id_campana}
                id_producto={id_producto}
                nombre={campana.nombre}
                estatus={campana.estado}
              />
            );
          })
        )}
      </tbody>
    </table>
  );
};

export default ListaCampanas;
