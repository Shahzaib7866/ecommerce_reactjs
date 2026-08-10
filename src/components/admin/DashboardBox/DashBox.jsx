import React from 'react'
import './dashBox.css'
import Box from './Box';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';


import { Navigation } from 'swiper/modules';
import { GoGift } from 'react-icons/go';

const DashBox = () => {
  return (
    <div className='dashBox'>

        <Swiper
            spaceBetween={50}
            slidesPerView={3}
            className="mySwiper"
            modules={[Navigation]}
            navigation={true}
        >
            <SwiperSlide> 
                <Box
    title="New Orders"
    icon={<GoGift size={40} style={{ color: '#3b82f6' }}/>}
    count={124}
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
         
        </Swiper>

    </div>
  )
}

export default DashBox