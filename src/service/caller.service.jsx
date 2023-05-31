import axios from 'axios'
import { accountService } from './account.service'


const Axios = axios.create({
    baseURL: 'https://localisation-pharmacie-server-production.up.railway.app'
})


Axios.interceptors.request.use(request => {

    if(accountService.isLogged()){
        request.headers.Authorization = 'Bearer '+accountService.getToken()
    }

    return request
})

Axios.interceptors.response.use(response => {
    return response
}, error => {
    if(error.response.status === 401){
        accountService.logout()
        window.location = '/auth/login'
    }else{
        return Promise.reject(error)
    }
})

export default Axios