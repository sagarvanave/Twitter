const express = require('express');
const router = express.Router();
const Post = require('../schemas/PostSchema');

router.get("/", async (req, res, next) => {
    let searchObj = {};
    let userIds = [];

    userIds.push(req.session.user._id);
    //add following ids to fetch their tweets
    req.session.user.following.forEach(userId => {
        userIds.push(userId);
    })

    searchObj.postedBy = {$in : userIds};
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
        let tweet=req.body.tweet.trim();
        if(tweet!=""){
            let data = {
                content: tweet,
                postedBy: userId
            }
            Post.create(data).then(() => {
                return res.redirect('/home');
            });
        }
        else {
            return res.redirect('/home');
        }

});

module.exports = router;