const render = require('../middleware/render');

const getShelfList = require('../middleware/shelf/getShelfList');
const getShelf = require('../middleware/shelf/getShelf');
const saveShelf = require('../middleware/shelf/saveShelf');
const delShelf = require('../middleware/shelf/delShelf');

const getFoodList = require('../middleware/food/getFoodList');
const getFood = require('../middleware/food/getFood');
const saveFood = require('../middleware/food/saveFood');
const delFood = require('../middleware/food/delFood');

const ShelfModel = require('../models/shelf');
const FoodModel = require('../models/food');

module.exports = function(app) {
    const objRepo = {
        ShelfModel: ShelfModel,
        FoodModel: FoodModel
    };

    app.use('/shelf/new',
        saveShelf(objRepo),
        render(objRepo, 'shelfedit')
    );

    app.use('/shelf/edit/:shelfid',
        getShelf(objRepo),
        saveShelf(objRepo),
        render(objRepo, 'shelfedit')
    );

    app.get('/shelf/del/:shelfid',
        getShelf(objRepo),
        delShelf(objRepo),
    );

    app.get('/food/:shelfid/:foodid/del',
        getShelf(objRepo),
        getFood(objRepo),
        delFood(objRepo),
    );

    app.use('/food/:shelfid/new',
        getShelf(objRepo),
        saveFood(objRepo),
        render(objRepo, 'foodedit')
    );

    app.use('/food/:shelfid/:foodid',
        getShelf(objRepo),
        getFood(objRepo),
        saveFood(objRepo),
        render(objRepo, 'foodedit')
    );

    app.get('/food/:shelfid',
        getShelf(objRepo),
        getFoodList(objRepo),
        render(objRepo, 'food')
    );

    app.use('/',
        getShelfList(objRepo),
        render(objRepo, 'index')
    );

};

