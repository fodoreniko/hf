/**
 * az adatbázisból töröl egy polcot
 * sikeres törlés után átirányít a polc listához
 */
const requireOption = require('../requireOption');

module.exports = function (objectrepository) {
    return function (req, res, next) {
        if (typeof res.locals.shelf === 'undefined') {
            return next();
        }

        res.locals.shelf
            .deleteOne()
            .then(() => res.redirect("/"))
            .catch((err) => next(err));
    };
};