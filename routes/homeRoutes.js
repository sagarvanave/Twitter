const express = require('express');
const router = express.Router();
const User = require('../schemas/UserSchema');

router.get("/", (req, res, next) => {
    console.log(req.session.user);
    res.status(200).render("home",req.session.user);
});

router.post("/", async (req,res, next) => {
       
});

module.exports = router;