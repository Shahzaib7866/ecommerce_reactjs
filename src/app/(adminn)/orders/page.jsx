"use client";

import React, { useContext } from 'react';
import { Button } from '@mui/material';
import { LuRefreshCcw } from "react-icons/lu";
import { CiWavePulse1 } from "react-icons/ci";
import DashBox from '../../../components/admin/DashboardBox/DashBox';
// import { ThemeContext } from '../../../context/ThemeContext';
import './orders.css';

const Orders = () => {
  // const { theme } = useContext(ThemeContext);

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

      <DashBox />
    </>
  );
};

export default Orders;

