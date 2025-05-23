/**
 * @file ConfirmarDatos.jsx
 * @author Jennyfer Jasso, ...
 * @description Página de confirmación de datos capturados en el tutorial.
 */
import { useContext } from "react";
import { FaCheck } from "react-icons/fa";
import CustomButton from "../../components/CustomButton";
import { BsArrowLeft } from "react-icons/bs";
import { ContextoTutorial } from "../../context/ProveedorTutorial";
import { useNavigate } from "react-router-dom";

const ConfirmacionDatos = () => {
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
  const navegar = useNavigate();

  const handleConfirm = async () => {
    try {
      // EMPRESA
      const id_usuario = Number(localStorage.getItem("id_usuario"));
      console.log("ID de usuario:", id_usuario);
      const empresaPayload = { ...empresa, id_usuario };
      console.log("JSON enviado a /empresa/crear-empresa:", empresaPayload);

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

      const dataEmpresa = await resEmpresa.json();
      if (!resEmpresa.ok)
        throw new Error(dataEmpresa.mensaje || "Error al crear empresa");

      const id_empresa = Number(dataEmpresa.empresa.id_empresa);
      setIdEmpresa(id_empresa);

      // PRODUCTO
      const productoPayload = { ...producto, id_empresa: id_empresa };
      console.log("JSON enviado a /producto/crear:", productoPayload);

      const resProducto = await fetch("http://127.0.0.1:8080/producto/crear", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productoPayload),
      });

      const dataProducto = await resProducto.json();
      if (!resProducto.ok)
        throw new Error(dataProducto.mensaje || "Error al crear producto");

      const id_producto = Number(dataProducto.id_producto);
      setIdProducto(id_producto);

      // CAMPAÑA
      const campanaPayload = { ...campana, id_producto: id_producto };
      console.log("JSON enviado a /campana/crear:", campanaPayload);
      const resCampana = await fetch("http://127.0.0.1:8080/campana/crear", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(campanaPayload),
      });

      const dataCampana = await resCampana.json();
      if (!resCampana.ok)
        throw new Error(dataCampana.mensaje || "Error al crear campaña");

      navegar("/tutorial/resumen");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 font-poppins flex flex-col">
      <div className="bg-[#0B2C63] text-white p-6">
        <h1 className="text-lg font-semibold">
          Por favor, confirme que los datos que ha capturado sean los correctos.
        </h1>
        <p className="text-sm">
          Esta información es importante para continuar con el análisis de tu
          campaña.
        </p>
      </div>

      <div className="flex justify-center items-center mt-12 space-x-10">
        <div className="flex flex-col items-center">
          <div className="bg-green-600 text-white rounded-full p-3 text-xl">
            <FaCheck />
          </div>
          <p className="mt-2 text-sm font-medium text-green-700">Empresa</p>
        </div>

        <div className="h-1 w-16 bg-green-600"></div>

        <div className="flex flex-col items-center">
          <div className="bg-green-600 text-white rounded-full p-3 text-xl">
            <FaCheck />
          </div>
          <p className="mt-2 text-sm font-medium text-green-700">Producto</p>
        </div>

        <div className="h-1 w-16 bg-green-600"></div>

        <div className="flex flex-col items-center">
          <div className="bg-green-600 text-white rounded-full p-3 text-xl">
            <FaCheck />
          </div>
          <p className="mt-2 text-sm font-medium text-green-700">Campaña</p>
        </div>
      </div>

      <div className="flex-1 flex justify-center items-center">
        <div className="bg-white rounded-xl shadow-lg p-10 w-[90%] max-w-3xl text-center mt-10">
          <h2 className="text-3xl font-bold mb-10">
            ¿Estás seguro de tus Datos?
          </h2>
          <div className="flex justify-center mb-10">
            <div className="w-32 h-32 bg-[#0c1f57] rounded-full flex items-center justify-center">
              <FaCheck size={80} color="white" />
            </div>
          </div>

          <div className="flex justify-between px-10">
            <CustomButton
              texto={<BsArrowLeft className="text-2xl" />}
              ruta="/tutorial/Campana"
              extraClases="bg-[#0c1f57] text-white px-6 py-3 rounded-md"
            />

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

export default ConfirmacionDatos;
