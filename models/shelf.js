const Schema = require('mongoose').Schema;
const db = require('../config/db');

const Shelf = db.model('Shelf', {
    nev: String,
    hasznalo: String
});

module.exports = Shelf;