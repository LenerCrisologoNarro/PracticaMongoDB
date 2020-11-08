const { Schema, model } = require('mongoose');

//Definicion de las colecciones en mongoose (definicion del esquema de bd)
const detFactSchema = Schema({
    factura: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'Factura'
    },
    plato: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'Plato'
    },

    importe: {
        type: Number,
        required: true,
    }




});


detFactSchema.method('toJSON', function() {
    //codigo para modificar el _id por default por uid pero solo para visualizacion en 
    //la base de datos seguira igual
    const { __v, ...object } = this.toObject();

    return object;

})

//para poder exponer esta definicion  para que pueda ser utilizado desde fuera
module.exports = model('detFact', detFactSchema);