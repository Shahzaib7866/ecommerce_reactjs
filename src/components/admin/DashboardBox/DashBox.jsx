import React from 'react'
import './dashBox.css'
import Box from './Box';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';


import { Navigation } from 'swiper/modules';
import { GoGift } from 'react-icons/go';
import { FiPieChart } from 'react-icons/fi';
import { BsBank } from 'react-icons/bs';
import { LuUsers } from 'react-icons/lu';

const DashBox = () => {
  return (
    <div className='dashBox'>

        <Swiper
            spaceBetween={20}
            slidesPerView={3}
            className="mySwiper"
            modules={[Navigation]}
            navigation={true}
        >
            <SwiperSlide> 
                <Box
    title="New Orders"
    icon={<GoGift size={40} color='#3b82f6'/>}
    count={124}
    color="#3b82f6"
    progress={true}
    chartData={[
    {  uv: 4000, pv: 1398, amt: 2210 },
    {  uv: 3000, pv: 2400, amt: 2400 },
    {  uv: 2000, pv: 9800, amt: 2290 },
    { uv: 2780, pv: 3908, amt: 2000 },
    { uv: 1780, pv: 3908, amt: 2000 },
    { uv: 3280, pv: 5908, amt: 4000 },
    {  uv: 4000, pv: 1398, amt: 2210 },


  ]}
/>
            </SwiperSlide>

            <SwiperSlide> 
                <Box
    title="Sales"
    icon={<FiPieChart size={40} color='#10b981' />}
    count="$5,321.00"
    color="#10b981"
    progress={false}
    chartData={[
    { uv: 400, pv: 1398, amt: 2210 },
    { uv: 1200, pv: 2400, amt: 2400 },
    { uv: 1800, pv: 9800, amt: 2290 },
    { uv: 2580, pv: 3908, amt: 2000 },
    { uv: 3080, pv: 3908, amt: 2000 },
    { uv: 3580, pv: 5908, amt: 4000 },
    { uv: 4000, pv: 1398, amt: 2210 },

  ]}
/>
            </SwiperSlide>

    <SwiperSlide> 
      <Box
    title="Revenue"
    icon={<BsBank size={40} color='#7928ca'/>}
    count="$12,450.00"
    color="#7928ca"
    progress={true}
    chartData={[
    {  uv: 4000, pv: 1398, amt: 2210 },
    {  uv: 3000, pv: 2400, amt: 2400 },
    {  uv: 2000, pv: 9800, amt: 2290 },
    { uv: 2780, pv: 3908, amt: 2000 },
    { uv: 1780, pv: 3908, amt: 2000 },
    { uv: 3280, pv: 5908, amt: 4000 },
    {  uv: 4000, pv: 1398, amt: 2210 },


  ]}
/>
    </SwiperSlide>

     <SwiperSlide> 
      <Box
    title="Total Users"
    icon={<LuUsers size={40} color='#666666'/>}
    count="180"
    color="#666666"
    progress={true}
    chartData={[
    {  uv: 4000, pv: 1398, amt: 2210 },
    {  uv: 3000, pv: 2400, amt: 2400 },
    {  uv: 2000, pv: 9800, amt: 2290 },
    { uv: 2780, pv: 3908, amt: 2000 },
    { uv: 1780, pv: 3908, amt: 2000 },
    { uv: 3280, pv: 5908, amt: 4000 },
    {  uv: 4000, pv: 1398, amt: 2210 }

  ]}
/>
      </SwiperSlide>
         
        </Swiper>

    </div>
  )
}

export default DashBox