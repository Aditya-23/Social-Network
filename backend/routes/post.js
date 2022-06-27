const express = require('express');
const Router = express.Router();
const User = require('../models/User');
const bcryptjs = require('bcryptjs');
const {body, validationResult} = require('express-validator');
const jwt = require('jsonwebtoken');
const config = require('config');
const auth = require('../middleware/auth');
const Post = require('../models/Post');

//  @POST   Create a post
//  Private
Router.post("/", auth, async (req, res) => {
    try {
        const user = await User.findOne({id : req.userId});
        const post = Post({
            user,
            text : req.body.text,
            author : user.name,
            avatar : user.avatar,
        });
        await post.save();
        return res.status(200).json({msg : "Created Post!"});
    } catch (error) {
        console.log(error);
        return res.status(400).json({msg : "Could not create a post!"});
    }
});

//  @POST    Register a like
//  Private
Router.post("/like/:postId", auth, async (req, res) => {
    try {
        const user = await User.findOne({id : req.userId}).select("-password");
        const post = await Post.findOne({id : req.params.postId});
        const userIndex = post.likes.findIndex(item => item.user == req.userId);
        // You can like only once
        if(userIndex != -1)
            return res.status(400).json({msg : "Already liked"});

        post.likes.unshift({
            user : req.userId,
            name : user.name
        })
        await post.save();
        return res.status(200).json({msg : "Like Registered"});
    } catch (error) {
        console.log(error);
        return res.status(400).json({msg : "Could not like a post!"});
    }
});

//  @POST    unlike a post
//  Private
Router.post("/unlike/:postId", auth, async (req, res) => {
    try {
        const user = await User.findOne({id : req.userId}).select("-password");
        const post = await Post.findOne({id : req.params.postId});
        const userIndex = post.likes.findIndex(item => item.user == req.userId);
        // You can like only once
        if(userIndex == -1)
            return res.status(400).json({msg : "Post is not liked"});

        post.likes.splice(userIndex, 1);
        await post.save();
        return res.status(200).json({msg : "Like Removed"});
    } catch (error) {
        console.log(error);
        return res.status(400).json({msg : "Could not unlike a post!"});
    }
});

//  @DELETE   Delete a post
//  Private
Router.delete("/:postId", auth, async (req, res) => {
    try {
        const post = await Post.findOneAndDelete({id : req.params.postId});
        if(!post)
            return res.status(400).json({msg : "Could not find the post!"});
        return res.status(200).json({msg : "Deleted Post!"});
    } catch (error) {
        console.log(error);
        return res.status(400).json({msg : "Could not delete a post!"});
    }
});

//  @POST   Add a comment
//  Private
Router.post("/comment/:postId", auth, async(req, res) => {
    try {
        const post = await Post.findOne({id: req.params.postId});
        const user = await User.findOne({id : req.userId}).select("name");
        if(!post)
            return res.status(400).json({msg : "Could not find the post!"});
        post.comments.unshift({
            user : req.userId,
            name : user.name,
            comment : req.body.comment
        })
        await post.save();
        return res.status(200).json({msg : "Added comment to the post!"});
    } catch (error) {
        console.log(error);
        return res.status(400).json({msg : "Could not add a comment to the post!"});
    }
});

//  @DELETE   Delete a comment
//  Private
Router.delete("/comment/:postId/:commentId", auth, async(req, res) => {
    try {
        const post = await Post.findOne({id: req.params.postId});
        if(!post)
            return res.status(400).json({msg : "Could not find the post!"});
        const commentIndex = post.comments.findIndex(comment => comment.id == req.params.commentId);
        if(commentIndex == -1)
            return res.status(400).json({msg : "Could not find the comment!"});
        post.comments.splice(commentIndex, 1);
        await post.save();
        return res.status(200).json({msg : "Deleted comment!"});
    } catch (error) {
        console.log(error);
        return res.status(400).json({msg : "Could not find the comment!"});
    }
});

module.exports = Router;