const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/shopApp', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("CONNECTION OPEN!!!")
    })
    .catch(err => {
        console.log("OH NO ERROR!!!!")
        console.log(err)
    })

const personSchema = new mongoose.Schema({
    first: String,
    last: String
})

personSchema.virtual('fullName').get(function () {
    return `${this.first} ${this.last}`
})

// MIDDLEWARE FUNCTIONS

personSchema.pre('save', async function () {
    this.first = 'Pallavi';
    this.last = 'M';
    console.log("ABOUT TO SAVE!!!!")
})
personSchema.post('save', async function () {
    console.log("JUST SAVED!!!!")
})

// PERSON MODEL
const Person = mongoose.model('Person', personSchema);


