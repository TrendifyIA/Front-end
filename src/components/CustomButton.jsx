import { useNavigate } from "react-router";

const estilos = {
  primario: "bg-primary-500 hover:bg-primary-600 text-white font-bold py-2 px-4 rounded cursor-pointer hover:scale-105",
  secundario: "bg-primary-500 flex justify-center items-center border-2 border-gray-50 rounded-[5px] text-white py-2 px-4 cursor-pointer hover:scale-105",
  terciario: "bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer hover:scale-105",
  peligro: "bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded cursor-pointer hover:scale-105",
  normal: ""
};

const CustomButton = ({ texto, onClick, tipo = "primario", extraClases = "", ruta, type = "button" }) => {
  const navigate = useNavigate();
  const clase = `${estilos[tipo] || estilos.primario} ${extraClases}`;

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


export default CustomButton
