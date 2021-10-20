const { Router } = require('express');

const {
    createUser,
    login,
    renovarToken
} = require('../controllers/auth');

const router = Router();

router.post( '/new', createUser );

router.post( '/', login );

router.get( '/renew', renovarToken );

module.exports = router;
