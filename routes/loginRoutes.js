const express = require('express');
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require('../schemas/UserSchema');

router.get("/", (req, res, next) => {
    res.status(200).render("login");
});

router.post("/", async (req,res, next) => {
    const userName = req.body.userName.trim();
    const password = req.body.password;
    
    var payload= req.body;

    if(userName && password){
        var user = await User.findOne({userName: userName})
        .catch((error) => {
            console.log(error);
            payload.errorMsg="Something went wrong";
            res.status(200).render("login",payload);
        });

        if(user!=null){
            var result= await bcrypt.compare(password,user.password);
            if(result){
                req.session.user=user;
                return res.redirect('/home');
            }
            else{
                payload.errorMsg="Password is incorrect";
                res.status(200).render("login",payload);
            }
        }
        else{
            payload.errorMsg="Username is incorrect";
            res.status(200).render("login",payload);
        }
    }
    else{
        payload.errorMsg="Make sure that each field has a valid value";
        res.status(200).render("register",payload);
    }
});

module.exports = router;