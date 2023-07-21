const axios = require('axios');

const getSearch = async (search) => {
    const response = [];
    let data = {};
    try {
        data = await axios.get('https://localhost/getMedicine/');
    } catch (error) {
        return { "Error": true };
    }
    if (!data.data.Error) {
        data.data.Medicines.map(s => {
            if (s.nombre.toUpperCase().includes(search.toUpperCase())) {
                response.push(s);
            }
        })

        return { "Search": response, "totalSearch": response.length, "Error": false }
    }
    else {
        return { "Error": true }
    }
}
module.exports = { getSearch };