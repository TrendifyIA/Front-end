import StripeModal from "./StripeModal";
import { useState } from "react";

const PlanCard = ({ title, price, description, features, excludedFeatures = [], isPopular }) => {
  const [showStripe, setShowStripe] = useState(false);

  return (
    <div className={`rounded-xl p-8 shadow-lg ${isPopular ? "bg-white" : "bg-blue-200"}`}>
      <h3 className={`text-4xl font-bold ${isPopular ? "text-blue-800" : "text-blue-700"}`}>
        {title}
      </h3>
      <p className="text-3xl font-bold my-3 text-blue-900">{price}</p>
      <p className="text-gray-700 mb-6">{description}</p>

      <ul className="space-y-3 mb-8">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start">
            <span className="text-green-500 mr-2">✓</span>
            <span className="text-gray-800">{feature}</span>
          </li>
        ))}
        {excludedFeatures.map((feature, index) => (
          <li key={`excluded-${index}`} className="flex items-start">
            <span className="text-red-500 mr-2">✗</span>
            <span className="text-gray-600">{feature}</span>
          </li>
        ))}
      </ul>

      <button
        className="w-full py-3 rounded-lg font-bold bg-blue-500 text-white hover:bg-blue-600"
        onClick={() => setShowStripe(true)}
      >
        Suscríbete
      </button>

      {showStripe && <StripeModal onClose={() => setShowStripe(false)} />}
    </div>
  );
};

export default PlanCard;
