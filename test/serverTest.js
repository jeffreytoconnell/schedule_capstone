const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = require('chai').assert;
const should = chai.should();
const expect = require("chai").expect;
const request = require('request');
const app = require('../server');

chai.use(chaiHttp);

describe('LOCAL HOST / LOGIN', function () {
    it('should respond to localhost', function (done) {
        chai.request(app).get('/')
        .end(function (err, res) {
            res.should.have.status(200)
            done();
        })
        //,
          //  function (error, reponse, body) {
            //    expect(res.status).to.equal(404);
              //  done();
           // };
    });
});

describe('COURSES / PROFILE', function () {
    it('checking courses / profile', function () {
        chai.request(app),
            function (error, reponse, body) {
                expect(res.status).to.equal(200);
                done();
            };
    });
});

describe('SIGNUP', function () {
    it('checking signup', function () {
        chai.request(app),
            function (error, reponse, body) {
                expect(res.status).to.equal(200);
                done();
            };
    });
});
