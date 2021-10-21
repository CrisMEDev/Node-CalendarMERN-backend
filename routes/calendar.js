const { Router } = require('express');
const { check } = require('express-validator');

const {
    obtenerEvents,
    crearEvent,
    actualizarEvent,
    borrarEvent
} = require('../controllers/calendar');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

// Todas las rutas deben pasar por la siguiente validación
router.use( validarJWT );

router.get( '/', obtenerEvents );

router.post( '/', crearEvent );

router.put( '/:id', [
    check('id', 'El id no es válido').isMongoId(),
    validarCampos
], actualizarEvent );

router.delete( '/:id', [
    check('id', 'El id no es válido').isMongoId(),
    validarCampos
], borrarEvent );

module.exports = router;

