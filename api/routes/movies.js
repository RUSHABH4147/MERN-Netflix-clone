const router = require('express').Router();
const Movies = require('../models/Movies');
const { Router } = require('express');
const verifyt = require('../verifyToken');

//create
router.post('/', verifyt, async (req, res) => {
  if (req.user.isAdmin) {
    // console.log(req.user.isAdmin, req.user.id);
    const newMovie = new Movies(req.body);
    try {
      const savedMovies = await newMovie.save();
      res.status(201).json(savedMovies);
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(403).json('You are Not allowed!');
  }
});
//UPDATE
router.put('/:id', verifyt, async (req, res) => {
  if (req.user.isAdmin) {
    try {
      const updateMovie = new Movies.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        {
          new: true,
        }
      );
      res.status(201).json(updateMovie);
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
      const updateMovie = new Movies.findByIdAndDelete(req.params.id);
      res.status(201).json('Movie deleted !');
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(403).json('You are Not allowed!');
  }
});
//get
router.get('/find/:id', verifyt, async (req, res) => {
  try {
    const Movie = await Movies.findById(req.params.id);
    res.status(200).json(Movie);
  } catch (error) {
    res.status(500).json(error);
    console.log(error);
  }
});
//get
router.get('/', verifyt, async (req, res) => {
  try {
    const Movie = await Movies.find();
    res.status(200).json(Movie.reverse());
  } catch (error) {
    res.status(500).json(error);
    console.log(error);
  }
});
//getrandom
router.get('/random', verifyt, async (req, res) => {
  const type = req.query.type;
  try {
    if (type === 'series') {
      const Movie = await Movies.aggregate([
        { $match: { isSeries: true } },
        { $sample: { size: 1 } },
      ]);
      res.status(200).json(Movie);
    } else {
      const Movie = await Movies.aggregate([
        { $match: { isSeries: false } },
        { $sample: { size: 1 } },
      ]);
      res.status(200).json(Movie);
    }
  } catch (error) {
    res.status(500).json(error);
    console.log(error);
  }
});

module.exports = router;
