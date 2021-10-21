const { request, response } = require('express');


const obtenerEvents = ( req = request, res = response ) => {

    res.json({
        msg: 'Hola mundo desde obtenerEvents'
    });
    
}

const crearEvent = ( req = request, res = response ) => {

    res.json({
        msg: 'Hola mundo desde crearEvent'
    });
    
}

const actualizarEvent = ( req = request, res = response ) => {

    res.json({
        msg: 'Hola mundo desde actualizarEvent'
    });
    
}

const borrarEvent = ( req = request, res = response ) => {

    res.json({
        msg: 'Hola mundo desde borrarEvent'
    });
    
}


module.exports = {
    obtenerEvents,
    crearEvent,
    actualizarEvent,
    borrarEvent
}