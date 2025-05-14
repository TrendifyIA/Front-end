import React from "react";
import CustomButton from "../../components/CustomButton";

const Confirmacion = () => {
  const datosEmpresa = {
    nombre: "Sabritas",
    segmento: "Snacks",
    direccion: "Av. Río #3-4, GAM, CDMX",
    requisitosValor: [
      "Ofrecer productos deliciosos de alta calidad con gran variedad.",
      "Satisfacer los gustos de niños, jóvenes y adultos.",
      "Innovar en sabores, empaques y estrategias.",
    ],
    descripcion:
      "Fabricación y comercialización de papas fritas, frituras de maíz, aperitivos y dulces, siendo líder en el mercado mexicano de 'macrosnacks'.",
    competidores: "Barcel, Pringles, Sol.",
  };

  const datosProducto = {
    nombre: "Sabritas de limón",
    categoria: "Snacks",
    publicoObjetivo: "Niños, jóvenes y adultos",
    estado: "Procesando",
    descripcion:
      "Las papas fritas sabor limón Sabritas poseen jugos naturales y un toque exacto de sal. Respeta Sabritas, tradición y calidad. Ideal para quienes buscan experiencias sabrosas en cualquier ocasión.",
  };

  const datosCampana = {
    nombre: "A que no puedes comer solo una.",
    objetivo: "Generar más ventas.",
    mensaje:
      "Evocar la nostalgia y la espontaneidad de comer papitas, mostrando cómo se integran fácilmente en la vida diaria.",
    publicoObjetivo: "Niños, jóvenes y adultos",
    canales: "Tiendas físicas",
    fechaInicio: "12/05/2025",
    fechaFinal: "02/06/2025",
    presupuesto: "$1,000,000",
  };

  return (
    <div className="bg-gray-100 min-h-screen font-sans">
      <div className="bg-[#0B2C63] text-white p-6">
        <h1 className="text-2xl font-bold text-center">¡Tus datos se han guardado exitosamente!</h1>
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
            <Campo label="Segmento(s)" valor={datosEmpresa.segmento} />
            <Campo label="Dirección" valor={datosEmpresa.direccion} />
            <Campo
              label="Propuesta de valor"
              valor={datosEmpresa.requisitosValor.join("\n")}
              cols={2}
              multiline
            />
            <Campo label="Público objetivo" valor={datosProducto.publicoObjetivo} />
            <Campo label="Descripción de servicios" valor={datosEmpresa.descripcion} cols={2} multiline />
            <Campo label="Competidores" valor={datosEmpresa.competidores} />
          </div>
        </section>

        {/* Producto */}
        <section className="mb-8">
          <h3 className="text-4xl font-bold mb-6">Producto</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Campo label="Nombre" valor={datosProducto.nombre} />
            <Campo label="Categoría" valor={datosProducto.categoria} />
            <Campo label="Descripción" valor={datosProducto.descripcion} cols={2} multiline />
            <Campo label="Público objetivo" valor={datosProducto.publicoObjetivo} />
            <Campo label="Estado" valor={datosProducto.estado} />
          </div>
        </section>

        {/* Campaña */}
        <section className="mb-8">
          <h3 className="text-4xl font-bold mb-6">Campaña</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Campo label="Nombre" valor={datosCampana.nombre} />
            <Campo label="Objetivo" valor={datosCampana.objetivo} />
            <Campo label="Mensaje clave" valor={datosCampana.mensaje} cols={2} multiline />
            <Campo label="Público objetivo" valor={datosCampana.publicoObjetivo} />
            <Campo label="Canales de distribución" valor={datosCampana.canales} />
            <Campo label="Fecha de inicio" valor={datosCampana.fechaInicio} />
            <Campo label="Fecha final" valor={datosCampana.fechaFinal} />
            <Campo label="Presupuesto" valor={datosCampana.presupuesto} />
          </div>
        </section>

        <div className="flex justify-center mt-10">
          <CustomButton
            texto="OK"
            ruta="/users/adminproductos"
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
        <div className="w-full border rounded px-3 py-2 text-sm bg-gray-50 truncate" title={valor}>
          {valor}
        </div>
      )}
    </div>
  );
};

export default Confirmacion;