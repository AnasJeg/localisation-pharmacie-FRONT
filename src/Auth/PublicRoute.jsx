import React from 'react';
import { Routes, Route } from "react-router-dom"
import Home from '../pages/Home';
import Login from '../pages/Login';
import Logout from '../pages/Logout';
import Map from '../components/Map';

const PublicRoute = () => {
    return (
        <Routes>
          <Route index element={<Home />}>
            <Route path="home" element={<Home />} />
            <Route path='Local/:id' element={<Map />} />
            <Route path="Login" element={<Login />} />
            <Route path='logout' element={<Logout/>} />
          </Route>

        </Routes>
    );
};

export default PublicRoute;