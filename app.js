const express = require('express');
const app = express();
const port = 3000;

//App engine set to hbs because we are using handlebars 
app.set('view engine', 'hbs');
app.set("views","views");

//Starting Server
const server = app.listen(port, () => console.log("Server listening on port " + port));

app.get("/",(req, res) => {
    res.send("Hello there, <br> This is simple twitter app");
});

//Routes
const registerRoute= require('./routes/registerRoutes');

app.use("/register", registerRoute);


