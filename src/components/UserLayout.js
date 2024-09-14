import React from 'react';
import UserNavBar from './UserNavBar';
import { Outlet } from 'react-router-dom';

function UserLayout() {
  return (
    <div className='user-layout'>
        <UserNavBar />
        <div className='user-content mt-5'>
            <Outlet/>
        </div>
    </div>
  );
}

export default UserLayout;
