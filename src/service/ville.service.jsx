import Axios from './caller.service'

let gatAllVilles = () => {
    return Axios.get('/api/controller/villes/')
}


export const villeServices = {
    gatAllVilles
}