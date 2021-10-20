const { Router } = require('express');
// const { check } = require('express-validator');

const {
    obtenerEvents
} = require('../controllers/calendar');

const router = Router();

router.get( '/', obtenerEvents );

module.exports = router;

