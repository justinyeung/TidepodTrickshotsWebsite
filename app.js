var express = require("express"),
app = express(),
bodyParser = require("body-parser"),
mongoose = require("mongoose"),
passport = require("passport"),
LocalStrategy = require("passport-local"),
methodOverride = require("method-override");

var episodesRoutes = require("./routes/content/episodes"),
vlogsRoutes = require("./routes/content/vlogs"),
bloopersRoutes = require("./routes/content/bloopers"),
indexRoutes = require("./routes/index"),
adminRoutes = require("./routes/content/admin"),
User = require("./models/user");

app.use(bodyParser.urlencoded({extended: true}));

var url = process.env.DATABASEURL || "mongodb://localhost:27017/tidepodtrickshots"
console.log(url);
mongoose.connect(url, {useNewUrlParser: true});

// var seedDB = require("./seed");
// seedDB();

app.use(express.static(__dirname + "/public"));

app.use(methodOverride("_method"));

app.use(require("express-session")({
    secret: "Anything I want",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    next();
});

app.use(episodesRoutes);
app.use(vlogsRoutes);
app.use(bloopersRoutes);
app.use(indexRoutes);
app.use(adminRoutes);

var port = process.env.PORT || 5000
app.listen(port, function(){
    console.log("Tidepod Trickshots server is running on " + port);
});