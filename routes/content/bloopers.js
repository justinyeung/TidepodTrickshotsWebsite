var express = require("express"),
router = express.Router(),
Blooper = require("../../models/video");

// index route
router.get("/bloopers", function(req, res){
    Blooper.find({videoType: "blooper"}, function(err, allBloopers){
        if(err){
            console.log(err);
        }else{
            res.render("../views/bloopers/index.ejs", {bloopers: allBloopers});
        }
    });
});

// show route
router.get("/bloopers/:id", function(req, res){
    Blooper.findById(req.params.id, function(err, specificBlooper){
        if(err){
            console.log(err);
        }else{
            res.render("../views/bloopers/show.ejs", {blooper: specificBlooper});
        }
    })
    
});

module.exports = router;