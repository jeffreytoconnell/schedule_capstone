const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = require('chai').assert;
const should = require('chai').should();
const expect = chai.expect;
const request = require('request');
const app = require('../server');

chai.use(chaiHttp);

describe('LOCAL HOST / LOGIN', function () {
    it('should respond to localhost', function () {
        chai.request(app).get('/'),
            function (err, res, body) {
                expect(res.status).equal(200);
            }
    });
});;

describe('COURSES / PROFILE', function () {
    it('checking courses / profile', function () {
        chai.request(app).get('../profilesss'),
            function (error, response, body) {
                expect(res.status).to.equal(200);
            };
    });
});

describe('SIGNUP', function () {
    it('checking signup', function () {
        chai.request(app),
            function (error, response, body) {
                expect(res.status).to.equal(200);
            }
    });
});
