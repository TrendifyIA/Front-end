import React from 'react';
import MexicoFlag from '../assets/images/mexico-flag.svg';

const PriceDisclaimer = () => (
  <div className="flex items-center justify-center gap-2 text-white">
    <img src={MexicoFlag} alt="Bandera México" className="w-6 h-4" />
    <p>Precios en pesos mexicanos. Utiliza el método de pago de tu preferencia:</p>
  </div>
);

export default PriceDisclaimer;