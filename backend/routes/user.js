const express = require('express');
const Router = express.Router();
const User = require('../models/User');
const bcryptjs = require('bcryptjs');
const {body, validationResult} = require('express-validator');
const gravatar = require('gravatar');
const jwt = require('jsonwebtoken');
const config = require('config');

//Register the user
Router.post('/register',
    body('name').notEmpty().withMessage("Name cannot be empty"),
    body('email').isEmail().withMessage("Its not a valid email"),
    body('password').isLength({
        min : 7
    }).withMessage("Minimum length is 7"),
    async (req, res) => {
    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json(errors.errors);
        }
        const {name, email, password} = req.body;
        const userPresent = await User.findOne({email: email});
        if(userPresent){      
            return res.status(400).json({msg : "User already present"});
        }
        
        const avatar = gravatar.url(email, {
            s : '200',
            r : 'pg',
            m : 'mm'
        })
        const user = User({
            name, 
            email,
            password,
            avatar
        });
        const salt = await bcryptjs.genSalt(10);
        user.password = await bcryptjs.hash(password, salt);
        await user.save();
        const payload = {
            userId : user.id
        }
        jwt.sign(payload, config.get('jwtSecret'), {expiresIn : 1800},
            (error, token) => {
            if(error) throw error;
            const userObj = {
                token,
                name: user.name,
                email: user.email,
                gravatar: user.avatar
            };
            return res.status(200).json({msg: "Registered", userObj})
        })

        
    } catch (error) {
        console.log(error);
        return res.status(400).json({msg: "Server Error!"})
    }
});

module.exports = Router;