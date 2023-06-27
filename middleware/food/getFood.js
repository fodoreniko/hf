/**
 * betölt egy ételt az adatbázisból a :foodid segítségével
 */
const requireOption = require('../requireOption');

module.exports = (objectrepository) => {
    const FoodModel = requireOption(objectrepository, "FoodModel");

    return (req, res, next) => {
        if (typeof res.locals.shelf === "undefined") {
            return next();
        }

        FoodModel.findOne({ _id: req.params.foodid, _tartalmaz: res.locals.shelf._id })
            .then((food) => {
                if (!food) {
                    throw new Error(`error`);
                }

                res.locals.food = food;
                return next();
            })
            .catch((err) => next(err));
    };
};