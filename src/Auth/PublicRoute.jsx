import React from 'react';
import { Routes, Route } from "react-router-dom"
import Home from '../pages/Home';
import Login from '../pages/Login';
import Logout from '../pages/Logout';

const PublicRoute = () => {
    return (
        <Routes>
          <Route element={<Home />}>
            <Route path="/home" element={<Home />} />
            <Route path="/" element={<Login />} />
            <Route path='/logout' element={<Logout/>} />
          </Route>

        </Routes>
    );
};

export default PublicRoute;