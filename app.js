// npm init
// npm install express ejs body-parser --save
// npm install mongoose --save
// npm install express-session --save

var express = require("express"),
app = express(),
bodyParser = require("body-parser"),
mongoose = require("mongoose");

// RESTFUL ROUTES
//requiring routes
var episodesRoutes = require("./routes/content/episodes"),
vlogsRoutes = require("./routes/content/vlogs"),
bloopersRoutes = require("./routes/content/bloopers"),
indexRoutes = require("./routes/index");

//use body parser
app.use(bodyParser.urlencoded({extended: true}));

// connect to mongoose database
mongoose.connect("mongodb://localhost:27017/tidepodtrickshots", {useNewUrlParser: true});

//seeding the database
var seedDB = require("./seed");
seedDB();

//connect the stylesheet
app.use(express.static(__dirname + "/public")); // __dirname gives us the directory path we are in

//using routes
app.use(episodesRoutes);
app.use(vlogsRoutes);
app.use(bloopersRoutes);
app.use(indexRoutes);

// Starts the server
app.listen(3000, function(){
    console.log("Tidepod Trickshots server is running");
});