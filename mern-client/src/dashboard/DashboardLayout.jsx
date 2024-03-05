import React from 'react';
import { Outlet } from 'react-router-dom';
import SideBar from './SideBar';
import Navbar from '../components/Navbar'


function DashboardLayout() {
  return (
    // Utilisez `className` au lieu de `className`
    // Ajoutez des classes flexbox pour un alignement horizontal avec un espacement
    <div className='flex flex-row gap-4'>
        <Navbar/>
        <SideBar />
        <div className='flex-1'>
            <Outlet />
        </div>
    </div>
  );
}

export default DashboardLayout;
