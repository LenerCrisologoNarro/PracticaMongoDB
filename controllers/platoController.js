const { response } = require('express');
const Plato = require('../models/platoModel');

const getPlato = async(req, res = response) => {

    const plato = await Plato.find().populate('usuario', 'nombre img');


    res.json({
        ok: true,
        plato
    });
}
const crearPlato = async(req, res = response) => {
    const uid = req.uid;

    const plato = new Plato({
        usuario: uid,
        ...req.body
    });

    try {

        const platoDB = await plato.save();
        res.json({
            ok: true,
            plato: platoDB
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({

            ok: false,
            msg: 'Error inesperado hablar con el administrador'
        });
    }


}
const actualizarPlato = async(req, res = response) => {

    const id = req.params.id;
    const uid = req.uid;

    try {

        const plato = await Plato.findById(id);
        if (!plato) {
            return res.status(404).json({
                ok: true,
                msg: 'Proyecto no existe'

            });
        }

        const cambiosPlato = {
            ...req.body,
            usuario: uid
        }

        const platoActualizado = await Plato.findByIdAndUpdate(id, cambiosPlato, { new: true });

        return res.json({
            ok: true,
            plato: platoActualizado

        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperados hable con el administrador'
        });
    }


}
const eliminarPlato = async(req, res = response) => {
    const id = req.params.id;

    try {

        const plato = await plato.findById(id);
        if (!plato) {
            return res.status(404).json({
                ok: true,
                msg: 'Proyecto no existe'

            });
        }

        await Plato.findByIdAndDelete(id);
        return res.json({
            ok: true,
            msg: 'Proyecto Eliminado'

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
    getPlato,
    crearPlato,
    actualizarPlato,
    eliminarPlato
}