import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';

const Privateroute = () => {
    const userToken = localStorage.getItem("token");

    if (userToken) {
        return <Outlet />
    } else {
        return <Navigate to={'/login'} />
    }
}

export default Privateroute