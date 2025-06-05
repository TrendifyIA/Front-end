/**
 * @file ConfirmarDatos.jsx
 * @author Jennyfer Jasso, Alexei Martinez
 * @description Página de confirmación de datos capturados en el tutorial.
 */

// Importa el hook useContext de React
import { useContext } from "react";
// Importa el icono de check de react-icons
import { FaCheck } from "react-icons/fa";
// Importa el componente de botón personalizado
import CustomButton from "../../components/CustomButton";
// Importa el icono de flecha izquierda de react-icons
import { BsArrowLeft } from "react-icons/bs";
// Importa el contexto del tutorial
import { ContextoTutorial } from "../../context/ProveedorTutorial";
// Importa el hook useNavigate de react-router-dom para navegación
import { useNavigate } from "react-router-dom";

/**
 * Componente de confirmación de datos del tutorial.
 * Permite al usuario revisar y confirmar los datos capturados antes de enviarlos.
 */
const ConfirmacionDatos = () => {
  // Obtiene los datos y setters del contexto del tutorial
  const {
    empresa,
    producto,
    campana,
    setEmpresa,
    setProducto,
    setCampana,
    setIdEmpresa,
    setIdProducto,
  } = useContext(ContextoTutorial);

  // Hook para navegar entre rutas
  const navegar = useNavigate();

  /**
   * Maneja la confirmación de los datos.
   * Envía los datos de empresa, producto e campaña al backend.
   */
  const handleConfirm = async () => {
    try {
      // Obtiene el id del usuario desde localStorage
      const id_usuario = Number(localStorage.getItem("id_usuario"));
      console.log("ID de usuario:", id_usuario);

      // Prepara el payload de la empresa
      const empresaPayload = { ...empresa, id_usuario };
      console.log("JSON enviado a /empresa/crear-empresa:", empresaPayload);

      // Envía la empresa al backend
      const resEmpresa = await fetch(
        "http://127.0.0.1:8080/empresa/crear-empresa",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(empresaPayload),
        }
      );

      // Obtiene la respuesta de la creación de empresa
      const dataEmpresa = await resEmpresa.json();
      if (!resEmpresa.ok)
        throw new Error(dataEmpresa.mensaje || "Error al crear empresa");

      // Obtiene el id de la empresa creada y lo guarda en el contexto
      const id_empresa = Number(dataEmpresa.empresa.id_empresa);
      setIdEmpresa(id_empresa);

      // Prepara el FormData para el producto (incluyendo imagen si existe)
      const formData = new FormData();
      formData.append("nombre", producto.nombre);
      formData.append("categoria", producto.categoria);
      formData.append("descripcion", producto.descripcion);
      formData.append("publico_objetivo", producto.publico_objetivo);
      formData.append("estado", producto.estado);
      formData.append("id_empresa", id_empresa);

      // Adjunta el archivo de imagen si está disponible
      if (producto.imagenFile) {
        formData.append("ruta_img", producto.imagenFile);
      }

      console.log("Form data/producto/crear:", formData);

      // Envía el producto al backend
      const resProducto = await fetch("http://127.0.0.1:8080/producto/crear", {
        method: "POST",
        body: formData,
      });

      // Obtiene la respuesta de la creación de producto
      const dataProducto = await resProducto.json();
      if (!resProducto.ok)
        throw new Error(dataProducto.mensaje || "Error al crear producto");

      // Obtiene el id del producto creado y lo guarda en el contexto
      const id_producto = Number(dataProducto.producto.id_producto);
      setIdProducto(id_producto);
      console.log("ID del producto:", id_producto);

      // Prepara el payload de la campaña
      const campanaPayload = { ...campana, id_producto: id_producto };
      console.log("JSON enviado a /campana/crear:", campanaPayload);

      // Envía la campaña al backend
      const resCampana = await fetch("http://127.0.0.1:8080/campana/crear", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(campanaPayload),
      });

      // Obtiene la respuesta de la creación de campaña
      const dataCampana = await resCampana.json();
      if (!resCampana.ok)
        throw new Error(dataCampana.mensaje || "Error al crear campaña");

      // Navega a la página de resumen
      navegar("/tutorial/resumen");
    } catch (err) {
      // Muestra un mensaje de error si ocurre algún problema
      alert(err.message);
    }
  };

  // Renderiza el componente de confirmación de datos
  return (
    <div className="min-h-screen bg-gray-100 font-poppins flex flex-col">
      {/* Encabezado */}
      <div className="bg-[#0B2C63] text-white p-6">
        <h1 className="text-lg font-semibold">
          Por favor, confirme que los datos que ha capturado sean los correctos.
        </h1>
        <p className="text-sm">
          Esta información es importante para continuar con el análisis de tu
          campaña.
        </p>
      </div>

      {/* Progreso de pasos */}
      <div className="flex justify-center items-center mt-12 space-x-10">
        {/* Paso Empresa */}
        <div className="flex flex-col items-center">
          <div className="bg-green-600 text-white rounded-full p-3 text-xl">
            <FaCheck />
          </div>
          <p className="mt-2 text-sm font-medium text-green-700">Empresa</p>
        </div>

        {/* Línea de progreso */}
        <div className="h-1 w-16 bg-green-600"></div>

        {/* Paso Producto */}
        <div className="flex flex-col items-center">
          <div className="bg-green-600 text-white rounded-full p-3 text-xl">
            <FaCheck />
          </div>
          <p className="mt-2 text-sm font-medium text-green-700">Producto</p>
        </div>

        {/* Línea de progreso */}
        <div className="h-1 w-16 bg-green-600"></div>

        {/* Paso Campaña */}
        <div className="flex flex-col items-center">
          <div className="bg-green-600 text-white rounded-full p-3 text-xl">
            <FaCheck />
          </div>
          <p className="mt-2 text-sm font-medium text-green-700">Campaña</p>
        </div>
      </div>

      {/* Contenedor principal */}
      <div className="flex-1 flex justify-center items-center">
        <div className="bg-white rounded-xl shadow-lg p-10 w-[90%] max-w-3xl text-center mt-10">
          <h2 className="text-3xl font-bold mb-10">
            ¿Estás seguro de tus Datos?
          </h2>
          {/* Icono de confirmación */}
          <div className="flex justify-center mb-10">
            <div className="w-32 h-32 bg-[#0c1f57] rounded-full flex items-center justify-center">
              <FaCheck size={80} color="white" />
            </div>
          </div>

          {/* Botones de navegación */}
          <div className="flex justify-between px-10">
            {/* Botón para regresar */}
            <CustomButton
              texto={<BsArrowLeft className="text-2xl" />}
              ruta="/tutorial/Campana"
              extraClases="bg-[#0c1f57] text-white px-6 py-3 rounded-md"
            />

            {/* Botón para continuar */}
            <CustomButton
              texto="Continuar"
              onClick={handleConfirm}
              extraClases="bg-[#0c1f57] text-white px-6 py-3 rounded-md"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

// Exporta el componente por defecto
export default ConfirmacionDatos;
