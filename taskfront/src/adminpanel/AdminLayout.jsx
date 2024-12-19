import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';
import Navbar from './navbar';

const AdminLayout = () => (
  <div className="flex w-full  -m-8 px-3">
    <div className="w-3/12 ">
      <AdminSidebar />
    </div>
    <div className="w-9/12">
      <Navbar />
      
    </div>
    
  </div>
);

export default AdminLayout;
