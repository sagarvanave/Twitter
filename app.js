const express = require('express');
const app = express();
const port = 3000;
const middleware = require('./middleware');
const mongoose = require("mongoose");
const bodyParser=require('body-parser');
const session = require('express-session');
const path = require('path')

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
app.use(express.static(path.join(__dirname, "public")));

//Session initialization

app.use(session({
    secret: "twitter app",
    resave: true,
    saveUninitialized: false
}));

//Routes
const registerRoute= require('./routes/registerRoutes');
const loginRoute= require('./routes/loginRoutes');
const homeRoute= require('./routes/homeRoutes');
const logoutRoute= require('./routes/logoutRoutes');
const searchRoutes = require('./routes/searchRoutes');
const userRoutes = require('./routes/userRoutes');

app.use("/register", registerRoute);
app.use("/login", loginRoute);
app.use("/logout", logoutRoute);
app.use("/home", middleware.requireLogin, homeRoute);
app.use("/search", middleware.requireLogin, searchRoutes);
app.use("/user", middleware.requireLogin, userRoutes);


app.get("/", middleware.requireLogin,(req, res,next) => {
    res.status(200).render("home"); 
});