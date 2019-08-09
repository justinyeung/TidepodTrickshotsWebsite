var mongoose = require("mongoose");

// video schema setup
var videoSchema = new mongoose.Schema({
    videoType: String,
    name: String,
    season: Number,
    number: Number,
    // url: String,
    description: String,
    uploaded: Object//,
    // views: Number
});

module.exports = mongoose.model("Video", videoSchema);