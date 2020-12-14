const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/movieApp', { useNewUrlParser: true, useUnifiedTopology: true })
    // uses the movieApp database (not created yet)

    // add the following lines from "https://mongoosejs.com/docs/index.html"
    // const db = mongoose.connection
    // db.on('error', console.error.bind(console, 'connection error:'));
    // db.once('open', function () {
    //     console.log("connection open!!!")
    // });
    .then(() => {
        console.log("Connections open!!!!");
    })
    .catch(err => {
        console.log("oh no, error!!!")
        console.log(err)
    })
// ******************************************************************************************************************************************
// CREATING MOVIE MODEL
// ******************************************************************************************************************************************

// from "https://mongoosejs.com/docs/index.html"

const movieSchema = new mongoose.Schema({
    title: String,
    year: Number,
    score: Number,
    rating: String
});

// ******************************************************************************************************************************************
// create a model 
// ******************************************************************************************************************************************

const Movie = mongoose.model('Movie', movieSchema);
// name should be capitalized. Mongoose takes that and creates a collection of movies (plularises)
const amadeus = new Movie({ title: "Amadeus", year: 1986, score: 9.2, rating: "R" })

// IN THE NODE
// .load index.js
// Amadeus can be now accessed 
// amadeus.save() will save this Movie instance 

// SWITCH TO MONGO 
// use movieApp
// db.movies.find()

// ******************************************************************************************************************************************
// INSERT MANY 
// ******************************************************************************************************************************************

Movie.insertMany([
    { title: 'Amelie', year: 2001, score: 8.3, rating: 'R' },
    { title: 'Alien', year: 1979, score: 8.1, rating: 'R' },
    { title: 'The Iron Giant', year: 1999, score: 7.5, rating: 'PG' },
    { title: 'Stand By Me', year: 1986, score: 8.6, rating: 'R' },
    { title: 'Moonrise Kingdom', year: 2012, score: 7.3, rating: 'PG-13' }
])
    .then(data => {
        console.log("it worked!!!");
        console.log(data);
    })
// ******************************************************************************************************************************************
    // FINDING WITH MONGOOSE
// ******************************************************************************************************************************************

    // > Movie.find({ rating: "PG-13" }).then(data => console.log(data))

    // > Movie.find({ year: { $lt: 2010 } }).then(data => console.log(data))

    // > Movie.findOne({}).then(m => console.log(m))

    // > Movie.find({ _id: "5fc674b6acd83b069a5800ad" }).then(m => console.log(m))

    // > Movie.findById("5fc674b6acd83b069a5800ad").then(m => console.log(m))
// ******************************************************************************************************************************************
    // UPDATING WITH MONGOOSE
// ******************************************************************************************************************************************

    // In the node
    // > Movie.updateOne({title: "Amadeus"}, {year: 1984}). then (message => console.log(message))

    // In mongo
    // > db.movies.find({title:{ $in : ["Amadeus", "Stand By Me"]}})

    // Hop on to the node
    // Movie.updateMany({ title: { $in: ["Amadeus", "Stand By Me"] } }, { score: 10 }).then(message => console.log(message))

// ******************************************************************************************************************************************
    // FIND AND UPDATE (without new: true)
// ******************************************************************************************************************************************

    // Movie.findOneAndUpdate({ title: "The Iron Giant" }, { score: 7.0 }).then(message => console.log(message))

    // {
    //     _id: 5fc6744cb80dd10694824901,
    //         title: 'The Iron Giant',
    //             year: 1999,
    //                 score: 7.5,
    //                     rating: 'PG',
    //                         __v: 0
    // }
// ******************************************************************************************************************************************
    // FIND AND UPDATE (with new: true)
// ******************************************************************************************************************************************

    //     > Movie.findOneAndUpdate({ title: "The Iron Giant" }, { score: 7.0 }, { new: true }).then(message => console.log(message))
    // 
    // > {
    //             _id: 5fc6744cb80dd10694824901,
    //   title: 'The Iron Giant',
    //   year: 1999,
    //   score: 7,
    //   rating: 'PG',
    //   __v: 0
    // }
// ******************************************************************************************************************************************
    // DELETING WITH MONGOOSE
// ******************************************************************************************************************************************

    // > Movie.remove({ title: "Amelie" }).then(msg => console.log(msg))
    // > Movie.deleteMany({ year: { gte: 1999 } }).then(msg => console.log(msg))
    // > Movie.deleteMany({ year: { $gte: 1999 } }).then(msg => console.log(msg))
    // > Movie.findOneAndDelete({ title: "Alien" }).then(m => console.log(m))

