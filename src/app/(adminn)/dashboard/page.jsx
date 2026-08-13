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
  
<div className='graphs-container'>
      
      {/* Left Column: Bada Graph Card */}
      <div className='card large-card'>
        <div className='card-header'>
          <div className='title-box'>
            <h3 className='card-title'>Total Profit</h3>
            <span className='card-amount'>$8,948.00</span>
          </div>
          <Button variant="outlined" className='details-btn'>
            Details
          </Button>
        </div>

        <div className='card-body-chart'>
          {/* Yahan apna bada chart/graph daal dein */}
        </div>
      </div>

      {/* Right Column: Do Chote Graphs (Yeh bade card ke BAHAR hai) */}
      <div className='right-cards-column'>
        <div className='card small-card'>
          <h3>Small Top Graph</h3>
        </div>
        <div className='card small-card'>
          <h3>Small Bottom Graph</h3>
        </div>
      </div>

    </div>

    </>
  )
}

export default page






