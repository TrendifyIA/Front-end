import { Link } from 'react-router' // Importa el componente Link de react-router para la navegación
import Logo from '../assets/images/Trendify.png'
import { FaRegUser } from 'react-icons/fa6' // Importa el icono de usuario de react-icons
import { GrGroup } from "react-icons/gr";
import { HiOutlineBuildingOffice2 } from "react-icons/hi2";
import { RiSurveyLine } from "react-icons/ri";
import { PiGraphDuotone } from "react-icons/pi";
import { TbBrandGoogleAnalytics } from "react-icons/tb";
import { FaRegBell } from "react-icons/fa";
import { BiLogOut } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

const SideBar = () => {

  const navigate = useNavigate();

  const cerrarSesion = () => {
    localStorage.removeItem("token"); // Borra el token del localStorage
    navigate("/simple/login"); // Redirige al login (ajusta la ruta si es necesario)
  };

  return (
    <div className="w-[280px] h-screen bg-primary-500 font-family flex flex-col justify-around items-center fixed gap-20">
      <div>
        <img src={Logo} alt="logo" />
      </div>
      <div>
        <ul className="flex flex-col items-start gap-[2vw] [&>li:hover]:scale-105 font-medium">
          <li>
            <span className="flex text-white gap-2.5 leading-4"><i className="text-base"><FaRegUser></FaRegUser></i><Link to="/users/empresa" className="text-white">Empresa</Link></span>
          </li>
          <li>
            <span className="flex text-white gap-2.5 leading-4"><i className="text-lg"><GrGroup></GrGroup></i><Link to="/users/adminProductos" className="text-white">Productos</Link></span>
          </li>
        </ul>
      </div>
      <div>
        <span className="flex text-white gap-2.5 font-medium leading-4 cursor-pointer hover:scale-105" onClick={cerrarSesion}><i className="text-lg"><BiLogOut></BiLogOut></i><p className="text-white">Cerrar Sesión</p></span>
      </div>
    </div>
  )
}

export default SideBar
