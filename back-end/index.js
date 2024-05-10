const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");
const Post = require("./models/content-model.js");
const contentRoute = require("./routes/content-route.js");
const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// routes
app.use("/api/contents", contentRoute);

app.get('/', (req, res) => {
    res.send("Hello!");
});

/* implementato con routes
app.get('/api/contents', async (req, res) => {
    try {
        const post = await Post.find({});
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}); */

app.get('/api/contents/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const post = await Post.findById(id);
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

app.post('/api/contents', async (req, res) => {
    try {
        const post = await Post.create(req.body);
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

mongoose.connect("mongodb+srv://handavv:zODxD94AogKcnRAY@cluster0.gnmkol9.mongodb.net/?retryWrites=true&w=majority").then(() => {
    console.log("Connected to MongoDB!");
    app.listen(8000, () => {
      console.log('Server is running on port 8000');
    });
});
