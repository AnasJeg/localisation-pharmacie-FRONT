import React from 'react';
import { Routes, Route } from "react-router-dom"
import Home from '../pages/Home';
import Ville from '../pages/Ville';
import Pharmacie from '../pages/Pharmacie';
import Zone from '../pages/Zone';
import Garde from '../pages/Garde';
import GardePharmacie from '../pages/GardePharmacie';
import Localisation from '../components/Localisation';
import MapID from '../components/MapID';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Test from '../pages/Test';
import '../style/admin.css'
import 'primereact/resources/themes/lara-light-indigo/theme.css';   // theme
import 'primereact/resources/primereact.css';                       // core css
import 'primeicons/primeicons.css';                                 // icons
import 'primeflex/primeflex.css';
import 'antd/dist/reset.css';                                   // css utility
import '../style/flags.css'
import { accountService } from '../service/account.service';
import ErrorPage from '../pages/ErrorPage';
import Try from '../pages/try';

const AdminRoute = () => {
    return (
        <div className='Admin'>  
            <Header/>
            <Routes>
                <Route path="/">
                    <Route index element={<Home />} />
                    <Route path="home" element={<Home />} />
                    {accountService.isLogged && accountService.getRole() === 'ADMIN' && (
                        <>
                            <Route path="Ville" element={<Ville />} />
                            <Route path='Zone' element={<Zone/>} />
                            <Route path="Pharmacie" element={<Pharmacie />} />
                            <Route path="Garde" element={<Garde />} />
                            <Route path="Garde_Pharmacie" element={<GardePharmacie />} />
                            <Route path="Test" element={<Test />} />
                            <Route path='try' element={<Try/>} />
                        </>
                    )}
                    <Route path="Localisation/:id" element={<Localisation />} />
                    <Route path="Local/:id" element={<MapID />} />
                    <Route path="*" element={<ErrorPage />} />
                </Route>
            </Routes>
            <Footer />

        </div>
    );
};

export default AdminRoute;