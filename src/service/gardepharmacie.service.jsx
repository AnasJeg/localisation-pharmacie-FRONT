import Axios from './caller.service'

/**
 * Récupératoin de la liste des utilisateurs
 * @returns {Promise}
 */
let getAllGardePharmacies = () => {
    return Axios.get('/api/controller/GardePharmacie/')
}


let addGardePharmacie = (d) =>{
    return Axios.post('/api/controller/GardePharmacie/save',d)
}

let DeleteGardePharmacie = (dateDebut,pharmacie,garde) =>{
    return Axios.delete(`/api/controller/GardePharmacie/deleteGP/${dateDebut}/${pharmacie}/${garde}`)
}

let UpdateGardePharmacie = (date,p,g,d)=>{
    return Axios.put(`/api/controller/GardePharmacie/update/${date}/${p}/${g}`,d)
}

let Filterpharmacies = (ville,zone,periode)=>{
    return Axios.get(`/api/controller/pharmacies/ville/${ville}/zone/${zone}/pharmacies/${periode}`)
}
// Décaraltion des esrvices pour import
export const GardePharmacieService = {
    getAllGardePharmacies ,addGardePharmacie, UpdateGardePharmacie, DeleteGardePharmacie,Filterpharmacies
}