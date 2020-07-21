var express = require("express");
var router = express.Router();
var passport = require("passport");
User = require("../models/user");

/**
 * Route to Landing page
 */
router.get("/", function (req, res) {
    res.render("../views/landing.ejs");
  });
  
  /**
   * Route to Login page
   */
  router.get("/login", function (req, res) {
    res.render("../views/admin/login.ejs");
  });
  
  /**
   * Route to unsubscribe page
   */
  router.get("/unsubscribe", function (req, res) {
    res.render("../views/unsubscribe.ejs");
  });
  
  /**
   * Route to coronavirus page
   */
  router.get("/covid19update", function (req, res) {
    res.render("../views/corona.ejs");
  });
  
  /**
   * Route to follow us page
   */
  router.get("/followus", function (req, res) {
    res.render("../views/followus.ejs");
  });
  
  /**
   * Route to faq us page
   */
  router.get("/faq", function (req, res) {
    res.render("../views/faq.ejs");
  });
  
  /**
   * Route to learn about us page
   */
  router.get("/learnaboutus", function (req, res) {
    res.render("../views/learnaboutus.ejs");
  });

/**
 * Log in
 */
router.post(
  "/login",
  passport.authenticate("local", {
    //middleware
    successRedirect: "/admin",
    failureRedirect: "/login",
  }),
  function (req, res) {
    res.send("Login logic");
  }
);

/**
 * Logout
 */
router.get("/logout", function (req, res) {
  req.logout();
  res.redirect("/");
});

/**
 * Unsubscribe
 */
router.delete("/unsubscribe", function (req, res) {
  Subscriber.deleteMany({ email: req.body.email }, function (err) {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/");
    }
  });
});

module.exports = router;
