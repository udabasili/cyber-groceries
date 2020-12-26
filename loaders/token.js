const jwt = require('jsonwebtoken');
const { secretKey } = require('../config/index');

module.exports =  function(user){
    const u = {
        username: user.username,
        _id: user._id.toString(),
        imageUrl: user.imageUrl
    };
    return jwt.sign(u,
        secretKey,{ 
            expiresIn: 24 * 60 * 60 
        })
}