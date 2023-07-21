const axios = require('axios');

const routerGetMedicine = async () => {
    let response = [];
    let data = [];
    try {
        data = await axios.get('https://my-json-server.typicode.com/denispractica/dataMedicines/Medicines/');
    } catch (error) {
        return { "Error": true }
    }

    for (let i = 0; i < data.data.length; i++) {
        response.push({
            "farmacia": data.data[i].farmacia,
            "nombre": data.data[i].nombre,
            "disponibilidad": data.data[i].cantidad > 0 ? "Si" : "No",
            "precio": data.data[i].precio
        })
    }
    return { "Medicines": response, "totalMedicines": response.length, "Error": false };
}

const getMedicineForNamePharmacy = async (namePharmacy) => {
    let response = [];
    let data = {};
    try {
        data = await axios.get('https://backend.t3sd.nat.cu/getMedicine');
    } catch (error) {
        return { "Error": true }
    }
    if (!data.data.Error) {

        data.data.Medicines.map(s => {
            if (s.farmacia === namePharmacy) {
                response.push(s);
            }
        })

        return { "Medicines": response, "totalMedicines": response.length, "Error": false }
    }
    else {
        return { "Error": true }
    }

}
module.exports = { routerGetMedicine, getMedicineForNamePharmacy };