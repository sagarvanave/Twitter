const express = require('express');
const router = express.Router();
const Post = require('../schemas/PostSchema');

router.get("/", async (req, res, next) => {
    let searchObj = {};
    let userId = req.session.user._id;
    searchObj.postedBy = {$in : [userId]};
    let result = await Post.find(searchObj)
        .populate("postedBy")
        .sort({ "createdAt": -1 })
        .catch(error => console.log(error));

    let data=[];
    for (let i = 0; i < result.length; i++){
        item={};
        item['tweet']=result[i].content;
        item['firstName']=result[i].postedBy.firstName;
        item['lastName']=result[i].postedBy.lastName;
        item['userName']=result[i].postedBy.userName;
        data.push(item);
    }
    res.status(200).render("home", {responseObject:JSON.stringify(data)});
});

router.post("/", async (req,res, next) => {
        let userId=req.session.user._id;
        let tweet=req.body.tweet;
        let data = {
            content: tweet,
            postedBy: userId
        }
        Post.create(data).then(() => {
            return res.redirect('/home');
        });
});



module.exports = router;