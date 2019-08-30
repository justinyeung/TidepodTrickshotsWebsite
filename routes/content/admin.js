var express = require("express");
var router = express.Router();
Video = require("../../models/video");
Subscriber = require("../../models/subscriber");

// emails
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const msg = {
    to: 'justingcyeung@gmail.com',
    from: 'Tidepod Trickshots',
    subject: 'Welcome to Tidepod Trickshots',
    text: 'Thank You for Subscribing to Tidepod Trickshots',
    html: '<strong>Testing html field</strong>',
};


// admin page
router.get("/admin", function(req, res){
    res.render("../views/admin/index.ejs");
})

// new route - form to add new video
router.get("/admin/new", isLoggedIn, function(req, res){
    res.render("../views/admin/new.ejs");
});

// create route - post a new video
router.post("/videos", isLoggedIn, function(req, res){
    var video = req.body.video;
    var newVideo = {
        videoType: video.videotype,
        name: video.name,
        season: video.seasonnum,
        number: video.episodenum,
        thumbnail: video.thumbnail,
        description: video.description
    }
    
    Video.create(newVideo, function(err, newlyCreated){
        if(err){
            console.log(err);
        }else{
            // go to page with all episodes
            res.redirect("/episodes");
        }
    });
});

// subscribe
router.post("/signup", function(req, res){
    var newSubscriber = {email: req.body.email};
    Subscriber.create(newSubscriber, function(err, newlyCreated){
        if(err){
            console.log(err);
        }else{
            console.log(newlyCreated);
            res.redirect("/");

            // send email to confirm subscription
            // msg.to = newSubscriber.email;
            // sgMail.send(msg);
        }
    })
});	

// email list
router.get("/admin/email", isLoggedIn, function(req, res){
    Subscriber.find(function(err, allSubscribers){
        if(err){
            console.log(err);
        }else{
            // passes through episodes to index.ejs
            res.render("../views/admin/email.ejs", {subscribers: allSubscribers});
        }
    });
});

//middleware
//add this to parameters if login is required for that route
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports = router;