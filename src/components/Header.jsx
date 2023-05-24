import React from 'react';
import { useNavigate } from "react-router-dom";
import { Menubar } from 'primereact/menubar';
import logo from "../assets/logo.png";
import { accountService } from '../service/account.service';

export default function Header() {

  const pages = ["home", "Pharmacie", "Ville", "Zone", "Garde", "Garde_Pharmacie", "User", "Test"];
  // const settings = ["Profile","Logout"];

  const navigate = useNavigate();

  const logout = () => {
    accountService.logout()
    navigate('/');
  };

  const items = [
    {
      label: 'Home',
      icon: 'pi pi-map-marker',
      command: () => { navigate('/app/Home') }
    },
    {
      label: 'Pharmacie',
      icon: 'pi pi-heart-fill',
      command: () => { navigate('/app/Pharmacie') }
    },
    {
      label: 'Ville',
      icon: 'pi pi-globe',
      command: () => { navigate('/app/Ville') }
    },
    {
      label: 'Zone',
      icon: 'pi pi-flag',
      command: () => { navigate('/app/Zone') }
    },
    {

      label: 'Garde Pharmacie',
      icon: 'pi pi-ellipsis-v',
      items: [
        {
          label: 'Garde',
          icon: 'pi pi-moon',
          command: () => { navigate('/app/Garde') }
        },
        {
          label: 'Affect',
          icon: 'pi pi-pencil',
          command: () => { navigate('/app/Garde_Pharmacie') }
        },

      ]

    },
    {
      label: 'Test',
      icon: 'pi pi-cog',
      command: () => { navigate('/app/Test') }
    },
    {
      label: 'Logout',
      icon: 'pi pi-sign-out',
      command: () => { logout() }
    }
  ];


  const itemuser = [
    {
      label: 'Home',
      icon: 'pi pi-map-marker',
      command: () => { navigate('/app/Home') }
    },
    {
      label: 'Logout',
      icon: 'pi pi-sign-out',
      command: () => { logout() }
    }
  ];

  const style = {
    backgroundColor: 'rgba(245,243,246,0.88)',
    color: '#230202',
    justifyContent: 'left'
  };


  const end = (
    <img
      alt="logo"
      src={logo}
      width="50px"
      className="mr-2"
    />
  );



  return (
    <div>
      <div className="card">
        {accountService.isLogged && accountService.getRole() === 'ADMIN' && (
          <Menubar  style={style} model={items} />
        )}
        {accountService.isLogged && accountService.getRole() === 'USER' && (
          <Menubar  style={style} model={itemuser} />
        )}
      </div>
    </div>
  );

}