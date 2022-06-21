const config = require('config');
const mongoose = require('mongoose');

const dbURI = config.get('MongoURI');

const MongoConnect = async () => {
    try {
        await mongoose.connect(dbURI);
        console.log("DB Connected!")
    } catch (error) {
        console.log(error);
    } 
}

module.exports = MongoConnect;