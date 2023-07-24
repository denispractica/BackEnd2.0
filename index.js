const express = require('express');
const morgan = require('morgan');
const { routerGetPharmacy } = require('./services/getPharmacy/getPharmacy');
const { routerGetMedicine, getMedicineForNamePharmacy } = require('./services/getMedicines/getMedicine');
const { getSearch } = require('./services/getMedicines/searchMedicine/getSearch');
const { setSuscription, deleteSuscription, getUsers } = require('./services/Suscription/suscription');

const app = express();
app.set('port', process.env.PORT || 5001);
app.use(morgan('dev'));
app.listen(app.get('port'), () => console.log(`App activa en el puerto ${app.get('port')}`));


app.get('/getPharmacy', async (rq, rp) => {

    const resp = await routerGetPharmacy(rp);
    if (!resp.Error) {
        rp.send(resp);
    }
    else {
        rp.status(404).send({ "Error": true })
    }

});

app.get('/getMedicine', async (rq, rp) => {
    const resp = await routerGetMedicine();
    if (!resp.Error) {
        rp.send(resp)
    }
    else {
        rp.status(404).send({ "Error": true })
    }

});


app.get('/getMedicine/:name', async (rq, rp) => {
    const namePharmacy = rq.params.name;
    const resp = await getMedicineForNamePharmacy(namePharmacy);
    if (!resp.Error) {
        rp.send(resp)
    }
    else {
        rp.status(404).send({ "Error": true })
    }

})

app.get('/getSearch', async (rq, rp) => {
    const search = rq.query.search;
    const prov = rq.query.prov;
    const mun = rq.query.mun;
    const response = await getSearch(search, prov, mun);
    if (!response.Error) {
        rp.send(response);
    }
    else {
        rp.status(404).send({ "Error": true })
    }
})

app.use(express.json())
app.post('/setSuscription', (rq, rp) => {
    setSuscription(rq.body, rp);
})

app.delete('/deleteSuscription/:id', (rq, rp) => {
    deleteSuscription(rq.params.id, rp);
})


app.get('/getUsers', (rq, rp) => {
    getUsers(rp);
})