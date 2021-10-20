const { request, response } = require('express');


const obtenerEvents = ( req = request, res = response ) => {

    res.json({
        msg: 'Hola mundo desde obtenerEvents'
    });
    
}


module.exports = {
    obtenerEvents
}