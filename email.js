// express
var express = require("express");
var router = express.Router();

// sendgrid
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// mongoose
mongoose = require("mongoose");
Subscriber = require("./models/subscriber");

// The email message
const msg = {
    to: 'justingcyeung@gmail.com',
    from: 'tidepodtrickshots@example.org',
    subject: 'New Episode of Tidepod Trickshots',
    text: 'Testing text field',
    html: '<strong>Testing html field</strong>',
};

// connect to mongoose
var url = process.env.DATABASEURL || "mongodb://localhost:27017/tidepodtrickshots"
console.log(url);
mongoose.connect(url, {useNewUrlParser: true});

// find all subscribers
try{
    Subscriber.find(function(err, allSubscribers){
        if(err){
            console.log(err);
        }else{
            let nodup = new Set(allSubscribers.map(item => item.email));
            let emails = nodup.values();
            let emailsArr = Array.from(emails);
            
            // loop through array with no duplicates
            
            msg.to = emailsArr;
            sgMail.sendMultiple(msg);
        }
    });
}catch(err){
    console.log(err);
}


