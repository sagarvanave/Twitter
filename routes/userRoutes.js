const express = require('express');
const mongoose = require('mongoose');
const User = require("../schemas/UserSchema");
const router = express.Router();

router.get("/follow/:userId", async (req, res, next) => {
    let userId = mongoose.Types.ObjectId(req.params.userId);
    let user = await User.findById(userId).catch(error => console.log(error));

    if(!user) return res.status(404).send("User not found");

    const currentUserId = req.session.user._id;

    let isFollowing = user.followers && user.followers.includes(currentUserId); //if current user is present in user's followers then UNFOLLOW
    let dbOption = isFollowing ? "$pull" : "$push";

    req.session.user = await User.findByIdAndUpdate(currentUserId, {[dbOption] : {following : userId}}, {new : true});
    await User.findByIdAndUpdate(userId, {[dbOption] : {followers : currentUserId}}, {new : true});
    res.status(200).redirect('/home');
});

module.exports = router;