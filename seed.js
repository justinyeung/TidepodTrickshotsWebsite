var mongoose = require("mongoose"),
Episode = require("./models/video");
var today = new Date();

var data = [
    {
        videoType: "episode",
        name: "Pilot",
        season: 1,
        number: 1,
        description: "I have no idea how long these descriptions should be for them to be realistic",
        uploaded: today
    },
    {
        videoType: "episode",
        name: "Connect 4",
        season: 1,
        number: 2,
        description: "4 washing machines, 4 shots, 4 buckets",
        uploaded: today
    },
    {
        videoType: "episode",
        name: "New Home",
        season: 2,
        number: 1,
        description: "Welcome back to a new season!",
        uploaded: today
    },
    {
        videoType: "episode",
        name: "Back to LP",
        season: 2,
        number: 2,
        description: "The ultimate throwback !!",
        uploaded: today
    },
    {
        videoType: "blooper",
        name: "Blooper 1",
        season: 1,
        number: 1,
        description: "This is the description",
        uploaded: today
    },
    {
        videoType: "vlog",
        name: "Vlog 1",
        season: 1,
        number: 1,
        description: "This is the description",
        uploaded: today
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