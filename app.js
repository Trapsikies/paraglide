const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const Flysite = require('./models/flysite');
const { findById } = require('./models/flysite');
const methodOverride = require('method-override');



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

const app = express();


app.set('view engine', 'ejs');
app.set('views',path.join(__dirname,'views'))  //setting views dir

app.use(express.urlencoded({extended:true}))
app.use(methodOverride('_method')); //kinda declairing _method>>> look into this, for our Qry string,(Solution pappa use it in ejs for the mehodOveride, In html/ejs form action="/****/<%=***._id%>?_method=PUT or DELETE or oror)

app.get('/' ,(req,res) => {
    res.render('home');
})


app.get('/flysites' ,async (req,res) => {
    const flysite = await Flysite.find({});
    res.render('flysites/index',{flysite})
})

app.get('/flysites/new', (req,res) => {
    res.render('flysites/new')
})

app.post('/flysites', async(req, res) => {
    let flysite= new Flysite(req.body.flysite);
    await flysite.save();
    res.redirect(`/flysites/${flysite._id}`)
})

app.get('/flysites/:id', async (req,res) =>{
    const flysite = await Flysite.findById(req.params.id);
    res.render('flysites/show',{flysite});

})

app.get('/flysites/:id/edit', async(req,res) =>{
    const flysite = await Flysite.findById(req.params.id);
    res.render('flysites/edit',{flysite});
})


app.put('/flysites/:id', async (req,res) => {
    const { id } = req.params;
    let flysite =  await Flysite.findByIdAndUpdate(id,{...req.body.flysite}) //USIN the spread opperator ... it spreads the obj out in its 
    res.redirect(`/flysites/${flysite._id}`)
});

app.delete('/flysites/:id', async (req,res) => {
    const { id } = req.params;
    await Flysite.findByIdAndDelete(id)
    res.redirect('/flysites')
})

app.listen(3000, ()=>{
    console.log('serving port 3000');
})