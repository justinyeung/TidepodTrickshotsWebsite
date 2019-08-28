var express = require("express"),
router = express.Router(),
//requires the video schema for vlog
Video = require("../../models/video");

// index route (shows all the vlogs)
router.get("/vlogs", function(req, res){
    //queries database for only vlogs
    Video.find({videoType: "vlog"}, function(err, allvlogs){
        if(err){
            console.log(err);
        }else{
            // passes through vlogs to index.ejs
            res.render("../views/vlogs/index.ejs", {vlogs: allvlogs});
        }
    })
    
});

// show route (watch the vlog)
router.get("/vlogs/:id", function(req, res){
    Video.findById(req.params.id, function(err, specificvlog){
        if(err){
            console.log(err);
        }else{
            res.render("../views/vlogs/show.ejs", {vlog: specificvlog});
        }
    });
});


// Edit route - get to edit page from show page
router.get("/vlogs/:id/edit", isLoggedIn, function(req, res){
    Video.findById(req.params.id, function(err, specificvlog){
        if(err){
            console.log(err);
        }else{
            res.render("../views/vlogs/edit.ejs", {vlog: specificvlog});
        }
    });
});

// Update route
router.put("/vlogs/:id", isLoggedIn, function(req, res){
    // find and update the correct city
    Video.findByIdAndUpdate(req.params.id, req.body.vlog, function(err, updatedvlog){
        if(err){
            res.redirect("/vlogs/" + req.params.id + "/edit");
        }else{
            res.redirect("/vlogs/" + req.params.id);
        }
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