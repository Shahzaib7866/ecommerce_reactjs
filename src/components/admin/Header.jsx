"use client"

import React, { useContext, useState } from 'react'
import { HiMenuAlt2 } from "react-icons/hi";
import { Button } from '@mui/material';
import './header.css'
import SearchBox from './SearchBox';
import { MdLightMode, MdDarkMode } from "react-icons/md"; // MdDarkMode import kiya
import { FaRegBell } from 'react-icons/fa6';
import { ThemeContext } from '../../context/ThemeContext'; // Apne folder path ke mutabiq adjust karein
import { AiOutlineMenu } from 'react-icons/ai';
import { getImageUrl } from '@/constants/cloudinary'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import { FaRegUser } from "react-icons/fa";

const Header = () => {

  const { theme, toggleTheme, isToggleSidebar, setisToggleSidebar } = useContext(ThemeContext);
  // const { account, setAccount } = useState("");



  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClickMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };


  const toggleNav = () =>{
    setisToggleSidebar(!isToggleSidebar);
  }

  return (
    <header className={`header ${isToggleSidebar ? 'shrink' : ''}`}>
    
      <div className="header-content">
        <Button className="menu-button" onClick={toggleNav}>

{
  isToggleSidebar === false ?  <HiMenuAlt2 size={24} /> : <AiOutlineMenu size={24}/>

}
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
  <Button className="menu-button" onClick={handleClickMenu}>
      <img src={getImageUrl("/star_icon.png")} alt="star" className='product-img' />
  
    </Button>

  <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleCloseMenu}
        onClick={handleCloseMenu}
        slotProps={{
          paper: {
            elevation: 0,
            sx: {
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
              mt: 1.5,
              // Dark & Light mode background & text automatically handled by MUI theme
              backgroundColor: 'background.paper',
              color: 'text.primary',
              '& .MuiAvatar-root': {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              '& .MuiListItemIcon-root': {
                color: 'text.secondary', // Icons color fix for dark mode
              },
              '&::before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: 'background.paper', // Arrow color matches paper background
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
              },
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >

        <MenuItem>
          <div className='dropdown-menulist'>
            <Button className="menu-button" onClick={handleClickMenu}>
              <img src={getImageUrl("/star_icon.png")} alt="star" className='product-img' />
            </Button>

            <div className='account-info'>
              <h3>Shahzaib Ishaq</h3>
              <p>admin@gmail.com</p>
            </div>
          </div>
        </MenuItem>

        <Divider />

        <MenuItem onClick={handleCloseMenu}>
          <ListItemIcon>
            <FaRegUser fontSize={20} />
          </ListItemIcon>
          My Profile
        </MenuItem>
        <MenuItem onClick={handleCloseMenu}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem onClick={handleCloseMenu}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
  </Menu>

</div>
      </div>
    </header>
  )
}

export default Header



