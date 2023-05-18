import Axios from './caller.service'

let getZones = () => {
    return Axios.get('/api/controller/zones/')
}

let addZone = (d) =>{
    return Axios.post('/api/controller/zones/save',d)
}

let DeleteZone = (id) =>{
    return Axios.delete(`/api/controller/zones/delete/${id}`)
}

export const zoneServices = {
    getZones,addZone,DeleteZone
}