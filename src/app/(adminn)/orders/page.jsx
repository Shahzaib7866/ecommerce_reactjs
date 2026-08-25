"use client";

import React from 'react';
import { Button } from '@mui/material';
import { LuRefreshCcw, LuCircleDollarSign, LuRotateCcw, LuClock, LuUsers } from "react-icons/lu";
import { CiWavePulse1 } from "react-icons/ci";
import './orders.css';
import { GoSortDesc } from "react-icons/go";

const Orders = () => {
  // Suggested titles and structured data for the 4 boxes
  const boxData = [
    {
      title: "Total Order Value",
      value: "PKR 6,443",
      icon: <LuCircleDollarSign />,
      trendColor: "green"
    },
    {
      title: "Return Orders",
      value: "6",
      icon: <LuRotateCcw />,
      trendColor: "red"
    },
    {
      title: "Pending Shipments",
      value: "14",
      icon: <LuClock />,
      trendColor: "orange"
    },
    {
      title: "Active Customers",
      value: "1,280",
      icon: <LuUsers />,
      trendColor: "blue"
    }
  ];

  return (
    <>
      <div className="orders">
        <div className="left_col">
          <div className="orders_header">
            <CiWavePulse1 size={20} />
            <h3>STORE OPERATION</h3>
          </div>
          <h1>Orders, without the guesswork.</h1>
          <p>
            A live view of checkout records, line items, payment state, and product
            availability. One order can have many normalized Order Items.
          </p>
        </div>

        <div className="right_col">
          <Button variant="text">
            <LuRefreshCcw size={20} style={{ marginRight: '8px' }} /> Refresh Records
          </Button>
        </div>
      </div>

      {/* Dynamic Grid Container for Multiple Boxes */}
      <div className="boxes_container">
        {boxData.map((item, index) => (
          <div className="box" key={index}>
            <div>
              <h3>{item.title}</h3>
              <h1>{item.value}</h1>
            </div>
            <div className={`icon_wrapper ${item.trendColor}`}>
              {item.icon}
            </div>
          </div>
        ))}
      </div>

   <div className='orders-details'>
  {/* Left Side Filter Buttons */}
  <div className="orders-filters">
    <Button variant="text">All</Button>
    <Button variant="text">Unpaid</Button>
    <Button variant="text">Unfulfilled</Button>
  </div>

  {/* Right Side Search & Sort Header */}
  <div className='orders-header'>
    <input type="search" placeholder="Search orders..." />
    <GoSortDesc size={20} />
  </div>
</div>
    </>
  );
};

export default Orders;

