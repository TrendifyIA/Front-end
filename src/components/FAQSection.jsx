/**
 * @file FAQSection.jsx
 * @author Pablo Alonso
 * @description Componente que muestra una sección de preguntas frecuentes (FAQ) en la página de suscripciones.
 *              Permite agregar y editar preguntas y respuestas de manera sencilla.
 */

import React from 'react';

/**
 * Componente funcional que muestra una sección de preguntas frecuentes (FAQ).
 *
 * Utiliza React.useMemo para definir una lista de preguntas y respuestas frecuentes,
 * y las renderiza en un diseño estilizado con Tailwind CSS.
 *
 * @component
 * @returns {JSX.Element} Un contenedor con las preguntas frecuentes y sus respuestas.
 */
const FAQSection = () => {
  const faqs = React.useMemo(() => [
    {
      question: '¿Cuáles son los medios de pago permitidos para comprar una suscripción?',
      answer: 'Tarjeta de débito, tarjeta de crédito, transferencia bancaria, Paypal, Bitcoin y pago en efectivo.',
    },
    {
      question: '¿Cuántos usuarios pueden estudiar con una suscripción?',
      answer: 'Respuesta pendiente...',
    },
    {
      question: '¿Las suscripciones anuales se pueden pagar de forma mensual?',
      answer: 'Sí, ofrecemos un plan de pagos mensuales sin intereses.',
    },
  ], []);

  return (
    <div className="bg-blue-200 rounded-xl p-8 my-12">
      <h2 className="text-2xl font-bold text-center text-blue-800 mb-8">Preguntas frecuentes</h2>
      <div className="space-y-6 max-w-2xl mx-auto">
        {faqs.map((faq, index) => (
          <div key={index} className="text-center">
            <h3 className="font-semibold text-blue-700">{faq.question}</h3>
            <p className="text-gray-600 mt-2">{faq.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQSection;