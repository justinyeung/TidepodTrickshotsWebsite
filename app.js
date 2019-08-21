// npm init
// npm install express ejs body-parser --save
// npm install mongoose --save
// npm install express-session --save
// npm install passport passport-local passport-local-mongoose --save

var express = require("express"),
app = express(),
bodyParser = require("body-parser"),
mongoose = require("mongoose"),
passport = require("passport"),
LocalStrategy = require("passport-local");

// RESTFUL ROUTES
//requiring routes and models
var episodesRoutes = require("./routes/content/episodes"),
vlogsRoutes = require("./routes/content/vlogs"),
bloopersRoutes = require("./routes/content/bloopers"),
indexRoutes = require("./routes/index"),
User = require("./models/user");

//use body parser
app.use(bodyParser.urlencoded({extended: true}));

// connect to mongoose database
var url = process.env.DATABASEURL || "mongodb://localhost:27017/tidepodtrickshots"
mongoose.connect(url, {useNewUrlParser: true});

//connect the stylesheet
app.use(express.static(__dirname + "/public")); // __dirname gives us the directory path we are in

//Passport configuration
app.use(require("express-session")({
    secret: "Anything I want",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate())); //gives it the local strategy we imported
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//pass user info to every route
//middleware
app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    next();
});

//using routes
app.use(episodesRoutes);
app.use(vlogsRoutes);
app.use(bloopersRoutes);
app.use(indexRoutes);

// Starts the server
var port = process.env.PORT || 3000
app.listen(port, function(){
    console.log("Tidepod Trickshots server is running on " + port);
});