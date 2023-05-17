import Axios from './caller.service'

let getZones = () => {
    return Axios.get('/api/controller/zones/')
}


export const zoneServices = {
    getZones
}