import React from 'react';
import { Routes, Route } from "react-router-dom"
import Home from '../pages/Home';
import Ville from '../pages/Ville';
import Pharmacie from '../pages/Pharmacie';
import Zone from '../pages/Zone';
import Garde from '../pages/Garde';
import GardePharmacie from '../pages/GardePharmacie';
import Localisation from '../components/Localisation';
import Map from '../components/Map';

const AdminRoute = () => {
    return (
        <Routes>
            <Route>
                <Route path="/home" element={<Home />} />
                <Route path="/Ville" element={<Ville />} />
                <Route path="/Pharmacie" element={<Pharmacie />} />
                <Route extract path='/Zone' element={<Zone />} />
                <Route extract path='/Garde' element={<Garde />} />
                <Route path='/Garde_Pharmacie' element={<GardePharmacie />} />
                <Route path='/Localisation/:id' element={<Localisation />} />
                <Route path='/Local/:id' element={<Map />} />
            </Route>
        </Routes>
    );
};

export default AdminRoute;