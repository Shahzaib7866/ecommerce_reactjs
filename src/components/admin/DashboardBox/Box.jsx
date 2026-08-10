import React, { PureComponent} from 'react'
import './dashBox.css'

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Box = (props) => {

    return (
      <div className='box'>
        <div className='box-content'>

            <div className='leftCol'>
                {props.icon}

                <div className='info'>
                    <h4>{props.title}</h4>
                    <h5>{props.count}</h5>
                </div>

            </div>

        </div>

        <div clssName='box-chart'>
            <ResponsiveContainer width="100%" height="100%">
                <BarChart width={100} height={40} data={props.chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="pv" fill="#8884d8" barSize={6}/>
                </BarChart>
            </ResponsiveContainer>

        </div>
        
    </div>
  )
}

export default Box