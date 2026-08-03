import React from 'react'
import { HiMenuAlt2 } from "react-icons/hi";
import { Button } from '@mui/material';
import './header.css'
import SearchBox from './SearchBox';

const Header = () => {
  return (

    <header className="header">
   <div className="header-left">
       <Button className="menu-button">
        <HiMenuAlt2 size={24} />
      </Button>

      <SearchBox placeholder="Search..." width="300px" />
      </div>  

    </header>


  )
}

export default Header