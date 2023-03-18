const mongoose = require("mongoose");

require('dotenv').config();




function connectToMongoDB() {
    
mongoose.connect('mongodb+srv://Isaacadun:Isaakadun@cluster0.ki7ilh4.mongodb.net/?retryWrites=true&w=majority'
,{ useNewUrlParser: true, useUnifiedTopology: true })


 .then (console.log("MongoDB Connected"))
.catch((err) => console.log(err));
}

module.exports = { connectToMongoDB }
