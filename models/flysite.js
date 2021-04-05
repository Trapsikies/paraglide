const mongoose = require('mongoose');
const Schema = mongoose.Schema;   //just making thing easy by dec Schema as var

const FlysiteSchema = new Schema({
    title:String,
    price:String,
    description:String,
    location:String
});

module.exports = mongoose.model('Flysite',FlysiteSchema);
