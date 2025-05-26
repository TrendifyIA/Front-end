import React from 'react'
import Logo from '../assets/images/Trendify.png'
import CustomButton from './CustomButton.jsx'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

const NavBar = () => {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate("/");
    }
  return (
    <div className="w-full fixed">
      <header className="bg-primary-500 flex w-full justify-center">
        <nav className="bg-primary-500 flex justify-between items-center w-[95%] font-family p-4">
            <div className="cursor-pointer" onClick={handleClick}>
                <img src={Logo} alt="logo" />
            </div>
            <div className="">
                <ul className="flex items-center gap-[4vw] [&>li:hover]:scale-105">
                    <li>
                        <Link to="/" className="text-white">Home</Link>
                    </li>
                    <li>
                        <Link to="/planes" className="text-white">Planes</Link>
                    </li>
                    <li>
                        <Link to="/servicios" className="text-white">Servicios</Link>
                    </li>
                    <li>
                        <Link to="/nosotros" className="text-white">Nosotros</Link>
                    </li>
                </ul>
            </div>
            <div className="flex gap-[1vw]">
                <CustomButton texto="Inicia Sesión" tipo='secundario' ruta="/simple/login" ></CustomButton>
                <CustomButton texto="Regístrate" tipo='secundario' ruta="/simple/registro"></CustomButton> 
            </div>
        </nav>
      </header>
    </div>
  )
}

export default NavBar
