var nodemailer = require('nodemailer');

function EmailSender() {
	this.transporter = nodemailer.createTransport({
		service: 'Gmail',
		auth: {
			XOAuth2: {
				user: process.env.EMAIL,
				clientId: process.env.MY_CLIENT_ID,
				clientSecret: process.env.MY_CLIENT_SECRET,
				refreshToken: process.env.MY_REFRESH_TOKEN,
				accessToken: process.env.MY_ACCESS_TOKEN
			}
		}
	});
}

function generateContent(name, email, content) {
	return '<h2>Name:</h2>' +
		'<p>' + name + '</p><br>' +
		'<h2>Email:</h2>' +
		'<p>' + email + '</p><br>' +
		'<h2>Content:</h2>' +
		'<p>' + content + '</p>'
}

function getMailOptions(name, email, content) {
	return {
		from: process.env.EMAIL,
		to: process.env.EMAIL,
		subject: 'Website contact from ' + email,
		html: generateContent(name, email, content)
	};
}

EmailSender.prototype.sendEmail = function(name, email, content, res) {
	this.transporter.sendMail(getMailOptions(name, email, content), function(error, info) {
		if (error) {
			console.log(error);
			res.status(500).end();
		} else {
			var info = info ? info : {
				response: ''
			};
			console.log('Message sent: ' + info.response);
			res.end()
		};
	});
};

module.exports = EmailSender;