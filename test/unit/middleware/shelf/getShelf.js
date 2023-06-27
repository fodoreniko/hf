const expect = require('chai').expect;
const getShelf = require('../../../../middleware/shelf/getShelf');

const shelfid = '13';

describe('getShelf middleware ', function () {

    it('should set res.locals.shelf with a shelf object from db', function (done) {
        const mw = getShelf({
            ShelfModel: {
                findOne: (options) => {
                    expect(options).to.be.eql({ _id: shelfid });
                    return Promise.resolve({_id: shelfid});
                },
            },
        });

        const resMock = { locals: {} };
        const nextMock = (err) => {
            expect(err).to.be.eql(undefined);
            expect(resMock.locals.shelf).to.be.eql({ _id: shelfid});
            done();
        };

        mw({params: { shelfid: shelfid }}, resMock, nextMock);
    });


    it('should call next with error when there is a db problem', function (done) {
        const mw = getShelf({
            ShelfModel: {
                findOne: (options) => {
                    expect(options).to.be.eql({ _id: shelfid });
                    return Promise.reject("dberror");
                },
            },
        });

        const resMock = { locals: {} };
        const nextMock = (err) => {
            expect(err).to.be.eql("dberror");
            expect(resMock.locals.shelf).to.be.eql(undefined);
            done();
        };

        mw({params: { shelfid: shelfid }}, resMock, nextMock);
    });

    it('should call next when no shelf is found in the db', function (done) {
        const mw = getShelf({
            ShelfModel: {
                findOne: (options) => {
                    expect(options).to.be.eql({ _id: shelfid });
                    return Promise.resolve(null);
                },
            },
        });

        const resMock = { locals: {} };
        const nextMock = (err) => {
            expect(err.message).to.be.eql(`error`);
            expect(resMock.locals.shelf).to.be.eql(undefined);
            done();
        };

        mw({params: { shelfid: shelfid }}, resMock, nextMock);
    });

});