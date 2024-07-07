const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const authRoutes = require('./routes/userRoutes');
const noteRoutes = require('./routes/notesRoute');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT;

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connection successfully established'))
  .catch(err => console.error('MongoDB connection failed', err));

  app.use(express.json());
  app.use(express.urlencoded({extended: true}));


  app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: process.env.MONGO_URI,
        collectionName: 'sessions'
    }),
    cookie: {
        maxAge: 1000* 60 * 60 * 24.
    }
  }));

  app.use('/api/auth', authRoutes);
  app.use('/api/notes', noteRoutes);

  app.listen(PORT, () => {
    console.log(`Serve running on port ${PORT}`);
  });