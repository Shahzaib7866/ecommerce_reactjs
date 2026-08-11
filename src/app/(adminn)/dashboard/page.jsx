"use client"
import React, { useContext } from 'react'
import './admin.css'
import DashBox from '../../../components/admin/DashboardBox/DashBox'
import { FiPlus } from 'react-icons/fi'
import { getImageUrl } from '@/constants/cloudinary'
import { Button } from '@mui/material'
import { ThemeContext } from '../../../context/ThemeContext';

const page = () => {

  const { theme } = useContext(ThemeContext);

  return (
    // <div className="admin-page">
    <>
<div className="box_dashboard">

  <div className="left_col">

    <h1>Good Morning, <br/> Cameron</h1>
    <p>Welcome back! Here's what's happening today.</p>

<div>

<Button variant="text">
  <FiPlus size={20} /> Add Product 
 </Button>

</div>

  </div>

  <div className="right_col">

 <img 
            src={
              theme === 'dark' 
                ? getImageUrl("dashboard_img2")
                : getImageUrl("dashboard_img")
            } 
            alt="dashboard image" 
          />

  </div>

</div>
    <DashBox />
    {/* // </div> */}

    </>
  )
}

export default page






