import React from 'react'
import Image from 'next/image'
import './sidebar.css'
import Link from 'next/link'
import { sidebarMenu } from '@/constants/data'

import { getImageUrl } from '@/constants/cloudinary'
import { Button } from '@mui/material'


const Sidebar = () => {
  return (
    <aside className='sidebar'>
<Link href="/"> 
        <Image src={getImageUrl("logo.png")}   alt="Wearit logo" 
          width={45} 
          height={45}  />
      </Link>



<div className='sidebar-menu'>

  {
    sidebarMenu?.length !== 0 &&
    <ul className='list'>
      {
        sidebarMenu?.map((menu, i)=> {
          return (
            <li className='menu-list' key={i}>

             <Button variant="text" className='menu-btn'>
              {menu?.icon} {menu?.title}
             </Button>

            </li>
          )
        })

      }
    </ul>
  }

</div>


    </aside>
  )
}

export default Sidebar






