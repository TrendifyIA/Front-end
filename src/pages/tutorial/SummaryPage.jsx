/**
 * @file SummaryPage.jsx
 * @author Jennyfer Jasso, ...
 * @description Página de resumen para mostrar la información registrada en el tutorial.
 */
import { useContext, useState, useEffect } from "react";
import CustomButton from "../../components/CustomButton";
import { useNavigate } from "react-router-dom";
import { ContextoTutorial } from "../../context/ProveedorTutorial";

const Confirmacion = () => {
  const navigate = useNavigate();
  const { idEmpresa, idProducto } = useContext(ContextoTutorial);
  const [datosEmpresa, setDatosEmpresa] = useState(null);
  const [datosProducto, setDatosProducto] = useState(null);
  const [datosCampana, setDatosCampana] = useState(null);

  useEffect(() => {
    if (idEmpresa) {
      fetch(`http://127.0.0.1:8080/empresa/empresa/${idEmpresa}`)
        .then((res) => res.json())
        .then((data) => {
          console.log("Datos de empresa:", data);
          setDatosEmpresa(data);
        });
    }
  }, [idEmpresa]);

  useEffect(() => {
    if (idProducto) {
      fetch(`http://127.0.0.1:8080/producto/${idProducto}`)
        .then((res) => res.json())
        .then((data) => {
          console.log("Datos de producto:", data);
          setDatosProducto(data);
        });
    }
  }, [idProducto]);

  useEffect(() => {
    if (idProducto) {
      fetch(`http://127.0.0.1:8080/campana/campanas/${idProducto}`)
        .then((res) => res.json())
        .then((data) => {
          console.log("Datos de campaña:", data);
          if (Array.isArray(data) && data.length > 0) {
            setDatosCampana(data[data.length - 1]);
          }
        });
    }
  }, [idProducto]);

  if (!datosEmpresa || !datosProducto || !datosCampana) {
    return <div className="text-center mt-10">Cargando resumen...</div>;
  }

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
            <Campo label="Nombre" valor={datosEmpresa.nombre} />
            <Campo label="Sector" valor={datosEmpresa.nicho} />
            <Campo label="Dirección" valor={datosEmpresa.direccion} />
            <Campo
              label="Propuesta de valor"
              valor={datosEmpresa.propuesta_valor}
              cols={2}
              multiline
            />
            <Campo
              label="Descripción de servicios"
              valor={datosEmpresa.descripcion_servicio}
              cols={2}
              multiline
            />
            <Campo label="Competidores" valor={datosEmpresa.competidores} />
          </div>
        </section>

        {/* Producto */}
        <section className="mb-8">
          <h3 className="text-4xl font-bold mb-6">Producto</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Campo label="Nombre" valor={datosProducto.nombre} />
            <Campo label="Categoría" valor={datosProducto.categoria} />
            <Campo
              label="Descripción"
              valor={datosProducto.descripcion}
              cols={2}
              multiline
            />
            <Campo
              label="Público objetivo"
              valor={datosProducto.publico_objetivo}
              multiline
            />
            <Campo
              label="Estado"
              valor={
                datosProducto.estado === 1 ? "Continuado" : "Descontinuado"
              }
            />
          </div>
        </section>

        {/* Campaña */}
        <section className="mb-8">
          <h3 className="text-4xl font-bold mb-6">Campaña</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Campo label="Nombre" valor={datosCampana.nombre} />
            <Campo label="Objetivo" valor={datosCampana.objetivo} />
            <Campo
              label="Mensaje clave"
              valor={datosCampana.mensaje_clave}
              cols={2}
              multiline
            />
            <Campo
              label="Canales de distribución"
              valor={datosCampana.canales_distribucion}
            />
            <Campo
              label="Fecha de inicio"
              valor={formatearFecha(datosCampana.f_inicio)}
            />
            <Campo
              label="Fecha final"
              valor={formatearFecha(datosCampana.f_fin)}
            />
            <Campo label="Presupuesto" valor={datosCampana.presupuesto} />
          </div>
        </section>

        <div className="flex justify-center mt-10">
          <CustomButton
            texto="OK"
            onClick={() => {
              const id_usuario = localStorage.getItem("id_usuario");
              localStorage.setItem(`tutorial_completado_${id_usuario}`, "true");
              window.location.replace("/users/adminproductos");
            }}
            extraClases="bg-[#0c1f57] text-white px-6 py-3 rounded-md hover:bg-[#1a3169]"
          />
        </div>
      </div>
    </div>
  );
};

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
