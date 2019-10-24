var ObjectId = require('mongodb').ObjectID;
var nodemailer = require('nodemailer');
var Mail = require('../models/mail');

exports.prepareMail = function (to, nameMail, db, callback) {

	console.log('mailtosend:', nameMail); // the adress mail to send

	Mail.findOne({
		mail_placeholder: nameMail
	}, function (err, mail) {

		console.log(Mail)
		if (err) {

			return false;
		}
		var transporter = nodemailer.createTransport({
			service: 'gmail',
			auth: {
				user: 'adobe.testing@puretesting.com',
				pass: '@d0be$#1234'
			}
		});


		var mailOptions = {
			from: 'adobe.testing@puretesting.com',
			to: 'manoj.kumar@puresoftware.com', // should be 'to' in production
			subject: mail.subject,
			text: mail.content,
			html: mail.content
		};

		transporter.sendMail(mailOptions, function (error, info) {
			if (error) {
				console.log('Mail not sent');
				console.log(error)
			} else {
				console.log('Message sent:', mailOptions);
			}
			callback('ok');
		});
	});
}