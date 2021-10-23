const { request, response } = require('express');
const bcryptjs = require('bcryptjs');

const { Usuario } = require('../models/index');
const { generarJWT } = require('../helpers/generar-jwt');

const createUser = async( req = request, res = response ) => {

    const { name, email, password } = req.body;

    try {
        
        // Verificar si el usuario existen en la DB
        const usuarioExist = await Usuario.findOne({ email });
        if ( usuarioExist ){
            return res.status(400).json({
                ok: false,
                msg: 'El correo ya se encuentra registrado'
            });
        }

        // Crear usuario y alamcenar en la DB
        const usuario = new Usuario({ name, email, password });

        // Encriptar la contraseña
        const salt = bcryptjs.genSaltSync();
        usuario.password = bcryptjs.hashSync( password, salt );

        await usuario.save();

        // Generar JWT
        const token = await generarJWT( usuario._id, usuario.name );

        res.status(201).json({
            ok: true,
            uid: usuario._id,
            name: usuario.name,
            token
        });
        
    } catch (error) {
        // console.log(error);

        return res.status(500).json({
            ok: false,
            msg: 'Algo salió mal, contacte al administrador'
        });
    }

}

const login = async( req = request, res = response ) => {

    const { email, password } = req.body;

    try {
        
        // Verificar si el correo existe
        const usuario = await Usuario.findOne({ email });
        if ( !usuario ){
            return res.status(400).json({
                ok: false,
                msg: 'El usuario / contraseña no son correctos'
            });
        }
        
        // Verificar si está activo en la BD
        if ( !usuario.status ){
            return res.status(400).json({
                ok: false,
                msg: 'El usuario / contraseña no son correctos'
            });
        }
        
        // Verificar la contraseña contra la de la DB
        const validPassword = bcryptjs.compareSync( password, usuario.password );
        if ( !validPassword ){
            return res.status(400).json({
                ok: false,
                msg: 'El usuario / contraseña no son correctos'
            });
        }

        // Generar JWT
        const token = await generarJWT( usuario._id, usuario.name );
        
        res.status(200).json({
            ok: true,
            uid: usuario._id,
            name: usuario.name,
            token
        });
        
    } catch (error) {
        // console.log(error);

        return res.status(500).json({
            ok: false,
            msg: 'Algo salió mal, contacte al administrador'
        });
    }

}

const renovarToken = async( req = request, res = response ) => {

    const user = req.usuario;   // Se extre el usuario del token leído

    try {
        
        // Generar JWT nuevamente
        const token = await generarJWT( user._id, user.name );
    
        res.status(201).json({
            ok: true,
            token,
            uid: user._id,
            name: user.name
        });
    } catch (error) {
        // console.log(error);

        return res.status(500).json({
            ok: false,
            msg: 'Algo salió mal, contacte al administrador'
        });
    }


}

module.exports = {
    createUser,
    login,
    renovarToken
}
