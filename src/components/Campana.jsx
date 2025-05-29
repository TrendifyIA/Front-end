/**
 * @file Campana.jsx
 * @author Min Che Kim, ...
 * @description Componente que representa una campaña en la tabla de campañas. Contiene información como el nombre, estatus y acciones disponibles (editar, eliminar, procesar/revisar).
 */
import { useContext } from "react";
import { CampanaContext } from "../context/ProveedorCampana";
import {
  FaEdit,
  FaTrashAlt,
  FaSyncAlt,
  FaCheck,
  FaPencilAlt,
  FaTimes,
} from "react-icons/fa";
import { GoSync } from "react-icons/go";
import BotonIcon from "./BotonIcon";


const Campana = (props) => {
  return (
    <tr>
      <td className="px-4 py-3 text-sm text-blue-600 font-medium">
        {props.nombre}
      </td>
      <td className="px-4 py-3">
        <span
          className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${
            props.estatus === 1
              ? "bg-green-100 text-green-800"
              : "bg-yellow-100 text-yellow-800"
          }`}
        >
          {props.estatus === 1 ? "Procesado" : "Sin procesar"}
        </span>
      </td>
      <td className="px-4 py-3">
        <div className="flex gap-2">
          <BotonIcon
            className="flex items-center gap-1 bg-blue-600 text-white px-3 py-1 rounded-md text-sm hover:bg-blue-700"
            nombre="Editar"
            icon={FaEdit}
            onClick={() => {}}
          />

          <BotonIcon
            className="flex items-center gap-1 bg-red-600 text-white px-3 py-1 rounded-md text-sm hover:bg-red-700"
            nombre="Eliminar"
            icon={FaTrashAlt}
            onClick={() => {}}
          />

          {props.estatus === "Sin procesar" ? (
            <BotonIcon
              className="flex items-center gap-1 bg-gray-400 text-white px-3 py-1 rounded-md text-sm hover:bg-gray-500"
              nombre="Procesar"
              icon={FaSyncAlt}
              onClick={() => {}}
            />
          ) : (
            <BotonIcon
              className={`flex items-center gap-1  text-white px-3 py-1 rounded-md text-sm ${
                props.estatus === 1
                ? "bg-green-600 hover:bg-green-700"
                : "bg-gray-400 hover:bg-gray-500"
              } `}
              nombre={
                props.estatus === 1
                ? "Revisar"
                : "Procesar"
              }
              icon={props.estatus == 1 ? FaCheck : GoSync}
              iconStyle="stroke-1 stroke-current"
              onClick={() => {}}
            />
          )}
        </div>
      </td>
    </tr>
  );
};

export default Campana;
