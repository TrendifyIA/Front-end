import React, { useState, useEffect } from 'react';
import { FaExclamationTriangle, FaCheckCircle } from 'react-icons/fa';

const EliminarModal = ({ producto, onClose, onConfirm }) => {
  const [eliminado, setEliminado] = useState(false);

  useEffect(() => { 
    setEliminado(false); 
    }, [producto]);

  const handleConfirmar = () => {
    setEliminado(true);
    setTimeout(() => {
      onConfirm(); 
      onClose();  
      setEliminado(false); 
    }, 2000);
  };

  const handleCancelar = () => {
    onClose();
  };


  return (
    <div className="fixed inset-0 z-50 backdrop-blur-sm flex items-center justify-center">
      <div className="relative bg-white p-9 rounded-md shadow max-w-md w-full text-center transition-all duration-300">

        {!eliminado ? (
          <>
            <FaExclamationTriangle className="text-yellow-400 text-7xl mx-auto mb-4 animate-pulse" />
            <h2 className="text-xl font-semibold mb-2">
              ¿Está seguro que desea eliminar el producto{' '}
              <span className="font-bold">"{producto?.nombre}"</span>?
            </h2>
            <p className="text-gray-700 mb-6">
              Esta acción es permanente y no se podrá revertir.
            </p>

            <div className="flex justify-center gap-4">
              <button
                onClick={handleConfirmar}
                className="bg-red-600 hover:bg-red-800 text-white px-9 py-3 rounded-md text-sm font-medium transition"
              >
                Eliminar
              </button>
              <button
                onClick={handleCancelar}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-9 py-3 rounded-md text-sm font-medium transition">
                Cancelar
            </button>
            </div>
          </>
        ) : (
          <>
            <FaCheckCircle className="text-green-500 text-7xl mx-auto mb-4 animate-bounce" />
            <h2 className="text-xl font-semibold mb-2 text-green-700">
              ¡Producto eliminado!
            </h2>
            <p className="text-gray-600">
              Se ha borrado <span className="font-bold">"{producto?.nombre}"</span>.
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default EliminarModal;
