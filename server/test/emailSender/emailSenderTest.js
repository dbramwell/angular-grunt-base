var chai = require('chai');
var expect = chai.expect;
var nodemailer = require('nodemailer')
var mockTransport = require('nodemailer-mock-transport');
var EmailSender = require('./../../src/emailSender/emailSender');

describe('EmailSender', function() {

	before(function() {
		process.env.EMAIL = 'test@test.com';
	});

	it('sendEmail should send correct mail', function() {
		var emailSender = new EmailSender();
		var transport = mockTransport({
			foo: 'bar'
		});
		var transporter = nodemailer.createTransport(transport);
		emailSender.transporter = transporter;
		emailSender.sendEmail('David', 'david@gmail.com', 'Content', {
			end: function() {},
			status: function() {}
		});
		expect(transport.sentMail.length).to.equal(1);
		expect(transport.sentMail[0].data.to).to.equal('test@test.com');
		expect(transport.sentMail[0].data.from).to.equal('david@gmail.com');
		expect(transport.sentMail[0].message.content).to.equal(
			'<h2>Name:</h2>' +
			'<p>David</p><br>' + 
			'<h2>Email:</h2>' + 
			'<p>david@gmail.com</p><br>' +
			'<h2>Content:</h2><p>Content</p>');
		expect(transport.sentMail[0].data.subject).to.equal('Website contact from david@gmail.com');
	});
});