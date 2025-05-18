import React from "react";
import PlanCard from "../components/PlanCard";
import PaymentMethods from "../components/PaymentMethods";
import FAQSection from "../components/FAQSection";
import PriceDisclaimer from "../components/PriceDisclaimer";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const PlansPageProtected = () => {
    const navigate = useNavigate();

  useEffect(() => {
    const verificarSuscripcion = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/simple/login");
        return;
      }

      try {
        const res = await fetch("http://127.0.0.1:8080/usuario/verificar", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();

        if (res.ok && data.activa === true) {
            console.log("Usuario tiene suscripción activa");
          navigate("/users/bienvenida"); // Usuario ya tiene suscripción, redirige al dashboard
        }
        else{
            console.log("No tienes suscripción activa");
        }
      } catch (err) {
        console.error("Error al verificar suscripción:", err);
        navigate("/simple/login");
      }
    }

    verificarSuscripcion();
  }, [navigate]);
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
        <h1 className="text-6xl font-bold text-center text-white mb-16">
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

export default PlansPageProtected;
