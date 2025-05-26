import React, { useState, useEffect } from 'react';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import { BsImage } from 'react-icons/bs';

const ProductoModal = ({ producto, onClose, onSave }) => {
  const [nombre, setNombre] = useState('');
  const [categoria, setCategoria] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [publico, setPublico] = useState('');
  const [estado, setEstado] = useState('');
  const [imagen, setImagen] = useState(null);
  const [mensaje, setMensaje] = useState(null);

  useEffect(() => {
    if (producto) {
      setNombre(producto.nombre || '');
      setCategoria(producto.categoria || '');
      setDescripcion(producto.descripcion || '');
      setPublico(producto.publico || '');
      setEstado(producto.estado || '');
      setImagen(producto.imagen || null); 
    }
  }, [producto]);

  const handleGuardar = (e) => {
    e.preventDefault();

    if (!nombre || !categoria || !descripcion || !publico || !estado || !imagen) {
      setMensaje({
        tipo: 'error',
        texto: 'Error: No se han completado todos los campos.',
      });
      return;
    }

    const productoActualizado = {
      ...producto,
      nombre,
      categoria,
      descripcion,
      publico,
      estado,
      imagen,
      campanas: producto?.campanas || [],
    };

    setMensaje({
      tipo: 'success',
      texto: 'La información se ha guardado correctamente.',
    });

    setTimeout(() => {
      setMensaje(null);
      onSave(productoActualizado);
      onClose();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 backdrop-blur-sm flex items-center justify-center">
      <div className="relative bg-white p-8 rounded shadow max-w-3xl w-full">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-black text-xl"
        >
          ✕
        </button>

        <h2 className="text-lg font-bold mb-4">Editar producto</h2>

        {mensaje && (
          <div
            className={`flex items-center gap-2 mb-4 px-4 py-3 rounded ${
              mensaje.tipo === 'error'
                ? 'bg-red-100 text-red-700'
                : 'bg-green-100 text-green-700'
            }`}
          >
            {mensaje.tipo === 'error' ? (
              <FaTimesCircle className="text-red-500" />
            ) : (
              <FaCheckCircle className="text-green-500" />
            )}
            <span className="text-sm font-medium">{mensaje.texto}</span>
          </div>
        )}

        

        <form onSubmit={handleGuardar}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block mb-1 font-medium">Nombre:</label>
              <input
                required
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                className="w-full border rounded px-3 py-2"
                type="text"
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Categoría(s):</label>
              <select
                required
                value={categoria}
                onChange={(e) => setCategoria(e.target.value)}
                className="w-full border rounded px-3 py-2 cursor-pointer"
              >
                <option value="">Seleccione</option>
                <option>Alimentos</option>
                <option>Tecnología</option>
                <option>Ropa</option>
                <option>Autos</option>
              </select>
            </div>
          </div>

          <div className="mb-4">
            <label className="block mb-1 font-medium">Descripción:</label>
            <input
              required
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              className="w-full border rounded px-3 py-2"
              type="text"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block mb-1 font-medium">Público objetivo:</label>
              <input
                required
                value={publico}
                onChange={(e) => setPublico(e.target.value)}
                className="w-full border rounded px-3 py-2"
                type="text"
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Estado:</label>
              <select
                required
                value={estado}
                onChange={(e) => setEstado(e.target.value)}
                className="w-full border rounded px-3 py-2"
              >
                <option value="">Seleccione</option>
                <option>Procesado</option>
                <option>Sin Procesar</option>
              </select>
            </div>
          </div>

          <div className="mb-6">
            <label className="block mb-2 font-medium">Imagen de producto:</label>
            <label
              htmlFor="imagen"
              className="border-2 border-dashed border-gray-400 rounded p-6 text-center cursor-pointer flex flex-col items-center justify-center text-gray-500 hover:bg-gray-50 transition"
            >
              <BsImage className="text-4xl mb-2" />
              <span>+ Añadir imagen</span>
              <input
                type="file"
                id="imagen"
                name="imagen"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    setImagen(file);
                  }
                }}
              />
            </label>
            {imagen && (
              <p className="text-sm text-gray-600 mt-2 italic">
                Imagen seleccionada:{' '}
                {typeof imagen === 'string' ? imagen : imagen.name}
              </p>
            )}
          </div>

          <div className="mt-6 flex justify-center">
            <button
              type="submit"
              className="bg-blue-800 hover:bg-blue-700 text-white font-medium px-6 py-2 rounded-md text-sm transition"
            >
              Guardar 
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default ProductoModal;
