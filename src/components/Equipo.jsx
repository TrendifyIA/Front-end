import React from "react";
import TarjetaColaborador from "./TarjetaColaborador";

const Equipo = () => {
  const equipo = [
    {
      nombre: "Henry Paulista",
      correo: "henry@gmail.com",
      puesto: "Director de marketing",
      imagen: "https://i.pravatar.cc/150?img=12",
    },
    {
      nombre: "Anastasia Groetze",
      correo: "anastasia@gmail.com",
      puesto: "Analista de marketing",
      imagen: "https://i.pravatar.cc/150?img=5",
    },
    {
      nombre: "Alice McKenzie",
      correo: "alice@gmail.com",
      puesto: "Gerente de marketing",
      imagen: "https://i.pravatar.cc/150?img=47",
    },
    {
      nombre: "Evan Jefferson",
      correo: "evan@gmail.com",
      puesto: "Especialista en redes sociales",
      imagen: "https://i.pravatar.cc/150?img=33",
    },
    {
      nombre: "Jack Ro",
      correo: "jack@gmail.com",
      puesto: "Brand Manager",
      imagen: "https://i.pravatar.cc/150?img=23",
    },
    {
      nombre: "Mark Thomson",
      correo: "mark@gmail.com",
      puesto: "Director Creativo",
      imagen: "https://i.pravatar.cc/150?img=19",
    },
  ];

  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-6">Equipo</h1>
      <div className="grid md:grid-cols-3 gap-6">
        {equipo.map((persona, index) => (
          <TarjetaColaborador key={index} {...persona} />
        ))}
      </div>
    </div>
  );
};

export default Equipo;
