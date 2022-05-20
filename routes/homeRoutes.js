const express = require('express');
const app = express();
const router = express.Router();
const bodyParser = require("body-parser");
const User = require('../schemas/UserSchema');

app.use(bodyParser.urlencoded({ extended: false }));

router.get("/", (req, res, next) => {
    console.log(req.session.user);
    res.status(200).render("home");
});

router.post("/", async (req,res, next) => {
       
});

module.exports = router;