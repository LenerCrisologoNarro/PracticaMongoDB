const { response } = require('express');
const Factura = require('../models/facturaModel');

const getFactura = async(req, res = response) => {
    //para relacionar tablas
    const factura = await Factura.find().populate('cliente', 'nombre').populate('usuario', 'nombre img');


    res.json({
        ok: true,
        factura
    });
}
const crearFactura = async(req, res = response) => {
    const uid = req.uid;

    const factura = new Factura({
        usuario: uid,
        ...req.body
    });

    try {

        const facturaDB = await factura.save();
        res.json({
            ok: true,
            factura: facturaDB
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({

            ok: false,
            msg: 'Error inesperado hablar con el administrador'
        });
    }


}
const actualizarFactura = async(req, res = response) => {

    const id = req.params.id;
    const uid = req.uid;

    try {

        const factura = await Factura.findById(id);
        if (!factura) {
            return res.status(404).json({
                ok: true,
                msg: 'factura no existe'

            });
        }

        const cambiosFactura = {
            ...req.body,
            usuario: uid
        }

        const facturaActualizado = await Factura.findByIdAndUpdate(id, cambiosFactura, { new: true });

        return res.json({
            ok: true,
            factura: facturaActualizado

        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperados hable con el administrador'
        });
    }


}
const eliminarFactura = async(req, res = response) => {
    const id = req.params.id;

    try {

        const factura = await Factura.findById(id);
        if (!factura) {
            return res.status(404).json({
                ok: true,
                msg: 'factura no existe'

            });
        }

        await Factura.findByIdAndDelete(id);
        return res.json({
            ok: true,
            msg: 'factura Eliminado'

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
    getFactura,
    crearFactura,
    actualizarFactura,
    eliminarFactura
}