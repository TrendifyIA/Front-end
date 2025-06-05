/**
 * @file Campana.jsx
 * @author Min Che Kim, ...
 * @description Componente que representa una campaña en la tabla de campañas. Contiene información como el nombre, estatus y acciones disponibles (editar, eliminar, procesar/revisar).
 */
import { useContext } from "react";
import {
  FaEdit,
  FaTrashAlt,
  FaSyncAlt,
  FaCheck
} from "react-icons/fa";
import BotonIcon from "./BotonIcon";
import { ModalContext } from "../context/ProveedorModal";

/**
 * Componente que representa una campaña en la tabla de campañas
 * 
 * @component
 * @param {Object} props - Propiedades del componente
 * @param {number} props.id_campana - ID único de la campaña
 * @param {number} props.id_producto - ID del producto asociado a la campaña
 * @param {string} props.nombre - Nombre de la campaña
 * @param {number} props.estatus - Estado de la campaña (1: Procesado, 0: Sin procesar)
 * @returns {JSX.Element} Fila de tabla con información de la campaña y botones de acción
 *
 */
const Campana = (props) => {
  //console.log("estatus",props.estatus)

  // console.log(props.key);

  const { abrirCampanaModal } = useContext(ModalContext);

  // console.log("abrirCampanaModal:", abrirCampanaModal);
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
            className="flex items-center gap-1 bg-blue-600 text-white px-3 py-1 rounded-md text-sm hover:bg-blue-700 min-w-[80px] justify-center"
            nombre="Editar"
            icon={FaEdit}
            onClick={() => {abrirCampanaModal(props.id_campana, props.id_producto)}}
          />

          <BotonIcon
            className="flex items-center gap-1 bg-red-600 text-white px-3 py-1 rounded-md text-sm hover:bg-red-700 min-w-[80px] justify-center"
            nombre="Eliminar"
            icon={FaTrashAlt}
            onClick={() => {}}
          />

          <BotonIcon
              className={`flex items-center gap-1 text-white px-3 py-1 rounded-md text-sm min-w-[100px] justify-center ${
                props.estatus
                ? "bg-green-600 hover:bg-green-700"
                : "bg-gray-400 hover:bg-gray-500"
              } `}
              nombre={
                props.estatus
                ? "Revisar"
                : "Procesar"
              
              }
              icon={props.estatus ? FaCheck : FaSyncAlt}
              onClick={() => {}}
            />
        </div>
      </td>
    </tr>
  );
};

export default Campana;
