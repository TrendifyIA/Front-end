/**
 * @file Producto.jsx
 * @author Min Che Kim, ...
 * @description Componente que representa un producto sin detalles, mostrando su nombre, imagen y una lista de campañas asociadas.
 */

import ProductImage from "../pages/users/ProductImage";
import { useContext, useEffect, useState } from "react";
import { FaPencilAlt, FaTrashAlt } from "react-icons/fa";
import ListaCampanas from "./ListaCampanas";
import { ModalContext } from "../context/ProveedorModal";
import { FaChevronDown, FaChevronUp, FaPlus } from "react-icons/fa6";

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

  const { abrirProductoModal, abrirCampanaModal } = useContext(ModalContext);

  const [verCampanas, setVerCampanas] = useState(() => {
    try {
      // Intentar recuperar el valor guardado
      const savedValue = window.localStorage.getItem(
        `verCampanas_${props.id_producto}`
      );
      // Si existe un valor guardado, parsearlo y usarlo, de lo contrario usar true
      return savedValue ? JSON.parse(savedValue) : true;
    } catch (error) {
      console.error("Error al recuperar estado de localStorage:", error);
      return true; // Valor predeterminado en caso de error
    }
  });

  // Recordar estado de verCampanas
  useEffect(() => {
    window.localStorage.setItem(
      `verCampanas_${props.id_producto}`,
      JSON.stringify(verCampanas)
    );
  }, [verCampanas, props.id_producto]);

  /**
   * Maneja los cambios en el input de nombre durante la edición
   * @param {React.ChangeEvent<HTMLInputElement>} e - Evento de cambio
   */
  const handleNombreChange = (e) => setNombreTemporal(e.target.value);

  //console.log(props.src);
  return (
    <div className="mb-8 border border-gray-300 rounded-lg overflow-auto">
      <table className="w-full ">
        <thead className="bg-white">
          <tr>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 w-1/4">
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
                  <div className="flex w-full items-center gap-2">
                    <span>{props.nombre}</span>
                    <span
                      className={`size-2 rounded-full ${
                        props.estado ? "bg-green-300" : "bg-gray-300"
                      }`}
                    />
                    <div className="ml-auto flex gap-2">
                      <span
                        className="bg-white hover:bg-gray-200 p-2 rounded-md cursor-pointer"
                        onClick={() => {
                          setVerCampanas(!verCampanas);
                        }}
                      >
                        {verCampanas ? (
                          <FaChevronDown className="text-primary-500" />
                        ) : (
                          <FaChevronUp className="text-primary-500" />
                        )}
                      </span>
                      <span
                        className="bg-gray-100 hover:bg-gray-300 p-2 rounded-md cursor-pointer"
                        onClick={() => {
                          abrirCampanaModal(null, props.id_producto);
                        }}
                      >
                        <FaPlus className="text-primary-500" />
                      </span>
                      <span
                        className="bg-blue-100 hover:bg-blue-300 p-2 rounded-md cursor-pointer"
                        onClick={() => {
                          abrirProductoModal(props.id_producto);
                        }}
                      >
                        <FaPencilAlt className="text-blue-500 hover:text-blue-700" />
                      </span>
                      <span
                        className="bg-red-100 hover:bg-red-300 p-2 rounded-md cursor-pointer"
                        onClick={() => {}}
                      >
                        <FaTrashAlt className="text-red-600 hover:text-red-700" />
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className="bg-white">
            <td className="pb-3">
              {" "}
              {/* className="px-5 pb-3" */}
              {verCampanas && <ListaCampanas id_producto={props.id_producto} />}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Producto;
