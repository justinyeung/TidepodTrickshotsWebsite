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

// create route - post a new video
router.post("/videos", isLoggedIn, function(req, res){
    var video = req.body.video;
    var newVideo = {
        videoType: video.videotype,
        name: video.name,
        season: video.seasonnum,
        number: video.episodenum,
        thumbnail: video.thumbnail,
        description: video.description
    }
    
    Video.create(newVideo, function(err, newlyCreated){
        if(err){
            console.log(err);
        }else{
            // go to page with all episodes
            res.redirect("/episodes");
        }
    })
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