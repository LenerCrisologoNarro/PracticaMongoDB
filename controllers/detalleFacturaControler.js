const { response } = require('express');
const DetFac = require('../models/detalleFacturaModel');

const getDetFac = async(req, res = response) => {
    //para relacionar tablas
    const detfac = await DetFac.find().populate('factura', 'fecha').populate('plato', 'nombre precio').populate('usuario', 'nombre img');


    res.json({
        ok: true,
        detfac
    });
}
const crearDetFac = async(req, res = response) => {
    const uid = req.uid;

    const detfac = new DetFac({
        usuario: uid,
        ...req.body
    });

    try {

        const detfacDB = await detfac.save();
        res.json({
            ok: true,
            detfac: detfacDB
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({

            ok: false,
            msg: 'Error inesperado hablar con el administrador'
        });
    }


}
const actualizarDetFac = async(req, res = response) => {

    const id = req.params.id;
    const uid = req.uid;

    try {

        const detfac = await DetFac.findById(id);
        if (!detfac) {
            return res.status(404).json({
                ok: true,
                msg: 'detfac no existe'

            });
        }

        const cambiosDetFac = {
            ...req.body,
            usuario: uid
        }

        const detfacActualizado = await DetFac.findByIdAndUpdate(id, cambiosDetFac, { new: true });

        return res.json({
            ok: true,
            detfac: detfacActualizado

        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperados hable con el administrador'
        });
    }


}
const eliminarDetFac = async(req, res = response) => {
    const id = req.params.id;

    try {

        const detfac = await DetFac.findById(id);
        if (!detfac) {
            return res.status(404).json({
                ok: true,
                msg: 'detfac no existe'

            });
        }

        await DetFac.findByIdAndDelete(id);
        return res.json({
            ok: true,
            msg: 'detfac Eliminado'

        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperados hable con el administrador'
        });
    }
}


module.exports = {
    getDetFac,
    crearDetFac,
    actualizarDetFac,
    eliminarDetFac
}