const config = require('config');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authJwt = async (req, res, next) => {
    const token = req.header('x-auth-token');

    if(!token){
        return res.status(401).json({ msg : "Cannot authenticate!" });
    }

    try {
        const verifyToken = await jwt.verify(token, config.get('jwtSecret'));
        req.userId = verifyToken.userId;
        
        next();

    } catch (error) {
        console.log(error)
        res.status(401).json({msg : "Token Invalid"});
    }
}

module.exports = authJwt;