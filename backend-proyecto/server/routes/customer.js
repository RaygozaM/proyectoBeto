const express = require('express');
const _ = require('underscore');
const app = express();

const Customer = require('../models/customer');

app.get('/customer', (req, res) => {
    Customer.find({ status: true })
        .exec((err, customers) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }
            return res.status(200).json({
                ok: true,
                count: customers.length,
                customers
            });
        });
});

//get id
// app.get('/customer/:id', (req, res) => {
//     let id = req.params.id;
//     Customer.find({ status: true, _id: id })
//         .exec((err, customers) => { //ejecuta la funcion
//             if (err) {
//                 return res.status(400).json({
//                     ok: false,
//                     status: 400,
//                     msg: "No se mostro el customer",
//                     cont: err
//                 });
//             }
//             console.log(req.customer);
//             return res.status(200).json({
//                 ok: true,
//                 status: 200,
//                 msg: "Se mostro la customer correctamente por id",
//                 count: customers.length,
//                 customers
//             });
//         });
// });

app.get('/customer/:id', (req, res) => {
    let id = req.params.id;
    let body = _.pick(req.body, ['id']);
    Customer.findById(id, (err, customerDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        return res.status(200).json({
            ok: true,
            customerDB
        });
    });
});

//get por nombre
app.get('/customer/nombre/:nombre', (req, res) => {
    let nombre = req.params.nombre;
    Customer.find({ status: true, firstname: nombre })
        .exec((err, customers) => { //ejecuta la funcion
            if (err) {
                return res.status(400).json({
                    ok: false,
                    status: 400,
                    msg: "No se mostro el customer",
                    cont: err
                });
            }
            console.log(req.customer);
            return res.status(200).json({
                ok: true,
                status: 200,
                msg: "Se mostro el customer correctamente por nombre",
                count: customers.length,
                customers
            });
        });
});

//get por pais country
app.get('/customer/pais/:pais', (req, res) => {
    let pais = req.params.pais;
    Customer.find({ status: true, country: pais })
        .exec((err, customers) => { //ejecuta la funcion
            if (err) {
                return res.status(400).json({
                    ok: false,
                    status: 400,
                    msg: "No se mostro el customer",
                    cont: err
                });
            }
            console.log(req.customer);
            return res.status(200).json({
                ok: true,
                status: 200,
                msg: "Se mostro el customer correctamente por country",
                count: customers.length,
                customers
            });
        });
});

app.post('/customer', (req, res) => {
    let body = req.body;

    let customer = new Customer({
        // _id: body.id,
        firstname: body.firstname,
        lastname: body.lastname,
        address: body.address,
        city: body.city,
        country: body.country,
        district: body.district

    });

    customer.save((err, customerDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        return res.status(200).json({
            ok: true,
            customerDB
        });

    });

});


app.put('/customer/:id', (req, res) => {

    let id = req.params.id;
    let body = _.pick(req.body, ['id', 'firstname', 'lastname', 'city', 'country', 'district']);

    Customer.findByIdAndUpdate(id, body, { new: true, runValidators: true, context: 'query' }, (err, customerDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        return res.status(200).json({
            ok: true,
            customerDB
        });
    });
});

app.delete('/customer/:id', (req, res) => {
    let id = req.params.id;
    Customer.findByIdAndUpdate(id, { status: false }, { new: true, runValidators: true, context: 'query' }, (err, resp) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        return res.status(200).json({
            ok: true,
            resp
        });
    });
});
module.exports = app;