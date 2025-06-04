/**
 * @file SummaryPage.jsx
 * @author Jennyfer Jasso, ...
 * @description Página de resumen para mostrar la información registrada en el tutorial.
 */
import { useContext, useState, useEffect } from "react";
import CustomButton from "../../components/CustomButton";
import { useNavigate } from "react-router-dom";
import { ContextoTutorial } from "../../context/ProveedorTutorial";
import { ContextoEmpresa } from "../../context/ProveedorEmpresa";
import { ContextoProducto } from "../../context/ProveedorProducto";
import { ContextoCampana } from "../../context/ProveedorCampana";

/**
 * Componente principal que muestra el resumen de empresa, producto y campaña
 * después de completar el flujo del tutorial.
 *
 * @returns {JSX.Element} Página de confirmación y resumen de datos registrados.
 */
const Confirmacion = () => {
  const navigate = useNavigate();
  const { idEmpresa, idProducto, tutorialCompletadoActualizar } =
    useContext(ContextoTutorial);
  const { empresa, obtenerDatosEmpresa } = useContext(ContextoEmpresa);
  const { producto, obtenerDatosProducto } = useContext(ContextoProducto);
  const { campana, obtenerDatosCampana } = useContext(ContextoCampana);

  // Cargar datos de empresa
  useEffect(() => {
    if (idEmpresa) {
      console.log("Obteniendo datos de empresa con ID:", idEmpresa);
      obtenerDatosEmpresa(idEmpresa);
    }
  }, [idEmpresa, obtenerDatosEmpresa]);

  // Cargar datos de producto
  useEffect(() => {
    if (idProducto) {
      console.log("Obteniendo datos de producto con ID:", idProducto);
      obtenerDatosProducto(idProducto);
    }
  }, [idProducto, obtenerDatosProducto]);

  // Cargar datos de campaña
  useEffect(() => {
    if (idProducto) {
      console.log(
        "Obteniendo datos de campaña para el producto con ID:",
        idProducto
      );
      obtenerDatosCampana(idProducto);
    }
  }, [idProducto, obtenerDatosCampana]);

  if (!empresa || !producto || !campana) {
    return <div className="text-center mt-10">Cargando resumen...</div>;
  }

  // const { idEmpresa, idProducto } = useContext(ContextoTutorial);
  // const [empresa, setempresa] = useState(null);
  // const [datosProducto, setDatosProducto] = useState(null);
  // const [campana, setcampana] = useState(null);

  // useEffect(() => {
  //   if (idEmpresa) {
  //     fetch(`http://127.0.0.1:8080/empresa/${idEmpresa}`)
  //       .then((res) => res.json())
  //       .then((data) => {
  //         console.log("Datos de empresa:", data);
  //         setempresa(data);
  //       });
  //   }
  // }, [idEmpresa]);

  // useEffect(() => {
  //   if (idProducto) {
  //     fetch(`http://127.0.0.1:8080/producto/${idProducto}`)
  //       .then((res) => res.json())
  //       .then((data) => {
  //         console.log("Datos de producto:", data);
  //         setDatosProducto(data);
  //       });
  //   }
  // }, [idProducto]);

  // useEffect(() => {
  //   if (idProducto) {
  //     fetch(`http://127.0.0.1:8080/campana/campanas/${idProducto}`)
  //       .then((res) => res.json())
  //       .then((data) => {
  //         console.log("Datos de campaña:", data);
  //         if (Array.isArray(data) && data.length > 0) {
  //           setcampana(data[data.length - 1]);
  //         }
  //       });
  //   }
  // }, [idProducto]);

  // if (!empresa || !datosProducto || !campana) {
  //   return <div className="text-center mt-10">Cargando resumen...</div>;
  // }

  /**
   * Formatea una fecha en string (formato local).
   *
   * @param {string|Date} fecha - Fecha a formatear.
   * @returns {string} Fecha formateada.
   */
  const formatearFecha = (fecha) => {
    if (!fecha) return "";
    const date = new Date(fecha);
    return date.toLocaleDateString("es-MX");
  };

  return (
    <div className="bg-gray-100 min-h-screen font-sans">
      <div className="bg-[#0B2C63] text-white p-6">
        <h1 className="text-2xl font-bold text-center">
          ¡Tus datos se han guardado exitosamente!
        </h1>
      </div>

      <div className="py-2 max-w-3xl mx-auto px-8">
        <h2 className="text-4xl font-bold mb-6">Resumen de tus datos</h2>
      </div>

      <div className="bg-white mx-auto max-w-3xl p-8 rounded shadow mb-10">
        {/* Empresa */}
        <section className="mb-8">
          <h3 className="text-4xl font-bold mb-6">Empresa</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Campo label="Nombre" valor={empresa.nombre} />
            <Campo label="Sector" valor={empresa.nicho} />
            <Campo label="Dirección" valor={empresa.direccion} />
            <Campo
              label="Propuesta de valor"
              valor={empresa.propuesta_valor}
              cols={2}
              multiline
            />
            <Campo
              label="Descripción de servicios"
              valor={empresa.descripcion_servicio}
              cols={2}
              multiline
            />
            <Campo label="Competidores" valor={empresa.competidores} />
          </div>
        </section>

        {/* Producto */}
        <section className="mb-8">
          <h3 className="text-4xl font-bold mb-6">Producto</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Campo label="Nombre" valor={producto.nombre} />
            <Campo label="Categoría" valor={producto.categoria} />
            <Campo
              label="Descripción"
              valor={producto.descripcion}
              cols={2}
              multiline
            />
            <Campo
              label="Público objetivo"
              valor={producto.publico_objetivo}
              multiline
            />
            <Campo
              label="Estado"
              valor={producto.estado === 1 ? "Continuado" : "Descontinuado"}
            />
          </div>
        </section>

        {/* Campaña */}
        <section className="mb-8">
          <h3 className="text-4xl font-bold mb-6">Campaña</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Campo label="Nombre" valor={campana.nombre} />
            <Campo label="Objetivo" valor={campana.objetivo} />
            <Campo
              label="Mensaje clave"
              valor={campana.mensaje_clave}
              cols={2}
              multiline
            />
            <Campo
              label="Canales de distribución"
              valor={campana.canales_distribucion}
            />
            <Campo
              label="Fecha de inicio"
              valor={formatearFecha(campana.f_inicio)}
            />
            <Campo label="Fecha final" valor={formatearFecha(campana.f_fin)} />
            <Campo label="Presupuesto" valor={campana.presupuesto} />
          </div>
        </section>

        <div className="flex justify-center mt-10">
          <CustomButton
            texto="OK"
            onClick={async () => {
              const id_usuario = localStorage.getItem("id_usuario");
              await tutorialCompletadoActualizar(id_usuario);
              navigate("/users/adminproductos");
            }}
            extraClases="bg-[#0c1f57] text-white px-6 py-3 rounded-md hover:bg-[#1a3169]"
          />
        </div>
      </div>
    </div>
  );
};

/**
 * Componente auxiliar para renderizar una fila de información con etiqueta y valor.
 *
 * @param {Object} props
 * @param {string} props.label - Etiqueta descriptiva del campo.
 * @param {string|number} props.valor - Valor asociado al campo.
 * @param {boolean} [props.multiline=false] - Si es true, se muestra en bloque multilinea.
 * @param {number} [props.cols=1] - Número de columnas a ocupar (1 o 2).
 * @returns {JSX.Element} Campo formateado visualmente.
 */
const Campo = ({ label, valor, multiline = false, cols = 1 }) => {
  return (
    <div className={`col-span-${cols}`}>
      <label className="block text-sm font-medium mb-1">{label}:</label>
      {multiline ? (
        <div className="w-full border rounded px-3 py-2 text-sm bg-gray-50 whitespace-pre-wrap overflow-auto max-h-60">
          {valor}
        </div>
      ) : (
        <div
          className="w-full border rounded px-3 py-2 text-sm bg-gray-50 truncate"
          title={valor}
        >
          {valor}
        </div>
      )}
    </div>
  );
};

export default Confirmacion;
