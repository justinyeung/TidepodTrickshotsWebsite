var express = require("express");
var router = express.Router();
var passport = require("passport");
User = require("../models/user");

// root route
router.get("/", function(req, res){
    res.render("../views/landing.ejs")
});

//show register form
// router.get("/register", function(req, res){
//     res.render("../views/register.ejs");
// });

//handle sign up logic
// router.post("/register", function(req, res){
//     var newUser = new User({username: req.body.username});
//     User.register(newUser, req.body.password, function(err, user){
//         if(err){
//             console.log(err);
//             res.render("../views/register.ejs");
//         }
//         //logs them in after being successful
//         passport.authenticate("local")(req, res, function(){
//             res.redirect("/episodes");
//         })
//     });
// });

// Log in
router.get("/login", function(req, res){
    res.render("../views/admin/login.ejs");
});

//handling login logic
router.post("/login", passport.authenticate("local", 
{
    //middleware
    successRedirect: "/admin",
    failureRedirect: "/login"
}), function(req, res){
    res.send("Login logic");
});

//logic route
router.get("/logout", function(req, res){
    req.logout();
    res.redirect("/");
})

// new route - form to add new video
router.get("/new", isLoggedIn, function(req, res){
    res.render("../views/admin/new.ejs");
});

// admin page
router.get("/admin", function(req, res){
    res.render("../views/admin/index.ejs");
})

//middleware
//add this to parameters if login is required for that route
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports = router;