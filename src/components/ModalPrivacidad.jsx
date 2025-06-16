/**
 * @file ModalPrivacidad.jsx
 * @author Eduardo Rosas
 * @description Se ponen los avisos de privacidad de datos
 */

import React from "react";

/**
 * ModalPrivacidad es un componente modal que muestra la información de la política de privacidad.
 *
 * @componente
 * @param {Object} props - Propiedades del componente.
 * @param {Function} props.onClose - Función de devolución de llamada para cerrar el modal.
 * @returns {JSX.Element} El modal renderizado con el contenido de la política de privacidad.
 */
const ModalPrivacidad = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white rounded-2xl shadow-xl w-[95%] max-w-3xl p-6 overflow-y-auto max-h-[90vh]">
        <h2 className="text-2xl font-bold text-center text-primary-600 mb-4">Política de Privacidad</h2>
        <div className="text-sm text-gray-700 space-y-3 leading-relaxed">
          <p><strong>1. Información Recopilada:</strong> Recopilamos datos como nombre, correo electrónico, dirección, nombre de empresa, productos, campañas e imágenes. También almacenamos tu dirección IP y estadísticas de uso.</p>
          <p><strong>2. Uso de la Información:</strong> Utilizamos tus datos para autenticarte, mostrar tus productos y campañas, procesar pagos y mejorar tu experiencia.</p>
          <p><strong>3. Compartición:</strong> No vendemos ni compartimos tus datos con terceros, salvo con servicios integrados como <b>Stripe</b> (pagos) y <b>Cloudinary</b> (almacenamiento de imágenes).</p>
          <p><strong>4. Seguridad:</strong> Usamos autenticación con JWT, cifrado HTTPS, validaciones en el backend y control de acceso para proteger tu información.</p>
          <p><strong>5. Derechos del Usuario:</strong> Puedes acceder, corregir o eliminar tu información enviando una solicitud por medio de tu cuenta o contacto directo.</p>
          <p><strong>6. Cookies:</strong> Utilizamos cookies para personalizar la experiencia del usuario y para análisis internos. Puedes desactivarlas desde tu navegador.</p>
          <p><strong>7. Cambios a esta Política:</strong> Te notificaremos sobre cambios en esta política mediante la plataforma. El uso continuo implica aceptación.</p>
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

export default ModalPrivacidad;
