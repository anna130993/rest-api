const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../server');
const Concert = require('../../models/concert.model');
const Seat = require('../../models/seat.model');
const Day = require('../../models/day.model');

chai.use(chaiHttp);

const expect = chai.expect;
const request = chai.request;

describe('GET /api/concerts', () => {
    before(async () => {
        const dayOne = new Day({ number: 2 });
        const savedDay = await dayOne.save();
        dayId = savedDay._id;

        const seatOne = new Seat({ day: dayId, seat: 7, client: 'Meredith Grey', email: 'meredithgrey@example.com'});
        await seatOne.save();

        const conOne = new Concert({ _id: '40a1a657ea544f8ba63205435862db34', performer: 'TheBand', genre: 'TheGenre', price: 10, day: dayId, image: 'concert.png'});
        await conOne.save();

        const conTwo = new Concert({ _id: '40a1a657ea544f8ba63205435862db35', performer: 'TheBand2', genre: 'TheGenre', price: 10, day: dayId, image: 'concert.png'});
        await conTwo.save();
    });

    after(async () => {
        await Concert.deleteMany();
        await Seat.deleteMany();
        await Day.deleteMany();
    });

    it('/ should return all concerts', async () => {
        const res = await request(server).get('./api/concerts');
        expect(res.status).to.be.equal(200);
        expect(res.body).to.be.an('array');
        expect(res.body.length).to.be.equal(2);
    });

    it('/:id should return a concert by :id', async () => {
        const res = await request(server).get('./api/concerts/40a1a657ea544f8ba63205435862db34');
        expect(res.status).to.be.equal(200);
        expect(res.body).to.be.an('object');
        expect(res.body.performer).to.be.equal('TheBand');
    });

    it('/ should return concerts with property showing amount of available tickets', async () => {
        const res = await request(server).get('./api/concerts');
        expect(res.body).to.be.an('array');
        for (concert of res.body) {
            expect(concert.tickets).to.be.a('number');
            expect(concert.tickets).to.be.equal(49);
        }
    });
});