const { request, response } = require('express');
// const { check } = require('express-validator');

const createUser = ( req = request, res = response ) => {

    res.json({
        msg: 'Hola desde create user'
    });

}

const login = ( req = request, res = response ) => {

    res.json({
        msg: 'Hola desde login'
    });

}

const renovarToken = ( req = request, res = response ) => {

    res.json({
        msg: 'Hola desde renovar'
    });

}

module.exports = {
    createUser,
    login,
    renovarToken
}
