"use client"

import React, { useState } from 'react'
import Image from 'next/image'
import './sidebar.css'
import Link from 'next/link'
import { sidebarMenu } from '@/constants/data'

import { getImageUrl } from '@/constants/cloudinary'
import { Button } from '@mui/material'
import { FaAngleDown } from "react-icons/fa";

import { Collapse } from 'react-collapse';



const Sidebar = () => {

  const [isToggleSubmenu, setIsToggleSubmenu] = useState(false);
  //Shuru mein toggleIndex ki value null hoti hai, yani kisi bhi menu ka submenu open nahi hota, sab band hote hain.
  const [toggleIndex, setToggleIndex] = useState(null);


  // Jab kisi menu item ke arrow par click karte hain, toh toggleTab(i) function chalta hai aur us menu item ka index number toggleIndex mein save ho jata hai.
  const toggleTab = (index) => {
    //alert(`Clicked on menu item index: ${index}`);
        setToggleIndex(index);

    setIsToggleSubmenu(!isToggleSubmenu);

  }


  return (
    <aside className='sidebar'>
      <Link href="/"> 
        <Image 
          src={getImageUrl("logo.png")} 
          alt="Wearit logo" 
          width={45} 
          height={45}  
        />
      </Link>

      <div className='sidebar-menu'>
        {sidebarMenu?.length !== 0 && (
          <ul className='list'>
            {sidebarMenu?.map((menu, i) => {
              return (
                <li className='menu-list' key={i}>
                  <Button variant="text" className='menu-btn'>
                    {menu?.icon} {menu?.title}
                  </Button>

                  {
                    menu?.submenu?.length > 0 && (
                      <span className='submenu-toggle' onClick={() => toggleTab(i)}>
                        <FaAngleDown size={18} className={toggleIndex === i ? isToggleSubmenu === true ? 'rotate-180' : '' : ''} />
                      </span>
                    )
                  }

                  {menu?.submenu?.length > 0 && (
                    <Collapse isOpened={toggleIndex === i ? isToggleSubmenu : false}>

                    <div className='submenu'>
                      <ul className='submenu-list'>
                        {menu.submenu.map((sub, j) => {
                          return (
                            <li className='submenu-item' key={j}>
                              <Link href={sub?.href} className='submenu-link'>
                                <Button variant="text" className='submenu-btn'>
                                  <span className='btn-span'></span>
                                  {sub?.title}
                                </Button>
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    </div>

                    </Collapse>
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </aside>
  )
}

export default Sidebar