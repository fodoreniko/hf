/**
 * az adatbázisba elment vagy módosít egy ételt
 * (ha az étel már benne van az adatbázisban, akkor módosítja, különben pedig újat hoz létre)
 * sikeres módosítás/mentés után átirányít a étel listához
 */
const requireOption = require('../requireOption');

module.exports = function(objectrepository) {
    const FoodModel = requireOption(objectrepository, "FoodModel");

    return function (req, res, next) {
        if (typeof req.body.nev === 'undefined' || typeof req.body.idopont === 'undefined' || typeof req.body.mertekegyseg === 'undefined' || typeof req.body.mennyiseg === 'undefined' || typeof res.locals.shelf === 'undefined' ) {
            return next();
        }

        if (typeof res.locals.food === 'undefined') {
            res.locals.food = new FoodModel();
        }

        if (Number.isNaN(parseInt(req.body.mennyiseg, 10))) {
            return next(new Error('A mennyiséget számmal kell megadni!'));
        }

        res.locals.food.nev = req.body.nev;
        res.locals.food.idopont = req.body.idopont;
        res.locals.food.mennyiseg = parseInt(req.body.mennyiseg, 10);
        res.locals.food.mertekegyseg = req.body.mertekegyseg;
        res.locals.food._tartalmaz = res.locals.shelf._id;

        res.locals.food
            .save()
            .then(() => res.redirect(`/food/${res.locals.shelf._id}`))
            .catch((err) => next(err));
    };
};