const axios = require('axios');

const getSearch = async (search, prov, mun) => {
    let pharmacy = {};
    try {
        pharmacy = await axios.get('https://backend.t3sd.nat.cu/getPharmacy')
    } catch (error) {
        return { "Error": true };
    }
    if (!pharmacy.data.Error) {
        const newPharmacy = [];

        if (prov.length > 0 && mun.length > 0) {
            pharmacy.data.Pharmacy.map(p => {
                if (p.municipio === mun && p.provincia === prov) {
                    newPharmacy.push(p.nombre);
                }
            });
        }
        else if (prov.length > 0 && mun.length === 0) {
            pharmacy.data.Pharmacy.map(p => {
                if (p.provincia === prov) {
                    newPharmacy.push(p.nombre);
                }
            });
        }
        else if (prov.length === 0 && mun.length > 0) {
            pharmacy.data.Pharmacy.map(p => {
                if (p.municipio === mun) {
                    newPharmacy.push(p.nombre);
                }
            });
        }

        else {
            pharmacy.data.Pharmacy.map(p => newPharmacy.push(p.nombre));
        }


        
        const newSearch = await axios.get(`https://backend.t3sd.nat.cu/getMedicine/`)
            .then(resp => resp.data)
            .catch(e => { return { "Error": true } })


        const response = [];
        newSearch.Medicines.map(r => {
            if (r.nombre.toUpperCase().includes(search.toUpperCase())) { response.push(r) }
        })

        const responseFinal = [];
        for (let i = 0; i < response.length; i++) {
            for (let j = 0; j < newPharmacy.length; j++) {
                if (response[i].farmacia === newPharmacy[j])
                    responseFinal.push(response[i])
            }
        }

        return { "Search": responseFinal, "totalSearch": responseFinal.length, "Error": false }
    }
    else {
        return { "Error": true }
    }
}

module.exports = { getSearch };