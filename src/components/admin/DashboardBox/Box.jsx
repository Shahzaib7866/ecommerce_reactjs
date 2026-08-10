

import React from 'react'
import './dashBox.css'
import { BarChart, Bar } from 'recharts';
import { FiChevronsUp } from 'react-icons/fi';


const Box = (props) => {
  return (
    <div className='box'>

        <div className='upper-content'>

      <div className='box-content'>

        <div className='leftCol'>
          {props.icon}
          <div className='info'>
            <h4>{props.title}</h4>
            <h5>{props.count}</h5>
          </div>
        </div>

        <div className='box-chart'>
       <BarChart
    style={{ width: '100%', height: '100%' }}
    responsive
    data={props.chartData}
    barCategoryGap="0%"
    barGap={1}
    margin={{ top: 2, right: 2, left: 2, bottom: 2 }}
  >
            <Bar dataKey="uv" fill="#3b82f6" barSize={10} radius={[3, 3, 0, 0]} />
          </BarChart>
        </div>

      </div> 
      
    
<hr />

<div className='lower-content'>
    <span className='uper-span'>
        <FiChevronsUp size={20} />
        +32.40%
        </span>
            <span className='lower-span'>from last month</span>

</div>

        </div>




    </div>
  )
}

export default Box
