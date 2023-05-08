var express = require('express'),
	path = require('path'),
	logger = require('morgan'),
	cookieParser = require('cookie-parser'),
	methodOverride = require('method-override'),
	bodyParser = require('body-parser'),
    nodemailer = require('nodemailer');

var static = express.static;

var app = express(logger());



var port = process.env.PORT || 8080;
var EMAIL_PASS = process.env.EMAIL_PASS;
var EMAIL_ADDR = process.env.EMAIL_ADDR;
var oneDay = 86400000;

app.engine('html', require('ejs').renderFile);
app.engine('pug', require('pug').__express);
app.set('views', __dirname + '/public');

app.use(cookieParser('top secret'));
app.use(bodyParser());
app.use(express.json())
app.use(methodOverride());



app.use('/css', static('public/css', {
    //maxAge: oneDay
}));
app.use('/images', static('public/images', {
    //maxAge: oneDay
}));
app.use('/scripts', static('public/scripts', {
    //maxAge: oneDay
}));
app.use(static('public', {
    //maxAge: oneDay
}));


var smtpTransport = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: EMAIL_ADDR,
        pass: EMAIL_PASS
    }
});


app.get('/',
function(req, res)
{
	res.render('index.html');
});



app.post('/contact', function(req, res) {
    //if (req.param('email') && req.param('name')) {
        var mailoptions = {
            from: 'daniel@knownastheway.com',
            to: 'aaron@knownastheway.com',
            replyTo: req.body.email,
            generateTextFromHTML:true,
            subject: 'Website contact from: ' + req.body.name,
            html: '<!DOCTYPE html><html><body><div><h3>'+req.body.name +' ('+ req.body.email +') filled out the contact us form at knownastheway.com: </h3><p>'+req.body.message+'</p></div></body></html>'
        }

        smtpTransport.sendMail(mailoptions, function(err, response) {
            if (err) {
                console.log(err);
                res.send('There was a problem with the beta registration.');
            } else {
                res.send("<div class='alert alert-success'><button type='button' class='close' data-dismiss='alert'>&times;</button><strong>Sweet!</strong> Thanks for reaching out! We received your email and will respond as soon as possible.</div>");
            }
        });
    //}
});





if (port)
{
	app.listen(port);
	console.log('listening on localhost:' + port);
}
else
{
	app.listen(port);
	console.log('listening on localhost:8080');
}
