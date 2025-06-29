/**
 * @file PlanCard.jsx
 * @author Pablo Alonso
 * @description Componente que muestra una tarjeta de plan con información relevante como título, precio, descripción,
 * características incluidas y excluidas, y un botón de suscripción que varía según la ruta actual.
 * 
 * @component
 * @param {Object} props - Propiedades del componente.
 * @param {string} props.title - Título del plan.
 * @param {string} props.price - Precio del plan.
 * @param {string} props.description - Descripción breve del plan.
 * @param {string[]} props.features - Lista de características incluidas en el plan.
 * @param {string[]} [props.excludedFeatures=[]] - Lista de características excluidas del plan.
 * @param {boolean} props.isPopular - Indica si el plan es el más popular.
 *
 * @returns {JSX.Element} Tarjeta de plan con detalles y botón de suscripción.
 */
import { useState } from "react";
import { useLocation } from "react-router-dom";
import StripeModal from "./StripeModal";
import CustomButton from "./CustomButton";


const PlanCard = ({ title, price, description, features, excludedFeatures = [], isPopular }) => {
  const [showStripe, setShowStripe] = useState(false);
  const location = useLocation();

  return (
    <div className={`rounded-xl p-8 shadow-lg ${isPopular ? "bg-white" : "bg-blue-200"}`}>
      <h3 className={`text-4xl font-bold ${isPopular ? "text-blue-800" : "text-blue-700"}`}>
        {title}
      </h3>
      <p className="text-3xl font-bold my-3 text-blue-900">{price}</p>
      <p className="text-gray-700 mb-6 text-[18px]">{description}</p>

      <ul className="space-y-3 mb-8">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start">
            <span className="text-green-500 mr-2">✓</span>
            <span className="text-gray-800 text-[18px]">{feature}</span>
          </li>
        ))}
        {excludedFeatures.map((feature, index) => (
          <li key={`excluded-${index}`} className="flex items-start">
            <span className="text-red-500 mr-2">✗</span>
            <span className="text-gray-600 text-[18px]">{feature}</span>
          </li>
        ))}
      </ul>

      {location.pathname === "/planes" ? (
        
        <CustomButton 
          texto="Suscribirse"
          tipo="terciario"
          extraClases="w-full py-3 rounded-lg font-bold"
          ruta={"/simple/login"}
        >
        </CustomButton>
      ) : location.pathname === "/simple/planes_protected" ? (
        <CustomButton 
          texto="Suscribirse"
          tipo="terciario"
          extraClases="w-full py-3 rounded-lg font-bold"
          onClick={() => setShowStripe(true)}
        >
        </CustomButton>
      ) : null}

      {showStripe && <StripeModal onClose={() => setShowStripe(false)} />}
    </div>
  );
};

export default PlanCard;