import React, { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import mylog from '../../assets/logo.png';
import { Menubar } from 'primereact/menubar';

export default function Head() {
    const navigate = useNavigate();
   // const pages = ["Home","About me", "Education", "Experience", "Projects", "Certifications", "Contact"];
    const pages = [
        {
            label: 'Accueil',
            command: () => {navigate('/') }
        },
        {
            label: 'Formations',
            command: () => {navigate('/Formations') }

        },
        {
            label: 'Experiences',
            command: () => {navigate('/Experiences') }

        },
        {
            label: 'Projets',
            command: () => {navigate('/Projets') }

        },
        {
            label: 'Certifications',
            command: () => {navigate('/Certifications') }

        },
        {
            label: 'Contact',
            command: () => {navigate('/Contact') }
        }
    ];


    const end = (
        <img
            alt="AnasJ"
            src={mylog}
            width="50"
            className="mr-2"
        />
    );
    useEffect(() => {
        const handlePopstate = () => {
            navigate('/');
        };
        window.addEventListener('popstate', handlePopstate);
        return () => {
            window.removeEventListener('popstate', handlePopstate);
        };
    }, [navigate]);

    return (
        <div>
            <div className="card">
                <Menubar end={end} style={{
                    backgroundColor: '#F6F1E9',
                    color: '#DAF5FF',
                    borderRadius: "20px",
                    justifyContent: "center",
                    alignContent: "center"
                }} model={pages} />
  
            </div>
        </div>
    );

}
