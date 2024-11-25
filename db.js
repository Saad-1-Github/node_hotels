const mongoose = require('mongoose');

//Define the MongoDB Connection URL
const mongoURL = 'mongodb://localhost:27017/hotels'
mongoose.connect(mongoURL)
// ,{
//     useNewUrlParser:true,
//     useUnifiedTopology:true
// })

//Get the default connection
//Mongoose maintains a default connection object representing the MongoDB connection
const db=mongoose.connection;

//DEfine event listeners for database connetion
db.on('connected',() => {
    console.log('Connected to MongoDB server');
});

db.on('error',(err) => {
    console.error('Mongo Connecton error:',err);
});

db.on('disconnected',() => {
    console.log('MongoDB disconnected')
});

//Export the database connection
module.exports=db;