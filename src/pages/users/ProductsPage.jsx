import React, { useState } from "react";
import { FaEdit, FaTrashAlt, FaSyncAlt, FaCheck, FaPencilAlt, FaTimes } from "react-icons/fa";
import sabritaslimon from "../../assets/images/sabritaslimon.png";
import sabritasadobadas from "../../assets/images/sabritasadobadas.png";
import sabritashabanero from "../../assets/images/sabritashabanero.png";
import ProductImage from "./ProductImage";
import ProductoModal from "./ProductoModal";
import CampanaModal from "./CampanaModal";

const ProductsPage = () => {
  const [productos, setProductos] = useState([
    {
      nombre: "Sabritas limón",
      imagen: sabritaslimon,
      campañas: [
        { nombre: "Menos sodio", estatus: "Procesado", detalles: "Campaña enfocada en salud." },
        { nombre: "Más producto", estatus: "Procesado", detalles: "Promoción de cantidad." },
      ],
    },
    {
      nombre: "Sabritas adobadas",
      imagen: sabritasadobadas,
      campañas: [
        { nombre: "Salsa secreta", estatus: "Procesado", detalles: "Campaña gourmet secreta." },
      ],
    },
    {
      nombre: "Sabritas habanero",
      imagen: sabritashabanero,
      campañas: [{ nombre: "Añadir", estatus: "Sin procesar" }],
    },
  ]);

  const [selectedProductoIndex, setSelectedProductoIndex] = useState(null);
  const [selectedImagen, setSelectedImagen] = useState(null);
  const [selectedCampana, setSelectedCampana] = useState(null);
  const [showProductoModal, setShowProductoModal] = useState(false);
  const [showCampanaModal, setShowCampanaModal] = useState(false);
  const [editingNombreIndex, setEditingNombreIndex] = useState(null);
  const [nombreTemporal, setNombreTemporal] = useState("");

  const handleNombreChange = (e) => setNombreTemporal(e.target.value);

  const guardarNuevoNombre = (index) => {
    const nuevosProductos = [...productos];
    nuevosProductos[index].nombre = nombreTemporal;
    setProductos(nuevosProductos);
    setEditingNombreIndex(null);
  };

  const abrirProductoModal = (index) => {
    setSelectedProductoIndex(index);
    setShowProductoModal(true);
  };

  const agregarProducto = () => {
    const nuevoProducto = {
      nombre: "Nuevo producto",
      imagen: sabritaslimon,
      campañas: [{ nombre: "Añadir", estatus: "Sin procesar" }],
    };
    setProductos([...productos, nuevoProducto]);
    setSelectedProductoIndex(productos.length);
    setShowProductoModal(true);
  };

  const handleUpdateProducto = (productoActualizado) => {
    setProductos((prevProductos) =>
      prevProductos.map((p, i) =>
        i === selectedProductoIndex ? productoActualizado : p
      )
    );
  };


  const handleGuardarCampana = (campanaActualizada) => {
    setProductos((prev) =>
      prev.map((p) =>
        p.id === productoSeleccionado.id
          ? {
              ...p,
              campanas: p.campanas.map((c) =>
                c.id === campanaActualizada.id ? campanaActualizada : c
              ),
            }
          : p
      )
    );
  };

  const handleUpdateCampana = (productoIndex, campanaActualizada) => {
    setProductos((prevProductos) => {
      const productosActualizados = [...prevProductos];
      const producto = productosActualizados[productoIndex];

      const nuevasCampanas = producto.campañas.map((c) =>
        c.nombre === campanaActualizada.nombre ? campanaActualizada : c
      );

      productosActualizados[productoIndex] = {
        ...producto,
        campañas: nuevasCampanas,
      };

      return productosActualizados;
    });
  };


  const handleNuevaCampana = (productoIndex, nuevaCampana) => {
    if (!productos[productoIndex]) return;

    setProductos((prevProductos) => {
      const productosActualizados = [...prevProductos];
      const producto = productosActualizados[productoIndex];
      const nuevasCampanas = [
        ...producto.campañas.filter((c) => c.nombre !== "Añadir"),
        nuevaCampana,
        { nombre: "Añadir", estatus: "Sin procesar" }, // mantener opción de añadir
      ];
      productosActualizados[productoIndex] = {
        ...producto,
        campañas: nuevasCampanas,
      };
      return productosActualizados;
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 relative">
      <h1 className="text-2xl font-bold text-gray-900 mb-4">Empresa: Sabritas</h1>

      <button
        onClick={agregarProducto}
        className="border border-blue-600 text-blue-600 px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-50 mb-4"
      >
        + Agregar producto
      </button>

      <div className="rounded-lg bg-white shadow mt-6">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 w-1/4">Nombre del producto</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 w-1/4">Campaña</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 w-1/6">Estatus</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 w-1/3">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {productos.map((producto, i) =>
              producto.campañas?.map((campaña, j) => (
                <tr key={`${i}-${j}`}>
                  {j === 0 && (
                    <td
                      rowSpan={producto.campañas.length}
                      className="px-4 py-3 font-medium text-sm text-gray-900"
                    >
                      <div className="flex items-center gap-2">
                        <img
                          src={producto.imagen}
                          alt={producto.nombre}
                          className="w-16 h-16 cursor-pointer rounded"
                          onClick={() => setSelectedImagen(producto.imagen)}
                        />
                        {editingNombreIndex === i ? (
                          <input
                            type="text"
                            value={nombreTemporal}
                            onChange={handleNombreChange}
                            onBlur={() => guardarNuevoNombre(i)}
                            autoFocus
                            className="border rounded px-2 py-1 text-sm"
                          />
                        ) : (
                          <span className="flex items-center gap-1">
                            {producto.nombre}
                            <FaPencilAlt
                              className="text-blue-500 hover:text-blue-700 cursor-pointer"
                              onClick={() => {
                                setEditingNombreIndex(i);
                                setNombreTemporal(producto.nombre);
                              }}
                            />
                          </span>
                        )}
                      </div>
                    </td>
                  )}
                  <td className="px-4 py-3 text-sm text-blue-600 font-medium">
                    {campaña.nombre === "Añadir" ? (
                      <button
                        onClick={() => {
                          setSelectedProductoIndex(i);
                          setSelectedCampana(null);
                          setShowCampanaModal(true);
                        }}
                        className="bg-blue-900 text-white px-3 py-1 rounded-md text-sm hover:bg-blue-700"
                      >
                        + Añadir
                      </button>
                    ) : (
                      <span
                        onClick={() => setSelectedCampana(campaña)}
                        className="hover:underline cursor-pointer"
                      >
                        {campaña.nombre} <span className="ml-1">›</span>
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${
                        campaña.estatus === "Procesado"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {campaña.estatus}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <button
                        onClick={() => abrirProductoModal(i)}
                        className="flex items-center gap-1 bg-blue-600 text-white px-3 py-1 rounded-md text-sm hover:bg-blue-700"
                      >
                        <FaEdit /> Editar
                      </button>
                      <button className="flex items-center gap-1 bg-red-600 text-white px-3 py-1 rounded-md text-sm hover:bg-red-700">
                        <FaTrashAlt /> Eliminar
                      </button>
                      {campaña.estatus === "Sin procesar" ? (
                        <button className="flex items-center gap-1 bg-gray-400 text-white px-3 py-1 rounded-md text-sm hover:bg-gray-500">
                          <FaSyncAlt /> Procesar
                        </button>
                      ) : (
                        <button className="flex items-center gap-1 bg-green-600 text-white px-3 py-1 rounded-md text-sm hover:bg-green-700">
                          <FaCheck /> Revisar
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {selectedImagen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-60 flex items-center justify-center">
          <div className="relative">
            <button
              onClick={() => setSelectedImagen(null)}
              className="absolute top-2 right-2 bg-black bg-opacity-50 p-2 rounded-full text-white text-2xl hover:bg-opacity-75"
            >
              <FaTimes />
            </button>
            <img
              src={selectedImagen}
              alt="Ampliada"
              className="max-w-lg max-h-screen rounded-lg"
            />
          </div>
        </div>
      )}

      {selectedCampana && (
        <div className="fixed inset-0 z-40 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md">
            <h2 className="text-lg font-bold mb-2">
              Campaña: {selectedCampana.nombre}
            </h2>
            <p className="text-sm text-gray-700 mb-4">
              {selectedCampana.detalles}
            </p>
            <button
              onClick={() => setSelectedCampana(null)}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}

      {showProductoModal && selectedProductoIndex != null && (
        <ProductoModal
          producto={productos[selectedProductoIndex]}
          onClose={() => setShowProductoModal(false)}
          onSave={handleUpdateProducto}
        />
      )}

      {showCampanaModal && selectedProductoIndex != null && (
        <CampanaModal
          producto={productos[selectedProductoIndex]}
          campana={selectedCampana}
          onClose={() => {
            setShowCampanaModal(false);
            setSelectedCampana(null);
          }}
          onSave={handleUpdateCampana}
          onNuevaCampana={handleNuevaCampana}
        />
      )}
    </div>
  );
};

export default ProductsPage;
