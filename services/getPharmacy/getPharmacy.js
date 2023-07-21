const axios = require('axios');

const routerGetPharmacy = async (rp) => {
    const response = [];
    let location = [];
    let data = [];
    try {
        location = await axios.get('https://my-json-server.typicode.com/denispractica/locationPharmacy/location');
        data = await axios.get('https://my-json-server.typicode.com/denispractica/dataPharmacy/data');
    } catch (error) {
        return { "Error": true }
    }
    const locationPharmacy = location.data;
    const dataPharmacy = data.data;

    for (let i = 0; i < locationPharmacy.length; i++) {
        let newDataPharmacy = dataPharmacy.filter(p => p.id === locationPharmacy[i].id);
        response.push({
            "id": newDataPharmacy[0].id,
            "location": locationPharmacy[i].location,
            "nombre": newDataPharmacy[0].nombre,
            "direccion": newDataPharmacy[0].direccion,
            "telefono": newDataPharmacy[0].telefono,
            "municipio": newDataPharmacy[0].municipio,
            "provincia": newDataPharmacy[0].provincia
        })
    }
    return { "Pharmacy": response, "Error": false };
}

module.exports = { routerGetPharmacy };