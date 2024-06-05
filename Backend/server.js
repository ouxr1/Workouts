require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const workoutsRoutes = require('./routes/workouts');

// express app 
const app = express();

// middleware
app.use(express.json());
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next(); // Add parentheses to call the next function
});

// routes
app.use('/api/workouts', workoutsRoutes);

// connect to the database
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        // listen for requests
        app.listen(process.env.PORT || 4000, () => {
            console.log("Connected to the database & Server is running on port", process.env.PORT || 4000);
        });
    })
    .catch((error) => {
        console.error("Error connecting to the database:", error.message);
    });
