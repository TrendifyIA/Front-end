import React from 'react';

const FAQSection = () => {
  const faqs = [
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
  ];

  return (
    <div className="bg-blue-50 rounded-xl p-8 my-12">
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