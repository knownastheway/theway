var express = require('express'),
	path = require('path'),
	connect = require('connect'),
	//piler = require('piler'),
    nodemailer = require('nodemailer');

var app = express(express.logger());

var port = process.env.PORT || 8080;
var oneDay = 86400000;

app.engine('html', require('ejs').renderFile);
app.engine('jade', require('jade').__express);
app.set('views', __dirname + '/public');

app.use(express.cookieParser('top secret'));

app.use(connect.urlencoded())
app.use(connect.json())

app.use(express.methodOverride());



app.use('/css', express.static(__dirname, '/public/css', {
    //maxAge: oneDay
}));
app.use('/images', express.static(__dirname, '/public/images', {
    //maxAge: oneDay
}));
app.use('/scripts', express.static(__dirname, '/public/scripts', {
    //maxAge: oneDay
}));
app.use(express.static(__dirname + '/public', {
    //maxAge: oneDay
}));


var smtpTransport = nodemailer.createTransport("SMTP",{
    service: "Gmail",
    auth: {
        user: "daniel@knownastheway.com",
        pass: "cr@t0rz!"
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





if (process.argv[2])
{
	app.listen(process.argv[2]);
	console.log('listening on localhost:' + process.argv[2]);
}
else
{
	app.listen(port);
	console.log('listening on localhost:8080');
}