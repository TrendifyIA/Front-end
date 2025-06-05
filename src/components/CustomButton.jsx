/**
 * @file CustomButton.jsx
 * @author Jennyfer Jasso, ...
 * @description Botón reutilizable con estilos y navegación opcional.
 */
import { useNavigate } from "react-router";

/**
 * Estilos base para cada tipo de botón predefinido.
 */
const estilos = {
  primario:
    "bg-primary-500 hover:bg-primary-600 text-white font-bold py-2 px-4 rounded cursor-pointer hover:scale-105",
  secundario:
    "bg-primary-500 flex justify-center items-center border-2 border-gray-50 rounded-[5px] text-white py-2 px-4 cursor-pointer hover:scale-105",
  terciario:
    "bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer hover:scale-105",
  cancel:
    "border [border-color:#02245a] [color:#02245a] bg-white hover:bg-blue-50 font-medium py-2 px-4 rounded cursor-pointer transition-colors duration-150",
  peligro:
    "bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded cursor-pointer hover:scale-105",
  normal: "",
};

/**
 * Componente reutilizable para renderizar un botón estilizado, con soporte para navegación o acción personalizada.
 *
 * @param {Object} props
 * @param {string|JSX.Element} props.texto - Texto o contenido que se muestra dentro del botón.
 * @param {function} [props.onClick] - Función a ejecutar al hacer clic si no se especifica una ruta.
 * @param {string} [props.tipo="primario"] - Tipo de botón, que determina el estilo visual (primario, secundario, cancel, peligro, etc.).
 * @param {string} [props.extraClases=""] - Clases adicionales para extender o sobrescribir estilos.
 * @param {string} [props.ruta] - Ruta de navegación (usa react-router) a la que se redirige si se especifica.
 * @param {string} [props.type="button"] - Tipo del botón HTML (por defecto es "button").
 * @returns {JSX.Element} Botón estilizado con comportamiento dinámico.
 */
const CustomButton = ({
  texto,
  onClick,
  tipo = "primario",
  extraClases = "",
  ruta,
  type = "button",
}) => {
  const navigate = useNavigate();
  const clase = `${estilos[tipo] || estilos.primario} ${extraClases}`;

  /**
   * Maneja el clic para decidir si se navega o se ejecuta una función personalizada.
   */
  const handleClick = (e) => {
    if (ruta) {
      e.preventDefault(); // Previene que un botón con type="submit" recargue si es necesario
      navigate(ruta);
    } else if (onClick) {
      onClick(e);
    }
  };

  return (
    <button type={type} className={clase} onClick={handleClick}>
      {texto}
    </button>
  );
};

export default CustomButton;
