const express = require ('express');
const router = express.Router();
const Person = require('./../models/person');

router.post('/', async (req,res) => {
    try{
        const data = req.body //Assuming the request body contains the person data
        //Create a new Person document using the Mongoose model
        const newPerson = new Person(data);
  
        //Save the new Person to the database
        const response = await newPerson.save();
        console.log('data saved');
        res.status(200).json(response);
    }
  
    catch(err){
       console.log(err);
       res.status(500).json({error:'Internal server error'});
    }
   });

//GET person data
router.get('/',async (req,res)=>{
    try {
      const data = await Person.find();
 
      console.log('data fetched');
      res.status(200).json(data);
    } catch (error) {
      console.log(err);
      res.status(500).json({error:'Internal server error'});
    }
  })

router.get('/:worktype', async (req,res) => {
    try {
      const worktype = req.params.worktype; //Extract the worktype of person
      if(worktype == 'chef' || worktype == 'manager' || worktype == 'waiter'){
        const response = await Person.find({work:worktype});
        console.log('response fetched');
        res.status(200).json(response);
      }else{
        res.status(404).json({error:'Invalid work type'});
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({error:'Invalid server error'});
    }
  })

router.put('/:id',async (req,res)=>{
  try {
    const personId = req.params.id; //Extract the ID from the URL parameter
    const updatedPersonData = req.body; //Updated data from the person
    
    const response = await Person.findByIdAndUpdate(personId,updatedPersonData,{
      new: true, //Return the updated document
      runValidators: true, //Run Mongoose validaton
    })

    if(!response){
      return res.status(400).json({error:'Person not found'});
    }

    console.log('data updated');
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({error:'Internal server error'});
  }
})

router.delete('/:id', async (req,res) => {
  try {
    const personId = req.params.id; // Extracts the person ID from the URL parameter

    //Assuminng you have a person model
    const response = await Person.findByIdAndDelete(personId);
    if (!response){
      return res.status(404).json({error:'Person not Found'});
    }
    console.log('data deleted');
    return res.status(200).json({message:'Person deleted successfully'});
  } catch (error) {
    console.log(error);
    res.status(500).json({error:'Internal server error'})
  }
})
module.exports = router;