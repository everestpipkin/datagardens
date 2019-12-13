var request = require("request");

function send_email(sender, receipient, title, body) {
  var options = {
    method: 'POST',
    url: 'https://rapidprod-sendgrid-v1.p.rapidapi.com/mail/send',
    headers: {
      'x-rapidapi-host': 'rapidprod-sendgrid-v1.p.rapidapi.com',
      'x-rapidapi-key': '23138c0c70msh1d7cde5d08517d1p1685fcjsn9240ef068083',
      'content-type': 'application/json',
      accept: 'application/json'
    },
    body: {
      personalizations: [{to: [{email: receipient}], subject: title}],
      from: {email: sender},
      content: [{type: 'text/plain', value: body}]
    },
    json: true
  };

  request(options, function (error, response, body) {
    if (error) throw new Error(error);
    else console.log('email sent.');
  });
}

function gen_email_addr(fullname) {
  var name = fullname.split(' ');
  var emails;
  if (name.length < 2) {
    emails = [name[0] + gen_email_postfix(name[0])];
  } else if (name.length == 2) {
    emails = [
      name[0] + name[1] + gen_email_postfix(name[1]),
      name[0].toLowerCase() + '.' + name[1].toLowerCase() + gen_email_postfix(name[1])
    ];
  } else {
    emails = [
      name[0] + name[1] + name[2] + gen_email_postfix(name[2]),
      (name[0]+'.'+name[1]+'.'+name[2]).toLowerCase() + gen_email_postfix(name[2]),
      name[0].toLowerCase() + '.' + name[2].toLowerCase() + gen_email_postfix(name[2]),
      name[0]+String(name[1][0])+name[2]+gen_email_postfix(name[2])
    ];
  }
  var ind = Math.floor(Math.random() * emails.length);
  return emails[ind];
}

function gen_email_postfix(lastname) {
  return '@' + lastname + '.org';
}

function gen_title(fullname) {
  var name = fullname.split(' ');
  for (var i=0; i<name.length; i++) {
    var n = name[i];
    name[i] = n[0].toUpperCase() + n.slice(1, n.length);
  }
  return 'Greetings from ' + name.join(' ');
}

function gen_body(body) {
  return 'Remember: ' + body;
}

function send_quote(receipient) {
  var options = {
    method: 'GET',
    url: 'https://andruxnet-random-famous-quotes.p.rapidapi.com/',
    qs: {cat: 'famous'},
    headers: {
      'x-rapidapi-host': 'andruxnet-random-famous-quotes.p.rapidapi.com',
      'x-rapidapi-key': '23138c0c70msh1d7cde5d08517d1p1685fcjsn9240ef068083'
    }
  };

  request(options, function (error, response, body) {
    if (error) throw new Error(error);
    else {
      // console.log(body);
      var b = JSON.parse(body)[0]['quote'];
      var n = JSON.parse(body)[0]['author'];
      send_email(gen_email_addr(n), receipient, gen_title(n), gen_body(b));
    }
  });
}

if (process.argv.length > 2)
  send_quote(process.argv[2]+'@andrew.cmu.edu');
// console.log(process.argv);
