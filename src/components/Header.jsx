import React from 'react';
import { useNavigate } from "react-router-dom";
import { Menubar } from 'primereact/menubar';
import { accountService } from '../service/account.service';
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ListItemIcon from '@mui/material/ListItemIcon';
import Icon from '@mui/material/Icon';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import LogoutIcon from '@mui/icons-material/Logout';
import LocalPharmacyIcon from '@mui/icons-material/LocalPharmacy';
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';

export default function Header() {

  const navigate = useNavigate();

  const logout = () => {
    accountService.logout()
    navigate('/');
  };

  const items = [
    {
      label: 'Home',
      icon: <AddLocationAltIcon />,
      command: () => { navigate('/app/Home') }
    },
    {
      label: 'Pharmacie',
      icon: <LocalPharmacyIcon />,
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
  ];
  const [anchorElUser, setAnchorElUser] = React.useState(null);


  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const itemuser = [
    {
      label: 'Home',
      icon: <AddLocationAltIcon />,
      command: () => { navigate('/app/Home') }
    },
  ];

  const setting = [
    {
      label: 'Profile',
      icon: <AccountBoxIcon />,
      command: () => { navigate('/app/Home') }
    },
    {
      label: 'Logout',
      icon: <LogoutIcon />,
      command: () => { logout() }
    }
  ];

  const style = {
    backgroundColor: 'rgba(245,243,246,0.88)',
    color: '#230202',
    justifyContent: 'left'
  };


  const end = (
    <Box sx={{ flexGrow: 0 }}>
      <Tooltip title="Open settings">
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          <Avatar alt="AnasJegoual" />
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: '45px' }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        {setting.map((settingItem) => (
          <MenuItem key={settingItem.label} onClick={handleCloseUserMenu}>
            <ListItemIcon>
              <Icon>{settingItem.icon}</Icon>
            </ListItemIcon>
            <Typography textAlign="center" onClick={() => settingItem.command()}>{settingItem.label}</Typography>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );



  return (
    <div>
      <div className="card">
        {accountService.isLogged && accountService.getRole() === 'ADMIN' && (
          <Menubar style={style} model={items} end={end} />
        )}
        {accountService.isLogged && accountService.getRole() === 'USER' && (
          <Menubar style={style} model={itemuser} end={end} />
        )}
      </div>
    </div>
  );

}