const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Customer = require('./customer');
const listingsAndReviews = require('./listingsAndReviews');
// const AutoIncrement = require('mongoose-sequence')(mongoose);
let Schema = mongoose.Schema;

let rentasSchema = new Schema({
    customer: {
        type: Number,
        ref: 'Customer',
        required: [true, 'Por favor ingresa el customer']
    },
    name: {
        type: Number,
        ref: 'listingsAndReviews',
        required: [true, 'Por favor ingresa el nombre de la habitacion']
    },
    status: {
        type: Boolean,
        default: true
    },
    departureDate: {
        type: Date,
        default: Date.now,
        required: [true, 'Por favor ingrese la fecha de salida']
    },
    returnDate: {
        type: Date,
        //required: [true, 'Por favor ingrese la fecha de devolucion']
    },
},{ collection: 'rentas' });

rentasSchema.plugin(uniqueValidator, {
    message: '{PATH} Debe ser unico y diferente'
});

module.exports = mongoose.model('Rentas', rentasSchema);