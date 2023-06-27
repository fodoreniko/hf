const Schema = require('mongoose').Schema;
const db = require('../config/db');

const Food = db.model('Food', {
    nev: String,
    mennyiseg: Number,
    mertekegyseg: String,
    idopont: Date,
    _tartalmaz: {
        type: Schema.Types.ObjectId,
        ref: 'Shelf'
    }
});

module.exports = Food;