
const { Schema, model } = require('mongoose');

const EventoSchema = Schema({
    title: {
        type: String,
        required: [true, 'El title es obligatorio']    // El segundo es el mensaje de error que será mostrado en caso falte el nombre
    },
    
    notes: {
        type: String,
    },

    start: {
        type: Date,
        required: [true, 'La fecha de inicio es obligatoria']
    },

    end: {
        type: Date,
        required: [true, 'La fecha de terminación es obligatoria']
    },

    user: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',      // Referencia al schema usuario
        required: true
    },

});

EventoSchema.methods.toJSON = function(){

    // Genera una instancia de mi Schema con sus valores respectivos
    const { __v, _id, ...event } = this.toObject(); // Saca la version y el password de mi objeto Schema y el resto lo deja en user

    event.note_id = _id; // Renombra la propiedad _id a uid

    return event;
}


module.exports = model( 'Evento', EventoSchema );

