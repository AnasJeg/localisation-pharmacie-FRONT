import Axios from './caller.service'
import jwt_decode from 'jwt-decode'


let login = (emailL,passwordL) => {
    return Axios.post(`/api/auth/login`, {
        email: emailL,
        password: passwordL
      });
}


let saveToken = (token) => {
    localStorage.setItem('token', token)
}


let logout = () => {
    localStorage.removeItem('token')
}


let isLogged = () => {
    let token = localStorage.getItem('token')
    return !!token
}


let getToken = () => {
    return localStorage.getItem('token')
}


let getTokenInfo = () => {
    return jwt_decode(getToken())
}


export const accountService = {
    login, saveToken, logout, isLogged, getToken, getTokenInfo
}