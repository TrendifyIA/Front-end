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

  const { abrirProductoModal } = useContext(ModalContext);
  const { procesando } = useContext(ProcesamientoContext)
  const { empresa, obtenerDatosEmpresaUsuario } = useContext(ContextoEmpresa);

  // 🟡 Cargar productos desde backend
useEffect(() => {
  const obtenerDatos = async () => {
    try {
      const id_usuario = localStorage.getItem("id_usuario");
      if (!id_usuario) throw new Error("Usuario no autenticado");

      // 1. Obtener empresa del usuario
      const empresaRes = await fetch(`http://localhost:8080/empresa/empresa/${id_usuario}`);
      const empresaData = await empresaRes.json();

      if (!empresaRes.ok) throw new Error(empresaData.message || "No se pudo obtener la empresa");

      const id_empresa = empresaData.id_empresa;

      // 2. Obtener productos de la empresa
      const productosRes = await fetch(`http://localhost:8080/producto/productos/${id_empresa}`);
      const productosData = await productosRes.json();

      // 3. Asignar campañas vacías inicialmente
      const productosConCampanas = productosData.map((p) => ({
        ...p,
        campañas: [{ nombre: "Añadir", estatus: "Sin procesar" }],
      }));

      setProductos(productosConCampanas);
      setNombreEmpresa(empresaData.nombre);

    } catch (error) {
      console.error("Error al cargar productos:", error.message);
    }
  };

  obtenerDatos();
}, []);

  const handleNombreChange = (e) => setNombreTemporal(e.target.value);

  const guardarNuevoNombre = (index) => {
    const nuevos = [...productos];
    nuevos[index].nombre = nombreTemporal;
    setProductos(nuevos);
    setEditingNombreIndex(null);
  };

  const agregarProducto = () => {
  const nuevoProducto = {
    nombre: "",
    ruta_img: "",
    categoria: "",
    descripcion: "",
    publico_objetivo: "",
    estado: 1,
    campañas: [{ nombre: "Añadir", estatus: "Sin procesar" }],
  };
  setSelectedProductoIndex(null);
  setShowProductoModal(true);
  setNuevoProductoTemporal(nuevoProducto);
};


  const abrirProductoModal = (index) => {
    setSelectedProductoIndex(index);
    setShowProductoModal(true);
  };

  const handleUpdateProducto = async (productoActualizado) => {
  const id_usuario = localStorage.getItem("id_usuario");
  if (!id_usuario) return alert("Usuario no autenticado");

  try {
    // Obtener la empresa del usuario
    const resEmpresa = await fetch(`http://localhost:8080/empresa/empresa/${id_usuario}`);
    const empresaData = await resEmpresa.json();

    if (!resEmpresa.ok) throw new Error(empresaData.message);

    const id_empresa = empresaData.id_empresa;

    // Armar FormData para subir la imagen
    const formData = new FormData();
    formData.append("nombre", productoActualizado.nombre);
    formData.append("descripcion", productoActualizado.descripcion);
    formData.append("categoria", productoActualizado.categoria);
    formData.append("publico_objetivo", productoActualizado.publico_objetivo);
    formData.append("estado", productoActualizado.estado);
    formData.append("id_empresa", id_empresa);
    formData.append("ruta_img", productoActualizado.ruta_img); // esto debe ser un File

    const res = await fetch("http://localhost:8080/producto/crear", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    if (!res.ok) throw new Error(data.error || "Error al crear producto");

    // Refrescar productos desde el backend después de crear
    const productosRes = await fetch(`http://localhost:8080/producto/productos/${id_empresa}`);
    const productosData = await productosRes.json();
    const productosConCampanas = productosData.map((p) => ({
      ...p,
      campañas: [{ nombre: "Añadir", estatus: "Sin procesar" }],
    }));
    setProductos(productosConCampanas);
    setShowProductoModal(false);

  } catch (error) {
    console.error("Error al guardar producto:", error.message);
    alert(error.message);
  }
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
    const idCampana = 13; // ID hardcodeado temporalmente

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
        //alert(data.msg || "Proceso completado");
      })
      .catch(error => {
        console.error("Error al procesar:", error);
      });
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6 relative">
      {procesando && <Procesando />}
      <h1 className="text-2xl font-bold text-gray-900 mb-4">Empresa: {empresa?.nombre || "cargando..."} </h1>

      <button
        onClick={() => {abrirProductoModal()}}
        className="border border-blue-600 text-blue-600 px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-50 mb-4"
      >
        + Agregar producto
      </button>
      
      <ListaProductos />
      
    </div>
  );
};

export default ProductsPage;