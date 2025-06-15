/**
 * @file ConfirmarDatos.jsx
 * @author Jennyfer Jasso, Alexei Martínez
 * @description Página de confirmación de datos capturados en el tutorial.
 */
import { useContext } from "react";
import { FaCheck } from "react-icons/fa";
import CustomButton from "../../components/CustomButton";
import { BsArrowLeft } from "react-icons/bs";
import { ContextoTutorial } from "../../context/ProveedorTutorial";
import { useNavigate } from "react-router-dom";

/**
 * Componente de confirmación donde el usuario confirma que los datos
 * capturados durante el tutorial son correctos.
 *
 * @returns {JSX.Element} Página de confirmación del tutorial.
 */
const ConfirmacionDatos = () => {
  const { registrarDatos } = useContext(ContextoTutorial);
  const navegar = useNavigate();

  /**
   * Maneja la confirmación de los datos y redirige al resumen del tutorial
   */
  const handleConfirm = async () => {
    try {
      await registrarDatos();
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

      {/* Línea de progreso */}
      <div className="flex justify-center items-center my-12 space-x-8">
        <div className="flex flex-col items-center">
          <div className="bg-green-600 text-white rounded-full p-3 text-xl">
            <FaCheck />
          </div>
          <p className="mt-2 text-sm font-medium text-green-700">Empresa</p>
        </div>
        <div className="h-1 w-50 bg-green-600"></div>

        <div className="flex flex-col items-center">
          <div className="bg-green-600 text-white rounded-full p-3 text-xl">
            <FaCheck />
          </div>
          <p className="mt-2 text-sm font-medium text-green-700">Producto</p>
        </div>
        <div className="h-1 w-50 bg-green-600"></div>

        <div className="flex flex-col items-center">
          <div className="bg-green-600 text-white rounded-full p-3 text-xl">
            <FaCheck />
          </div>
          <p className="mt-2 text-sm font-medium text-green-700">Campaña</p>
        </div>
      </div>

      {/* Contenedor principal para la confirmación de datos */}
      <div className="flex-1 flex justify-center items-center">
        <div className="bg-white rounded-xl shadow-lg p-10 w-[90%] max-w-3xl text-center">
          <h2 className="text-3xl font-bold mb-10">
            ¿Estás seguro de tus Datos?
          </h2>
          <div className="flex justify-center mb-10">
            <div className="w-32 h-32 bg-[#0c1f57] rounded-full flex items-center justify-center">
              <FaCheck size={80} color="white" />
            </div>
          </div>

          {/* Botones de navegación */}
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
