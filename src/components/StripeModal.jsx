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

  const { error, paymentIntent } = await stripe.confirmPayment({
  elements,
  redirect: "if_required" // Esto evitará la redirección automática si no es necesaria
});

if (error) {
  console.error("Error de pago:", error);
  alert("Error al procesar el pago. Inténtalo de nuevo.");
  setIsLoading(false);
  return;
}

// Si llegamos aquí, pago confirmado sin redirección
try {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/usuario/suscripcion`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify({ suscripcion: 1 }),
  });

  const data = await res.json();

  if (!res.ok) {
    alert("No se pudo actualizar la suscripción: " + (data.error || data.message || ""));
    setIsLoading(false);
    return;
  }

  alert("Pago exitoso y suscripción activada. Redirigiendo...");
  window.location.href = "/simple/login";
} catch (error) {
  console.error("Error al actualizar la suscripción:", error);
  alert("Error inesperado al actualizar la suscripción");
  setIsLoading(false);
}
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
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
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
