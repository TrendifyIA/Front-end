import React from 'react'
import Logo from '../assets/images/Trendify.png'
import PrimaryButton from './PrimaryButton.jsx'
import { Link } from 'react-router-dom'

const NavBar = () => {
  return (
    <div class="w-full fixed">
      <header class="bg-primary-500 flex w-full justify-center">
        <nav class="bg-primary-500 flex justify-between items-center w-[95%] font-family p-4">
            <div class="cursor-pointer">
                <img src={Logo} alt="logo" />
            </div>
            <div class="">
                <ul class="flex items-center gap-[4vw] [&>li:hover]:scale-105">
                    <li>
                        <Link to="/" class="text-white">Home</Link>
                    </li>
                    <li>
                        <Link to="/planes" class="text-white">Planes</Link>
                    </li>
                    <li>
                        <Link to="/servicios" class="text-white">Servicios</Link>
                    </li>
                    <li>
                        <Link to="/nosotros" class="text-white">Nosotros</Link>
                    </li>
                </ul>
            </div>
            <div class="flex gap-[1vw]">
                <PrimaryButton texto="Inicia Sesión" ></PrimaryButton>
                <PrimaryButton texto="Regístrate" ></PrimaryButton> 
            </div>
        </nav>
      </header>
    </div>
  )
}

export default NavBar
