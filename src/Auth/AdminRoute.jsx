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

const AdminRoute = () => {
    return (
        <div className='Admin'>
        <Header />
        <Routes>
            <Route>
            <Route index element={<Home/>}/>
                <Route path="home" element={<Home />} />
                {accountService.isLogged && accountService.getRole() === 'ADMIN' && (
                <Route path="Ville" element={<Ville />} />
                )}
                 {accountService.isLogged && accountService.getRole() === 'ADMIN' && (
                <Route path="Pharmacie" element={<Pharmacie />} />
                 )}
                <Route path='Zone' element={<Zone />} />
                {accountService.isLogged && accountService.getRole() === 'ADMIN' && (
                <Route path='Garde' element={<Garde />} />
                )}
                 {accountService.isLogged && accountService.getRole() === 'ADMIN' && (
                <Route path='Garde_Pharmacie' element={<GardePharmacie />} />
                 )}
                <Route path='Localisation/:id' element={<Localisation />} />
                <Route path='Local/:id' element={<Map />} />
                <Route path='Test' element={<Test/>} />
            </Route>
        </Routes>
        <Footer/>
        </div>
    );
};

export default AdminRoute;