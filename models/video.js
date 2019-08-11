var mongoose = require("mongoose");

var today = new Date();

// video schema setup
var videoSchema = new mongoose.Schema({
    videoType: {type: String, default: "episode"},
    name: {type: String, default: "New Episode"},
    season: {type: Number, default: 1},
    number: {type: Number, default: 1},
    thumbnail: {type: String, default: "https://cdn.wallpapersafari.com/76/19/oTkiJr.jpg"},
    // url: String,
    description: {type: String, default: "New Episode out today!"},
    uploaded: {type: Object, default: today},
    // views: Number
    bloopers:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Blooper"
        }
    ] //array of blooper ids that are connected to this video
});

module.exports = mongoose.model("Video", videoSchema);