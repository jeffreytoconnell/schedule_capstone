const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = require('chai').assert;
const app = require('../server');
const should = chai.should();
const expect = require("chai").expect;

describe('homepage', function() {
    it('should respond to GET', function() {
        request.get('http://localhost:'+port),
        function(error,reponse, body){
            expect(res.status).to.equal(200);
            console.log(body);
            done();
        }
    })
})

