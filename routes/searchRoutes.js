const express = require('express');
const Post = require("../schemas/PostSchema");
const router = express.Router();

router.get("/", async (req, res, next) => {
    let search = req.query;
    search.content = { $regex: search.search, $options: "i" };
    let result = await Post.find(search)
        .select(("-_id content postedBy"))
        .populate("postedBy", ("firstName lastName userName"))
        .sort({ "createdAt": -1 })
        .catch(error => console.log(error));

    const currentUserId=req.session.user._id;
    let data=[];
    for (let i = 0; i < result.length; i++){
        item={};
        if(result[i].postedBy._id.toString()===currentUserId.toString()){
            item['currentUser']=true;
        }else {
            item['currentUser']=false;
        }
        item['id']=result[i].postedBy._id.toString()
        item['tweet']=result[i].content;
        item['firstName']=result[i].postedBy.firstName;
        item['lastName']=result[i].postedBy.lastName;
        item['userName']=result[i].postedBy.userName;

        data.push(item);
    }
    // console.log(data);
    res.status(200).send(data);
});
module.exports = router;