const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = require('chai').assert;
const {app} = require('../server');
const should = chai.should();
const expect = require("chai").expect;
const request = require('request');

chai.use(chaiHttp);

describe('LOCAL HOST / LOGIN', function () {
    it('should respond to localhost', function () {
        request.get(app),
            function (error, reponse, body) {
                expect(res.status).to.equal(200);
                done();
            };
    });
});

describe('COURSES / PROFILE', function () {
    it('checking courses / profile', function () {
        request.get('http://localhost:8080/profile'),
            function (error, reponse, body) {
                expect(res.status).to.equal(200);
                done();
            };
    });
});

describe('SIGNUP', function () {
    it('checking signup', function () {
        request.get('http://localhost:8080/signup'),
            function (error, reponse, body) {
                expect(res.status).to.equal(200);
                done();
            };
    });
});


