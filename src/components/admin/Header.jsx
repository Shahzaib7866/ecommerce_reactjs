import React from 'react'
import { HiMenuAlt2 } from "react-icons/hi";
import { Button } from '@mui/material';
import './header.css'
import SearchBox from './SearchBox';
import { MdLightMode } from "react-icons/md";
import { FaRegBell } from 'react-icons/fa6';

const Header = () => {
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

        <Button className="menu-button">
          <MdLightMode size={24} />
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