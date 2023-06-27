/**
 * betölti az összes polcot az adatbázisból
 */

const requireOption = require('../requireOption');

module.exports = function (objectrepository) {
    const ShelfModel = requireOption(objectrepository, 'ShelfModel');

    return function (_req, res, next) {
        ShelfModel.find({})
            .then((shelf) => {
                res.locals.shelflist = shelf;
                return next();
            })
            .catch((err) => next(err));

    };
};