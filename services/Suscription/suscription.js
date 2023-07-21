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
        await dataBase.updateOne({ email: user.email }, { pharmacy: user.pharmacy, medicine: user.medicine, tarjeton: user.tarjeton })
            .then(r => rp.send({ "response": "Has actualizado tu suscripción correctamente" }))
            .catch(e => rp.send({ "response": "Ha ocurrido un error" }));
    }
    else {
        const newDataBase = new dataBase({
            email: user.email,
            pharmacy: user.pharmacy,
            medicine: user.medicine,
            tarjeton: user.tarjeton
        })
        await newDataBase.save()
            .then(r => rp.send({ "response": "Te has suscrito correctamente" }))
            .catch(e => rp.send({ "response": "Ha ocurrido un error" }));

    }
}


const deleteSuscription = async (id, rp) => {

    const oldUser = await dataBase.find({ _id: id });

    if (oldUser.length > 0) {
        await dataBase.deleteOne({ _id: id })
            .then(r => rp.send("Se ha eliminado la suscripción correctamente"))
            .catch(e => rp.send({ "response": "Ha ocurrido un error" }));
    }
    else {
        rp.send("Ese usuario no existe en la base de datos");
    }


}



module.exports = { setSuscription, deleteSuscription }