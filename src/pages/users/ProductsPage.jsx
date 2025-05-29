import React, { useState, useEffect } from "react";
import {
  FaEdit,
  FaTrashAlt,
  FaSyncAlt,
  FaCheck,
  FaPencilAlt,
  FaTimes,
} from "react-icons/fa";
import ProductImage from "./ProductImage";
import ProductoModal from "../../components/ProductoModal";
import CampanaModal from "../../components/CampanaModal";

const ProductsPage = () => {
  const [productos, setProductos] = useState([]);
  const [selectedProductoIndex, setSelectedProductoIndex] = useState(null);
  const [selectedImagen, setSelectedImagen] = useState(null);
  const [selectedCampana, setSelectedCampana] = useState(null);
  const [showProductoModal, setShowProductoModal] = useState(false);
  const [showCampanaModal, setShowCampanaModal] = useState(false);
  const [editingNombreIndex, setEditingNombreIndex] = useState(null);
  const [nombreTemporal, setNombreTemporal] = useState("");

  // 🟡 Cargar productos desde backend
  useEffect(() => {
    const idEmpresa = 9; // Cambia esto por el ID dinámico si es necesario
    fetch(`http://localhost:8080/producto/productos/${idEmpresa}`)
      .then((res) => res.json())
      .then((data) => {
        // Inicializa campañas vacías
        const productosConCampanas = data.map((p) => ({
          ...p,
          campañas: [{ nombre: "Añadir", estatus: "Sin procesar" }],
        }));
        setProductos(productosConCampanas);
      })
      .catch((error) => console.error("Error al obtener productos:", error));
  }, []);

  const handleNombreChange = (e) => setNombreTemporal(e.target.value);

  const guardarNuevoNombre = (index) => {
    const nuevos = [...productos];
    nuevos[index].nombre = nombreTemporal;
    setProductos(nuevos);
    setEditingNombreIndex(null);
  };

  const agregarProducto = () => {
    const nuevo = {
      nombre: "Nuevo producto",
      ruta_img: "", // podrías usar imagen por defecto
      campañas: [{ nombre: "Añadir", estatus: "Sin procesar" }],
    };
    setProductos([...productos, nuevo]);
    setSelectedProductoIndex(productos.length);
    setShowProductoModal(true);
  };

  const abrirProductoModal = (index) => {
    setSelectedProductoIndex(index);
    setShowProductoModal(true);
  };

  const handleUpdateProducto = (actualizado) => {
    setProductos(productos.map((p, i) => (i === selectedProductoIndex ? actualizado : p)));
  };

  const handleUpdateCampana = (prodIndex, campanaActualizada) => {
    const actualizados = [...productos];
    const nuevasCampanas = actualizados[prodIndex].campañas.map((c) =>
      c.nombre === campanaActualizada.nombre ? campanaActualizada : c
    );
    actualizados[prodIndex].campañas = nuevasCampanas;
    setProductos(actualizados);
  };

  const handleNuevaCampana = (prodIndex, nuevaCampana) => {
    const actualizados = [...productos];
    const producto = actualizados[prodIndex];
    const nuevas = [
      ...producto.campañas.filter((c) => c.nombre !== "Añadir"),
      nuevaCampana,
      { nombre: "Añadir", estatus: "Sin procesar" },
    ];
    producto.campañas = nuevas;
    setProductos(actualizados);
  };

  function procesarCampaña() {
    const idCampana = 12; // ID hardcodeado temporalmente

    fetch("http://127.0.0.1:8080/proceso/iniciar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include",
      body: JSON.stringify({ id_campana: idCampana })
    })
      .then(response => response.json())
      .then(data => {
        console.log("Respuesta del servidor:", data);
        alert(data.msg || "Proceso completado");
      })
      .catch(error => {
        console.error("Error al procesar:", error);
      });
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6 relative">
      <h1 className="text-2xl font-bold text-gray-900 mb-4">Empresa: Sabritas</h1>

      <button
        onClick={agregarProducto}
        className="border border-blue-600 text-blue-600 px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-50 mb-4"
      >
        + Agregar producto
      </button>

      <div className="rounded-lg bg-white shadow">
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
                    <td rowSpan={producto.campañas.length} className="px-4 py-3 text-sm font-medium text-gray-900">
                      <div className="flex items-center gap-2">
                        <ProductImage
                          src={producto.ruta_img}
                          alt={producto.nombre}
                          className="w-16 h-16 cursor-pointer rounded"
                          onClick={() => setSelectedImagen(producto.ruta_img)}
                        />
                        {editingNombreIndex === i ? (
                          <input
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
                        <button className="flex items-center gap-1 bg-gray-400 text-white px-3 py-1 rounded-md text-sm hover:bg-gray-500" onClick={() => {procesarCampaña()}}>
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
            <img src={selectedImagen} alt="Ampliada" className="max-w-lg max-h-screen rounded-lg" />
          </div>
        </div>
      )}

      {selectedCampana && (
        <div className="fixed inset-0 z-40 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md">
            <h2 className="text-lg font-bold mb-2">Campaña: {selectedCampana.nombre}</h2>
            <p className="text-sm text-gray-700 mb-4">{selectedCampana.detalles}</p>
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
