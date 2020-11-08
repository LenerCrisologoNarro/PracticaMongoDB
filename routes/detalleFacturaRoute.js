/*
    
    ruta: /api/detfac
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../midlewares/validarCampos');

const { validarJWT } = require('../midlewares/validarJWT');
const {
    getDetFac,
    crearDetFac,
    actualizarDetFac,
    eliminarDetFac
} = require('../controllers/detalleFacturaControler');


const router = Router();

router.get('/', getDetFac);


router.post('/', [
        validarJWT,
        check('plato', 'El id del plato es obligatorio').isMongoId(),
        check('factura', 'El id del factura es obligatorio').isMongoId(),
        validarCampos
    ],
    crearDetFac,
);

router.put('/:id', [
        validarJWT,
        check('plato', 'El id del plato es obligatorio').isMongoId(),
        check('factura', 'El id del factura es obligatorio').isMongoId(),
        validarCampos
    ],
    actualizarDetFac);

router.delete('/:id',
    validarJWT,
    eliminarDetFac);



module.exports = router; //para exportar