/*
    
    ruta: /api/factura
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../midlewares/validarCampos');

const { validarJWT } = require('../midlewares/validarJWT');
const {
    getFactura,
    crearFactura,
    actualizarFactura,
    eliminarFactura
} = require('../controllers/facturaControler');


const router = Router();

router.get('/', getFactura);


router.post('/', [
        validarJWT,
        //  check('plato', 'El id del plato es obligatorio').isMongoId(),
        check('cliente', 'El id del cliente es obligatorio').isMongoId(),
        validarCampos
    ],
    crearFactura,
);

router.put('/:id', [
        validarJWT,
        //   check('plato', 'El id del plato es obligatorio').isMongoId(),
        check('cliente', 'El id del cliente es obligatorio').isMongoId(),
        validarCampos
    ],
    actualizarFactura);

router.delete('/:id',
    validarJWT,
    eliminarFactura);



module.exports = router; //para exportar