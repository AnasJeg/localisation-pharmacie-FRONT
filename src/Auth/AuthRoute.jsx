import React from 'react';
import { Routes, Route } from 'react-router-dom'
import Login from '../pages/Login';
import Register from '../pages/Register';
import ErrorPage from '../pages/ErrorPage';

const AuthRoute = () => {
    return (
        <Routes>
            <Route index element={<Login />} />
            <Route path="/Login" element={<Login />} />
            <Route path='/Register' element={<Register />} />
            <Route path="*" element={<ErrorPage />} />
        </Routes>

    );
};

export default AuthRoute;