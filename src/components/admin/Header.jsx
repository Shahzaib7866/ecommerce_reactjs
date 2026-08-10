"use client"

import React, { useContext } from 'react'
import { HiMenuAlt2 } from "react-icons/hi";
import { Button } from '@mui/material';
import './header.css'
import SearchBox from './SearchBox';
import { MdLightMode, MdDarkMode } from "react-icons/md"; // MdDarkMode import kiya
import { FaRegBell } from 'react-icons/fa6';
import { ThemeContext } from '../../context/ThemeContext'; // Apne folder path ke mutabiq adjust karein


const Header = () => {

  const { theme, toggleTheme } = useContext(ThemeContext);


  return (
    <header className="header">
      {/* Left Side: Menu, Search, aur Bell icon */}
      <div className="header-content">
        <Button className="menu-button">
          <HiMenuAlt2 size={24} />
        </Button>

        <SearchBox placeholder="Search..." width="300px" />

     
      </div> 

      {/* Right Side: Light Mode icon */}
      <div className="header-content"> 

           <Button className="menu-button">
          <FaRegBell size={24} />
        </Button>

 {/* Theme Toggle Button */}
        <Button className="menu-button" onClick={toggleTheme}>
          {theme === 'light' ? (
            <MdDarkMode size={24} /> // Agar light mode hai toh dark icon dikhao
          ) : (
            <MdLightMode size={24} /> // Agar dark mode hai toh light icon dikhao
          )}
        </Button>


<div className="header-content">
  <Button className="menu-button">
    R
    </Button>
</div>

      </div>
    </header>
  )
}

export default Header