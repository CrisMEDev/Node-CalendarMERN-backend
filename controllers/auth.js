const { request, response } = require('express');
const bcryptjs = require('bcryptjs');

const createUser = ( req = request, res = response ) => {

    const { name, email, password } = req.body;

    try {
        
        // TODO: Verificar si el usuario existen en la DB

        // TODO: Verificar si esta activo en la DB

        // TODO: verificar la contraseña

        res.status(201).json({
            name,
            email,
            password
        });
        
    } catch (error) {
        console.log(error);

        return res.status(500).json({
            ok: false,
            msg: 'Algo salió mal, contacte al administrador'
        });
    }

}

const login = ( req = request, res = response ) => {

    const { email, password } = req.body;

    try {
        
        res.status(200).json({
            ok: true,
            email,
            password
        });
        
    } catch (error) {
        console.log(error);

        return res.status(500).json({
            ok: false,
            msg: 'Algo salió mal, contacte al administrador'
        });
    }

}

const renovarToken = ( req = request, res = response ) => {

    res.status(201).json({
        ok: true,
        msg: 'Hola desde renovar'
    });

}

module.exports = {
    createUser,
    login,
    renovarToken
}
