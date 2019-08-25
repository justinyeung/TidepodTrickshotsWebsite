var express = require("express"),
router = express.Router(),
Subscriber = require("../models/subscriber");

// root route
router.get("/", function(req, res){
    res.render("../views/landing.ejs")
});

// Sign Up
router.post("/signup", function(req, res){
    var newSubscriber = {email: req.body.email};
    Subscriber.create(newSubscriber, function(err, newlyCreated){
        if(err){
            console.log(err);
        }else{
            console.log(newlyCreated);
            res.redirect("/");
        }
    })
});


module.exports = router;