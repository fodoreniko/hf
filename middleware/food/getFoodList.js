/**
 * betölti az egy adott polchoz tartozó összes ételt az adatbázisból
 */
const requireOption = require('../requireOption');

module.exports = function (objectrepository) {
    const FoodModel = requireOption(objectrepository, 'FoodModel');

    return function(_req, res, next) {

        if (typeof res.locals.shelf === 'undefined') {
            return next();
        }

        FoodModel.find({_tartalmaz: res.locals.shelf._id})
            .then((foodlist) => {
                res.locals.foodlist = foodlist;
                return next();
            })
            .catch((err) => next(err));

    };
};