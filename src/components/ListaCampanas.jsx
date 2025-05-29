/**
 * @file ListaCampanas.jsx
 * @author Min Che Kim, ...
 * @description Componente que representa una lista de campañas en una tabla. Se hace uso del componente Campana.jsx
 */
import { useContext, useState } from "react";
import Campana from "./Campana";
import { CampanaContext } from "../context/ProveedorCampana";
import BotonIcon from "./BotonIcon";
import { IoAddOutline } from "react-icons/io5";

const ListaCampanas = ({ id_producto }) => {
  const { getCampanasPorProducto } = useContext(CampanaContext);
  const campanas = getCampanasPorProducto(id_producto);

  if (!campanas || campanas.length === 0) {
    return (
      <tr className="border-b border-gray-400">
        <td className="px-4 py-1" colSpan={3}>
          
          <BotonIcon
            className="flex items-center gap-1 bg-blue-900 text-white px-3 py-1 rounded-md text-sm hover:bg-blue-700"
            nombre="Añadir"
            onClick={() => {}}
            icon={IoAddOutline}
          />
        </td>
      </tr>
    );
  }

  return (
    <>
      {campanas.map((campana) => {
        return (
          <Campana
            key={campana.id_campana}
            nombre={campana.nombre}
            estatus={campana.estatus}
          />
        );
      })}

      <tr className="border-b border-gray-400">
        <td className="px-4 py-3">
          <BotonIcon
            className="flex items-center gap-1 bg-blue-900 text-white px-3 py-1 rounded-md text-sm hover:bg-blue-700"
            nombre="Añadir"
            onClick={() => {}}
            icon={IoAddOutline}
          />
        </td>
      </tr>
    </>
  );
};

// flex items-center gap-1 bg-blue-600 text-white px-3 py-1 rounded-md text-sm hover:bg-blue-700
export default ListaCampanas;
