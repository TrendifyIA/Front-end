import React from 'react';

const Strengths = () => {
  const strengths = [
    "Dominio de tecnologías avanzadas para construir una plataforma eficiente, segura y escalable.",
    "Diseño centrado en el cliente que responde a necesidades reales de marketing en tiempo real.",
    "Adaptación a cada nicho de negocio para ofrecer experiencias personalizadas.",
    "Comunicación constante y transparente durante el proceso de desarrollo.",
    "Innovación continua para entregar soluciones que superen expectativas.",
  ];

  return (
    <section className="my-16 flex items-center">
      <div className="w-1/4 flex justify-center">
        <h2 className="text-6xl font-bold text-black">Fortalezas</h2>
      </div>

      <div className="w-3/4 pl-10">
        <div className="space-y-4">
          {strengths.map((strength, index) => (
            <div key={index} className="flex items-start">
              <span className="text-green-500 mr-2">✓</span>
              <p className="text-black text-lg">{strength}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Strengths;
