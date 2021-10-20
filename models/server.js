const express = require('express');
const cors = require('cors');

class Server {

    constructor(){
        this.app = express()
        this.port = process.env.PORT

        this.paths = {
            auth:                   '/api/auth',
            calendar:               '/api/calendar',
        }

        this.middlewares();

        this.routes();
    }
    
    middlewares(){

        // Implementando cors
        this.app.use( cors() );

        // Lectura y parseo del body
        this.app.use( express.json() );

        // Directorio público
        this.app.use( express.static('public') );
        
    }

    routes(){

        this.app.use( this.paths.auth,              require('../routes/auth') );
        this.app.use( this.paths.calendar,          require('../routes/calendar') );
        
    }

    listen(){

        this.app.listen( this.port, () => {
            console.log('Servidor montado en el puerto: ', this.port);
        });

    }

}

module.exports = Server;
