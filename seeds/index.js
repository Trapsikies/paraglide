const mongoose = require('mongoose');
const cities = require('./cities');
const Flysite = require('../models/flysite');
const {places, descriptors} = require('./seedHelpers');

mongoose.connect('mongodb://localhost:27017/fly-site', {
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology:true
});

const db = mongoose.connection;
db.on('error',console.error.bind(console, "connection error:"));
db.once('open', () =>{
    console.log("Database Connected");
});



const sample = array => array[Math.floor(Math.random()*array.length)];


const seedDB = async  () => {
 await Flysite.deleteMany({});
    for(let i=0 ; i<50; i++ ){
        const random1000 = Math.floor(Math.random() * 1000);
        const fly = new Flysite({
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`
        })
        await fly.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})