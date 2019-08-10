var mongoose = require("mongoose");

// video schema setup
var videoSchema = new mongoose.Schema({
    videoType: String,
    name: String,
    season: Number,
    number: Number,
    // url: String,
    description: String,
    uploaded: Object,
    // views: Number
    bloopers:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Blooper"
        }
    ] //array of blooper ids that are connected to this video
});

module.exports = mongoose.model("Video", videoSchema);