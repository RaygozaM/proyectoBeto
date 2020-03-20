const express = require('express');
const _ = require('underscore');
const app = express();

const ListingsAndReviews = require('../models/listingsAndReviews');
      
app.get('/listingsAndReviews', (req, res) => {
    ListingsAndReviews.find()
        .exec((err, listingsAndReviews) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }
            return res.status(200).json({
                ok: true,
                count: listingsAndReviews.length,
                listingsAndReviews
            })
        });
});

//get id
app.get('/listingsAndReviews/:id', (req, res) => {
    let id = req.params.id;
    ListingsAndReviews.find({ _id: id})
        .exec((err, listingsAndReviews) => { //ejecuta la funcion
            if (err) {
                return res.status(400).json({
                    ok: false,
                    status: 400,
                    msg: "No se mostro el departamento",
                    cont: err
                });
            }
            console.log(req.listingsAndReviews);
            return res.status(200).json({
                ok: true,
                status: 200,
                msg: "Se mostro el departamento correctamente por id",
                count: listingsAndReviews.length,
                listingsAndReviews
            });
        });
});

//get por nombre
app.get('/listingsAndReviews/nombre/:nombre', (req, res) => {
    let nombre = req.params.nombre;
    ListingsAndReviews.find({ name: nombre })
        .exec((err, listingsAndReviews) => { //ejecuta la funcion
            if (err) {
                return res.status(400).json({
                    ok: false,
                    status: 400,
                    msg: "No se mostro el departamento",
                    cont: err
                });
            }
            console.log(req.listingsAndReviews);
            return res.status(200).json({
                ok: true,
                status: 200,
                msg: "Se mostro el departamento correctamente por nombre",
                count: listingsAndReviews.length,
                listingsAndReviews
            });
        });
});

//get por type de propiedad
app.get('/listingsAndReviews/type/:type', (req, res) => {
    let type = req.params.type;
    ListingsAndReviews.find({ property_type: type })
        .exec((err, listingsAndReviews) => { //ejecuta la funcion
            if (err) {
                return res.status(400).json({
                    ok: false,
                    status: 400,
                    msg: "No se mostro la habitacion",
                    cont: err
                });
            }
            console.log(req.listingsAndReviews);
            return res.status(200).json({
                ok: true,
                status: 200,
                msg: "Se mostro el departamento correctamente por el tipo de propiedad",
                count: listingsAndReviews.length,
                listingsAndReviews
            });
        });
});


app.get('/listingsAndReviews/precio/:precio', (req, res) => {

    let precio = req.params.precio;

    ListingsAndReviews.find({ price: precio })
        .exec((err, listingsAndReviews) => { 
            if (err) {
                return res.status(400).json({
                    ok: false,
                    status: 400,
                    msg: "ERROR No se mostro la habitacion",
                    cont: err
                });
            }
            console.log(req.listingsAndReviews);
            return res.status(200).json({
                ok: true,
                status: 200,
                msg: "Mostrando habitaciones",
                count: listingsAndReviews.length,
                listingsAndReviews
            });
        });
});
app.post('/listingsAndReviews', (req, res) => {
    let body = req.body;

    let listingsAndReviews = new ListingsAndReviews({
        name: body.name,
        listing_url: body.listing_url,
        property_type: body.property_type,
        summary: body.summary,
        description: body.description,
        notes: body.notes,
        price: body.price
    });

    listingsAndReviews.save((err, listingsAndReviewsDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        return res.status(200).json({
            ok: true,
            listingsAndReviewsDB
        });

    });

});

app.put('/listingsAndReviews/:id', (req, res) => {
    let id = req.params.id;
    let body = _.pick(req.body, ['name', 'property_type', 'description']);

    ListingsAndReviews.findByIdAndUpdate(id, body, { new: true, runValidators: true, context: 'query' }, (err, listingsAndReviewsDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        return res.status(200).json({
            ok: true,
            listingsAndReviewsDB
        });
    });
});
app.delete('/listingsAndReviews/:id', (req, res) => {
    let id = req.params.id;
    Libro.findByIdAndUpdate(id, { status: false }, { new: true, runValidators: true, context: 'query' }, (err, resp) => {
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