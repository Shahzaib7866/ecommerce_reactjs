
'use client'
// If Sidebar needs to react to state changes from Header, both must be wrapped by the exact same Provider instance

import React, { useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext';
import Sidebar from './Sidebar';
import Header from './Header';

export default function AdminDashboardWrapper({ children }) {
  const { isToggleSidebar } = useContext(ThemeContext);

  return (
    <div className={`main ${isToggleSidebar ? 'sidebar-active' : ''}`}>
      <div className="sidebar-wrapper">
        <Sidebar />
      </div>

      <div className="right-content">
        <Header />
        <div className="children-wrapper">
          {children}
        </div>
      </div>
    </div>
  );
}


