/**
 * @file ModalTerminos.jsx
 * @author Eduardo Rosas
 * @description Se ponen los terminos y condiciones del sistema
 */

import React from "react";

/**
 * ModalTerminos es un componente modal que muestra los "Términos y Condiciones"
 * para la plataforma Trendify. Superpone la vista actual y presenta una lista desplazable de términos.
 *
 * @componente
 * @param {Object} props - Propiedades del componente.
 * @param {Function} props.onClose - Función de devolución de llamada para cerrar el modal cuando se hace clic en el botón "Cerrar".
 * @returns {JSX.Element} El modal renderizado con los términos y condiciones.
 */

const ModalTerminos = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white rounded-2xl shadow-xl w-[95%] max-w-3xl p-6 overflow-y-auto max-h-[90vh]">
        <h2 className="text-2xl font-bold text-center text-primary-600 mb-4">Términos y Condiciones</h2>
        <div className="text-sm text-gray-700 space-y-3 leading-relaxed">
          <p><strong>1. Aceptación de Términos:</strong> Al acceder y utilizar la plataforma <b>Trendify</b>, aceptas estos Términos. Si no estás de acuerdo, no utilices el servicio.</p>
          <p><strong>2. Descripción del Servicio:</strong> Trendify permite a empresas registrar productos, campañas, imágenes y datos relacionados a su estrategia de marketing.</p>
          <p><strong>3. Registro:</strong> El usuario es responsable de la veracidad de los datos proporcionados y del uso de su cuenta.</p>
          <p><strong>4. Propiedad Intelectual:</strong> El contenido original de Trendify (incluyendo código, diseño y marca) está protegido por derechos de autor.</p>
          <p><strong>5. Restricciones:</strong> Está prohibido usar la plataforma para actividades ilegales, acceder a otras cuentas, o subir contenido ofensivo o fraudulento.</p>
          <p><strong>6. Suspensión:</strong> Nos reservamos el derecho de suspender cuentas que violen estos términos, sin previo aviso.</p>
          <p><strong>7. Cambios:</strong> Podemos modificar los servicios o los presentes términos en cualquier momento. El uso continuo implicará aceptación.</p>
          <p><strong>8. Jurisdicción:</strong> Estos términos se rigen por las leyes de <b>México</b>. Cualquier disputa será resuelta por tribunales competentes en el país.</p>
        </div>
        <div className="mt-6 text-center">
          <button onClick={onClose} className="px-6 py-2 bg-primary-500 text-white rounded hover:bg-primary-600 transition">
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalTerminos;
