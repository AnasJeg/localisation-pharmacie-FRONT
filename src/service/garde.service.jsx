import Axios from './caller.service'

let getGardes = () => {
    return Axios.get('/api/controller/gardes/')
}

let addGarde = (d) =>{
    return Axios.post('/api/controller/gardes/save',d)
}

let DeleteGarde = (id) =>{
    return Axios.delete(`/api/controller/gardes/delete/${id}`)
}

export const gardeServices = {
    getGardes,addGarde,DeleteGarde
}