"use client"
import React, { useContext } from 'react'
import './admin.css'
import DashBox from '../../../components/admin/DashboardBox/DashBox'
import { FiPlus } from 'react-icons/fi'
import { getImageUrl } from '@/constants/cloudinary'
import { Button } from '@mui/material'
import { ThemeContext } from '../../../context/ThemeContext';
import { Area, AreaChart, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'


const page = () => {

  const profileData = [
    {
      name: 'Page A',
      uv: 4000,
      pv: 2400,
      amt: 2400
    },
    {
      name: 'Page B',
      uv: 5000,
      pv: 2400,
      amt: 2400
    },
    {
      name: 'Page C',
      uv: 4000,
      pv: 2400,
      amt: 2400
    },
    {
      name: 'Page D',
      uv: 7000,
      pv: 1398,
      amt: 2210
    },
    {
      name: 'Page E',
      uv: 2000,
      pv: 9800,
      amt: 2290
    },
    {
      name: 'Page F',
      uv: 10000,
      pv: 2400,
      amt: 2400
    }
  ]

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

          <ResponsiveContainer width="100%" height="100%">

            <AreaChart
            width={500}
            height={400}
            data={profileData}
            margin={{
              top: 10,
              right: 0,
              left: 0,
              bottom: 0
            }}
            >
               <defs>
      <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
        <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
        <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
      </linearGradient>
    </defs>
              {/* <CartesianGrid strokeDasharray="3 3" /> */}
              <Tooltip />
              <Area type="monotone" dataKey="uv" stroke='#8884d8' fill="url(#colorValue)" />
            
            </AreaChart>
          </ResponsiveContainer>

        </div>
      </div>

      {/* Right Column: Do Chote Graphs (Yeh bade card ke BAHAR hai) */}

<div className='right-cards-column'>
  
  {/* Top Products Card */}
  <div className='card small-card top-products-card'>
    {/* Card Header (Title & Details Button) */}
    <div className='top-products-header'>
      <h3>Top Products</h3>
      <Button variant="outlined" className='details-btn' style={{marginTop: "14px"}}>
        Details
      </Button>
    </div>

    {/* Product Item List */}
    <div className='top-products-list'>
     <img src={getImageUrl("/star_icon.png")} alt="star" className='product-img' />
     
      
      <div className='products-name'>
        <h4>Black Shirt</h4>
        <p>$45</p>
      </div>

      <span className='product-percentage'>+6%</span>
    </div>

      <div className='top-products-list'>
     <img src={getImageUrl("/star_icon.png")} alt="star" className='product-img' />
     
      
      <div className='products-name'>
        <h4>Black Shirt</h4>
        <p>$45</p>
      </div>

      <span className='product-percentage'>+6%</span>
    </div>

        <div className='top-products-list'>
     <img src={getImageUrl("/star_icon.png")} alt="star" className='product-img' />
     
      
      <div className='products-name'>
        <h4>Black Shirt</h4>
        <p>$45</p>
      </div>

      <span className='product-percentage'>+6%</span>
    </div>
    
  </div>

  {/* Small Bottom Graph Card */}
  <div className='card small-card'>
    <h3>Small Bottom Graph</h3>
  </div>

</div>

</div>

    </>
  )
}

export default page











