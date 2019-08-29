const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// The email message
const msg = {
  to: 'justingcyeung@gmail.com',
  from: 'test@example.com',
  subject: 'Sending with Twilio SendGrid is Fun',
  text: 'and easy to do anywhere, even with Node.js',
  html: '<strong>and easy to do anywhere, even with Node.js</strong>',
};

// array of email addresses
var emails = ['justingcyeung@gmail.com','yeung_justin@rogers.com','yeungj14@mcmaster.ca'];

// Loop through emails array to send emails
emails.forEach(email => {
    msg.to = email;
    sgMail.send(msg);
});
