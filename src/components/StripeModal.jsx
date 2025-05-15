// StripeModal.jsx
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements
} from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

function CheckoutForm({ onClose }) {
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: "http://localhost:5173/simple/login",
      },
    });

    if (error) alert(error.message);
    setIsLoading(false);
  };

  return (
    <div className="bg-white p-6 rounded shadow max-w-md w-full">
      <form onSubmit={handleSubmit}>
        <PaymentElement />
        <button
          disabled={isLoading || !stripe || !elements}
          className="mt-4 w-full bg-blue-600 text-white py-2 rounded"
        >
          {isLoading ? "Procesando..." : "Pagar"}
        </button>
      </form>
      <button onClick={onClose} className="mt-4 w-full text-sm text-red-500 hover:underline">
        Cancelar
      </button>
    </div>
  );
}

export default function StripeModal({ onClose }) {
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/pago`, {
      method: "POST",
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, []);

  const options = {
    clientSecret,
    appearance: { theme: "stripe" },
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 overflow-y-auto py-10">
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm onClose={onClose} />
        </Elements>
      )}
    </div>
  );
}
