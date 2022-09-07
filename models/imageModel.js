 
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
 
//Image is a model which has a schema imageSchema
 
let images=  mongoose.model('Image', imageSchema);


module.exports =images;



