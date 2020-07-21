var express = require("express");
var router = express.Router();
var passport = require("passport");
User = require("../../models/user");
Video = require("../../models/video");
Subscriber = require("../../models/subscriber");

/**
 * Route to admin page
 */
router.get("/admin", function(req, res){
    res.render("../views/admin/index.ejs");
})

/**
 * Route to new video form
 */
router.get("/admin/new", isLoggedIn, function(req, res){
    res.render("../views/admin/new.ejs");
});

/**
 * Route to subscriber list
 */
router.get("/admin/email", isLoggedIn, function(req, res){
    Subscriber.find(function(err, allSubscribers){
        if(err){
            console.log(err);
        }else{
            let nodup = new Set(allSubscribers.map(item => item.email));
            let emails = nodup.values();
            let emailsArr = Array.from(emails);
            res.render("../views/admin/email.ejs", {subscribers: emailsArr});
        }
    });
});

/**
 * Route to register form
 */
router.get("/register", isLoggedIn, function(req, res){
    res.render("../views/admin/register.ejs");
});

/**
 * Add a new video
 */
router.post("/videos", isLoggedIn, function(req, res){
    var video = req.body.video;
    var newVideo = {
        videoType: video.videotype,
        name: video.name,
        season: video.seasonnum,
        number: video.episodenum,
        url: video.url,
        thumbnail: video.thumbnail,
        description: video.description
    }
    
    Video.create(newVideo, function(err, newlyCreated){
        if(err){
            console.log(err);
        }else{
            res.redirect("/episodes");
        }
    });
});

/**
 * Subscribe
 */
router.post("/signup", function(req, res){
    var newSubscriber = {email: req.body.email};
    Subscriber.create(newSubscriber, function(err, newlyCreated){
        if(err){
            console.log(err);
        }else{
            res.redirect("/");
        }
    })
});	

/**
 * Register
 */
router.post("/register", isLoggedIn, function(req, res){
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            console.log(err);
            res.render("../views/admin/index.ejs");
        }
        passport.authenticate("local")(req, res, function(){
            res.redirect("/");
        })
    });
});

//middleware
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports = router;