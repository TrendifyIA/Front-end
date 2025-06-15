/**
 * @file PaymentMethods.jsx
 * @author Pablo Alonso
 * @description Componente que muestra logos de los métodos de pago aceptados en la aplicación Trendify.
 */
import React from 'react';

const PaymentMethods = () => {
  const paymentMethods = [
  ];

  return (
    <div className="flex flex-wrap justify-center gap-6 my-8">
      {paymentMethods.map((method) => (
        <img 
          key={method.name}
          src={method.logo}
          alt={method.name}
          className="h-10 object-contain"
        />
      ))}
    </div>
  );
};

export default PaymentMethods;