var json =  require('micro').json;
var gmail = require('email-via-gmail');
var gsjson = require('google-spreadsheet-to-json');

gmail.login('watumullsystem@gmail.com','8lkK3y"b8Jjh3)d');

module.exports = async req => {
	var data = await json(req);
	var post = data.commits[0].message;
	gsjson({
	    spreadsheetId: '19WgngpMZbuGVaFojL4rhq-gJbktP7ivCTnNakPKl_SQ',
	})
	.then(result => {
		result.map(user => {
			var subject = `A2K's BLOG`;
			var body = `
Hey ${user.name} 😉,
	New blog '${post}' has appeared on https://deadcoder0904.github.io/

Regards, deadcoder0904 👻

See you next time, yeah !!
			`;
			var email = user.email;
			gmail.sendEmail(subject, body,email)
		})
	})
	.catch(err => {
	    console.log(err.message);
	    console.log(err.stack);
	});

}

// https://docs.google.com/spreadsheets/d/19WgngpMZbuGVaFojL4rhq-gJbktP7ivCTnNakPKl_SQ/edit?usp=sharing

// https://docs.google.com/spreadsheets/d/19WgngpMZbuGVaFojL4rhq-gJbktP7ivCTnNakPKl_SQ/pubhtml