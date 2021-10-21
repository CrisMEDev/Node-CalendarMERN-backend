const { Router } = require('express');
const { check } = require('express-validator');

const {
    obtenerEvents,
    crearEvent,
    actualizarEvent,
    borrarEvent
} = require('../controllers/calendar');
const { isDate } = require('../helpers/isDate');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

// Todas las rutas deben pasar por la siguiente validación
router.use( validarJWT );

router.get( '/', obtenerEvents );

router.post( '/', [
    check('title', 'El título es obligatorio').notEmpty(),
    check('start', 'La fecha de inicio es obligatoria y debe ser válida').custom( isDate ),
    check('end', 'La fecha de finalización es obligatoria y debe ser válida').custom( isDate ),
    validarCampos
], crearEvent );

router.put( '/:id', [
    check('id', 'El id no es válido').isMongoId(),
    check('title', 'El título es obligatorio').notEmpty(),
    check('start', 'La fecha de inicio es obligatoria y debe ser válida').custom( isDate ),
    check('end', 'La fecha de finalización es obligatoria y debe ser válida').custom( isDate ),
    validarCampos
], actualizarEvent );

router.delete( '/:id', [
    check('id', 'El id no es válido').isMongoId(),
    validarCampos
], borrarEvent );

module.exports = router;

