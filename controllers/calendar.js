const { request, response } = require('express');
const { Event } = require('../models/index');

const obtenerEvents = async( req = request, res = response ) => {

    try {
        // TODO: Usar una variable estado para evitar el borrado y traer solo los estado true
        const eventos = await Event.find()
                                   .populate('user', ['_id', 'name']);

        res.status(200).json({
            ok: true,
            eventos
        });
        
    } catch (error) {
        console.log(error);

        return res.status(500).json({
            ok: false,
            msg: 'Algo salió mal, contacte al administrador'
        });
    }
    
}

const crearEvent = async( req = request, res = response ) => {

    
    try {
        const evento = Event( req.body );
        
        evento.user = req.usuario._id;

        const eventoGuardado = await evento.save();

        res.status(201).json({
            ok: true,
            evento: eventoGuardado
        });
        
    } catch (error) {
        console.log(error);

        return res.status(500).json({
            ok: false,
            msg: 'Algo salió mal, contacte al administrador'
        });
    }
    
}

const actualizarEvent = async( req = request, res = response ) => {

    const eventoId = req.params.id;
    const usuario = req.usuario;

    try {
        
        // Verificar si existe el evento
        const evento = await Event.findById( eventoId );

        if ( !evento ){
            return res.status(404).json({
                ok: false,
                msg: 'El evento con ese ID no existe'
            });
        }

        // Comprobar que el evento pertenece al usuario
        if ( evento.user.toString() !== usuario._id.toString() ){
            return res.status(401).json({
                ok: false,
                msg: 'No tiene permisos para editar este evento'
            });
        }

        // Actualizar el evento
        const nuevoEvento = {
            ...req.body,
            user: usuario._id
        }

        const eventoActualizado = await Event.findByIdAndUpdate( eventoId, nuevoEvento, { new: true } );

        res.status(200).json({
            ok: true,
            eventoActualizado
        });
        
    } catch (error) {
        console.log(error);

        return res.status(500).json({
            ok: false,
            msg: 'Algo salió mal, contacte al administrador'
        });
    }
    
}

const borrarEvent = async( req = request, res = response ) => {

    const eventoId = req.params.id;
    const usuario = req.usuario;

    try {
        
        // Verificar si existe el evento
        const evento = await Event.findById( eventoId );

        if ( !evento ){
            return res.status(404).json({
                ok: false,
                msg: 'El evento con ese ID no existe'
            });
        }

        // Comprobar que el evento pertenece al usuario
        if ( evento.user.toString() !== usuario._id.toString() ){
            return res.status(401).json({
                ok: false,
                msg: 'No tiene permisos para eliminar este evento'
            });
        }

        // Borrar evento. TODO: Usar una variable estado para evitar el borrado de la DB
        const eventoBorrado = await Event.findByIdAndDelete( eventoId );

        res.status(200).json({
            ok: true,
            eventoBorrado
        });

        
    } catch (error) {
        console.log(error);

        return res.status(500).json({
            ok: false,
            msg: 'Algo salió mal, contacte al administrador'
        });
    }
    
}


module.exports = {
    obtenerEvents,
    crearEvent,
    actualizarEvent,
    borrarEvent
}