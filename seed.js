var mongoose = require("mongoose"),
Episode = require("./models/video");

var data = [
    {
        videoType: "episode",
        name: "Episode 1"
    },
    {
        videoType: "episode",
        name: "Episode 2"
    },
    {
        videoType: "blooper",
        name: "Blooper 1"
    },
    {
        videoType: "vlog",
        name: "Vlog 1"
    }
];

//deletes all existing data and inputs sample data above
function seedDB(){
    Episode.deleteMany({}, function(err){
        if(err){
            console.log(err);
        }
        data.forEach(function(seed){
            Episode.create(seed, function(err, episode){
                // console.log(episode);
                if(err){
                    console.log(err);
                }
                
            })
        });
    });
};

module.exports = seedDB;