const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
let Schema = mongoose.Schema;

let ListingsAndReviewsSchema = new Schema({
    name: {
        type: String,
        ref: 'listingsAndReviews',
        required: [true, 'Por favor ingresa el nombre de la habitacion']
    },
    listing_url: {
        type: String,
        required: [true, 'Por favor ingrese la url de la habitacion']
    },
    property_type: {
        type: String,
        //required: [true, 'Por favor ingrese el tipo de propiedad']
    },
    summary: {
        type: String,
        required: [true, 'Por favor ingresa la info acerca de la habitacion']
    },
    description: {
        type: String,
        required: [true, 'Por favor ingresa la descripcion de la habitacion']
    },
    notes: {
        type: String,
        required: [false, 'Por favor ingrese alguna notas']
    },
    price: {
        type: Number,
        required: [true, 'Por favor ingrese el precio']
    },
    status: {
        type: Boolean,
        default: true
    },

},{ collection: 'listingsAndReviews' });

ListingsAndReviewsSchema.plugin(uniqueValidator, {
    message: '{PATH} Debe ser unico y diferente'
});
module.exports = mongoose.model('listingAndReviews', ListingsAndReviewsSchema);