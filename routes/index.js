var express = require("express"),
router = express.Router();

// root route
router.get("/", function(req, res){
    res.render("../views/landing.ejs")
});

// Log in
router.get("/login", function(req, res){
    res.render("../views/login.ejs");
});

// Sign Up
router.get("/signup", function(req, res){
    res.render("../views/signup.ejs");
});


module.exports = router;