const Concert = require('../../models/concert.model');
const expect = require('chai').expect;
const mongoose = require('mongoose');

describe('Concert model', () => {
    it('should throw an error if any arg is missing', () => {
        const cases = [
            {
                genre: 'Rock',
                price: 10,
                day: '613caf3f13ab4dcbb53ccdfedd48a70b',
                image: 'concert.png'
            },{
                performer: 'Meredith',
                price: 10,
                day: '613caf3f13ab4dcbb53ccdfedd48a70b',
                image: 'concert.png'
            },{
                performer: 'Meredith',
                genre: 'Rock',
                day: '613caf3f13ab4dcbb53ccdfedd48a70b',
                image: 'concert.png'
            },{
                performer: 'Meredith',
                genre: 'Rock',
                price: 10,
                day: '613caf3f13ab4dcbb53ccdfedd48a70b'
            },{
                performer: 'Meredith',
                genre: 'Rock',
                price: 10,
                image: 'concert.png'
            },
        ];

        for (let prop of cases) {
            const con = new Concert(prop);

            con.validate(err => {
                expect(err.errors).to.exist;
            });
        }
    });

    it('should throw an error if "performer" is not a string', () => {
        const cases = [{}, []];
        for(let performer of cases) {
            const con = new Concert({
                performer, 
                genre: 'Rock', 
                price: 10, 
                day: '613caf3f13ab4dcbb53ccdfedd48a70b',
                image: 'concert.png',
            });

            con.validate(err => {
                expect(err.errors.performer).to.exist;
            });
        }
    });

    it('should throw an error if "genre" is not a string', () => {
        const cases = [{}, []];
        for(let genre of cases) {
            const con = new Concert({
                performer = 'Meredith', 
                genre, 
                price: 10, 
                day: '613caf3f13ab4dcbb53ccdfedd48a70b',
                image: 'concert.png',
            });

            con.validate(err => {
                expect(err.errors.genre).to.exist;
            });
        }
    });

    it('should throw an error if "day" is not a string', () => {
        const cases = [{}, []];
        for(let day of cases) {
            const con = new Concert({
                performer: 'Meredith', 
                genre: 'Rock', 
                price: 10, 
                day,
                image: 'concert.png',
            });

            con.validate(err => {
                expect(err.errors.day).to.exist;
            });
        }
    });

    it('should throw an error if "image" is not a string', () => {
        const cases = [{}, []];
        for(let image of cases) {
            const con = new Concert({
                performer: 'Meredith', 
                genre: 'Rock', 
                price: 10, 
                day: '613caf3f13ab4dcbb53ccdfedd48a70b',
                image,
            });

            con.validate(err => {
                expect(err.errors.image).to.exist;
            });
        }
    });

    it('should throw an error if "price" is not a number', () => {
        const cases = [{}, [], abc];
        for(let price of cases) {
            const con = new Concert({
                performer: 'Meredith', 
                genre: 'Rock', 
                price, 
                day: '613caf3f13ab4dcbb53ccdfedd48a70b',
                image: 'concert.png',
            });

            con.validate(err => {
                expect(err.errors.price).to.exist;
            });
        }
    });

    it('should not throw an error if all properties are correct', () => {
        const con = new Concert({
            performer: 'Meredith', 
            genre: 'Rock', 
            price: 10, 
            day: '613caf3f13ab4dcbb53ccdfedd48a70b',
            image: 'concert.png',
        });

        con.validate(err => {
            expect(err).to.not.exist;
        });
    });
});