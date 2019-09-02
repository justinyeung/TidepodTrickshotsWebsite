var express = require("express");
var router = express.Router();
User = require("../../models/user");

// admin page
router.get("/admin", function(req, res){
    res.render("../views/admin/index.ejs");
})

// new route - form to add new video
router.get("/new", isLoggedIn, function(req, res){
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
    })
});

//show register form
router.get("/register", isLoggedIn, function(req, res){
    res.render("../views/admin/register.ejs");
});

// Register
router.post("/register", isLoggedIn, function(req, res){
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            console.log(err);
            res.render("../views/admin/index.ejs");
        }
        //logs them in after being successful
        passport.authenticate("local")(req, res, function(){
            res.redirect("/");
        })
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