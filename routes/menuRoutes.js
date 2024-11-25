const express = require ('express');
const router = express.Router();

const MenuItem = require('./../models/Menu');

router.post('/', async (req,res) => {
    try {
      const hero = req.body
  
      const newMenu = new MenuItem(hero);
  
      const response = await newMenu.save();
      console.log("data saved");
      res.status(200).json(response);
    } catch (error) {
      console.log(error);
      res.status(500).json({error:'Internal server error'});
    }
  });

router.get('/',async (req,res)=>{
    try {
      const data = await MenuItem.find();
 
      console.log('data fetched');
      res.status(200).json(data);
    } catch (error) {
      console.log(err);
      res.status(500).json({error:'Internal server error'});
    }
  })

router.get('/:tastetype', async (req,res) => {
    try {
      const tastetype = req.params.tastetype; //Extract the worktype of person
      if(tastetype == 'sweet' || tastetype == 'spicy' || tastetype == 'sour'){
        const response = await MenuItem.find({taste:tastetype});
        console.log('response fetched');
        res.status(200).json(response);
      }else{
        res.status(404).json({error:'Invalid taste type'});
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({error:'Invalid server error'});
    }
  })

router.put('/:id',async (req,res)=>{
    try {
      const MenuId = req.params.id; //Extract the ID from the URL parameter
      const updatedMenuData = req.body; //Updated data from the person
      
      const response = await MenuItem.findByIdAndUpdate(MenuId,updatedMenuData,{
        new: true, //Return the updated document
        runValidators: true, //Run Mongoose validaton
      })
  
      if(!response){
        return res.status(400).json({error:'Menu not found'});
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
      const MenuId = req.params.id; // Extracts the person ID from the URL parameter
  
      //Assuminng you have a person model
      const response = await MenuItem.findByIdAndDelete(MenuId);
      if (!response){
        return res.status(404).json({error:'Menu not Found'});
      }
      console.log('data deleted');
      return res.status(200).json({message:'Menu deleted successfully'});
    } catch (error) {
      console.log(error);
      res.status(500).json({error:'Internal server error'})
    }
  })

module.exports = router;