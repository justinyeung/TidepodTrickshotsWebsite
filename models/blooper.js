var mongoose = require("mongoose");

// video schema setup
var blooperSchema = new mongoose.Schema({
    videoType: String,
    name: String,
    // url: String,
    description: String,
    // views: Number
});

module.exports = mongoose.model("Blooper", blooperSchema);