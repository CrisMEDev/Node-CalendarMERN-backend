const { Router } = require('express');
const { check } = require('express-validator');

const {
    createUser,
    login,
    renovarToken
} = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

router.post( '/new', [
    check('name', 'El nombre es obligatorio').notEmpty(),
    check('email', 'El correo es obligatorio').isEmail(),
    check('password', 'La contraseña es obligatoria').notEmpty(),
    check('password', 'La contraseña debe ser de al menos 6 caracteres').isLength({ min: 6 }),
    validarCampos
], createUser );

router.post( '/', [
    check('email', 'El correo es obligatorio').isEmail(),
    check('password', 'La contraseña debe ser de al menos 6 caracteres').isLength({ min: 6 }),
    validarCampos
], login );

router.get( '/renew', renovarToken );

module.exports = router;
