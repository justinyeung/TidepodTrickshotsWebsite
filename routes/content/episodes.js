var express = require("express"),
router = express.Router(),
Video = require("../../models/video");

/**
 * Index route - shows all episodes
 */
router.get("/episodes", function(req, res){
    Video.find({videoType: "episode"}, function(err, allEpisodes){
        if(err){
            console.log(err);
        }else{
            res.render("../views/episodes/index.ejs", {episodes: allEpisodes});
        }
    })
    
});

/**
 * Show route - watch specific episode
 */
router.get("/episodes/:id", function(req, res){
    Video.findById(req.params.id, function(err, specificEpisode){
        if(err){
            console.log(err);
        }else{
            res.render("../views/episodes/show.ejs", {episode: specificEpisode});
        }
    });
});

/**
 * Edit route - get to edit page from show page
 */
router.get("/episodes/:id/edit", isLoggedIn, function(req, res){
    Video.findById(req.params.id, function(err, specificEpisode){
        if(err){
            console.log(err);
        }else{
            res.render("../views/episodes/edit.ejs", {episode: specificEpisode});
        }
    });
});

/**
 * Update episode
 */
router.put("/episodes/:id", isLoggedIn, function(req, res){
    Video.findByIdAndUpdate(req.params.id, req.body.episode, function(err, updatedEpisode){
        if(err){
            res.redirect("/episodes/" + req.params.id + "/edit");
        }else{
            res.redirect("/episodes/" + req.params.id);
        }
    });
});

/**
 * Delete Episode
 */
router.delete("/episodes/:id", isLoggedIn, function(req, res){
    Video.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/episodes/:id");
        }else{
            res.redirect("/episodes");
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