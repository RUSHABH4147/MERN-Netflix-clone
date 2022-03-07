const router = require('express').Router();
const List = require('../models/List');
const { Router } = require('express');
const verifyt = require('../verifyToken');

//get List
router.post('/', verifyt, async (req, res) => {
  if (req.user.isAdmin) {
    // console.log(req.user.isAdmin, req.user.id);
    const newList = new List(req.body);
    try {
      const savedList = await newList.save();
      res.status(201).json(savedList);
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(403).json('You are Not allowed!');
  }
});

//DELETE
router.delete('/:id', verifyt, async (req, res) => {
  if (req.user.isAdmin) {
    try {
      const updatelist = await List.findByIdAndDelete(req.params.id);
      res.status(201).json('List deleted !');
    } catch (error) {
      res.status(500).json(error);
      console.log(error)
    }
  } else {
    res.status(403).json('You are Not allowed!');
  }
});
//Get all lis
router.get('/', verifyt, async (req, res) => {
 
    try {
      const allist = await List.find();
      res.status(201).json(allist);
    } catch (error) {
      res.status(500).json(error);
      console.log(error)
    }
 
});


module.exports = router;