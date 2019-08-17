// var express = require("express"),
// router = express.Router(),
// Episode = require("../../models/video");

// var arr = new Array();
// var episodes = new Array();
// var blooperCount = Number;

// router.get("/bloopers", function(req, res){
//     blooperCount = 0;

//     // find all episodes
//     Episode.find({videoType: "episode"}, function(err, allEpisodes){
//         if(err){
//             console.log(err);
//         }else{
//             allEpisodes.forEach(function(episode){
//                 // populate episodes with bloopers, for all episodes
//                 Episode.findById(episode._id).populate("bloopers").exec(function(err, specificBlooper){
//                     // push bloopers in to an array
//                     arr.push(specificBlooper);
//                     blooperCount++;
//                 });
//             });
//             // if bloopers don't all load, refresh page
//             if(arr.length <= blooperCount){
//                 console.log("redirect");
//                 res.redirect("/bloopers");
//             }else{
//                 res.render("../views/bloopers/index.ejs", {episodes: arr});
//             }
//         };
//     });
// });

// // show route
// router.get("/bloopers/:id", function(req, res){
//     Blooper.findById(req.params.id, function(err, specificBlooper){
//         if(err){
//             console.log(err);
//         }else{
//             res.render("../views/bloopers/show.ejs", {blooper: specificBlooper});
//         }
//     })
    
// });

// module.exports = router;
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
            res.render("../views/bloopers/show.ejs", {blooper: specificBlooper});
        }
    });
});

module.exports = router;