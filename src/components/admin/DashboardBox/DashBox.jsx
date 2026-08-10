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
                /> 
            </SwiperSlide>
         
        </Swiper>

    </div>
  )
}

export default DashBox