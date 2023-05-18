import Axios from './caller.service'

/**
 * Récupératoin de la liste des utilisateurs
 * @returns {Promise}
 */
let getAllPharmacies = () => {
    return Axios.get('/api/controller/pharmacies/')
}

let getPharmacie = (uid) => {
    return Axios.get('/api/controller/pharmacies/find/'+uid)
}

let addPharmacie = (d) =>{
    return Axios.post('/api/controller/pharmacies/save',d)
}

let DeletePharmacie = (id) =>{
    return Axios.delete(`/api/controller/pharmacies/delete/${id}`)
}


// Décaraltion des esrvices pour import
export const pharmacieService = {
    getAllPharmacies, getPharmacie ,addPharmacie ,DeletePharmacie
}