const express = require('express');
const Router = express.Router();
const User = require('../models/User');
const bcryptjs = require('bcryptjs');
const {body, validationResult} = require('express-validator');
const jwt = require('jsonwebtoken');
const config = require('config');
const auth = require('../middleware/auth');

// GET Login Route
Router.post("/",
    async (req, res) => {
    try {
        const {email, password} = req.body;
        const user = await User.findOne({email: email});
        if(!user){
            return res.status(400).json({msg : "Incorrect Credentials"})
        }
        const payload = {
            userId : user.id
        }
        const passwordCompare = await bcryptjs.compare(req.body.password, user.password);
        if(!passwordCompare){
            return res.status(400).json({msg: "Incorrect Credentials"});
        }
        jwt.sign(payload, config.get('jwtSecret'), {expiresIn : 360000},
            (error, token) => {
            if(error) throw error;
            return res.status(200).json({msg: "Logged In", token})
        })     
    } catch (error) {
        console.log(error);
        return res.status(400).json({msg: "Server Error!"})
    }
});

module.exports = Router;