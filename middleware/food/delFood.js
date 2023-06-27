/**
 * az adatbázisból töröl egy ételt
 * sikeres törlés után átirányít az étel listához
 */
const requireOption = require('../requireOption');

module.exports = function (objectrepository) {
    return function (req, res, next) {
        if (typeof res.locals.food === 'undefined') {
            return next();
        }

        res.locals.food
            .deleteOne()
            .then(() => res.redirect(`/food/${res.locals.shelf._id}`))
            .catch((err) => next(err));
    };
};