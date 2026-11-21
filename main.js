const express = require('express');
const logger = require('morgan');
const nodemailer = require('nodemailer');
const ejs = require('ejs');

const port = process.env.PORT || 8080;
const { EMAIL_ADDR, EMAIL_PASS } = process.env;

const app = express();

app.engine('html', ejs.renderFile);
app.set('views', __dirname + '/public');

app.use(logger('combined'));
app.use(express.json({ limit: '32kb' }));
app.use(express.urlencoded({ extended: false, limit: '32kb' }));
app.use(express.static('public'));

const smtpTransport = nodemailer.createTransport({
  service: 'Gmail',
  auth: { user: EMAIL_ADDR, pass: EMAIL_PASS },
});

// Form fields are interpolated into an HTML email body.
const escapeHtml = (value) =>
  String(value ?? '').replace(/[&<>"']/g, (c) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  })[c]);

app.get('/', (req, res) => {
  res.render('index.html');
});

app.post('/contact', (req, res) => {
  const { name, email, message } = req.body ?? {};
  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);

  const mailOptions = {
    from: 'daniel@knownastheway.com',
    to: 'aaron@knownastheway.com',
    replyTo: typeof email === 'string' ? email : undefined,
    subject: 'Website contact from: ' + String(name ?? '').replace(/[\r\n]/g, ' '),
    html: `<!DOCTYPE html><html><body><div><h3>${safeName} (${safeEmail}) filled out the contact us form at knownastheway.com: </h3><p>${escapeHtml(message)}</p></div></body></html>`,
  };

  smtpTransport.sendMail(mailOptions, (err) => {
    if (err) {
      console.error(err);
      res.status(500).send('There was a problem sending your message.');
      return;
    }
    res.send("<div class='alert alert-success'><button type='button' class='close' data-dismiss='alert'>&times;</button><strong>Sweet!</strong> Thanks for reaching out! We received your email and will respond as soon as possible.</div>");
  });
});

app.listen(port, () => {
  console.log('listening on port ' + port);
});
