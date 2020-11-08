const { Schema, model } = require('mongoose');

//Definicion de las colecciones en mongoose (definicion del esquema de bd)
const ClienteSchema = Schema({
    nombre: {
        type: String,
        required: true
    },
    dni: {
        type: Number,
        required: true,
        unique: true
    },
    telefono: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },

    img: {
        type: String
    }


});


ClienteSchema.method('toJSON', function() {
    //codigo para modificar el _id por default por uid pero solo para visualizacion en 
    //la base de datos seguira igual
    const { __v, ...object } = this.toObject();

    return object;

})

//para poder exponer esta definicion  para que pueda ser utilizado desde fuera
module.exports = model('Cliente', ClienteSchema);