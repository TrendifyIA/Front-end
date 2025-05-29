/**
 * @file Producto.jsx
 * @author Min Che Kim, ...
 * @description Componente que representa un producto sin detalles, mostrando su nombre, imagen y una lista de campañas asociadas.
 */

import ProductImage from "../pages/users/ProductImage";
import { useContext, useState } from "react";
import { CampanaContext } from "../context/ProveedorCampana";
import { ProductoContext } from "../context/ProveedorProducto";

import sabritaslimon from "../assets/images/sabritaslimon.png";
import sabritasadobadas from "../assets/images/sabritasadobadas.png";
import sabritashabanero from "../assets/images/sabritashabanero.png";
import {
  FaEdit,
  FaTrashAlt,
  FaSyncAlt,
  FaCheck,
  FaPencilAlt,
  FaTimes,
} from "react-icons/fa";
import ListaCampanas from "./ListaCampanas";

const Producto = (props) => {
  const [nombreTemporal, setNombreTemporal] = useState("");
  const handleNombreChange = (e) => setNombreTemporal(e.target.value);

  const { getCampanasPorProducto } = useContext(CampanaContext);
  const campanas = getCampanasPorProducto(props.id_producto);

  //console.log(props.src);
  return (
    <>
      <tr>
        <td
          rowSpan={campanas.length + 2} //????
          className="px-4 py-3 font-medium text-sm text-gray-900 align-top"
        >
          <div className="flex items-center gap-2">
            <ProductImage
              src={`${props.src}`}
              alt={props.alt}
              className="w-16 h-16 cursor-pointer rounded border border-gray-400"
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
                  onClick={() => {}}
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
