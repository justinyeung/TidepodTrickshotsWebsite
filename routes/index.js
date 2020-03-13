var express = require("express");
var router = express.Router();
var passport = require("passport");
User = require("../models/user");

// root route
router.get("/", function(req, res){
    res.render("../views/landing.ejs")
});

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

// unsubscribe page
router.get("/unsubscribe", function(req, res){
    res.render("../views/unsubscribe.ejs");
})

// unsubscribe form
router.delete("/unsubscribe", function(req, res){
    Subscriber.deleteMany({email: req.body.email}, function(err){
        if(err){
            console.log(err);
        }else{
            res.redirect("/");
        }
    })
})

// Coronavirus page
router.get("/covid19update", function(req, res){
    res.render("../views/corona.ejs");
})

// follow us page
router.get("/followus", function(req, res){
    res.render("../views/followus.ejs");
})

// faq page
router.get("/faq", function(req, res){
    res.render("../views/faq.ejs");
})

// learn about us page
router.get("/learnaboutus", function(req, res){
    res.render("../views/learnaboutus.ejs");
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