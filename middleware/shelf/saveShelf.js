/**
 * az adatbázisba elment vagy módosít egy polcot
 * (ha a polc már benne van az adatbázisban, akkor módosítja, különben pedig újat hoz létre)
 * sikeres módosítás/mentés után átirányít a polc listához
 */
const requireOption = require('../requireOption');

module.exports = function(objectrepository) {
    const ShelfModel = requireOption(objectrepository, "ShelfModel");

    return function (req, res, next) {
        if (typeof req.body.nev === 'undefined' || typeof req.body.hasznalo === 'undefined' ) {
            return next();
        }

        if (typeof res.locals.shelf === 'undefined') {
            res.locals.shelf = new ShelfModel();
        }

        res.locals.shelf.nev = req.body.nev;
        res.locals.shelf.hasznalo = req.body.hasznalo;

        res.locals.shelf
            .save()
            .then(() => res.redirect("/"))
            .catch((err) => next(err));
    };
};