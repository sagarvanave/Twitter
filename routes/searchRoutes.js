const express = require('express');
const Post = require("../schemas/PostSchema");
const User = require("../schemas/UserSchema");
const router = express.Router();

router.get("/", async (req, res, next) => {
    let search = req.query;
    search.content = { $regex: search.search, $options: "i" };

    let matchedPosts = await Post.find(search)
        .select(("-_id content postedBy"))
        .populate("postedBy", ("firstName lastName userName followers"))
        .sort({ "createdAt": -1 })
        .catch(error => console.log(error));

    let userSearchObject={
        $or:[
            {firstName:{$regex: search.search, $options: "i"}},
            {lastName:{$regex: search.search, $options: "i"}},
            {userName:{$regex: search.search, $options: "i"}}
        ]
    }
    //If user search with hashtag then user accounts will not pupulate
    let matchedUsers;
    if(search.toString().startsWith("#")===false)
    {
        matchedUsers = await User.find(userSearchObject)
            .select(("firstName lastName userName followers"))
            .sort({ "createdAt": -1 })
            .catch(error => console.log(error));
    }


    let result = matchedPosts.concat(matchedUsers);
    const currentUserId=req.session.user._id;
    let data=[];
    for (let i = 0; i < result.length; i++){
        item={};

        if(result[i].content) {
            item['currentUser'] = isCurrentUser(currentUserId.toString(), result[i].postedBy._id.toString());
            item['id'] = result[i].postedBy._id.toString()
            item['tweet'] = result[i].content;
            item['firstName'] = result[i].postedBy.firstName;
            item['lastName'] = result[i].postedBy.lastName;
            item['userName'] = result[i].postedBy.userName;
            item['isFollower'] = isFollower(currentUserId, result[i].postedBy.followers);
        } else {
            item['currentUser'] = isCurrentUser(currentUserId.toString(), result[i]._id.toString());
            item['firstName'] = result[i].firstName;
            item['lastName'] = result[i].lastName;
            item['userName'] = result[i].userName;
            item['id'] = result[i]._id.toString()
            item['isFollower'] = isFollower(currentUserId, result[i].followers);
        }
        data.push(item);
    }
    res.status(200).send(data);
});

function isCurrentUser(currentUserId, fetchedUserId){
    if(currentUserId === fetchedUserId) return true;
    return false;
}

function isFollower(currentUserId, followerList){
    if (followerList.includes(currentUserId)) return true
    return false
}

module.exports = router;