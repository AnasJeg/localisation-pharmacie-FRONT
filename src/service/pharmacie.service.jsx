import Axios from './caller.service'

/**
 * Récupératoin de la liste des utilisateurs
 * @returns {Promise}
 */
let getAllPharmacies = () => {
    return Axios.get('/api/controller/pharmacies/')
}

/**
 * Récupération d'un utilisateur
 * @param {number} uid 
 * @returns {Promise}
 */
let getPharmacies = (uid) => {
    return Axios.get('/users/'+uid)
}


// Décaraltion des esrvices pour import
export const pharmacieService = {
    getAllPharmacies, getPharmacies
}