const expect = require('chai').expect;
const getFood = require('../../../../middleware/food/getFood');

const shelfid = '13';
const foodid = '1';

describe('getFood middleware ', function () {

    it('should set res.locals.food with food object from db', function (done) {
        const mw = getFood({
            FoodModel: {
                findOne: (options) => {
                    expect(options).to.be.eql({_id: foodid, _tartalmaz: shelfid });
                    return Promise.resolve({_id: foodid});
                },
            },
        });

        const resMock = { locals: {shelf: {_id: shelfid}} };
        const nextMock = (err) => {
            expect(err).to.be.eql(undefined);
            expect(resMock.locals.food).to.be.eql({ _id: foodid});
            done();
        };

        mw({params: { foodid: foodid }}, resMock, nextMock);
    });

    it('should call next with error when there is a db problem', function (done) {
        const mw = getFood({
            FoodModel: {
                findOne: (options) => {
                    expect(options).to.be.eql({_id: foodid, _tartalmaz: shelfid });
                    return Promise.reject("dberror");
                },
            },
        });

        const resMock = { locals: {shelf: {_id: shelfid}} };
        const nextMock = (err) => {
            expect(err).to.be.eql("dberror");
            expect(resMock.locals.food).to.be.eql(undefined);
            done();
        };

        mw({params: { foodid: foodid }}, resMock, nextMock);
    });

    it('should call next when no food is found in the db', function (done) {
        const mw = getFood({
            FoodModel: {
                findOne: (options) => {
                    expect(options).to.be.eql({_id: foodid, _tartalmaz: shelfid });
                    return Promise.resolve(null);
                },
            },
        });

        const resMock = { locals: {shelf: {_id: shelfid}} };
        const nextMock = (err) => {
            expect(err.message).to.be.eql(`error`);
            expect(resMock.locals.food).to.be.eql(undefined);
            done();
        };

        mw({params: { foodid: foodid }}, resMock, nextMock);
    });

    it('should call next when shelf is undefined', function (done) {
        const mw = getFood({
            FoodModel: {}
        });

        const resMock = { locals: {} };
        const nextMock = (err) => {
            expect(err).to.be.eql(undefined);
            expect(resMock.locals.food).to.be.eql(undefined);
            done();
        };

        mw({params: { foodid: foodid }}, resMock, nextMock);
    });

});