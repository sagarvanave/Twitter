const express = require('express');
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require('../schemas/UserSchema');

router.get("/", (req, res, next) => {
    if(req.session.user){
        return res.redirect('/home');
    }
    res.status(200).render("register");
});

router.post("/", async (req, res, next) => {
    
    const firstName = req.body.firstName.trim();
    const lastName = req.body.lastName.trim();
    const userName = req.body.userName.trim();
    const email = req.body.email.trim();
    const password = req.body.password;

    var payload=req.body;

    if(firstName && lastName && userName && email && password){
        //Check if user is already registered
        const user = await User.findOne({
            $or:[
                {userName: userName},
                {email:email}
            ]
        }).catch((error)=>{
            console.log(error);
            payload.errorMsg="Something went wrong";
            res.status(200).render("register",payload);
        });

        if(user == null){
            //No user found
            var data=req.body;

            //Password encrypted using bcrypt
            data.password=await bcrypt.hash(password,10);
        
            User.create(data).then((user) => {
                req.session.user=user;
                return res.redirect('/home');
            });
        }else{
            if(email===user.email){
                payload.errorMsg="Email already present";
            }
            else{
                payload.errorMsg="Username is already present";
            }
            res.status(200).render("register",payload);
        }   
    }else{
        payload.errorMsg="Make sure that each field has a valid value";
        res.status(200).render("register",payload);
    }

});

module.exports = router;