import React from "react";
import PlanCard from "./PlanCard";
import PaymentMethods from "./PaymentMethods";
import FAQSection from "./FAQSection";
import PriceDisclaimer from "./PriceDisclaimer";

const PlansPage = () => {
  const plans = [
    {
      title: "Plan Plata",
      price: "$700 MXN al mes",
      description:
        "Diseñado para aquellas empresas que están comenzando a posicionarse en su nicho y quieren mantenerse activas.",
      features: [
        "Top 10 tendencias y comparación de hasta 3 palabras clave.",
        "Visualización por país y evolución en 3 meses.",
      ],
      excludedFeatures: [
        "Acceso a 12 meses de datos y comparación de hasta 6 palabras.",
        "Exportación de datos y explicaciones por IA.",
        "Notificaciones en tiempo real y predicciones con IA.",
        "Reportes estratégicos y filtrado por por ciudad/estado/país.",
      ],
    },
    {
      title: "Plan Oro",
      price: "$1000 MXN al mes",
      description:
        "Enfocada a marketers y analistas que necesitan información más detallada y capacidades predictivas. (Incluye los beneficios del Plan Plata)",
      features: [
        "Top 10 tendencias y comparación de hasta 3 palabras clave.",
        "Visualización por país y evolución en 3 meses.",
        "Acceso a 12 meses de datos y comparación de hasta 6 palabras.",
        "Exportación de datos y explicaciones por IA.",
      ],
      excludedFeatures: [
        "Notificaciones en tiempo real y predicciones con IA.",
        "Reportes estratégicos y filtrado por por ciudad/estado/país.",
      ],
      isPopular: true,
    },
    {
      title: "Plan Diamante",
      price: "$1300 MXN al mes",
      description:
        "Para empresas y agencias que requieren un análisis de tendencias avanzado con inteligencia artificial. (Incluye los beneficios del Plan Oro)",
      features: [
        "Top 10 tendencias y comparación de hasta 3 palabras clave.",
        "Visualización por país y evolución en 3 meses.",
        "Acceso a 12 meses de datos y comparación de hasta 6 palabras.",
        "Exportación de datos y explicaciones por IA.",
        "Notificaciones en tiempo real y predicciones con IA.",
        "Reportes estratégicos y filtrado por por ciudad/estado/país.",
      ],
    },
  ];

  return (
    <div className="bg-primary-500 min-h-screen py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center text-white mb-16">
          Elije el plan ideal
        </h1>

        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <PlanCard key={index} {...plan} />
          ))}
        </div>

        <div className="text-center mt-12 text-white">
          <p className="mb-4">Mantén tu suscripción activa y disfruta de todos los beneficios.</p>
          <PriceDisclaimer />
        </div>

        <PaymentMethods />
        <FAQSection />
      </div>
    </div>
  );
};

export default PlansPage;
