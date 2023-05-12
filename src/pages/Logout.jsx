import React from 'react'
import { useNavigate } from 'react-router-dom'
import { accountService } from '../service/account.service'

export default function Logout() {
 
  let navigate = useNavigate()

  // Gestion du bouton de déconnexion
  const logout = () => {
    accountService.logout()
      navigate('/')
  }

  return (
          <button onClick={logout}>Logout</button>
  );
}



