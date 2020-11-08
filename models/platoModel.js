const { Schema, model } = require('mongoose');

//Definicion de las colecciones en mongoose (definicion del esquema de bd)
const PlatoSchema = Schema({
    nombre: {
        type: String,
        required: true
    },
    precio: {
        type: Number,
        required: true,
        unique: true
    },
    ingredientes: {
        type: String
    },
    img: {
        type: String
    },
    usuario: { required: true, type: Schema.Types.ObjectId, ref: 'Usuario' }

});


PlatoSchema.method('toJSON', function() {
    //codigo para modificar el _id por default por uid pero solo para visualizacion en 
    //la base de datos seguira igual
    const { __v, ...object } = this.toObject();


    return object;

})

//para poder exponer esta definicion  para que pueda ser utilizado desde fuera
module.exports = model('Plato', PlatoSchema);