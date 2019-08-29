var express = require("express"),
router = express.Router(),
//requires the video schema for blooper
Video = require("../../models/video");

// index route (shows all the bloopers)
router.get("/bloopers", function(req, res){
    //queries database for only bloopers
    Video.find({videoType: "blooper"}, function(err, allBloopers){
        if(err){
            console.log(err);
        }else{
            // passes through bloopers to index.ejs
            res.render("../views/bloopers/index.ejs", {bloopers: allBloopers});
        }
    })
    
});

// show route (watch the blooper)
router.get("/bloopers/:id", function(req, res){
    Video.findById(req.params.id, function(err, specificBlooper){
        if(err){
            console.log(err);
        }else{
            res.render("../views/bloopers/show.ejs", {blooper: specificBlooper});
        }
    });
});

// Edit route - get to edit page from show page
router.get("/bloopers/:id/edit", isLoggedIn, function(req, res){
    Video.findById(req.params.id, function(err, specificblooper){
        if(err){
            console.log(err);
        }else{
            res.render("../views/bloopers/edit.ejs", {blooper: specificblooper});
        }
    });
});

// Update route
router.put("/bloopers/:id", isLoggedIn, function(req, res){
    // find and update the correct city
    Video.findByIdAndUpdate(req.params.id, req.body.blooper, function(err, updatedblooper){
        if(err){
            res.redirect("/bloopers/" + req.params.id + "/edit");
        }else{
            res.redirect("/bloopers/" + req.params.id);
        }
    });
});

// Destroy route
router.delete("/bloopers/:id", isLoggedIn, function(req, res){
    Video.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/bloopers/:id");
        }else{
            res.redirect("/bloopers");
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