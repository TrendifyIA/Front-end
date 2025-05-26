import React from 'react';
import TargetIcon from '../assets/icons/target.svg';
import EyeIcon from '../assets/icons/eye.svg';
import CheckIcon from '../assets/icons/check.svg';

const MissionVision = () => {
  const cards = [
    {
      title: "Misión",
      icon: TargetIcon,
      content: "Brindar a empresas y agencias de marketing acceso inmediato a información precisa, relevante y predictiva sobre tendencias de mercado, facilitando decisiones estratégicas más rápidas, efectivas y con mayor retorno de inversión."
    },
    {
      title: "Visión",
      icon: EyeIcon,
      content: "Ser la plataforma líder en inteligencia de tendencias en América Latina, transformando la manera en que las empresas comprenden y anticipan el mercado, mediante tecnología innovadora y análisis en tiempo real."
    },
    {
      title: "Valores",
      icon: CheckIcon,
      items: [
        { text: "Agilidad: Entregamos información rápida y eficiente para decisiones oportunas." },
        { text: "Precisión: Ofrecemos datos confiables que minimizan riesgos estratégicos." },
        { text: "Innovación: Evolucionamos constantemente con tecnología de vanguardia." }
      ]
    }
  ];

  return (
    <div className="grid md:grid-cols-3 gap-8 my-12">
      {cards.map((card, index) => (
        <div key={index} className="bg-blue-300 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all">
          <div className="flex flex-col items-center text-center">
            <img src={card.icon} alt={`Icono ${card.title}`} className="w-16 h-16 mb-4" />
            <h3 className="text-2xl font-bold text-black mb-4">{card.title}</h3>
            
            {card.content ? (
              <p className="text-black">{card.content}</p>
            ) : (
              <ul className="space-y-3 text-left w-full">
                {card.items.map((item, i) => (
                  <li key={i} className="flex items-start">
                    <span className="text-blue-900 mr-2">•</span>
                    <span className="text-black">{item.text}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MissionVision;