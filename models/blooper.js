var mongoose = require("mongoose");

// video schema setup
var blooperSchema = new mongoose.Schema({
    videoType: {type: String, default: "blooper"},
    name: {type: String, default: "New Blooper"},
    // url: String,
    description: String,
    // views: Number
});

module.exports = mongoose.model("Blooper", blooperSchema);