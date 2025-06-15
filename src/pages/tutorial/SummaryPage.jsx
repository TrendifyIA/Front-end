/**
 * @file SummaryPage.jsx
 * @author Jennyfer Jasso, Min Che Kim ...
 * @description Página de resumen para mostrar la información registrada en el tutorial.
 */
import { useContext, useState, useEffect } from "react";
import CustomButton from "../../components/CustomButton";
import { useNavigate } from "react-router-dom";
import { ContextoTutorial } from "../../context/ProveedorTutorial";
import { ContextoEmpresa } from "../../context/ProveedorEmpresa";
import { ContextoProducto } from "../../context/ProveedorProducto";
import { ContextoCampana } from "../../context/ProveedorCampana";
import CampoTutorial from "../../components/CampoTutorial";

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

  // Cargar datos de la empresa
  useEffect(() => {
    obtenerDatosEmpresa();
  }, [obtenerDatosEmpresa]);

  // Cargar datos del producto
  useEffect(() => {
    if (idProducto) {
      console.log("Obteniendo datos del producto con ID:", idProducto);
      obtenerDatosProducto(idProducto);
    }
  }, [idProducto, obtenerDatosProducto]);

  // Cargar datos de la campaña
  useEffect(() => {
    if (idProducto) {
      console.log(
        "Obteniendo datos de la campaña para el producto con ID:",
        idProducto
      );
      obtenerDatosCampana(idProducto);
    }
  }, [idProducto, obtenerDatosCampana]);

  // Verificar que los datos estén cargados
  if (!empresa || !producto || !campana) {
    return <div className="text-center mt-10">Cargando resumen...</div>;
  }

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
            <CampoTutorial label="Nombre" valor={empresa.nombre} />
            <CampoTutorial label="Sector de mercado" valor={empresa.nicho} />
            <CampoTutorial label="Dirección" valor={empresa.direccion} />
            <CampoTutorial
              label="Propuesta de valor"
              valor={empresa.propuesta_valor}
              cols={2}
              multiline
            />
            <CampoTutorial
              label="Descripción de servicios"
              valor={empresa.descripcion_servicio}
              cols={2}
              multiline
            />
            <CampoTutorial label="Competidores" valor={empresa.competidores} />
          </div>
        </section>

        {/* Producto */}
        <section className="mb-8">
          <h3 className="text-4xl font-bold mb-6">Producto</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <CampoTutorial label="Nombre" valor={producto.nombre} />
            <CampoTutorial label="Categoría" valor={producto.categoria} />
            <CampoTutorial
              label="Descripción"
              valor={producto.descripcion}
              cols={2}
              multiline
            />
            <CampoTutorial
              label="Público objetivo"
              valor={producto.publico_objetivo}
              multiline
            />
            <CampoTutorial
              label="Estado"
              valor={producto.estado === 1 ? "Continuado" : "Descontinuado"}
            />
          </div>
        </section>

        {/* Campaña */}
        <section className="mb-8">
          <h3 className="text-4xl font-bold mb-6">Campaña</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <CampoTutorial label="Nombre" valor={campana.nombre} />
            <CampoTutorial label="Objetivo" valor={campana.objetivo} />
            <CampoTutorial
              label="Mensaje clave"
              valor={campana.mensaje_clave}
              cols={2}
              multiline
            />
            <CampoTutorial
              label="Canales de distribución"
              valor={campana.canales_distribucion}
            />
            <CampoTutorial
              label="Fecha de inicio"
              valor={formatearFecha(campana.f_inicio)}
            />
            <CampoTutorial
              label="Fecha final"
              valor={formatearFecha(campana.f_fin)}
            />
            <CampoTutorial label="Presupuesto" valor={campana.presupuesto} />
          </div>
        </section>

        {/* Botón de confirmación */}
        <div className="flex justify-center mt-10">
          <CustomButton
            texto="OK"
            onClick={async () => {
              // const id_usuario = localStorage.getItem("id_usuario");
              await tutorialCompletadoActualizar();
              navigate("/users/adminproductos");
            }}
            extraClases="bg-[#0c1f57] text-white px-6 py-3 rounded-md hover:bg-[#1a3169]"
          />
        </div>
      </div>
    </div>
  );
};

export default Confirmacion;
