const express = require('express');
const Router = express.Router();
const User = require('../models/User');
const bcryptjs = require('bcryptjs');
const {body, validationResult} = require('express-validator');
const jwt = require('jsonwebtoken');
const config = require('config');
const auth = require('../middleware/auth');
const Profile = require('../models/Profile');

// @POST    Create post
// private
Router.post('/', auth, async (req, res) => {
    try {
        const profile = Profile();
        //assign userId to profile
        profile.user = req.userId;
        profile.status = req.body.status;
        // required, converting csv to a list of skills and trimming it
        profile.skills = req.body.skills.split(',').map(skill => skill.trim()); 

        //adding experience and education 
        if(req.body.experience)     profile.experience = req.body.experience;
        if(req.body.education)      profile.education = req.body.education;

        req.body.socialmedia.map(socialmediaprofile => {
            profile.socialmedia.push(socialmediaprofile);
        })

        //other details
        if(req.body.company)    profile.company = req.body.company;
        if(req.body.website)    profile.website = req.body.website;
        if(req.body.bio)    profile.bio = req.body.bio;

        await profile.save();
        return res.status(200).json({profile});
    } catch (error) {
        console.log(error)
        return res.status(500).json({msg : "Internal server error!"});
    }
});

// @PUT    Update profile
// private
Router.put("/", auth, async (req, res) => {
    try {
        const doc = await Profile.findOneAndUpdate({id: req.userId}, req.body, {new: true});
        return res.status(200).json(doc);
    } catch (error) {
        console.log(error)
        return res.status(500).json({msg : "Internal server error!"});
    }
});

//  @GET    Get a profile using the user Id.
//  private   
Router.get("/", auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({id: req.userId});
        if(!profile)    return res.status(400).json({msg : "Could not find the profile"});
        return res.status(200).json(profile);
    } catch (error) {
        console.log(error)
        return res.status(500).json({msg : "Internal server error!"});
    }
});


module.exports = Router;