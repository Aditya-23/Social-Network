const express = require('express');
const Router = express.Router();
const User = require('../models/User');
const bcryptjs = require('bcryptjs');
const {body, validationResult} = require('express-validator');
const jwt = require('jsonwebtoken');
const config = require('config');
const auth = require('../middleware/auth');
const Profile = require('../models/Profile');
const request = require("request");

// @POST    Create profile private
Router.post('/', auth, async(req, res) => {
    try {
        const profile = Profile();
        const user = await User.findById(req.userId);
        profile.fullName = user.name;
        //assign userId to profile
        profile.user = req.userId;
        profile.status = req.body.status;
        // required, converting csv to a list of skills and trimming it
        profile.skills = req
            .body
            .skills
            .split(',')
            .map(skill => skill.trim());
        profile.email = user.email;
        profile.github = req.body.github;

        //adding experience and education
        if (req.body.experience) 
            profile.experience = req.body.experience;
        if (req.body.education) 
            profile.education = req.body.education;
        
        profile.socialmedia = req.body.socialmedia;

        //other details
        if (req.body.company) 
            profile.company = req.body.company;
        if (req.body.website) 
            profile.website = req.body.website;
        if (req.body.bio) 
            profile.bio = req.body.bio;
        
        await profile.save();
        return res
            .status(200)
            .json({profile});
    } catch (error) {
        console.log(error)
        return res
            .status(500)
            .json({msg: "Internal server error!"});
    }
});

// @PUT    Update profile private
Router.put("/", auth, async(req, res) => {
    try {
        const doc = await Profile.findOneAndUpdate({
            user: req.userId
        }, req.body, {new: true});
        console.log(doc);
        return res
            .status(200)
            .json(doc);
    } catch (error) {
        console.log(error)
        return res
            .status(500)
            .json({msg: "Internal server error!"});
    }
});

Router.get("/profiles", async(req, res) => {
    try {
        const profiles = await Profile.find();
        console.log(profiles)
        return res
            .status(200)
            .json(profiles);
    } catch (error) {
        console.log(error)
        return res
            .status(500)
            .json({msg: "Internal server error!"});
    }
})

//  @GET    Get a profile using the user Id.  private
Router.get("/", auth, async(req, res) => {
    try {
        const profile = await Profile.findOne({user: req.userId});
        if (!profile) 
            return res.status(400).json({msg: "Could not find the profile"});
        return res
            .status(200)
            .json(profile);
    } catch (error) {
        console.log(error)
        return res
            .status(500)
            .json({msg: "Internal server error!"});
    }
});

//  @POST    Add experience  private
Router.post("/experience", auth, async(req, res) => {
    try {
        const profile = await Profile.findOne({user: req.userId});

        profile
            .experience
            .unshift(req.body);
        await profile.save();
        return res
            .status(200)
            .json({profile});
    } catch (error) {
        console.log(error)
        return res
            .status(500)
            .json({msg: "Internal server error!"});
    }
});

//  @PUT    Update experience based on experience ID  private
Router.put("/experience/:exp", auth, async(req, res) => {
    try {
        const profile = await Profile.findOne({user: req.userId});
        const expId = req.params.exp;
        const experienceIndex = profile
            .experience
            .findIndex(exp => exp._id == expId);
        profile.experience[experienceIndex] = req.body;

        await profile.save();
        return res
            .status(200)
            .json({profile});
    } catch (error) {
        console.log(error)
        return res
            .status(500)
            .json({msg: "Internal server error!"});
    }
});

//  @DELETE    Delete an experience based on experience ID  private
Router.delete("/experience/:exp", auth, async(req, res) => {
    try {
        const profile = await Profile.findOne({user: req.userId});
        const expId = req.params.exp;
        const experienceIndex = profile
            .experience
            .findIndex(exp => exp._id == expId);
        profile
            .experience
            .splice(experienceIndex, 1);

        await profile.save();
        return res
            .status(200)
            .json({profile});
    } catch (error) {
        console.log(error)
        return res
            .status(500)
            .json({msg: "Internal server error!"});
    }
});

//  @POST    Add education  private
Router.post("/education", auth, async(req, res) => {
    try {
        const profile = await Profile.findOne({user: req.userId});

        profile
            .education
            .unshift(req.body);
        await profile.save();
        return res
            .status(200)
            .json({profile});
    } catch (error) {
        console.log(error)
        return res
            .status(500)
            .json({msg: "Internal server error!"});
    }
});

//  @PUT    Update education based on education ID  private
Router.put("/education/:edu", auth, async(req, res) => {
    try {
        const profile = await Profile.findOne({user: req.userId});
        const eduId = req.params.edu;
        const educationIndex = profile
            .education
            .findIndex(edu => edu._id == eduId);
        profile.education[educationIndex] = req.body;

        await profile.save();
        return res
            .status(200)
            .json({profile});
    } catch (error) {
        console.log(error)
        return res
            .status(500)
            .json({msg: "Internal server error!"});
    }
});

//  @DELETE    Delete an education based on education ID  private
Router.delete("/education/:edu", auth, async(req, res) => {
    try {
        const profile = await Profile.findOne({user: req.userId});
        const eduId = req.params.edu;
        const educationIndex = profile
            .education
            .findIndex(edu => edu._id == eduId);
        profile
            .education
            .splice(educationIndex, 1);

        await profile.save();
        return res
            .status(200)
            .json({profile});
    } catch (error) {
        console.log(error)
        return res
            .status(500)
            .json({msg: "Internal server error!"});
    }
});

//  @GET    Get github repos by username  public
Router.get("/github/:userName", async(req, res) => {
    const clientId = config.get("clientId");
    const clientSecret = config.get("clientSecret");
    try {
        const config = {
            uri: `https://api.github.com/users/${req.params.userName}/repos?per_page=5&sort=created:asc&client_id=${clientId}&client_secret=${clientSecret}`,
            method: "GET",
            headers: {
                "user-agent": "node.js"
            }
        }

        request(config, (error, response, body) => {
            if (error) {
                console.log(error);
            }
            if (response.status != 200) {
                return res
                    .status(500)
                    .json({msg: "No public repositories found"});
            }

            return res
                .status(200)
                .json(JSON.parse(body));
        })
    } catch (error) {
        console.log(error)
        return res
            .status(500)
            .json({msg: "Internal server error!"});
    }
})
module.exports = Router;