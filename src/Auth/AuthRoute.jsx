import React from 'react';
import { Routes, Route } from 'react-router-dom'
import Login from '../pages/Login';
import Logout from '../pages/Logout';


const AuthRoute = () => {
    return (
        <Routes>
            <Route index element={<Login/>}/>
            <Route path="/" element={<Login/>}/>
            <Route path='/logout' element={<Logout/>} />
        </Routes>
    );
};

export default AuthRoute;