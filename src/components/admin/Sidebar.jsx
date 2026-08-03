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
  // Har menu item ke index ko track karne ke liye aik object state
  const [openSubmenus, setOpenSubmenus] = useState({});

  // Toggle function jo check karega ke agar already open hai toh close kar de, warna open kar de
  const toggleTab = (index) => {
    setOpenSubmenus((prev) => ({
      ...prev,
      [index]: !prev[index], // Jo current state hai usay reverse kar do
    }));
  };

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
              const isOpen = !!openSubmenus[i]; // Check karein ke yeh submenu open hai ya nahi

              return (
                <li className='menu-list' key={i}>
                  {
                    menu?.submenu?.length > 0 ? 
                      <Button variant="text" className='menu-btn' onClick={() => toggleTab(i)}>
                        {menu?.icon} {menu?.title}
                      </Button>
                    :
                      <Link href={menu?.href} className='menu-link'>
                        <Button variant="text" className='menu-btn'>
                          {menu?.icon} {menu?.title}
                        </Button>
                      </Link>
                  }

                  {
                    menu?.submenu?.length > 0 && (
                      <span className='submenu-toggle' onClick={() => toggleTab(i)}>
                        <FaAngleDown size={18} className={isOpen ? 'rotate-180' : ''} />
                      </span>
                    )
                  }

                  {menu?.submenu?.length > 0 && (
                    <Collapse isOpened={isOpen}>
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