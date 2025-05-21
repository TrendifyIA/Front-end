import React, { useState, useEffect } from 'react';
import CustomButton from '../../components/CustomButton';

const Empresa = () => {
  const [empresa, setEmpresa] = useState(null);
  const [url, setUrl] = useState("http://localhost:8080/empresa/empresa/4");

  useEffect(() => {
    console.log("Descargando datos de empresa...");
    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error("Empresa no encontrada");
        return res.json();
      })
      .then((data) => {
        console.log("Datos recibidos:", data);
        setEmpresa(data);
      })
      .catch((err) => {
        console.error("Error al obtener empresa:", err);
        setEmpresa(null);
      });
  }, [url]);

  if (!empresa) return <p className="p-10">Cargando empresa...</p>;

    
  return (
    <div className="flex flex-col gap-5 w-full p-10">
      <h1 className="text-4xl font-bold">Empresa</h1>
      <p className="w-[1000px]">
        La información que guardes acerca de tu empresa deberá ser lo más detallada posible, ya que de esto dependerá cómo y sobre qué se harán las predicciones acerca de tu plan de comunicación.
      </p>

      <div className="bg-white shadow-md rounded-2xl p-7 w-[1000px]">
        <div className="flex flex-row gap-4 w-full">
          <div className="flex flex-col gap-2 mb-4 w-1/2">
            <label htmlFor="nameCompany" className="font-medium">Nombre de la empresa:</label>
            <input
              type="text"
              id="nameCompany"
              value={empresa.nombre}
              readOnly
              className="border-2 border-neutral-400 p-4 rounded-[5px] focus:outline-none focus:border-secondary-400"
            />
          </div>
          <div className="flex flex-col gap-2 mb-4 w-1/2">
            <label htmlFor="segment" className="font-medium">Segmento de mercado:</label>
            <input
              type="text"
              id="segment"
              value={empresa.nicho}
              readOnly
              className="border-2 border-neutral-400 p-4 rounded-[5px] focus:outline-none focus:border-secondary-400"
            />
          </div>
        </div>

        <div className="flex flex-col gap-2 mb-4 w-full">
          <label htmlFor="location" className="font-medium">Dirección física:</label>
          <input
            type="text"
            id="location"
            value={empresa.direccion}
            readOnly
            className="border-2 border-neutral-400 p-4 rounded-[5px] focus:outline-none focus:border-secondary-400"
          />
        </div>

        <div className="flex flex-col gap-2 mb-4 w-full">
          <label className="font-medium">Propuesta de valor:</label>
          <input
            type="text"
            value={empresa.propuesta_valor}
            readOnly
            className="border-2 border-neutral-400 p-4 rounded-[5px] focus:outline-none focus:border-secondary-400"
          />
        </div>

        <div className="flex flex-col gap-2 mb-4 w-full">
          <label className="font-medium">Descripción de servicios/productos:</label>
          <input
            type="text"
            value={empresa.descripcion_servicio}
            readOnly
            className="border-2 border-neutral-400 p-4 rounded-[5px] focus:outline-none focus:border-secondary-400"
          />
        </div>

        <div className="flex flex-col gap-2 mb-4 w-full">
          <label className="font-medium">Competidores:</label>
          <input
            type="text"
            value={empresa.competidores}
            readOnly
            className="border-2 border-neutral-400 p-4 rounded-[5px] focus:outline-none focus:border-secondary-400"
          />
        </div>

        <div className="w-full flex justify-center">
          <CustomButton texto="Guardar" tipo="terciario" onClick={() => {}} />
        </div>
      </div>
    </div>
  );
};
export default Empresa;
