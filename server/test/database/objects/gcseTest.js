var expect = require('chai').expect;
 
var GCSE = require('../../../src/database/objects/gcse');
 
describe('gcse', function() {
    it('should be invalid if subject is empty', function(done) {
        var g = new GCSE({grade: 'A'});
 
        g.validate(function(err) {
            expect(err.errors.subject.name).to.exist;
            done();
        });
    });
});

describe('gcse', function() {
    it('should be invalid if grade is empty', function(done) {
        var g = new GCSE({subject: 'Maths'});
 
        g.validate(function(err) {
            expect(err.errors.grade.name).to.exist;
            done();
        });
    });
});