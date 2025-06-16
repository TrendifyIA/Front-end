/**
 * @file PlansProtected.jsx
 * @author Eduardo Rosas
 * @description Planes protegidos para pagar la suscripción
 */

import React from "react";
import PlanCard from "../components/PlanCard";
import PaymentMethods from "../components/PaymentMethods";
import FAQSection from "../components/FAQSection";
import PriceDisclaimer from "../components/PriceDisclaimer";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const PlansPageProtected = () => {
    const navigate = useNavigate();

  // Se hace un fecth para iniciar sesión mandando el token
  useEffect(() => {
    const verificarSuscripcion = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/simple/login");
        return;
      }

      // Se hace un fecth para verificar si el usuario tiene suscripción
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
          navigate("/users/adminproductos"); // Usuario ya tiene suscripción, redirige al dashboard
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

  // Constante que define los diferentes tipos de planes
  const plans = [
    {
      title: "Suscripción",
      price: "$700 MXN al mes",
      description:
        "Diseñado para aquellas empresas que están comenzando a posicionarse en su nicho y quieren mantenerse activas.",
      features: [
        "Top 5 tendencias y comparación palabras clave.",
        "Visualización de gráficas de popularidad de palabras clave.",
        "Visualización de gráficas de popularidad en Reddit, YouTube y Web.",
        "Análisis con IA."
      ],
      excludedFeatures: [
      ],
    },
  ];

  return (
    <div className="bg-primary-500 min-h-screen py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-6xl font-bold text-center text-white mb-16">
          Suscríbete a Trendify
        </h1>

        {/*Map que recorre los diferentes tipos de arreglos para automatizarlos*/}
        <div className="flex justify-center">
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
