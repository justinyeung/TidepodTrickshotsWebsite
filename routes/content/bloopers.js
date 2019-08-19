var express = require("express"),
router = express.Router(),
//requires the video schema for episode
Blooper = require("../../models/video");

// index route (shows all the episodes)
router.get("/bloopers", function(req, res){
    //queries database for only episodes
    Blooper.find({videoType: "blooper"}, function(err, allBloopers){
        if(err){
            console.log(err);
        }else{
            // passes through episodes to index.ejs
            res.render("../views/bloopers/index.ejs", {bloopers: allBloopers});
        }
    })
    
});

// show route (watch the episode)
router.get("/bloopers/:id", function(req, res){
    // Find episode and blooper for episode with id
    Blooper.findById(req.params.id, function(err, specificBlooper){
        if(err){
            console.log(err);
        }else{
            res.render("../views/bloopers/shows.ejs", {blooper: specificBlooper});
        }
    });
});

module.exports = router;