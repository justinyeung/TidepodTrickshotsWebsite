var express = require("express"),
router = express.Router(),
//requires the video schema for episode
Video = require("../../models/video");

// index route (shows all the episodes)
router.get("/episodes", function(req, res){
    //queries database for only episodes
    Video.find({videoType: "episode"}, function(err, allEpisodes){
        if(err){
            console.log(err);
        }else{
            // passes through episodes to index.ejs
            res.render("../views/episodes/index.ejs", {episodes: allEpisodes});
        }
    })
    
});

// show route (watch the episode)
router.get("/episodes/:id", function(req, res){
    // Find episode and blooper for episode with id
    Video.findById(req.params.id).populate("bloopers").exec(function(err, specificEpisode){
        if(err){
            console.log(err);
        }else{
            res.render("../views/episodes/show.ejs", {episode: specificEpisode});
        }
    });
});


// Edit route - get to edit page from show page
router.get("/episodes/:id/edit", isLoggedIn, function(req, res){
    Video.findById(req.params.id, function(err, specificEpisode){
        if(err){
            console.log(err);
        }else{
            res.render("../views/episodes/edit.ejs", {episode: specificEpisode});
        }
    });
});

// Update route
router.put("/episodes/:id", function(req, res){
    // find and update the correct city
    Video.findByIdAndUpdate(req.params.id, req.body.episode, function(err, updatedEpisode){
        if(err){
            res.redirect("/episodes/" + req.params.id + "/edit");
        }else{
            console.log(updatedEpisode);
            res.redirect("/episodes/" + req.params.id);
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