const express = require('express');
const app = express();
const router = express.Router();
const bcrypt = require("bcrypt");
const bodyParser = require("body-parser");
const User = require('../schemas/UserSchema');

app.use(bodyParser.urlencoded({ extended: false }));

router.get("/", (req, res, next) => {
    res.status(200).render("register");
});

router.post("/", async (req, res, next) => {
    
    const firstName = req.body.firstName.trim();
    const lastName = req.body.lastName.trim();
    const username = req.body.userName.trim();
    const email = req.body.email.trim();
    const password = req.body.password;

    var data=req.body;
    data.password=await bcrypt.hash(password,10);

    console.log(data);

    User.create(data).then((user) => {
        console.log("User is registered.");
    });

});

module.exports = router;