const mongoose = require('mongoose');
const os = require('os')

const ip = `${os.networkInterfaces().lo[0].address}`;
const url = `mongodb://${ip}:27017/dataBase`;
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Conexión exitosa a MongoDB');
    })
    .catch((error) => {
        console.error('Error al conectar a MongoDB:', error);
    });

const { Schema } = mongoose;

const dataBaseStructure = new Schema({
    email: String,
    pharmacy: [],
    medicine: [],
    tarjeton: Boolean
})

const dataBase = mongoose.model('datas', dataBaseStructure);

const setSuscription = async (user, rp) => {

    const oldUser = await dataBase.find({ email: user.email });

    if (oldUser.length > 0) {
        rp.send({ "response": "Ese correo ya está en uso", "Error": false })
    }
    else {
        const newDataBase = new dataBase({
            email: user.email,
            pharmacy: user.pharmacy,
            medicine: user.medicine,
            tarjeton: user.tarjeton
        })
        await newDataBase.save()
            .then(r => rp.send({ "response": "Te has suscrito correctamente 👍", "Error": false }))
            .catch(e => rp.send({ "response": "Ocurrió un error", "Error": true }));

    }
}


const deleteSuscription = async (id, rp) => {

    const oldUser = await dataBase.find({ _id: id });

    if (oldUser.length > 0) {
        await dataBase.deleteOne({ _id: id })
            .then(r => rp.send({ "response": "Se ha eliminado la suscripción correctamente", "Error": false }))
            .catch(e => rp.send({ "response": "Ha ocurrido un error", "Error": true }));
    }
    else {
        rp.send({ "response": "Ese usuario no existe en la base de datos", "Error": false });
    }


}
const getUsers = async (rp) => {
    await dataBase.find({}).then(r => rp.send({ "Users": r, "Error": false }))
        .catch(e => rp.send({ "response": "Algo salió mal", "Error": true }));

}



module.exports = { setSuscription, deleteSuscription, getUsers }