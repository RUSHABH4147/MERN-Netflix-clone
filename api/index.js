const express = require('express');
const mongoose = require('mongoose');
const app = express();
const dotenv = require('dotenv');
const authorize = require('./routes/auth');
const userRoutes = require('./routes/users');
const MovieRoutes = require('./routes/Movies');
const ListRoutes = require('./routes/list');
dotenv.config();
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log('DB is connected');
  })
  .catch((err) => {
    console.log(err);
  });
app.get('/a', (req, res) => {
  res.send('hi');
});
app.use(express.json());
app.use('/api/user', authorize);
app.use('/api/user', userRoutes);
app.use('/api/movie', MovieRoutes);
app.use('/api/lists', ListRoutes);
app.listen(8800, () => {
  console.log('backend is running!');
});
