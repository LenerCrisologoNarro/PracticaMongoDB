const { response } = require('express');
const Cliente = require('../models/clienteModel');

const getCliente = async(req, res = response) => {

    const cliente = await Cliente.find().populate('usuario', 'nombre img');


    res.json({
        ok: true,
        cliente
    });
}
const crearCliente = async(req, res = response) => {
    const uid = req.uid;

    const cliente = new Cliente({
        usuario: uid,
        ...req.body
    });

    try {

        const clienteDB = await cliente.save();
        res.json({
            ok: true,
            cliente: clienteDB
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({

            ok: false,
            msg: 'Error inesperado hablar con el administrador'
        });
    }


}
const actualizarCliente = async(req, res = response) => {

    const id = req.params.id;
    const uid = req.uid;

    try {

        const cliente = await Cliente.findById(id);
        if (!cliente) {
            return res.status(404).json({
                ok: true,
                msg: 'cliente no existe'

            });
        }

        const cambiosCliente = {
            ...req.body,
            usuario: uid
        }

        const clienteActualizado = await Cliente.findByIdAndUpdate(id, cambiosCliente, { new: true });

        return res.json({
            ok: true,
            cliente: clienteActualizado

        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperados hable con el administrador'
        });
    }


}
const eliminarCliente = async(req, res = response) => {
    const id = req.params.id;

    try {

        const cliente = await Cliente.findById(id);
        if (!cliente) {
            return res.status(404).json({
                ok: true,
                msg: 'cliente no existe'

            });
        }

        await Cliente.findByIdAndDelete(id);
        return res.json({
            ok: true,
            msg: 'cliente Eliminado'

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
    getCliente,
    crearCliente,
    actualizarCliente,
    eliminarCliente
}