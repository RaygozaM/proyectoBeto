const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const uniqueValidator = require('mongoose-unique-validator');

let Schema = mongoose.Schema;


let customerSchema = new Schema({
    firstname: {
        type: String,
        unique: true,
        required: [true, 'Por favor ingrese nombre']
    },
    lastname: {
        type: String,
        unique: true,
        required: [true, 'Por favor ingrese su apellido']
    },
    address: {
        type: String,
        unique: true,
        required: [true, 'Por favor ingrese su direccion']
    },
    city: {
        type: String,
        required: [true, 'Por favor ingrese la ciudad']
    },

    country: {
        type: String,
        required: [true, 'Por favor ingrese el pais']
    },

    district: {
        type: String,
        required: [true, 'Por favor ingrese distrito']
    },

    status: {
        type: Boolean,
        default: true
    },
    _id: {
        type: Number
    } 
},{ collection: 'customers' });


customerSchema.plugin(AutoIncrement, { _id: '_id' }, uniqueValidator, {
    message: '{PATH} Debe ser unico y diferente'
});

module.exports = mongoose.model('Customer', customerSchema);