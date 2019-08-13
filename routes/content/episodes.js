var express = require("express"),
router = express.Router(),
//requires the video schema for episode
Episode = require("../../models/video");

// index route (shows all the episodes)
router.get("/episodes", function(req, res){
    //queries database for only episodes
    Episode.find({videoType: "episode"}, function(err, allEpisodes){
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
    Episode.findById(req.params.id).populate("bloopers").exec(function(err, specificEpisode){
        if(err){
            console.log(err);
        }else{
            res.render("../views/episodes/show.ejs", {episode: specificEpisode});
        }
    });
});

// new route - form to add new video
router.get("/new", function(req, res){
    res.render("../views/new.ejs");
})
// create route - post a new video
router.post("/videos", function(req, res){
    res.send("adsf");
    console.log("Posted");
})
module.exports = router;