/*
    
    ruta: /api/plato
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../midlewares/validarCampos');

const { validarJWT } = require('../midlewares/validarJWT');
const { getPlato, actualizarPlato, eliminarPlato, crearPlato } = require('../controllers/platoController');


const router = Router();

router.get('/', getPlato);


router.post('/', [
        validarJWT,
        check('nombre', 'El nombre del Plato es obligatorio').not().isEmpty(),
        validarCampos
    ],
    crearPlato);

router.put('/:id', [
        validarJWT,
        check('nombre', 'El nombre del Plato es obligatorio').not().isEmpty(),
        validarCampos
    ],
    actualizarPlato);

router.delete('/:id',
    validarJWT,
    eliminarPlato);



module.exports = router; //para exportar