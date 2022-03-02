// Dependencies
require('dotenv').config();
const { PORT = 4444, MONGODB_URL } = process.env;
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');


// Database Connection
mongoose.connect(MONGODB_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
});
mongoose.connection
    .on('open', () => console.log('you are connected to mongoose'))
    .on('close', () => console.log('you are disconnected from mongoose'))
    .on('error', (error) => console.log(error));


// Models
const CheeseSchema = new mongoose.Schema({
    name: String,
    countryOfOrigin: String,
    img: String,
});

const Cheese = mongoose.model('Cheese', CheeseSchema);


// Middleware
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());


// Routes
// test route
app.get('/', (req, res) => {
    res.send('Hello worldz');
});

// Cheese Index Route
app.get('/cheese', async (req, res) => {
    try{
        res.json(await Cheese.find({}));
    } catch (error) {
        res.status(400).json(error);
    }
});

// Cheese Create Route
app.post('/cheese', async (req, res) => {
    try{
        res.json(await Cheese.create(req.body));
    } catch (error) {
        res.status(400).json(error);
    }
})

// Cheese Update Route
app.put('/cheese/:id', async (req, res) => {
    try{
        res.json(await Cheese.findByIdAndUpdate(req.params.id, req.body, { new: true }));
    } catch (error) {
        res.status(400).json(error);
    }
});

// Cheese Delete Route
app.delete('/cheese/:id', async (req, res) => {
    try{
        res.json(await Cheese.findByIdAndRemove(req.params.id));
    } catch (error) {
        res.status(400).json(error);
    }
});


// Listener
app.listen(process.env.PORT || 4444, function(){});