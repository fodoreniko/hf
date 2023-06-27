/**
 * betölt egy polcot az adatbázisból a :shelfid segítségével
 */
const requireOption = require('../requireOption');

module.exports = (objectrepository) => {
    const ShelfModel = requireOption(objectrepository, "ShelfModel");

    return (req, res, next) => {

        ShelfModel.findOne({ _id: req.params.shelfid })
            .then((shelf) => {
                if (!shelf) {
                    throw new Error(`error`);
                }

                res.locals.shelf = shelf;
                return next();
            })
            .catch((err) => next(err));
    };
};
