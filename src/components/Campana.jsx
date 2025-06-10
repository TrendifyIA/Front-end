/**
 * @file Campana.jsx
 * @author Min Che Kim, ...
 * @description Componente que representa una campaña en la tabla de campañas. Contiene información como el nombre, estatus y acciones disponibles (editar, eliminar, procesar/revisar).
 */
import { useContext, useState, useEffect } from "react";
import {
  FaEdit,
  FaTrashAlt,
  FaSyncAlt,
  FaCheck
} from "react-icons/fa";
import BotonIcon from "../components/BotonIcon";
import { ModalContext } from "../context/ProveedorModal";
import { useNavigate } from "react-router-dom"
import { ProcesamientoContext } from "../context/ProveedorProcesado";
import { ContextoCampana } from "../context/ProveedorCampana";


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

  const { abrirCampanaModal } = useContext(ModalContext);
  const { eliminarCampana } = useContext(ContextoCampana);
  const [estatusLocal, setEstatusLocal] = useState(props.estatus) // Controla el estatus
  const {procesando, setProcesando} = useContext(ProcesamientoContext)
  const navigate = useNavigate();

  useEffect(() => {
    if (!procesando && estatusLocal === 1) {
      navigate("/users/resumen-tendencias", {
        state: { id_campana: props.id_campana },
      });
    }
  }, [procesando]);

  const procesarCampana = async () => {
    if (estatusLocal === false) {
      setProcesando(true); // Solo activa el overlay visual

      try {
        const respuesta = await fetch("http://127.0.0.1:8080/proceso/iniciar", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          credentials: "include",
          body: JSON.stringify({ id_campana: props.id_campana })
        });

        const data = await respuesta.json();
        console.log("Respuesta del server: ", data);

        setEstatusLocal(1);

        localStorage.setItem("campana_activa", JSON.stringify({
          id: props.id_campana,
          activo: true,
          tiempo: Date.now()
        }));

        // ✅ Redirige al finalizar exitosamente
        navigate("/users/resumen-tendencias", {
          state: { id_campana: props.id_campana },
        });

      } catch (error) {
        console.error("Error al procesar:", error);
        alert("Error al procesar la campaña.");
      } finally {
        setProcesando(false);
      }
    } else {
      navigate("/users/resumen-tendencias", {
        state: { id_campana: props.id_campana },
      });
    }
  };
  return (
    <tr className="border-t border-gray-200">
      <td className="px-4 py-3 text-sm text-blue-600 font-medium">
        {props.nombre}
      </td>
      <td className="px-4 py-3">
        <span
          className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${
            props.estatus === true
              ? "bg-green-100 text-green-800"
              : "bg-yellow-100 text-yellow-800"
          }`}
        >
          {props.estatus === true ? "Procesado" : "Sin procesar"}
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
            onClick={() => {eliminarCampana(props.id_campana, props.id_producto)}}
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
            onClick={procesarCampana}
          />
        </div>
      </td>
    </tr>
  );
};

export default Campana;