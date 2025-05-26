import React from 'react'
import Logo from '../assets/images/Trendify.png'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

const SimpleNav = () => {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate("/");
    }

  return (
    <div>
      <div className="w-full fixed">
        <header className="bg-primary-500 flex w-full justify-center">
            <nav className="bg-primary-500 flex justify-between items-center w-[95%] font-family p-4">
                <div className="cursor-pointer" onClick={handleClick}>
                    <img src={Logo} alt="logo" />
                </div>
            </nav>
        </header>
        </div>
    </div>
  )
}

export default SimpleNav
