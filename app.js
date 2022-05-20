const express = require('express');
const app = express();
const port = 3000;
const mongoose = require("mongoose");
const bodyParser=require('body-parser');

//App engine set to hbs because we are using handlebars 
app.set('view engine', 'hbs');
app.set("views","views");

//Database connection setup
mongoose.connect("mongodb://localhost:27017/twitter")
.then(() => {
                console.log("database connection successful");
}).catch((err) => {
                console.log("database connection error " + err);
});

//Starting Server
const server = app.listen(port, () => console.log("Server listening on port " + port));

app.use(bodyParser.urlencoded({ extended: false }));

app.get("/",(req, res) => {
    res.send("Hello there, <br> This is simple twitter app");
});

//Routes
const registerRoute= require('./routes/registerRoutes');

app.use("/register", registerRoute);


