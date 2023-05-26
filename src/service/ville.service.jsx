import Axios from './caller.service'

let getVilles = () => {
    return Axios.get('/api/controller/villes/')
}

let addVille = (d) =>{
    return Axios.post('/api/controller/villes/save',d)
}

let DeleteVille = (id) =>{
    return Axios.delete(`/api/controller/villes/delete/${id}`)
}

let findByNom = (nom) =>{
    return Axios.delete(`/api/controller/villes?nom=${nom}`)
}

export const villeServices = {
    getVilles,addVille,DeleteVille,findByNom
}