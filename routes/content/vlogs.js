var express = require("express"),
router = express.Router(),
Video = require("../../models/video");

/**
 * Index route - shows all vlogs
 */
router.get("/vlogs", function(req, res){
    Video.find({videoType: "vlog"}, function(err, allvlogs){
        if(err){
            console.log(err);
        }else{
            res.render("../views/vlogs/index.ejs", {vlogs: allvlogs});
        }
    })
    
});

/**
 * Show route - watch specific vlog
 */
router.get("/vlogs/:id", function(req, res){
    Video.findById(req.params.id, function(err, specificvlog){
        if(err){
            console.log(err);
        }else{
            res.render("../views/vlogs/show.ejs", {vlog: specificvlog});
        }
    });
});

/**
 * Edit route - get to edit page from show page
 */
router.get("/vlogs/:id/edit", isLoggedIn, function(req, res){
    Video.findById(req.params.id, function(err, specificvlog){
        if(err){
            console.log(err);
        }else{
            res.render("../views/vlogs/edit.ejs", {vlog: specificvlog});
        }
    });
});

/**
 * Update vlog
 */
router.put("/vlogs/:id", isLoggedIn, function(req, res){
    Video.findByIdAndUpdate(req.params.id, req.body.vlog, function(err, updatedvlog){
        if(err){
            res.redirect("/vlogs/" + req.params.id + "/edit");
        }else{
            res.redirect("/vlogs/" + req.params.id);
        }
    });
});

/**
 * Delete episode
 */
router.delete("/vlogs/:id", isLoggedIn, function(req, res){
    Video.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/vlogs/:id");
        }else{
            res.redirect("/vlogs");
        }
    });
});

//middleware
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports = router;