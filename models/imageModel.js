 
var mongoose = require('mongoose');
var Schema = mongoose.Schema

var imageSchema = new Schema({
    mimetype: String,
    size: Number,
    originalName:String,
    destination:String,
    ipAddres:String,
    userAgent:String
});

let images=  mongoose.model('Image', imageSchema);


module.exports =images;



