import React from 'react'
import Logo from '../assets/images/Trendify.svg'

const NavBar = () => {
  return (
    <div>
      <header>
        <nav class="bg-primary-500 flex justify-between items-center w-full font-family p-4">
            <div>
                <img src={Logo} alt="logo" />
            </div>
            <div class="">
                <ul class="flex items-center gap-[4vw]">
                    <li>
                        <a href="#" class="text-white">Home</a>
                    </li>
                    <li>
                        <a href="#" class="text-white">Planes</a>
                    </li>
                    <li>
                        <a href="#" class="text-white">Servicios</a>
                    </li>
                    <li>
                        <a href="#" class="text-white">Nosotros</a>
                    </li>
                </ul>
            </div>
            <div>
                <button class="bg-amber-400 text-white px-5 py-2 rounded-b-full">Iniciar Sesion</button>
            </div>
        </nav>
      </header>
    </div>
  )
}

export default NavBar
