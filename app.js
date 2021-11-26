
const express = require('express');
const mongoose = require('mongoose');
const app = express();

app.use(express.static('public'));
app.use(express.urlencoded({extended:true}));



mongoose.connect('mongodb://localhost:27017/movieDB');

const movieSchema = {
    Name:String,
    Rating:Number,
    director:String,
    stars:String
};

const Movie = mongoose.model('Movie',movieSchema);

app.get('/', (req,res)=>{
    res.sendFile(__dirname + '/index.html')
});


app.post('/',(req,res)=>{

    const newMovie = new Movie({
        Name : req.body.mName,
        Rating : req.body.rRating,
        director : req.body.director,
        stars : req.body.stars

    });

    newMovie.save();
    


});





app.get('/detail',(req,res)=>{
    Movie.find((err,foundMovies)=>{
        if(!err){
            res.send(foundMovies);
        }else{
            res.send(err);
        }
    })
});








app.listen(3000, ()=>{
    console.log('Server is started on 3000 port');
});