const express = require("express");
const MongoConnect = require('../config/mongodb');

const app = express();  
MongoConnect();

app.use(express.json({extended : false}));

app.use('/api/user', require('./routes/user'));

app.use('/api/auth', require('./routes/auth'));

app.use('/api/profile', require('./routes/profile'));

app.use("/api/post", require('./routes/post'));

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => console.log('Server running on port : ' + PORT));