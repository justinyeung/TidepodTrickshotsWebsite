var express = require("express"),
router = express.Router(),
Vlog = require("../../models/video.js");

// index route
app.get("/vlogs", function(req, res){
    Vlog.find({videoType: "vlog"}, function(err, allVlogs){
        if(err){
            console.log(err);
        }else{
            res.render("../views/vlogs/index.ejs", {vlogs: allVlogs});
        }
    });
});

// show route
app.get("/vlogs/:id", function(req, res){
    Vlog.findById(req.params.id, function(err, specificVlog){
        if(err){
            console.log(err);
        }else{
            res.render("../views/vlogs/show.ejs", {vlog: specificVlog});
        }
    });
});

module.exports = router;