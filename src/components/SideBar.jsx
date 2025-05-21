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


const SideBar = () => {
  return (
    <div class="w-[280px] h-screen bg-primary-500 font-family flex flex-col justify-around items-center fixed gap-20">
      <div>
        <img src={Logo} alt="logo" />
      </div>
      <div>
        <ul class="flex flex-col items-start gap-[2vw] [&>li:hover]:scale-105 font-medium">
          <li>
            <span class="flex text-white gap-2.5 leading-4"><i class="text-base"><FaRegUser></FaRegUser></i><Link to="/users/empresa" class="text-white">Empresa</Link></span>
          </li>
          <li>
            <span class="flex text-white gap-2.5 leading-4"><i class="text-lg"><GrGroup></GrGroup></i><Link to="/users/adminProductos" class="text-white">Productos</Link></span>
          </li>
        </ul>
      </div>
      <div>
        <span class="flex text-white gap-2.5 font-medium leading-4 cursor-pointer hover:scale-105"><i class="text-lg"><BiLogOut></BiLogOut></i><p class="text-white">Cerrar Sesión</p></span>
      </div>
    </div>
  )
}

export default SideBar
