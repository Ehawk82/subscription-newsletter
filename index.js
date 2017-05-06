var json =  require('micro').json;
var gmail = require('email-via-gmail');
var axios = require('axios');

gmail.login('watumullsystem@gmail.com','8lkK3y"b8Jjh3)d');

module.exports = async req => {
	var data = await json(req);
	var post = data.commits[0].message;
	axios.get(`https://spreadsheets.google.com/feeds/cells/19WgngpMZbuGVaFojL4rhq-gJbktP7ivCTnNakPKl_SQ/1/public/values?alt=json`)
		.then(res => {
			var result = res.data.feed.entry;
			for(var i = 4; i < result.length; i += 3) {
				var name = result[i].content["$t"];
				var email = result[i+1].content["$t"];
				var subject = `A2K's BLOG`;
				var body = `
Hey ${name} 😉,
	New blog '${post}' has appeared on https://deadcoder0904.github.io/

Regards, deadcoder0904 👻

See you next time, yeah !!
				`;
				gmail.sendEmail(subject, body,email);
			}
		});
}

// https://docs.google.com/spreadsheets/d/19WgngpMZbuGVaFojL4rhq-gJbktP7ivCTnNakPKl_SQ/edit?usp=sharing