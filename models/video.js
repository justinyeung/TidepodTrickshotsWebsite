var mongoose = require("mongoose");

// video schema setup
var videoSchema = new mongoose.Schema({
    videoType: String,
    name: String//,
    // url: String,
    // description: String,
    // uploaded: String,
    // views: Number
});

module.exports = mongoose.model("Video", videoSchema);