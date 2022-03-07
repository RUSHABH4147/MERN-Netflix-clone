const router = require('express').Router();
const User = require('../models/User');
const CryptoJS = require('crypto-js');
const { Router } = require('express');
const verifyt = require('../verifyToken');

//UPDATE
router.put('/:id', verifyt, async (req, res) => {
  if (req.user.id === req.params.id || req.user.isAdmin) {
    // console.log(req.user.isAdmin, req.user.id);

    if (req.body.password) {
      req.body.password = CryptoJS.AES.encrypt(
        req.body.password,
        process.env.AES_KEY
      ).toString();
    }
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(201).json(updatedUser);
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(403).json('Not allowed!');
  }
});
//DELETE
router.delete('/:id', verifyt, async (req, res) => {
  if (req.user.id === req.params.id || req.user.isAdmin) {
    try {
      const updatedUser = await User.findByIdAndDelete(req.params.id);
      res.status(201).json('User are deleted');
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(403).json('Not allowed!');
  }
});
//GET
router.get('/find/:id', async (req, res) => {
  //   console.log(req.params.id);

  try {
    const user = await User.findById(req.params.id);
    const { password, ...info } = user._doc;
    res.status(200).json(info);
  } catch (error) {
    res.status(500).json(error);
    console.log(error);
  }
});
//GET ALL
router.get('/', verifyt, async (req, res) => {
  const query = req.query.new;

  if (req.user.isAdmin) {
    try {
      const users = query
        ? await User.find().sort({ _id: -1 }).limit(10)
        : await User.find();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(403).json('Not allowed!');
  }
});
//GET USER STATS
router.get('/stats', async (req, res) => {
  const today = new Date();
  const lastyear = today.setFullYear(today.setFullYear() - 1);
  const monthsArray = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  try {
    const data = await User.aggregate([
      {
        $project: {
          month: { $month: '$createdAt' },
        },
      },
      {
        $group: {
          _id: '$month',
          total: { $sum: 1 },
        },
      },
    ]);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
