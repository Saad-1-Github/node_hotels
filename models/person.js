const mongoose=require('mongoose');

//Define the person Schema
const personSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    age:{
        type:Number,
        required:true
    },
    work:{
        type:String,
        required:true,
        enum:["chef","waiter","manager"]
    },
    Mobile_Number:{
        type:Number,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    address:{
        type:String
    },
    salary:{
        type:Number,
        required:true
    }
});

//Create Person model
const Person = mongoose.model('Person',personSchema);
module.exports = Person;