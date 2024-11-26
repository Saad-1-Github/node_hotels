const mongoose = require('mongoose');
require('dotenv').config();

//Define the MongoDB Connection URL
//const mongoURL = process.env.MONGODB_URL_LOCAL
//const mongoURL = 'mongodb+srv://helloworld:Qwerty12345@cluster0.ibsdi.mongodb.net/'
const mongoURL = process.env.MONGODB_URL;

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